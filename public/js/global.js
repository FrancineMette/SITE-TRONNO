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
  }

    // 👉 Mostra botão "Sair"
    const botoesLogout = document.querySelectorAll(".btn-logout");
    botoesLogout.forEach(btn => {
    btn.style.display = "inline-block";
    btn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("produtoParaComprar");
    window.location.href = "/html/login.html";
       });
    });

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
  
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu-lateral');
    const btn = document.getElementById('menu-hamburguer');
    
    if(menu.classList.contains('aberto') && !menu.contains(event.target) && event.target !== btn) {
      menu.classList.remove('aberto');
    }
  });
  
window.addEventListener("DOMContentLoaded", function () {
  const logoCoroa = document.getElementById("logo-coroa");

  if (logoCoroa) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        logoCoroa.style.opacity = "1";
      } else {
        logoCoroa.style.opacity = "0";
      }
    });
  }
});
  
});
