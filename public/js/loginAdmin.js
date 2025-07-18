document.getElementById("form-loginAdmin").addEventListener("submit", async function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("https://site-tronno.onrender.com/api/admin/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      document.querySelector(".mensagem-sucesso").innerText = dados.mensagem;
      document.querySelector(".mensagem-sucesso").style.display = "block";
      document.querySelector(".mensagem-erro").style.display = "none";
      e.target.reset();
    } else {
      document.querySelector(".mensagem-erro").innerText = dados.erro;
      document.querySelector(".mensagem-erro").style.display = "block";
      document.querySelector(".mensagem-sucesso").style.display = "none";
    }

  } catch (erro) {
    document.querySelector(".mensagem-erro").innerText = "Erro ao cadastrar admin.";
    document.querySelector(".mensagem-erro").style.display = "block";
    console.error("Erro:", erro);
  }
});
