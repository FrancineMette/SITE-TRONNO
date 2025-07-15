const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

exports.registrar = (req, res) => {
  const { nome_completo, usuario, email, senha } = req.body;

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return res.status(500).send('Erro ao criptografar a senha');

    Usuario.criar({ nome_completo, usuario, email, senha: hash }, (err, result) => {
      if (err) {
        console.error('Erro do MySQL:', err);
        return res.status(500).json({ mensagem: 'Erro ao registrar usuário', erro: err.sqlMessage });
        }
      
      return res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
    });
  });
};

exports.login = (req, res) => {
  const { login, senha } = req.body;

  Usuario.buscarPorEmailOuUsuario(login, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }

    const usuario = results[0];

    bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
      if (isMatch) {
        res.status(200).json({ mensagem: 'Login bem-sucedido!', usuario: usuario.nome_completo });

      } else {
        res.status(401).json({ mensagem: 'Senha incorreta' });
      }
    });
  });
};
