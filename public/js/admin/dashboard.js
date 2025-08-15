// Guard de rota: só entra se tiver token
(function guard() {
  const token = localStorage.getItem('tronno_admin_token');
  if (!token) {
    // dashboard.html -> login.html (mesma pasta)
    window.location.href = 'login.html';
  } else {
    // opcional: mostrar nome a partir do payload do JWT
    const payload = JSON.parse(atob(token.split('.')[1] || 'e30='));
    const nome = payload?.name || payload?.email || 'Admin';
    const s = document.getElementById('saudacao');
    if (s) s.textContent = `Bem-vindo(a), ${nome}`;
  }
})();

document.getElementById('btnSair').addEventListener('click', () => {
  localStorage.removeItem('tronno_admin_token');
  window.location.href = 'login.html';
});
