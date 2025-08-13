document.getElementById('formCadastroAdmin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!nome || !usuario || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  if (senha.length < 6) {
    alert('Senha precisa ter pelo menos 6 caracteres');
    return;
  }

  try {
    const resposta = await fetch('https://site-tronno-6hml.onrender.com/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, usuario, senha }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Administrador cadastrado com sucesso!');
      window.location.href = './login-admin.html'; // ajusta se precisar
    } else {
      alert('Erro: ' + (dados.mensagem || 'Algo deu errado'));
    }
  } catch (err) {
    console.error(err);
    alert('Erro na comunicação com o servidor');
  }
});
