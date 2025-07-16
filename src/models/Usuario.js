/*Usuario.js*/

const db = require('../config/db');

const Usuario = {
  criar: async (usuario) => {
    const sql = 'INSERT INTO usuarios (nome_completo, usuario, email, senha, criado_em) VALUES (?, ?, ?, ?, NOW())';
    try {
      const [result] = await db.query(sql, [usuario.nome_completo, usuario.usuario, usuario.email, usuario.senha]);
      return result;
    } catch (err) {
      console.error('❌ Erro ao inserir usuário:', err);
      throw err;
    }
  },

  buscarPorEmailOuUsuario: async (login) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ? OR usuario = ?';
    try {
      const [results] = await db.query(sql, [login, login]);
      return results;
    } catch (err) {
      console.error('❌ Erro ao buscar usuário:', err);
      throw err;
    }
  },

  atualizarSenha: async (id, novaSenhaHash) => {
    const sql = 'UPDATE usuarios SET senha = ? WHERE id = ?';
    const [results] = await db.query(sql, [novaSenhaHash, id]);
    return results;
  },

  invalidarToken: async (token) => {
    const sql = 'INSERT INTO tokens_invalidados (token) VALUES (?)';
    const [result] = await db.query(sql, [token]);
    return result;
  },

  tokenJaUsado: async (token) => {
    const sql = 'SELECT * FROM tokens_invalidados WHERE token = ? LIMIT 1';
    const [rows] = await db.query(sql, [token]);
    return rows.length > 0;
  }
};

module.exports = Usuario;
