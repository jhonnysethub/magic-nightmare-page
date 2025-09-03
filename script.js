const imagens = document.querySelectorAll(".carrossel img");
const btnEsquerda = document.querySelector(".carrossel-btn.left");
const btnDireita = document.querySelector(".carrossel-btn.right");
let indiceAtual = 0;

function mostrarImagem(index) {
  imagens.forEach((img) => img.classList.remove("active"));
  imagens[index].classList.add("active");
}

btnEsquerda.addEventListener("click", () => {
  indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
  mostrarImagem(indiceAtual);
});

btnDireita.addEventListener("click", () => {
  indiceAtual = (indiceAtual + 1) % imagens.length;
  mostrarImagem(indiceAtual);
});
