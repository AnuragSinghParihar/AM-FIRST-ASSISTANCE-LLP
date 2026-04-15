import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
async function fix() {
  try {
    await pool.query('ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS loan_type VARCHAR(100);');
    console.log('Added loan_type column');
  } catch (err) {
    console.error(err.message);
  }
  process.exit(0);
}
fix();
