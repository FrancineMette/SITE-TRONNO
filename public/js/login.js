/*login.js*/
document.getElementById("form-login").addEventListener("submit", async function (e) {
  e.preventDefault();

  const login = document.getElementById("login").value.trim().toLowerCase();
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("https://site-tronno-6hml.onrender.com/api/colaboradores/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ login, senha })
});

    const dados = await resposta.json();

   if (resposta.ok && dados.token) {
      localStorage.setItem("token", dados.token);
      localStorage.setItem("colaborador", JSON.stringify(dados.colaborador));
      localStorage.setItem("colaboradorLogado", "true");
      localStorage.setItem("perfil", dados.colaborador?.perfil || "colaborador");

      // Checa se veio de uma tentativa de compra
      const produto = localStorage.getItem("produtoParaComprar");
      const params = new URLSearchParams(window.location.search);
      const redirecionarPara = params.get("redirect");

      if (redirecionarPara && produto) {
        // Redireciona pro carrinho com o produto
        window.location.href = `${redirecionarPara}.html?produto=${produto}`;
      } else {
        // Senão, segue pro painel
        window.location.href = "https://tronno.com.br/html/painel.html";
      }

    } else {
      document.querySelector(".mensagem-erro").style.display = "block";
    }

  } catch (erro) {
    console.error("Erro ao tentar logar:", erro);
    document.querySelector(".mensagem-erro").style.display = "block";
  }
});
