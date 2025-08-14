// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// pool local para esta rota
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true
});

// POST /api/admin -> cadastrar novo admin
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body || {};
    if (!nome || !email || !senha) {
      return res.status(400).json({ ok:false, message:'nome, email e senha são obrigatórios' });
    }

    const [exists] = await pool.query('SELECT id FROM admins WHERE email = ? LIMIT 1', [email]);
    if (exists.length) {
      return res.status(409).json({ ok:false, message:'Email já cadastrado' });
    }

    const hash = await bcrypt.hash(String(senha), 10);

    const [r] = await pool.query(
      'INSERT INTO admins (nome, email, senha) VALUES (?, ?, ?)',
      [String(nome).trim(), String(email).trim().toLowerCase(), hash]
    );

    const [rows] = await pool.query(
      'SELECT id, nome, email, criado_em FROM admins WHERE id = ?',
      [r.insertId]
    );

    return res.status(201).json({ ok:true, admin: rows[0] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok:false, message:'Erro interno' });
  }
});

// (opcional) POST /api/admin/login -> valida credenciais
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body || {};
    if (!email || !senha) return res.status(400).json({ ok:false, message:'email e senha são obrigatórios' });

    const [rows] = await pool.query('SELECT id, nome, email, senha FROM admins WHERE email = ? LIMIT 1', [email]);
    if (!rows.length) return res.status(401).json({ ok:false, message:'Credenciais inválidas' });

    const ok = await bcrypt.compare(String(senha), rows[0].senha);
    if (!ok) return res.status(401).json({ ok:false, message:'Credenciais inválidas' });

    return res.json({ ok:true, admin:{ id: rows[0].id, nome: rows[0].nome, email: rows[0].email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok:false, message:'Erro interno' });
  }
});

module.exports = router;
