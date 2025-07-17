document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");

  if (token && usuario) {
    // 👉 Troca "Entrar" por "Painel do Cliente"
    const btnLogin = document.getElementById("btn-login");
    if (btnLogin) {
      btnLogin.innerText = "Painel do Cliente";
      btnLogin.href = "/html/painel.html"; // Altere se necessário
    }

    // 👉 Mostra botão "Sair"
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
      btnLogout.style.display = "inline-block"; // ou "block" dependendo do layout
      btnLogout.addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        window.location.href = "/index.html"; // Redireciona pra home após logout
      });
    }
  }

  // 🠗 Botão voltar ao topo
  const botaoTopo = document.querySelector('.voltar-topo');
  if (botaoTopo) {
    window.addEventListener('scroll', function () {
      botaoTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    botaoTopo.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 🠗 Menu lateral (hambúrguer)
  const menuHamburguer = document.getElementById('menu-hamburguer');
  if (menuHamburguer) {
    menuHamburguer.addEventListener('click', toggleMenu);
  }

  function toggleMenu() {
    const menu = document.getElementById('menu-lateral');
    if (menu) {
      menu.classList.toggle('aberto');
    }
  }
});
