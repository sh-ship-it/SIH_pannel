import pkg from 'pg';
import fs from 'fs';
import path from 'path';
const { Pool } = pkg;

// Neon connection
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_lEU9ygGPq2jt@ep-young-firefly-adjomnhq-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

// Initialize database
async function initDB() {
  try {
    const sqlPath = path.join(process.cwd(), 'init_db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

// Run initialization
initDB();

export default pool;
