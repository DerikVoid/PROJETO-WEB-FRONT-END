/* -------------------
   Menu (overlay + acessibilidade)
   ------------------- */
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

// Open menu: reveal sideMenu and overlay
function openMenu(){
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden', 'false');
  menuOverlay.hidden = false;
  // small timeout for transition opacity
  requestAnimationFrame(()=> menuOverlay.style.opacity = '1');
  // prevent page scroll while menu open
  document.body.style.overflow = 'hidden';
}

// Close menu
function closeMenuFn(){
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
  menuOverlay.style.opacity = '0';
  setTimeout(()=> menuOverlay.hidden = true, 220);
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openMenu);
closeMenu?.addEventListener('click', closeMenuFn);
menuOverlay?.addEventListener('click', closeMenuFn);

// close with ESC
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && sideMenu.classList.contains('open')) closeMenuFn();
});

/* -------------------
   Dark mode toggle
   ------------------- */
const darkModeBtn = document.getElementById('darkModeBtn');
if(darkModeBtn){
  darkModeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    // keep overlay/menu behavior unchanged
  });
}

/* -------------------
   Carrossel horizontal (avança para a direita)
   - calcula largura do card atual para ser responsivo
   ------------------- */
const carousel = document.getElementById('carousel');
const nextBtn = document.getElementById('nextBtn');
let idx = 0;

function updateCarousel(){
  const cards = carousel.querySelectorAll('.card');
  if(cards.length === 0) return;
  // largura do card (inclui margin/gap handling via calculation)
  const cardRect = cards[0].getBoundingClientRect();
  const gap = 18; // keep in sync with CSS gap
  const shift = (cardRect.width + gap) * idx;
  carousel.style.transform = `translateX(-${shift}px)`;
}

// advance to next (right)
nextBtn.addEventListener('click', ()=>{
  const cards = carousel.querySelectorAll('.card');
  idx = (idx + 1) % cards.length;
  updateCarousel();
});

// recompute on resize
window.addEventListener('resize', updateCarousel);

// init
updateCarousel();
