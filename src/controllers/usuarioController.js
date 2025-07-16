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

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { login, senha } = req.body;
  const loginTrim = login.trim(); 

  console.log("Login recebido:", login);
  console.log("Login tratado:", loginTrim);

  try {
    const results = await Usuario.buscarPorEmailOuUsuario(loginTrim);
    if (results.length === 0) 
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });

    const usuario = results[0];
    const isMatch = await bcrypt.compare(senha, usuario.senha);

    if (isMatch) {
      // 🔐 Gerar o token JWT
      const token = jwt.sign(
        { id: usuario.id, nome_completo: usuario.nome_completo },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );

      return res.status(200).json({ 
        mensagem: 'Login bem-sucedido!', 
        usuario: usuario.nome_completo,
        token // ⚠️ FRONT vai guardar isso!
      });
    } else {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ mensagem: 'Erro no login', erro: err.sqlMessage || err.message });
  }
};
