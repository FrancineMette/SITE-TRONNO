const db = require('../config/db');

const Usuario = {
  criar: async (usuario) => {
    const sql = 'INSERT INTO usuarios (nome_completo, usuario, email, senha, criado_em) VALUES (?, ?, ?, ?, NOW())';

    try {
      const [result] = await db.query(sql, [usuario.nome_completo, usuario.usuario, usuario.email, usuario.senha]);
      console.log('✅ Usuário inserido com sucesso!', result);
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
  }
};

const db = require('../config/db');

exports.atualizarSenha = (id, novaSenhaHash) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE usuarios SET senha = ? WHERE id = ?', [novaSenhaHash, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.invalidarToken = async (token) => {
  const sql = 'INSERT INTO tokens_invalidados (token) VALUES (?)';
  try {
    const [result] = await db.query(sql, [token]);
    return result;
  } catch (err) {
    console.error('Erro ao invalidar token:', err);
    throw err;
  }
};

exports.tokenJaUsado = async (token) => {
  const sql = 'SELECT * FROM tokens_invalidados WHERE token = ? LIMIT 1';
  try {
    const [rows] = await db.query(sql, [token]);
    return rows.length > 0;
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    throw err;
  }
};

module.exports = Usuario;
