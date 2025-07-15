const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const dadosCadastraisController = require('../controllers/dadosCadastraisController'); // 👈 importa o novo controller

router.post('/registro', usuarioController.registrar);
router.post('/login', usuarioController.login);

// 👉 Nova rota:
router.post('/dados-cadastrais', dadosCadastraisController.criar);

router.get('/', (req, res) => {
  res.send('Rota de usuários funcionando!');
});

module.exports = router;
