import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import ExcelJS from 'exceljs';

dotenv.config();
const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL connection                                                                                                           
const pool = new Pool({
  host: process.env.DB_HOST,                                                                                                       
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,                                                                                                       
  password: process.env.DB_PASSWORD,
});                                                                                                                                
                
// Submit loan application
app.post('/api/apply', async (req, res) => {
  const { name, phone, email, city, loanType, amount, tenure, carValue, carModel } = req.body;                                     
  try {
    const result = await pool.query(                                                                                               
      `INSERT INTO loan_applications                                                                                               
        (name, phone, email, city, loan_type, amount, tenure, car_value, car_model)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,                                                                          
      [name, phone, email, city, loanType, amount, tenure, carValue, carModel]
    );                                                                                                                             
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {                                                                                                                  
    res.status(500).json({ success: false, error: err.message });
  }                                                                                                                                
});

// Submit contact form (Get In Touch)
app.post('/api/contact', async (req, res) => {
  const { name, loanType, mobile, message } = req.body;
  try {
    // Note: Assuming the table is named 'contact_messages' and has columns: name, loan_type, mobile, message
    const result = await pool.query(
      `INSERT INTO contact_messages (name, loan_type, phone, message)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, loanType, mobile, message]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Email transporter ──────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// ── Build Excel buffer ─────────────────────────────────────────
async function buildExcel({ sheetName, columns, rows }) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(sheetName);

  // Header row styling
  ws.columns = columns.map(c => ({ header: c.header, key: c.key, width: c.width || 20 }));
  const headerRow = ws.getRow(1);
  headerRow.eachCell(cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0A1F44' } };
    cell.font = { bold: true, color: { argb: 'FFD4AF37' }, size: 12 };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' }, bottom: { style: 'thin' },
      left: { style: 'thin' }, right: { style: 'thin' },
    };
  });
  headerRow.height = 22;

  // Data rows
  rows.forEach((row, i) => {
    const r = ws.addRow(row);
    r.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i % 2 === 0 ? 'FFF9FAFB' : 'FFFFFFFF' } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      };
      cell.alignment = { vertical: 'middle' };
    });
    r.height = 18;
  });

  return wb.xlsx.writeBuffer();
}

// ── Daily report function ──────────────────────────────────────
async function sendDailyReport() {
  const today = new Date().toISOString().split('T')[0];
  const reportTo = 'amfirst.report@gmail.com';

  try {
    // --- Loan Applications ---
    const applyResult = await pool.query(
      `SELECT id, name, phone, email, city, loan_type, amount, tenure, car_value, car_model, created_at
       FROM loan_applications WHERE created_at::date = $1 ORDER BY created_at ASC`,
      [today]
    );
    const applyRows = applyResult.rows;

    const applyBuffer = await buildExcel({
      sheetName: 'Loan Applications',
      columns: [
        { header: 'ID',         key: 'id',         width: 8  },
        { header: 'Name',       key: 'name',       width: 20 },
        { header: 'Phone',      key: 'phone',      width: 16 },
        { header: 'Email',      key: 'email',      width: 28 },
        { header: 'City',       key: 'city',       width: 14 },
        { header: 'Loan Type',  key: 'loan_type',  width: 18 },
        { header: 'Amount (₹)', key: 'amount',     width: 14 },
        { header: 'Tenure (mo)',key: 'tenure',     width: 13 },
        { header: 'Car Value',  key: 'car_value',  width: 14 },
        { header: 'Car Model',  key: 'car_model',  width: 18 },
        { header: 'Time',       key: 'time',       width: 16 },
      ],
      rows: applyRows.map(r => ({
        id: r.id, name: r.name || '', phone: r.phone || '',
        email: r.email || '', city: r.city || '',
        loan_type: r.loan_type || '',
        amount: r.amount ? Number(r.amount) : '',
        tenure: r.tenure || '',
        car_value: r.car_value ? Number(r.car_value) : '',
        car_model: r.car_model || '',
        time: new Date(r.created_at).toLocaleTimeString('en-IN'),
      })),
    });

    await transporter.sendMail({
      from: `"AM First Daily Report" <${process.env.MAIL_USER}>`,
      to: reportTo,
      subject: `📋 Loan Applications — ${today} (${applyRows.length} entries)`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2 style="color:#0A1F44;">Loan Applications Report</h2>
          <p>Date: <strong>${today}</strong></p>
          <p>Total submissions today: <strong>${applyRows.length}</strong></p>
          <p>Please find the Excel report attached.</p>
          <br/><p style="color:#999;font-size:11px;">AM First Assistance LLP — Automated Daily Report</p>
        </div>`,
      attachments: [{
        filename: `Loan_Applications_${today}.xlsx`,
        content: applyBuffer,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }],
    });
    console.log(`[${today}] Loan applications report sent (${applyRows.length} entries).`);

    // --- Contact Messages ---
    const contactResult = await pool.query(
      `SELECT id, name, loan_type, phone, message, created_at
       FROM contact_messages WHERE created_at::date = $1 ORDER BY created_at ASC`,
      [today]
    );
    const contactRows = contactResult.rows;

    const contactBuffer = await buildExcel({
      sheetName: 'Contact Messages',
      columns: [
        { header: 'ID',        key: 'id',        width: 8  },
        { header: 'Name',      key: 'name',      width: 20 },
        { header: 'Phone',     key: 'phone',     width: 16 },
        { header: 'Loan Type', key: 'loan_type', width: 18 },
        { header: 'Message',   key: 'message',   width: 40 },
        { header: 'Time',      key: 'time',      width: 16 },
      ],
      rows: contactRows.map(r => ({
        id: r.id, name: r.name || '', phone: r.phone || '',
        loan_type: r.loan_type || '', message: r.message || '',
        time: new Date(r.created_at).toLocaleTimeString('en-IN'),
      })),
    });

    await transporter.sendMail({
      from: `"AM First Daily Report" <${process.env.MAIL_USER}>`,
      to: reportTo,
      subject: `💬 Contact Messages — ${today} (${contactRows.length} entries)`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2 style="color:#0A1F44;">Contact Messages Report</h2>
          <p>Date: <strong>${today}</strong></p>
          <p>Total messages today: <strong>${contactRows.length}</strong></p>
          <p>Please find the Excel report attached.</p>
          <br/><p style="color:#999;font-size:11px;">AM First Assistance LLP — Automated Daily Report</p>
        </div>`,
      attachments: [{
        filename: `Contact_Messages_${today}.xlsx`,
        content: contactBuffer,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }],
    });
    console.log(`[${today}] Contact messages report sent (${contactRows.length} entries).`);

  } catch (err) {
    console.error('Daily report error:', err.message);
  }
}

// ── Test endpoint (remove after testing) ──────────────────────
app.get('/api/test-report', async (req, res) => {
  await sendDailyReport();
  res.json({ success: true, message: 'Report sent!' });
});

// ── Schedule: every day at 2:00 AM and 2:00 PM IST ───────────
cron.schedule('0 2 * * *', () => {
  console.log('Running 2 AM email report...');
  sendDailyReport();
}, { timezone: 'Asia/Kolkata' });

cron.schedule('0 14 * * *', () => {
  console.log('Running 2 PM email report...');
  sendDailyReport();
}, { timezone: 'Asia/Kolkata' });

app.listen(5005, () => console.log('Server running on port 5005'));
