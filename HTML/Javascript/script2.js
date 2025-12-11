// elementos
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');
const darkModeBtn = document.getElementById('darkModeBtn');

// abrir menu
function openMenu(){
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden','false');
  menuOverlay.hidden = false;
  requestAnimationFrame(()=> menuOverlay.style.opacity = '1');
  document.body.style.overflow = 'hidden'; // evita scroll por baixo
}

// fechar menu
function closeMenuFn(){
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden','true');
  menuOverlay.style.opacity = '0';
  setTimeout(()=> menuOverlay.hidden = true, 220);
  document.body.style.overflow = '';
}

// event listeners (com checagem de existência)
menuBtn && menuBtn.addEventListener('click', openMenu);
closeMenu && closeMenu.addEventListener('click', closeMenuFn);
menuOverlay && menuOverlay.addEventListener('click', closeMenuFn);

// ESC fecha menu
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && sideMenu.classList.contains('open')) closeMenuFn();
});

// dark mode toggle (persistência simples com localStorage opcional)
if(darkModeBtn){
  darkModeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    // opcional: salvar preferencia
    try{
      if(document.body.classList.contains('dark')) localStorage.setItem('psicolink_theme','dark');
      else localStorage.removeItem('psicolink_theme');
    }catch(e){}
  });

  // restaurar preferencia no carregamento
  try{
    if(localStorage.getItem('psicolink_theme') === 'dark') document.body.classList.add('dark');
  }catch(e){}
}
