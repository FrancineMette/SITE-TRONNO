// ColaboradorModel.js
const db = require('../config/db');

async function findByEmail(email) {
  const [rows] = await db.query(
    'SELECT id FROM colaboradores WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0];
}

async function create({ nome, email, senha_hash }) {
  const [result] = await db.query(
    'INSERT INTO colaboradores (nome, email, senha_hash) VALUES (?,?,?)',
    [nome, email, senha_hash]
  );
  return result.insertId;
}

module.exports = { findByEmail, create };
