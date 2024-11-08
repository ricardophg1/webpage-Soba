import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import { sendEmail } from './email.js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id UUID PRIMARY KEY,
        form_type VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS schedules (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        visit_date DATE NOT NULL,
        visit_time TIME NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

app.post('/api/schedule', async (req, res) => {
  const { name, email, phone, date, time, serviceType } = req.body;
  
  try {
    const id = uuidv4();
    
    // Save to database
    await pool.query(
      'INSERT INTO schedules (id, name, email, phone, visit_date, visit_time, service_type) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [id, name, email, phone, date, time, serviceType]
    );

    // Send email to admin
    await sendEmail({
      to: 'antoniotopvil@gmail.com',
      subject: 'Nova Visita Agendada',
      text: `
        Nova visita agendada:
        
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone}
        Data: ${new Date(date).toLocaleDateString('pt-BR')}
        Hora: ${time}
        Tipo de Serviço: ${serviceType}
        
        Data do agendamento: ${new Date().toLocaleString('pt-BR')}
      `
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Confirmação de Agendamento - Soba Construção Civil',
      text: `
        Olá ${name},
        
        Seu agendamento foi confirmado para:
        Data: ${new Date(date).toLocaleDateString('pt-BR')}
        Hora: ${time}
        Tipo de Serviço: ${serviceType}
        
        Entraremos em contato para confirmar os detalhes.
        
        Atenciosamente,
        Equipe Soba Construção Civil
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    res.status(500).json({ message: 'Erro ao agendar visita' });
  }
});

app.post('/api/send-email', async (req, res) => {
  const { formType, name, email, phone, ...otherData } = req.body;
  
  try {
    const id = uuidv4();
    
    await pool.query(
      'INSERT INTO form_submissions (id, form_type, name, email, phone, data) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, formType, name, email, phone, JSON.stringify(otherData)]
    );

    await sendEmail({
      to: 'antoniotopvil@gmail.com',
      subject: `Novo Formulário: ${formType}`,
      text: `
        Novo formulário recebido:
        
        Tipo: ${formType}
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone}
        
        Dados Adicionais:
        ${Object.entries(otherData)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')}
        
        Data: ${new Date().toLocaleString('pt-BR')}
      `
    });

    await sendEmail({
      to: email,
      subject: 'Recebemos seu formulário - Soba Construção Civil',
      text: `
        Olá ${name},
        
        Recebemos seu formulário e entraremos em contato em breve.
        
        Atenciosamente,
        Equipe Soba Construção Civil
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ message: 'Erro ao processar formulário' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDB();
});