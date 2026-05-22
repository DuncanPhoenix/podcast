/**
 * Podcast Card Interaction Script
 * Handles card animations and back-face content population
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeCardAnimations();
  populateCardBackfaces();
});

/**
 * Initialize 3D card animations on mousemove (non-touch devices)
 */
function initializeCardAnimations() {
  const isTouch = "ontouchstart" in window;
  
  if (isTouch) {
    return; // Skip animations on touch devices
  }

  document.querySelectorAll(".card").forEach((card) => {
    const inner = card.querySelector(".card-inner");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
    });

    card.addEventListener("mouseleave", () => {
      inner.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  });
}

/**
 * Populate card back faces with content from front faces
 * Clones title and video from front to back
 */
function populateCardBackfaces() {
  document.querySelectorAll('.card').forEach((card) => {
    const front = card.querySelector('.card-face.card-front');
    const back = card.querySelector('.card-face.card-back');
    
    if (!front || !back) return;

    const title = front.querySelector('h2');
    const video = front.querySelector('video');
    const time = video && video.nextElementSibling && video.nextElementSibling.tagName.toLowerCase() === 'p'
      ? video.nextElementSibling
      : null;

    if (video) {
      const backContent = document.createElement('div');
      
      if (title) {
        const clonedTitle = title.cloneNode(true);
        backContent.appendChild(clonedTitle);
      }
      
      backContent.appendChild(video);
      
      if (time) {
        backContent.appendChild(time);
      }
      
      back.innerHTML = '';
      back.appendChild(backContent);
    }
  });
}
