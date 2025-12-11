/* ===== MENU / OVERLAY / ESCAPE ===== */
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu(){
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden','false');
  menuOverlay.hidden = false;
  requestAnimationFrame(()=> menuOverlay.style.opacity = '1');
  document.body.style.overflow = 'hidden';
}
function closeMenuFn(){
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden','true');
  menuOverlay.style.opacity = '0';
  setTimeout(()=> menuOverlay.hidden = true, 220);
  document.body.style.overflow = '';
}

menuBtn && menuBtn.addEventListener('click', openMenu);
closeMenu && closeMenu.addEventListener('click', closeMenuFn);
menuOverlay && menuOverlay.addEventListener('click', closeMenuFn);
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape' && sideMenu.classList.contains('open')) closeMenuFn(); });

/* ===== DARK MODE (persistente) ===== */
const darkModeBtn = document.getElementById('darkModeBtn');
(function restoreTheme(){
  try{
    if(localStorage.getItem('psicolink_theme') === 'dark') document.body.classList.add('dark');
  }catch(e){}
})();

if(darkModeBtn){
  darkModeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    try{
      if(document.body.classList.contains('dark')) localStorage.setItem('psicolink_theme','dark');
      else localStorage.removeItem('psicolink_theme');
    }catch(e){}
  });
}

/* ===== FORMULÁRIO CONTATO ===== */
const formContato = document.getElementById('formContato');
const statusMsg = document.getElementById('statusMsg');

if(formContato){
  formContato.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    // coleta
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const tipo = document.getElementById('tipo').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    // validação simples
    if(!nome || !email || !idade || !tipo || !mensagem){
      showStatus('Preencha todos os campos corretamente.', 'erro');
      return;
    }
    // email regex simples
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRe.test(email)){
      showStatus('Email inválido.', 'erro');
      return;
    }
    // simula envio (substituir por fetch para enviar de verdade)
    showStatus('Enviando...', 'sucesso');
    setTimeout(()=>{
      showStatus('Mensagem enviada com sucesso! Entraremos em contato.', 'sucesso');
      formContato.reset();
    }, 900);
  });
}

function showStatus(text, type){
  if(!statusMsg) return;
  statusMsg.textContent = text;
  statusMsg.className = 'status-msg ' + (type === 'sucesso' ? 'sucesso' : 'erro');
  statusMsg.style.display = 'block';
  statusMsg.style.opacity = '0';
  setTimeout(()=> statusMsg.style.opacity = '1', 10);
  // auto-hide após 6s
  setTimeout(()=> {
    statusMsg.style.opacity = '0';
    setTimeout(()=> statusMsg.style.display = 'none', 250);
  }, 6000);
}
