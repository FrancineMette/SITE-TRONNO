const LOGIN_URL = `${location.origin}/html/admin/login-admin.html`;

// Util: decodifica payload do JWT com try/catch
function parseJwt (t) {
  try {
    const base = t.split('.')[1]; if (!base) return {};
    return JSON.parse(atob(base.replace(/-/g, '+').replace(/_/g, '/')));
  } catch { return {}; }
}

// Esconde o conteúdo até validar
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (main) main.style.visibility = 'hidden';

  const token = localStorage.getItem('tronno_admin_token');
  if (!token) return window.location.replace(LOGIN_URL);

  const payload = parseJwt(token);
  const agora = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < agora) {
    // token expirado
    localStorage.removeItem('tronno_admin_token');
    return window.location.replace(LOGIN_URL);
  }

  // Saudação
  const nome = payload.name || payload.email || 'Admin';
  const s = document.getElementById('saudacao');
  if (s) s.textContent = `Bem-vindo(a), ${nome}`;

  // Mostra a página após validar
  if (main) main.style.visibility = 'visible';

  // Logout (sem voltar com botão do navegador)
  const btnSair = document.getElementById('btnSair');
  if (btnSair) {
    btnSair.addEventListener('click', () => {
      localStorage.removeItem('tronno_admin_token');
      window.location.replace(LOGIN_URL);
    });
  }
});