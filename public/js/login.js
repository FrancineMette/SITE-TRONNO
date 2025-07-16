/*login.js*/
document.getElementById("form-login").addEventListener("submit", async function (e) {
  e.preventDefault();

  const login = document.getElementById("login").value.trim().toLowerCase();
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("https://site-tronno.onrender.com/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok && dados.token) {
      localStorage.setItem("token", dados.token);
      localStorage.setItem("usuario", dados.usuario);
      window.location.href = "https://tronno.com.br/painel.html";
    } else {
      document.querySelector(".mensagem-erro").style.display = "block";
    }
  } catch (erro) {
    console.error("Erro ao tentar logar:", erro);
    document.querySelector(".mensagem-erro").style.display = "block";
  }
});
