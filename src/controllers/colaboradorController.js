//colaboradorController.js
const bcrypt = require('bcrypt');
const Colabs = require('../models/ColaboradorModel');

const okEmail = (s) => /^\S+@\S+\.\S+$/.test(String(s||'').toLowerCase());

exports.criar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body || {};
    if (!nome || !email || !senha) return res.status(400).json({ ok:false, message:'nome, email e senha são obrigatórios' });
    if (!okEmail(email))       return res.status(400).json({ ok:false, message:'e-mail inválido' });

    const dup = await Colabs.findByEmail(email.trim().toLowerCase());
    if (dup) return res.status(409).json({ ok:false, message:'e-mail já cadastrado' });

    const senha_hash = await bcrypt.hash(String(senha), 10);
    const id = await Colabs.create({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha_hash
    });

    return res.status(201).json({ ok:true, id });
  } catch (err) {
    console.error('ERRO criar colaborador:', err);
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok:false, message:'duplicado' });
    return res.status(500).json({ ok:false, message:'erro ao salvar' });
  }
};
