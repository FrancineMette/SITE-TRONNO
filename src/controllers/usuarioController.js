const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

exports.registrar = async (req, res) => {
  const { nome_completo, usuario, email, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);
    await Usuario.criar({ nome_completo, usuario, email, senha: hash });
    return res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    return res.status(500).json({ mensagem: 'Erro ao registrar usuário', erro: err.sqlMessage || err.message });
  }
};

exports.login = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const results = await Usuario.buscarPorEmailOuUsuario(login);
    if (results.length === 0) return res.status(401).json({ mensagem: 'Usuário não encontrado' });

    const usuario = results[0];
    const isMatch = await bcrypt.compare(senha, usuario.senha);

    if (isMatch) {
      return res.status(200).json({ mensagem: 'Login bem-sucedido!', usuario: usuario.nome_completo });
    } else {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ mensagem: 'Erro no login', erro: err.sqlMessage || err.message });
  }
};