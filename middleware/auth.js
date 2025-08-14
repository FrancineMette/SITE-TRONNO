const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera header: "Bearer token"

  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ mensagem: 'Token inválido ou expirado' });

    req.user = user; // guarda os dados do token na requisição
    next();
  });
}

// Middleware que exige role=admin
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso negado: apenas administradores' });
  }
  next();
}

module.exports = { autenticarToken, requireAdmin };