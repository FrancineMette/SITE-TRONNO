const db = require('../config/db');

const Usuario = {
  criar: (usuario, callback) => {
    const sql = 'INSERT INTO usuarios (nome_completo, usuario, email, senha, criado_em) VALUES (?, ?, ?, ?, NOW())';
    
    db.query(sql, [usuario.nome, usuario.usuario, usuario.email, usuario.senha], (err, result) => {
      if (err) {
        console.error('❌ Erro ao inserir usuário:', err);
        return callback(err);
      }
      console.log('✅ Usuário inserido com sucesso!', result);
      callback(null, result);
    });
  },

  buscarPorEmailOuUsuario: (login, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ? OR usuario = ?';
    
    db.query(sql, [login, login], (err, results) => {
      if (err) {
        console.error('❌ Erro ao buscar usuário:', err);
        return callback(err);
      }
      callback(null, results);
    });
  }
};

module.exports = Usuario;
