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

module.exports = Usuario;
