// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animate counter numbers on scroll
const animateCounters = () => {
  const statItems = document.querySelectorAll('.stat-item strong');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const text = entry.target.textContent;
        const number = parseInt(text);
        
        if (!isNaN(number)) {
          entry.target.classList.add('animated');
          let current = 0;
          const increment = number / 30;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= number) {
              entry.target.textContent = text;
              clearInterval(counter);
            } else {
              entry.target.textContent = Math.floor(current);
            }
          }, 30);
        }
      }
    });
  }, { threshold: 0.5 });
  
  statItems.forEach(item => observer.observe(item));
};

// Add hover glow effect to cards
const addGlowEffect = () => {
  const cards = document.querySelectorAll('.project-card, .glass-panel');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.boxShadow = `
        0 0 30px rgba(156, 77, 255, 0.3),
        ${x - rect.width/2}px ${y - rect.height/2}px 40px rgba(255, 20, 147, 0.2)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });
};

// Fade in elements on page load
const fadeInElements = () => {
  const elements = document.querySelectorAll('.hero, .glass-panel, .project-card');
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
};

// Parallax background effect
const parallaxEffect = () => {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.body.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
  });
};

// Click ripple effect on buttons
const addRippleEffect = () => {
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      const rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left - 10) + 'px';
      ripple.style.top = (e.clientY - rect.top - 10) + 'px';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
};

// Add ripple animation keyframes
const addRippleStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  fadeInElements();
  addGlowEffect();
  addRippleEffect();
  addRippleStyles();
  animateCounters();
  parallaxEffect();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    window.scrollBy({ top: 100, behavior: 'smooth' });
  } else if (e.key === 'ArrowUp') {
    window.scrollBy({ top: -100, behavior: 'smooth' });
  }
});

// Console easter egg
console.log('%ckhazmir pogi\'s Portfolio', 'color: #0066cc; font-size: 16px; font-weight: bold;');
console.log('%cSimple & Clean Design', 'color: #666; font-size: 12px;');
