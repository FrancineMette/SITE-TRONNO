require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mysql = require('mysql2/promise'); // só use se realmente for usar aqui
// const bcrypt = require('bcrypt');        // idem

const app = express();

// CORS — front e back em domínios diferentes
app.use(cors({
  origin: [
    'https://tronno.com.br',
    'https://www.tronno.com.br',
    'https://site-tronno-6hml.onrender.com',
    'https://site-tronno.onrender.com',
    'http://localhost:5500',      // dev local
    'http://127.0.0.1:5500'       // dev local
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors()); // responde preflight global

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas existentes
const adminRoutes = require('./src/routes/adminRoutes');
app.use('/api/admin', adminRoutes);
const colaboradoresRoutes = require('./src/routes/colaboradoresRoutes');
app.use('/api/colaboradores', colaboradoresRoutes);

// Healthcheck
app.get('/', (_req, res) => res.send('Servidor está rodando! 🚀'));

// Sobe
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});