document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");

  if (token && usuario) {
    // Exibir link pro painel
    const menuUsuario = document.getElementById("menu-usuario");
    if (menuUsuario) {
      menuUsuario.innerHTML = `<a href="/html/painel.html">Painel do Cliente</a>`;
    }

    // Esconde botão "Entrar"
    const btnLogin = document.getElementById("btn-login");
    if (btnLogin) {
      btnLogin.style.display = "none";
    }

    // Mostra botão "Sair"
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
      btnLogout.style.display = "block";
      btnLogout.addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        window.location.href = "/index.html"; // volta pro início ao deslogar
      });
    }
  }
});

// Botão voltar ao topo
const botaoTopo = document.querySelector('.voltar-topo');

if (botaoTopo) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      botaoTopo.style.display = 'block';
    } else {
      botaoTopo.style.display = 'none';
    }
  });

  botaoTopo.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Menu lateral (hambúrguer)
function toggleMenu() {
  const menu = document.getElementById('menu-lateral');
  if (menu) {
    menu.classList.toggle('aberto');
  }
}

