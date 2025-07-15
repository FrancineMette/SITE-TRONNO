document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;

  fetch('https://site-tronno.onrender.com/api/usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, senha })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', data.usuario);
      window.location.href = 'painel.html';
    } else {
      alert(data.mensagem || 'Erro no login');
    }
  })
  .catch(err => {
    console.error('Erro na requisição:', err);
    alert('Erro na requisição');
  });
});
