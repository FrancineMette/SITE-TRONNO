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
    'https://site-tronno-6hml.onrender.com',  // backend
    'https://site-tronno.onrender.com'        // se existir esse host também
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'], // adicione 'Authorization' quando tiver login com JWT
}));
app.options('*', cors()); // responde preflight global

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas existentes
const usuarioRoutes = require('./src/routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

// Rotas Admin
const adminRoutes = require('./src/routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// Healthcheck
app.get('/', (_req, res) => res.send('Servidor está rodando! 🚀'));

// Sobe
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
