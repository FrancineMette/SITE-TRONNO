const db = require('../config/db');

const Usuario = {
  criar: (usuario, callback) => {
    const sql = 'INSERT INTO usuarios (nome_completo, nome_usuario, email, senha) VALUES (?, ?, ?, ?)';
    db.query(sql, [usuario.nome, usuario.usuario, usuario.email, usuario.senha], callback);
  },

  buscarPorEmailOuUsuario: (login, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ? OR nome_usuario = ?';
    db.query(sql, [login, login], callback);
  }
};

module.exports = Usuario;
