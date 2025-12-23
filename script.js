// Sections
const landing = document.getElementById('landing');
const proposal = document.getElementById('proposal');
const greeting = document.getElementById('greeting');
const continueBtn = document.getElementById('continueBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heartsContainer = document.querySelector('.hearts');

// Continue button to proposal
continueBtn.addEventListener('click', () => {
  landing.classList.add('hidden');
  proposal.classList.remove('hidden');
});

// Proposal buttons
yesBtn.addEventListener('click', () => {
  proposal.classList.add('hidden');
  greeting.classList.remove('hidden');
  startHeartsAnimation();
  gsap.from("#greeting h1", {duration: 1, y: -50, opacity: 0, ease: "bounce"});
});

noBtn.addEventListener('click', () => {
  proposal.innerHTML = "<h2>That's okay! Merry Christmas! 🎄</h2>";
});

// Hearts animation
function startHeartsAnimation() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.width = heart.style.height = 20 + Math.random() * 30 + 'px';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 300);
}
