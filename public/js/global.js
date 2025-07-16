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

// Inserir botão WhatsApp
window.addEventListener('DOMContentLoaded', () => {
  const botaoWhats = document.createElement('a');
  botaoWhats.href = 'https://wa.me/5547992386012';
  botaoWhats.className = 'whatsapp-button';
  botaoWhats.target = '_blank';
  botaoWhats.setAttribute('aria-label', 'Fale conosco no WhatsApp');
  botaoWhats.innerHTML = '<img src="../imagens/whatsapp.png" alt="WhatsApp">';
  document.body.appendChild(botaoWhats);
});