document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('https://site-tronno.onrender.com/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Login realizado com sucesso!');
      console.log(dados);
      // Redireciona se quiser
      // window.location.href = "pagina-principal.html";
    } else {
      alert(dados.mensagem || 'Erro ao fazer login.');
    }
  } catch (erro) {
    console.error('Erro na requisição:', erro);
    alert('Erro de conexão.');
  }
});
