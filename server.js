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
app.post('/api/admin/cadastrar', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos' });
  }
  if (senha.length < 6) {
    return res.status(400).json({ erro: 'Senha deve ter pelo menos 6 caracteres' });
  }

  try {
    const pool = await getPool();

    const [rows] = await pool.query('SELECT id FROM admins WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    const hashSenha = await bcrypt.hash(senha, 10);

    await pool.query('INSERT INTO admins (nome, email, senha) VALUES (?, ?, ?)', [
      nome,
      email,
      hashSenha,
    ]);

    return res.status(201).json({ mensagem: 'Admin cadastrado com sucesso!' });
  } catch (erro) {
    console.error('Erro ao cadastrar admin:', erro);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// Teste rápido
app.get('/', (req, res) => {
  res.send('Servidor está rodando! 🚀');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
