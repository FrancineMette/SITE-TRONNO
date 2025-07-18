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
      // Aqui salva no localStorage os dados do admin
      localStorage.setItem("adminToken", dados.token);
      localStorage.setItem("adminUsuario", dados.usuario || login);
      localStorage.setItem("adminLogado", "true");

      window.location.href = "https://tronno.com.br/html/admin/dashboard.html";
    } else {
      document.querySelector(".mensagem-erro").style.display = "block";
    }

  } catch (erro) {
    console.error("Erro ao tentar logar admin:", erro);
    document.querySelector(".mensagem-erro").style.display = "block";
  }
});
