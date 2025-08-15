// Usa a BASE do global.js se existir, senão cai no Render
const API_BASE = window.API_BASE || 'https://site-tronno-6hml.onrender.com';
// Se sua rota no backend tiver outro caminho, ajuste aqui:
const COLAB_ENDPOINT = '/api/colaboradores';

function parseJwt(t){
  try{
    const b = t.split('.')[1]; if(!b) return {};
    return JSON.parse(atob(b.replace(/-/g,'+').replace(/_/g,'/')));
  }catch{ return {}; }
}
function ensureAuth(){
  const tok = localStorage.getItem('tronno_admin_token');
  if(!tok) return location.replace('login.html');
  const p = parseJwt(tok);
  if(p.exp && p.exp * 1000 < Date.now()){
    localStorage.removeItem('tronno_admin_token');
    return location.replace('login.html');
  }
  return tok;
}

// helper rapidinho de mensagens
function setMsg(el, txt, ok=false){
  if(!el) return;
  el.textContent = txt || '';
  el.style.marginTop = '8px';
  el.style.textAlign = 'center';
  el.style.color = ok ? '#3adb5a' : '#ff6b6b';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastroAdmin'); // teu ID atual
  if(!form) return;

  // cria <p id="msg"> se não existir
  let msg = document.getElementById('msg');
  if(!msg){
    msg = document.createElement('p');
    msg.id = 'msg';
    form.insertAdjacentElement('afterend', msg);
  }

  const token = ensureAuth();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setMsg(msg, '');

    const btn = form.querySelector('button[type="submit"]');
    btn && (btn.disabled = true);

    const nome  = form.nome?.value.trim();
    const email = form.email?.value.trim().toLowerCase();
    const senha = form.senha?.value;

    // validação básica
    if (!nome || nome.length < 3) { setMsg(msg, 'Informe o nome completo.'); btn && (btn.disabled=false); return; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { setMsg(msg, 'E-mail inválido.'); btn && (btn.disabled=false); return; }
    if (!senha || senha.length < 6) { setMsg(msg, 'Senha deve ter pelo menos 6 caracteres.'); btn && (btn.disabled=false); return; }

    try{
      const r = await fetch(`${API_BASE}${COLAB_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome, email, senha })
      });

      if (r.status === 401) { // token inválido/expirado
        localStorage.removeItem('tronno_admin_token');
        return location.replace('login.html');
      }

      const data = await r.json().catch(()=> ({}));
      if (r.ok || r.status === 201) {
        setMsg(msg, 'Colaborador cadastrado com sucesso!', true);
        form.reset();
      } else {
        setMsg(msg, data.message || 'Não foi possível cadastrar.');
      }
    } catch (err){
      console.error(err);
      setMsg(msg, 'Falha ao comunicar com o servidor.');
    } finally {
      btn && (btn.disabled = false);
    }
  });
});