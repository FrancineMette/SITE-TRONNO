document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-admin-cadastro");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;

    const erro = document.querySelector(".mensagem-erro");
    const sucesso = document.querySelector(".mensagem-sucesso");

    if (senha !== confirmar) {
      erro.textContent = "As senhas não coincidem.";
      erro.style.display = "block";
      sucesso.style.display = "none";
      return;
    }

    fetch("https://site-tronno.onrender.com/api/admin/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha }) // ⬅️ Removido o campo "usuario"
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Resposta do servidor:", data);

        if (data.mensagem === "Administrador registrado com sucesso!") {
          sucesso.textContent = data.mensagem;
          sucesso.style.display = "block";
          erro.style.display = "none";

          setTimeout(() => {
            window.location.href = "../html/login.html";
          }, 2000);
        } else {
          erro.textContent = data.mensagem || "Erro ao registrar.";
          erro.style.display = "block";
          sucesso.style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        erro.textContent = error.message || "Erro na conexão com o servidor.";
        erro.style.display = "block";
        sucesso.style.display = "none";
      });
  });
});
