/*server.js*/

const express = require('express');
const app = express();
const cors = require('cors'); // <- já está certo
const dotenv = require('dotenv');
dotenv.config();

const usuarioRoutes = require('./src/routes/usuarioRoutes');

// ✅ Habilita CORS ANTES de qualquer rota
app.use(cors({
  origin: '*', // ou coloque o seu domínio aqui
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

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
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
