/*usuarioRoutes.js*/
/*const express = require('express');
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

router.post('/verificar', usuarioController.verificar);

router.post('/enviar-recuperacao', usuarioController.enviarRecuperacao);

router.post('/redefinir-senha', usuarioController.redefinirSenha);

module.exports = router;*/

const express = require('express'); 
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const dadosCadastraisController = require('../controllers/dadosCadastraisController'); // 👈 importa o novo controller

router.post('/registro', usuarioController.registrar);
router.post('/login', usuarioController.login);
router.post('/dados-cadastrais', dadosCadastraisController.criar);
router.get('/', (req, res) => {
  res.send('Rota de usuários funcionando!');
});
router.post('/verificar', usuarioController.verificar);
router.post('/enviar-recuperacao', usuarioController.enviarRecuperacao);
router.post('/redefinir-senha', usuarioController.redefinirSenha);

router.get('/teste-email', usuarioController.enviarTesteEmail);

module.exports = router;
