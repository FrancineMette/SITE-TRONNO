// ColaboradorModel.js
const db = require('../config/db');

async function findByEmail(email) {
  const [rows] = await db.query(
    'SELECT id, nome, email, senha_hash, status, perfil FROM colaboradores WHERE LOWER(email) = LOWER(?) LIMIT 1',
    [String(email || '').trim().toLowerCase()]
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

async function findByLogin(login) {
  const l = String(login || '').trim().toLowerCase();
  try {
    // se existir coluna "usuario", isso funciona
    const [rows] = await db.query(
      `SELECT id, nome, email, usuario, senha_hash, status, perfil
         FROM colaboradores
        WHERE LOWER(email)=LOWER(?) OR LOWER(usuario)=LOWER(?)
        LIMIT 1`,
      [l, l]
    );
    return rows[0] || null;
  } catch (e) {
    // se NÃO existir a coluna "usuario", cai pro e-mail sem quebrar nada
    const [rows] = await db.query(
      `SELECT id, nome, email, senha_hash, status, perfil
         FROM colaboradores
        WHERE LOWER(email)=LOWER(?)
        LIMIT 1`,
      [l]
    );
    return rows[0] || null;
  }
}

// 👉 ajuste o export no final:
module.exports = { findByEmail, create, findByLogin };