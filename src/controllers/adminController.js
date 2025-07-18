// controllers/adminController.js
const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.registrarAdmin = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se já existe admin com esse email
    const [adminExistente] = await db.execute("SELECT * FROM admins WHERE email = ?", [email]);
    if (adminExistente.length > 0) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado como administrador." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await db.execute(
      "INSERT INTO admins (nome, email, senha, criado_em) VALUES (?, ?, ?, NOW())",
      [nome, email, senhaHash]
    );

    res.status(201).json({ mensagem: "Administrador registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao registrar admin:", error);
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};
