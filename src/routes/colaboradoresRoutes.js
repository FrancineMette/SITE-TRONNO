//colaboradoresRoutes.js
const express = require('express');
const router = express.Router();

const { autenticarToken, requireAdmin } = require('../../middleware/auth');
const controller = require('../controllers/colaboradorController');

router.post('/', autenticarToken, requireAdmin, controller.criar);

module.exports = router;
