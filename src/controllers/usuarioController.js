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

exports.verificar = async (req, res) => {
  const { identificador } = req.body;

  try {
    const results = await Usuario.buscarPorEmailOuUsuario(identificador.trim());
    if (results.length > 0) {
      return res.status(200).json({ mensagem: 'Usuário encontrado' });
    } else {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao verificar usuário:', err);
    return res.status(500).json({ mensagem: 'Erro interno', erro: err.message });
  }
};

const { enviarLinkRecuperacao } = require('../utils/emailService');


exports.enviarRecuperacao = async (req, res) => {
  const { identificador } = req.body;

  try {
    const results = await Usuario.buscarPorEmailOuUsuario(identificador.trim());
    if (results.length === 0)
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    const usuario = results[0];

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    await enviarLinkRecuperacao(usuario.email, token);
    return res.status(200).json({ mensagem: 'Link de recuperação enviado!' });
  } catch (err) {
    console.error('Erro ao enviar recuperação:', err);
    return res.status(500).json({ mensagem: 'Erro interno', erro: err.message });
  }
};

exports.redefinirSenha = async (req, res) => {
  const { token, novaSenha } = req.body;

  try {
    // Verifica se já foi usado
    const jaUsado = await Usuario.tokenJaUsado(token);
    if (jaUsado) {
      return res.status(400).json({ mensagem: 'Token já foi utilizado.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hash = await bcrypt.hash(novaSenha, 10);
    await Usuario.atualizarSenha(decoded.id, hash);

    // Invalida o token
    await Usuario.invalidarToken(token);

    return res.status(200).json({ mensagem: 'Senha atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao redefinir senha:', err);
    return res.status(400).json({ mensagem: 'Token inválido ou expirado'});
  }
};

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.enviarTesteEmail = async (req, res) => {
  try {
    const resposta = await resend.emails.send({
      from: 'Tronno <onboarding@resend.dev>', // você pode trocar por helpdesk@tronno.com.br depois
      to: 'seu-email@exemplo.com', // troque pelo seu e-mail real para testar
      subject: 'Teste de Envio - TRONNO',
      html: `
        <h1>Teste de Envio</h1>
        <p>Este é um e-mail de teste enviado via Resend API.</p>
      `
    });

    console.log("📬 Resposta do envio:", JSON.stringify(resposta, null, 2));

    res.status(200).json({ sucesso: true, resposta });
  } catch (error) {
    console.error("❌ Erro ao enviar teste:", error);
    res.status(500).json({ erro: 'Falha ao enviar e-mail de teste' });
  }
};

    


