import pkg from 'pg';
const { Pool } = pkg;

async function setup() {
  const defaultPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'anuragsingh',
  });

  try {
    console.log('Connecting to default postgres db...');
    // Create DB (ignore if exists)
    try {
      await defaultPool.query('CREATE DATABASE amfirst_db');
      console.log('Database amfirst_db created.');
    } catch (err) {
      if (err.code === '42P04') {
        console.log('Database amfirst_db already exists.');
      } else {
        throw err;
      }
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await defaultPool.end();
  }

  const dbPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'amfirst_db',
    user: 'anuragsingh',
  });

  try {
    console.log('Connecting to amfirst_db...');
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS loan_applications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        phone VARCHAR(20),
        email VARCHAR(100),
        city VARCHAR(50),
        loan_type VARCHAR(50),
        amount NUMERIC,
        tenure INTEGER,
        car_value NUMERIC,
        car_model VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        loan_type VARCHAR(50),
        phone VARCHAR(20),
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS news_cache (
        id SERIAL PRIMARY KEY,
        tag VARCHAR(50),
        tag_label VARCHAR(50),
        tag_color VARCHAR(20),
        title TEXT NOT NULL,
        source VARCHAR(200),
        link TEXT,
        fetched_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Tables created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await dbPool.end();
  }
}

setup();
