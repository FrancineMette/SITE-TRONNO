//colaboradoresRoutes.js
const express = require('express');
const router = express.Router();

const { autenticarToken, requireAdmin } = require('../../middleware/auth');
const controller = require('../controllers/colaboradorController');

router.post('/', colaboradorController.criar);
router.post('/login', colaboradorController.login);

module.exports = router;
