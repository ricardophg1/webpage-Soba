import express from 'express';
import cors from 'cors';
import pg from 'pg';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { Pool } = pg;

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.use(cors());
app.use(express.json());

// Initialize database
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        visit_date DATE NOT NULL,
        visit_time TIME NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Send email function
async function sendEmail(options) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      ...options,
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, phone } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );

    await sendEmail({
      subject: 'Novo Cadastro na Plataforma',
      text: `
        Novo usuário cadastrado:
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone}
        Data: ${new Date().toLocaleString('pt-BR')}
      `
    });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Erro no cadastro' });
  }
});

// Schedule endpoint
app.post('/api/schedule', async (req, res) => {
  const { userId, visitDate, visitTime, serviceType } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO schedules (user_id, visit_date, visit_time, service_type) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, visitDate, visitTime, serviceType]
    );

    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    await sendEmail({
      subject: 'Nova Visita Agendada',
      text: `
        Nova visita agendada:
        Cliente: ${user.rows[0].name}
        Email: ${user.rows[0].email}
        Telefone: ${user.rows[0].phone}
        Data: ${visitDate}
        Hora: ${visitTime}
        Tipo de Serviço: ${serviceType}
      `
    });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Scheduling error:', error);
    res.status(500).json({ error: 'Erro no agendamento' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDatabase();
});