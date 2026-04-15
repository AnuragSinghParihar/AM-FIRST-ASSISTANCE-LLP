import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import ExcelJS from 'exceljs';
import Parser from 'rss-parser';

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

// ── News RSS fetching ──────────────────────────────────────────
const rssParser = new Parser({ timeout: 10000 });

// Maps keywords in RSS titles to our categories/colors
function categorizeArticle(title) {
  const t = title.toLowerCase();
  if (t.includes('rbi') || t.includes('reserve bank') || t.includes('monetary policy') || t.includes('repo rate')) {
    return { tag: 'RBI Updates', tagLabel: 'RBI UPDATE', tagColor: 'red' };
  }
  if (t.includes('used car') || t.includes('second hand car') || t.includes('pre-owned') || t.includes('pre owned')) {
    return { tag: 'Used Car Market', tagLabel: 'MARKET', tagColor: 'orange' };
  }
  if (t.includes('interest rate') || t.includes('loan rate') || t.includes('emi') || t.includes('auto loan rate') || t.includes('car loan rate')) {
    return { tag: 'Loan Rates', tagLabel: 'RATE', tagColor: 'blue' };
  }
  if (t.includes('tip') || t.includes('guide') || t.includes('how to') || t.includes('checklist') || t.includes('advice')) {
    return { tag: 'Tips & Guides', tagLabel: 'GUIDE', tagColor: 'green' };
  }
  if (t.includes('insurance') || t.includes('irdai') || t.includes('policy') || t.includes('regulation') || t.includes('norms')) {
    return { tag: 'Press Releases', tagLabel: 'POLICY', tagColor: 'gold' };
  }
  // Default to Used Car Market for general auto finance news
  return { tag: 'Used Car Market', tagLabel: 'AUTO', tagColor: 'orange' };
}

const RSS_FEEDS = [
  'https://news.google.com/rss/search?q=used+car+loan+India&hl=en-IN&gl=IN&ceid=IN:en',
  'https://news.google.com/rss/search?q=RBI+auto+loan+rate+India&hl=en-IN&gl=IN&ceid=IN:en',
  'https://news.google.com/rss/search?q=car+refinance+India+NBFC&hl=en-IN&gl=IN&ceid=IN:en',
];

async function fetchAndCacheNews() {
  console.log('[News] Fetching latest articles from RSS feeds...');
  const articles = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await rssParser.parseURL(feedUrl);
      for (const item of feed.items.slice(0, 6)) {
        if (!item.title || !item.link) continue;
        // Clean up Google News title (removes " - Source Name" suffix)
        const title = item.title.replace(/\s+-\s+[^-]+$/, '').trim();
        const source = item.creator || (item.title.match(/\s+-\s+(.+)$/) || [])[1] || 'News';
        const pubDate = item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '';
        const { tag, tagLabel, tagColor } = categorizeArticle(title);
        articles.push({ tag, tagLabel, tagColor, title, source: `${source}${pubDate ? ', ' + pubDate : ''}`, link: item.link });
      }
    } catch (err) {
      console.warn(`[News] Failed to fetch feed ${feedUrl}:`, err.message);
    }
  }

  if (articles.length === 0) {
    console.warn('[News] No articles fetched — keeping existing cache.');
    return;
  }

  // Deduplicate by title
  const seen = new Set();
  const unique = articles.filter(a => {
    if (seen.has(a.title)) return false;
    seen.add(a.title);
    return true;
  }).slice(0, 20);

  // Replace cache
  try {
    await pool.query('DELETE FROM news_cache');
    for (const a of unique) {
      await pool.query(
        `INSERT INTO news_cache (tag, tag_label, tag_color, title, source, link) VALUES ($1,$2,$3,$4,$5,$6)`,
        [a.tag, a.tagLabel, a.tagColor, a.title, a.source, a.link]
      );
    }
    console.log(`[News] Cached ${unique.length} articles.`);
  } catch (err) {
    console.error('[News] DB write error:', err.message);
  }
}

// ── GET /api/news — serve cached articles ─────────────────────
app.get('/api/news', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news_cache ORDER BY fetched_at DESC, id ASC');
    res.json({ success: true, articles: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/refresh-news — manual refresh trigger ────────────
app.get('/api/refresh-news', async (req, res) => {
  await fetchAndCacheNews();
  res.json({ success: true, message: 'News refreshed!' });
});

// ── Schedule: refresh news every 7 days (Sunday 3 AM IST) ────
cron.schedule('0 3 * * 0', () => {
  console.log('[News] Running weekly news refresh...');
  fetchAndCacheNews();
}, { timezone: 'Asia/Kolkata' });

// Initial fetch on server start (if cache is empty)
pool.query('SELECT COUNT(*) FROM news_cache').then(r => {
  if (parseInt(r.rows[0].count) === 0) {
    console.log('[News] Cache empty — fetching initial articles...');
    fetchAndCacheNews();
  }
}).catch(() => {
  // Table may not exist yet — skip initial fetch
});

app.listen(5005, () => console.log('Server running on port 5005'));
