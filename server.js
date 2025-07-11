// server.js

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./src/config/db'); // conexão com o MySQL
const usuarioRoutes = require('./src/routes/usuarioRoutes');

// Configurações
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas
app.use('/api/usuarios', usuarioRoutes);

// Teste rápido
app.get('/', (req, res) => {
  res.send('Servidor está rodando! 🚀');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
