// Carrousel avis auto
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
let currentIndex = 0;

function updateCarousel() {
  // Déplacement du carrousel
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);

    // Reset de la barre
    const fill = slide.querySelector(".progress-fill");
    fill.style.transition = "none";
    fill.style.width = "0%";
    // Forcer le reflow pour que la transition reprenne
    void fill.offsetWidth;
    if (index === currentIndex) {
      fill.style.transition = "width 5s linear";
      fill.style.width = "100%";
    }
  });
}

// Défilement automatique toutes les 5 secondes
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 5000);
  // Initialisation au chargement
  updateCarousel();