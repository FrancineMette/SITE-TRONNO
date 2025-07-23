document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");
  
  // 👉 Troca "Entrar" por "Painel do Cliente"
  const btnLogin = document.getElementById("btn-login");
  if (token && usuario && btnLogin) {
    btnLogin.innerText = "Painel do Cliente";
    btnLogin.href = "/html/painel.html";
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
    
    if (menu && menu.classList.contains('aberto') && !menu.contains(event.target) && event.target !== btn) {
      menu.classList.remove('aberto');
    }
  });

  // 🠗 Mostrar a coroa ao rolar
  const logoCoroa = document.getElementById("logo-coroa");
  if (logoCoroa) {
    window.addEventListener("scroll", function () {
      logoCoroa.style.opacity = window.scrollY > 100 ? "1" : "0";
    });
  }

  // 🠗 Exibir o menu hambúrguer se estiver logado
  if (token && usuario && menuHamburguer) {
    menuHamburguer.style.display = "block";
  }

  const fundoEscuro = document.getElementById('fundo-escuro');

function toggleMenu() {
  const menu = document.getElementById('menu-lateral');
  if (menu) {
    menu.classList.toggle('aberto');
    fundoEscuro.style.display = menu.classList.contains('aberto') ? 'block' : 'none';
  }
}

fundoEscuro.addEventListener('click', toggleMenu);
});
