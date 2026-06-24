/**
 * Grathu Studio - Core Javascript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page loads scrolled

  // 2. Active Navigation link highlighter
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset header
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  // 3. Apps Category Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const appCards = document.querySelectorAll('.app-card-wrapper');

  if (filterButtons.length > 0 && appCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        appCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          // Animate transition
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            if (category === 'all' || cardCategory === category) {
              card.style.display = 'block';
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 50);
            } else {
              card.style.display = 'none';
            }
          }, 300);
        });
      });
    });
  }

  // 4. Contact Form Handler (Mock Submission)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Visual feedback: Sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';
      
      // Simulate API call (1.5s delay)
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Success message
        formStatus.className = 'form-status-msg success';
        formStatus.innerHTML = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        formStatus.style.display = 'block';
        
        // Restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.style.opacity = '1';
          }, 400);
        }, 5000);

      }, 1500);
    });
  }
});
