// config/db.js

const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test database connection
pool.connect()
  .then(client => {
    console.log("✅ Connected to PostgreSQL Database");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection error:", err.stack);
  });

module.exports = pool;
