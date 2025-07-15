const token = localStorage.getItem('token');
const usuario = localStorage.getItem('usuario');

if (!token) {
  window.location.href = 'login.html';
} else {
  document.getElementById('nomeUsuario').textContent = `Olá, ${usuario}!`;
}

document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
});
