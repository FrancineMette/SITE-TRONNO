/*cadastro.js*/
const token = localStorage.getItem('token');

if (!token) {
  alert('Você precisa estar logado.');
  window.location.href = 'login.html';
}

document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
});

document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const endereco = document.getElementById('endereco').value;
  const cpf_cnpj = document.getElementById('cpf_cnpj').value;
  const razao_social = document.getElementById('razao_social').value;
  const email_nf = document.getElementById('email_nf').value;

  try {
    const resposta = await fetch('https://site-tronno.onrender.com/api/usuarios/dados-cadastrais', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ endereco, cpf_cnpj, razao_social, email_nf })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Dados cadastrados com sucesso!');
    } else {
      alert('Erro: ' + (dados.mensagem || 'Tente novamente'));
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro na comunicação com o servidor');
  }
});
