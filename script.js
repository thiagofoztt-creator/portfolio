// BOTÃO VER PROJETO
function verProjeto(url){
window.open(url, '_blank');
}

// ANIMAÇÃO AO ROLAR
const elementos = document.querySelectorAll('.hidden');

window.addEventListener('scroll', () => {
elementos.forEach(el => {
const posicao = el.getBoundingClientRect().top;

if(posicao < window.innerHeight){
el.classList.add('show');
}
});
});