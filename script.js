console.log("Script iniciado..."); // Para teste no console

// Lógica do Carrossel
const slides = document.querySelectorAll('.slide');
const btnProximo = document.getElementById('btn-proximo');
let indexAtual = 0;

if (btnProximo) { // Verifica se o botão existe para não dar erro
    btnProximo.addEventListener('click', () => {
        slides[indexAtual].classList.remove('active');
        indexAtual = (indexAtual + 1) % slides.length;
        slides[indexAtual].classList.add('active');
    });
}

// Lógica do Efeito de Clique (Brilho Rosa)
document.addEventListener('click', (e) => {
    // 1. Cria a bolinha
    const brilho = document.createElement('div');
    brilho.classList.add('click-effect');
    
    // 2. Posiciona ela onde o mouse clicou
    brilho.style.left = e.clientX + 'px';
    brilho.style.top = e.clientY + 'px';
    
    // 3. Adiciona ao corpo do site
    document.body.appendChild(brilho);
    
    // 4. Remove depois de 0.5s para não pesar o site
    setTimeout(() => {
        brilho.remove();
    }, 500);
});

// Animação ao Scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Só anima se o elemento estiver aparecendo E se a classe ainda não foi adicionada
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, {
  rootMargin: '0px 0px -100px 0px', 
  threshold: 0.3 
});

const elementosAnimados = document.querySelectorAll('.scroll-anim');
elementosAnimados.forEach((el) => observer.observe(el));  

// Lógica do Menu Fixo (Sticky Header)
const header = document.querySelector('.cine-header');

window.addEventListener('scroll', () => {
  // Se rolou mais que 50px para baixo
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    // Se voltou para o topo, remove o fundo escuro
    header.classList.remove('scrolled');
  }
});

// Rolagem Suave para os Links Internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // -80 para descontar a altura do menu
                behavior: 'smooth'
            });
        }
    });
});

// --- LÓGICA DA MÚSICA DE FUNDO ---
const musica = document.getElementById('musica-fundo');
const btnSom = document.getElementById('btn-som');

// 1. Configuração Inicial
if (musica) {
    musica.volume = 0.3; // Volume ambiente (30%)
}

// 2. Função para garantir que o ícone bate com a realidade
function atualizarIcone() {
    if (btnSom) {
        if (musica.paused) {
            btnSom.innerHTML = "🔇"; // Mudo
        } else {
            btnSom.innerHTML = "🔊"; // Tocando
        }
    }
}

// 3. Tenta tocar assim que carrega (Autoplay)
if (musica) {
    musica.play().then(() => {
        // Se der certo (navegador permitiu), atualiza o ícone
        atualizarIcone();
    }).catch(() => {
        console.log("Autoplay bloqueado. Esperando interação do usuário.");
        atualizarIcone(); // Garante que comece com ícone de mudo
    });
}

// 4. Fallback: Tocar no primeiro clique em qualquer lugar da tela
function iniciarMusicaGlobal() {
    if (musica && musica.paused) {
        musica.play().then(() => {
            atualizarIcone();
        }).catch(e => console.error(e));
        
        // Remove o evento para não ficar tentando dar play toda hora
        document.removeEventListener('click', iniciarMusicaGlobal);
    }
}

// Adiciona o ouvinte global
document.addEventListener('click', iniciarMusicaGlobal);

// 5. Lógica do Botão de Mute/Unmute
if (btnSom && musica) {
    btnSom.addEventListener('click', (e) => {
        // Impede que esse clique ative a lógica global (evita conflito)
        e.stopPropagation(); 
        
        if (musica.paused) {
            musica.play();
        } else {
            musica.pause();
        }
        
        // Atualiza o ícone imediatamente
        atualizarIcone();
        
        // Se o usuário clicou no botão, podemos remover o ouvinte global
        // pois ele já fez a escolha dele de ligar/desligar
        document.removeEventListener('click', iniciarMusicaGlobal);
    });
}