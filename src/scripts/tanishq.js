const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});


document.addEventListener("DOMContentLoaded", () => {
  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonials .prev");
  const nextBtn = document.querySelector(".testimonials .next");

  // agar testimonial section exist hi na kare
  if (!testimonialTrack || testimonialCards.length === 0) return;

  let currentIndex = 0;
  const cardsPerPage = 3;

  function updateTestimonials() {
    const cardWidth = testimonialCards[0].offsetWidth + 20; // width + margin
    testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < testimonialCards.length - cardsPerPage) {
        currentIndex++;
        updateTestimonials();
      }
    });
  }

  // Prev button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateTestimonials();
      }
    });
  }
});

