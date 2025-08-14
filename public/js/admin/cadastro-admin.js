// public/js/cadastro-admin.js

// URL COMPLETA do backend no Render
const BASE_API = 'https://site-tronno-6hml.onrender.com/api/admin';

function getEl(id) {
  return document.getElementById(id);
}

function safeTrim(id) {
  const el = getEl(id);
  return (el && typeof el.value === 'string') ? el.value.trim() : '';
}

function setLoading(btn, isLoading) {
  if (!btn) return;
  btn.disabled = isLoading;
  btn.dataset.originalText = btn.dataset.originalText || btn.textContent;
  btn.textContent = isLoading ? 'Cadastrando...' : btn.dataset.originalText;
}

document.getElementById('formCadastroAdmin').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Lê campos (aceita id="email" ou id="usuario" como fallback)
  const nome  = safeTrim('nome');
  const email = safeTrim('email') || safeTrim('usuario');
  const senha = safeTrim('senha');

  // Botão para travar duplo submit
  const btn = document.querySelector('#formCadastroAdmin .botao-login');
  setLoading(btn, true);

  try {
    // Validações simples
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos!');
      setLoading(btn, false);
      return;
    }
    if (!email.includes('@')) {
      alert('Informe um e-mail válido (ex.: email@tronno.com.br).');
      setLoading(btn, false);
      return;
    }
    if (senha.length < 6) {
      alert('A senha precisa ter pelo menos 6 caracteres.');
      setLoading(btn, false);
      return;
    }

    // Chamada ao backend
    const resposta = await fetch(BASE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    // Tenta ler JSON (pode não vir em alguns erros)
    let dados = {};
    try { dados = await resposta.json(); } catch (_) {}

    if (resposta.ok) {
      // Sucesso -> redireciona para o login de admin
      // Ajuste o caminho se o HTML estiver em outra pasta
      window.location.href = 'login-admin.html';
    } else {
      const msg = dados.message || dados.mensagem || (resposta.status === 409 ? 'E-mail já cadastrado.' : 'Erro ao cadastrar.');
      alert('Erro: ' + msg);
      setLoading(btn, false);
    }
  } catch (err) {
    console.error(err);
    alert('Erro na comunicação com o servidor. Verifique sua conexão e tente novamente.');
    setLoading(btn, false);
  }
});