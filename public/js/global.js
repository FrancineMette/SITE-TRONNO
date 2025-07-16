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

