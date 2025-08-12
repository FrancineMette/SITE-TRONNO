document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const usuario = localStorage.getItem("usuario");

 // Elementos do menu hambúrguer
  const btnLoginHamburguer = document.querySelector("#menu-lateral #btn-login");
  const btnLogoutHamburguer = document.querySelector("#menu-lateral .btn-logout");

  // 👉 Troca "Entrar" por "Painel do Cliente"
  if (token && usuario && btnLoginHamburguer) {
    btnLoginHamburguer.innerText = "Painel do Cliente";
    btnLoginHamburguer.href = "/html/painel.html";
  }

  if (token) {
    // Oculta login e mostra sair
    if (btnLoginHamburguer) btnLoginHamburguer.style.display = "none";
    if (btnLogoutHamburguer) btnLogoutHamburguer.style.display = "block";

    // Evento de logout
    if (btnLogoutHamburguer) {
      btnLogoutHamburguer.addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        window.location.href = "../html/login.html";
      });
    }
  } else {
    // Mostra login e oculta sair
    if (btnLoginHamburguer) btnLoginHamburguer.style.display = "block";
    if (btnLogoutHamburguer) btnLogoutHamburguer.style.display = "none";
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
  const fundoEscuro = document.getElementById('fundo-escuro');

  function toggleMenu() {
    const menu = document.getElementById('menu-lateral');
    if (menu) {
      menu.classList.toggle('aberto');
      if (fundoEscuro) {
        fundoEscuro.style.display = menu.classList.contains('aberto') ? 'block' : 'none';
      }
    }
  }

  if (menuHamburguer) {
    menuHamburguer.addEventListener('click', toggleMenu);
  }

  if (fundoEscuro) {
    fundoEscuro.addEventListener('click', toggleMenu);
  }

  document.addEventListener('click', function (event) {
    const menu = document.getElementById('menu-lateral');
    const btn = document.getElementById('menu-hamburguer');

    if (menu && menu.classList.contains('aberto') && !menu.contains(event.target) && event.target !== btn) {
      menu.classList.remove('aberto');
      if (fundoEscuro) {
        fundoEscuro.style.display = 'none';
      }
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

  // Corrige vh em dispositivos móveis
  function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setVh();
  window.addEventListener('resize', setVh);

});