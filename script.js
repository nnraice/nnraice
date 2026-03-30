/* ============================================
   RAICE — Ocean Theme Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initCardInteractions();
    initParallaxEffect();
});

/* ============================================
   FLOATING PARTICLES
   ============================================ */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        const brightness = Math.random() * 0.5 + 0.2;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -10px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${brightness};
        `;

        container.appendChild(particle);
    }
}

/* ============================================
   CARD INTERACTIONS
   ============================================ */
function initCardInteractions() {
    const cards = document.querySelectorAll('.link-card');

    cards.forEach(card => {
        // Tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;

            card.style.transform = `
                perspective(800px)
                translateY(-3px)
                scale(1.02)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Ripple effect on click
        card.addEventListener('click', (e) => {
            const ripple = card.querySelector('.link-ripple');
            if (!ripple) return;

            const rect = card.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
        });
    });
}

/* ============================================
   PARALLAX / MOUSE TRACKING
   ============================================ */
function initParallaxEffect() {
    const lightRays = document.querySelector('.light-rays');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        if (lightRays) {
            lightRays.style.transform = `translate(${x * 10}px, ${y * 5}px)`;
        }

        // Subtle parallax on logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.style.transform = `translate(${x * 3}px, ${y * 3}px)`;
        }
    });
}

/* ============================================
   INTERSECTION OBSERVER FOR SCROLL REVEAL
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when DOM is ready
document.querySelectorAll('.link-card').forEach(el => {
    observer.observe(el);
});
