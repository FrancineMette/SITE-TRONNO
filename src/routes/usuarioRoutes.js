const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/registro', usuarioController.registrar);
router.post('/login', usuarioController.login);

router.get('/', (req, res) => {
  res.send('Rota de usuários funcionando!');
});
module.exports = router;
