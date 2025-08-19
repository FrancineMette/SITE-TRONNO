//colaboradorController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Colabs = require('../models/ColaboradorModel');

const okEmail = (s) => /^\S+@\S+\.\S+$/.test(String(s || '').toLowerCase());

// POST /api/colaboradores  -> criar colaborador
exports.criar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body || {};
    if (!nome || !email || !senha) {
      return res.status(400).json({ ok: false, message: 'nome, email e senha são obrigatórios' });
    }
    if (!okEmail(email)) {
      return res.status(400).json({ ok: false, message: 'e-mail inválido' });
    }

    const dup = await Colabs.findByEmail(email.trim().toLowerCase());
    if (dup) return res.status(409).json({ ok: false, message: 'e-mail já cadastrado' });

    const senha_hash = await bcrypt.hash(String(senha), 10);
    const id = await Colabs.create({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha_hash
    });

    return res.status(201).json({ ok: true, id });
  } catch (err) {
    console.error('ERRO criar colaborador:', err);
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, message: 'duplicado' });
    return res.status(500).json({ ok: false, message: 'erro ao salvar' });
  }
};

// POST /api/colaboradores/login  -> login do colaborador
exports.login = async (req, res) => {
  try {
    const { login, senha } = req.body || {};
    if (!login || !senha) {
      return res.status(400).json({ ok: false, message: 'login e senha são obrigatórios' });
    }

    // Busca por e-mail OU usuário (case-insensitive)
    const colab = await Colabs.findByLogin(String(login).trim().toLowerCase());
    if (!colab) return res.status(401).json({ ok: false, message: 'Credenciais inválidas' });

    // Bloqueia inativo (suporta status='inativo' ou ativo=0)
    const inativo =
      (typeof colab.status !== 'undefined' && String(colab.status).toLowerCase() === 'inativo') ||
      (typeof colab.ativo !== 'undefined' && Number(colab.ativo) === 0);
    if (inativo) return res.status(403).json({ ok: false, message: 'Colaborador inativo' });

    // Validação da senha: bcrypt por padrão; aceita texto puro TEMPORARIAMENTE se ainda houver legado
    const hash = colab.senha_hash ?? colab.senha;
    let senhaOk = false;
    if (hash && String(hash).startsWith('$2')) {
      senhaOk = await bcrypt.compare(String(senha), String(hash));
    } else {
      senhaOk = String(senha) === String(hash); // fallback enquanto migra tudo para bcrypt
    }
    if (!senhaOk) return res.status(401).json({ ok: false, message: 'Credenciais inválidas' });

    // Gera token
    const payload = {
      sub: colab.id,
      role: 'colaborador',
      nome: colab.nome,
      email: colab.email,
      perfil: colab.perfil || 'colaborador'
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    return res.json({
      ok: true,
      token,
      colaborador: {
        id: colab.id,
        nome: colab.nome,
        email: colab.email,
        usuario: colab.usuario || null,
        perfil: colab.perfil || 'colaborador'
      }
    });
  } catch (err) {
    console.error('ERRO login colaborador:', err);
    return res.status(500).json({ ok: false, message: 'erro interno' });
  }
};
