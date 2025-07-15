document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('https://site-tronno.onrender.com/api/usuarios/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Cadastro realizado com sucesso!');
      console.log(dados);
    } else {
      alert(dados.mensagem || 'Erro ao cadastrar.');
    }
  } catch (erro) {
    console.error('Erro na requisição:', erro);
    alert('Erro de conexão.');
  }
});
