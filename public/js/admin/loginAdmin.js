const API_BASE = 'https://site-tronno-6hml.onrender.com';

const form = document.getElementById('formLoginAdmin');
const btn  = form.querySelector('.botao-login');
const msg  = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!email || !senha) { msg.textContent = 'Preencha e-mail e senha.'; return; }

  btn.disabled = true; msg.style.color=''; msg.textContent = '';

  try {
    const r = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await r.json().catch(() => ({}));

    if (r.ok && data.token) {
      // guarda token para usar nas telas protegidas
      localStorage.setItem('tronno_admin_token', data.token);
      // login.html -> dashboard.html (mesma pasta /public/html/admin)
      window.location.href = 'dashboard.html';
    } else {
      msg.style.color = 'red';
      msg.textContent = data.message || 'Credenciais inválidas.';
    }
  } catch (err) {
    console.error(err);
    msg.style.color = 'red';
    msg.textContent = 'Falha ao comunicar com o servidor.';
  } finally {
    btn.disabled = false;
  }
});
