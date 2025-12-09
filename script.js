// Menu mobile
document.querySelector("#menuBtn")?.addEventListener("click", () => {
  const menu = document.querySelector("#menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Voltar ao topo
document.querySelector("#topo")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Validação extra
document.querySelector("#formContato")?.addEventListener("submit", (e) => {
  alert("Formulário enviado!");
});

// Exibir/ocultar elemento
const titulo = document.querySelector("h2");
if(titulo){
  titulo.addEventListener("click", ()=> {
    titulo.style.display = "none";
  });
}
