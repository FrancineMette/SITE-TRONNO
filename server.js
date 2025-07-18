require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors({
  origin: ['https://tronno.com.br', 'https://site-tronno.onrender.com'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Importa suas rotas existentes (exemplo)
const usuarioRoutes = require('./src/routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

// Configura conexão MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

let pool;
async function getPool() {
  if (!pool) pool = await mysql.createPool(dbConfig);
  return pool;
}

// Rota para cadastrar admin
const adminRoutes = require('./src/routes/adminRoutes');
app.use('/api/admin', adminRoutes);


// Teste rápido
app.get('/', (req, res) => {
  res.send('Servidor está rodando! 🚀');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
