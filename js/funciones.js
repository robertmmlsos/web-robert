// ===== Carrusel de musicas-2026 =====

// Elementos de la página
const track = document.getElementById('carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const dotsContainer = document.getElementById('carousel-dots');

// Posición actual (0 = primera diapositiva)
let currentIndex = 0;
let autoplayId = null;
const AUTOPLAY_MS = 5000; // Tiempo entre cambios automáticos

// Crea un punto indicador por cada diapositiva
function createDots() {
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', 'Ir a la diapositiva ' + (index + 1));
    dot.addEventListener('click', () => {
      goToSlide(index);
      restartAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
}

// Mueve la pista y marca el punto activo
function goToSlide(index) {
  // Si pasa del final vuelve al inicio, y al revés
  currentIndex = (index + slides.length) % slides.length;
  track.style.transform = 'translateX(-' + currentIndex * 100 + '%)';

  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

// Cambio automático
function startAutoplay() {
  // No se activa si la persona prefiere menos movimiento
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  autoplayId = setInterval(nextSlide, AUTOPLAY_MS);
}

function stopAutoplay() {
  clearInterval(autoplayId);
}

function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// Eventos de los botones
btnNext.addEventListener('click', () => {
  nextSlide();
  restartAutoplay();
});

btnPrev.addEventListener('click', () => {
  prevSlide();
  restartAutoplay();
});

// Pausa el automático al pasar el mouse por el carrusel
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoplay);
carousel.addEventListener('mouseleave', startAutoplay);

// Flechas del teclado
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    nextSlide();
    restartAutoplay();
  }
  if (event.key === 'ArrowLeft') {
    prevSlide();
    restartAutoplay();
  }
});

// Inicio
createDots();
goToSlide(0);
startAutoplay();