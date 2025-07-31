document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#features-container') {
        setTimeout(function() {
            const target = document.querySelector('.features-container');
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPos = target.offsetTop - headerHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        }, 200); // slight delay to ensure all is rendered
    }
});

// Updated generic button logger - exclude Learn More button
document.querySelectorAll('.btn:not(.btn-login):not(.btn-pricing):not(.btn-secondary)').forEach(btn => {
    btn.addEventListener('click', function () {
        console.log("Button clicked:", this.textContent);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Handle "Learn More" button scroll to features container
    const learnMoreBtn = document.querySelector('.btn-secondary.btn-hero');
    const featuresContainer = document.querySelector('.features-container');
    
    if (learnMoreBtn && featuresContainer) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            
            // Smooth scroll to features container
            featuresContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  if (searchInput) {
    // Redirect functionality
    searchInput.addEventListener('click', function () {
      window.location.href = 'index1.html';
    });

    // Optional: Keep placeholder animation (remove if not needed)
    const phrases = [
      "Describe what you're looking for…",
      "What is the latest on quantum computing?",
      "Find papers about ML in healthcare"
    ];

    let phraseIdx = 0, charIdx = 0, deleting = false;

    function typeLoop() {
      const text = phrases[phraseIdx];
      searchInput.placeholder = text.substring(0, charIdx);

      if (!deleting) {
        charIdx++;
        if (charIdx === text.length + 1) {
          deleting = true;
          setTimeout(typeLoop, 800);
          return;
        }
      } else {
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(typeLoop, 400);
          return;
        }
      }

      setTimeout(typeLoop, deleting ? 40 : 80);
    }

    setTimeout(typeLoop, 500);
  }

  // Res
  // Select both buttons that should scroll to pricing
  const pricingButtons = document.querySelectorAll('.btn-pricing');
  const pricingSection = document.getElementById('pricing');

  // Add click event listeners to all pricing buttons
  pricingButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default button behavior

      // Smooth scroll to pricing section
      pricingSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Alternative method using offset for more control
  function scrollToPricing() {
    const headerHeight = document.querySelector('.header').offsetHeight || 80;
    const targetPosition = pricingSection.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  // You can also use this alternative function if you need more control over the scroll position
  // Just replace scrollIntoView with scrollToPricing() in the event listener above
  const searchContainer = document.querySelector('.search-container');
  if (!searchContainer) return;

  

  /* -------------------------------------------------
     1.  Animated placeholder typing & erasing
  ---------------------------------------------------*/
  const phrases = [
    "Describe what you're looking for…",
    "What is the latest on quantum computing?",
    "Find papers about ML in healthcare",
    "Explore CRISPR gene-editing advances",
    "Research climate-change mitigation"
  ];
  let phraseIdx = 0, charIdx = 0,
    deleting = false, waiting = false;

  function typeLoop() {
    if (waiting) return;
    const text = phrases[phraseIdx];

    /* update placeholder */
    searchInput.placeholder = text.substring(0, charIdx);

    if (!deleting) {
      charIdx++;
      if (charIdx === text.length + 1) {
        deleting = true;
        waiting = true;
        setTimeout(() => { waiting = false; }, 800);  // shorter pause before erasing
      }
    } else {
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        waiting = true;
        setTimeout(() => { waiting = false; }, 400);
      }
    }

    /* faster speeds */
    const speed = deleting ? 40 : 80;
    setTimeout(typeLoop, speed);
  }
  // Testimonial Carousel
  initTestimonialCarousel();

  setTimeout(typeLoop, 500);  // start sooner

  /* pause typing while user is focused */
  searchInput.addEventListener('focus', () => waiting = true);
  searchInput.addEventListener('blur', () => waiting = false);

  /* -------------------------------------------------
     2.  Focus / blur elevation effect
  ---------------------------------------------------*/
  searchInput.addEventListener('focus', () => {
    searchContainer.style.transform = 'translateY(-2px)';
    searchContainer.style.boxShadow = '0 10px 25px rgba(30,64,175,.2)';
  });
  searchInput.addEventListener('blur', () => {
    if (!searchInput.value.trim()) {
      searchContainer.style.transform = 'translateY(0)';
      searchContainer.style.boxShadow = '0 4px 6px rgba(0,0,0,.08)';
    }
  });

  /* -------------------------------------------------
     3.  Search action
  ---------------------------------------------------*/
  function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      /* shake for empty */
      searchContainer.style.animation = 'shake .45s';
      setTimeout(() => (searchContainer.style.animation = ''), 450);
      return;
    }

    /* loading state */
    searchBtn.disabled = true;
    const original = searchBtn.innerHTML;
    searchBtn.innerHTML =
      '<span class="spinner"></span>Searching…';

    /* simulate async search */
    setTimeout(() => {
      searchBtn.disabled = false;
      searchBtn.innerHTML = original;
      showResultsModal(query);
    }, 1800);
  }
  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    performSearch();
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') performSearch();
  });

  /* -------------------------------------------------
     4.  Results modal
  ---------------------------------------------------*/
  function showResultsModal(query) {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <header>
          <h3>Results for: “${query}”</h3>
          <button class="close">&times;</button>
        </header>
        <section class="body">
          <article><h4>Advanced Quantum Computing</h4>
            <p>Recent breakthroughs show promising …</p>
            <span>Nature Physics • 2024</span></article>
          <article><h4>ML in Biomedical Research</h4>
            <p>A comprehensive review of …</p>
            <span>Cell • 2024</span></article>
          <article><h4>CRISPR-Cas9 Advances</h4>
            <p>New precision editing techniques …</p>
            <span>Science • 2024</span></article>
        </section>
        <footer><button class="btn-primary">View all</button></footer>
      </div>`;
    document.body.appendChild(modal);

    /* fade-in animation */
    requestAnimationFrame(() => modal.classList.add('open'));

    /* close logic */
    const close = () => {
      modal.classList.remove('open');
      modal.addEventListener('transitionend', () =>
        modal.remove(), { once: true });
    };
    modal.querySelector('.close').onclick = close;
    modal.onclick = e => (e.target === modal) && close();
    document.addEventListener('keydown', e =>
      (e.key === 'Escape') && close(), { once: true });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      }
    });
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });



  // Header scroll effect
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.background = 'var(--bg-white)';
        header.style.backdropFilter = 'none';
      }
    }
  });

  const toggle = document.getElementById('annual-toggle');
  const body = document.body;

  if (toggle) {
    toggle.addEventListener('change', function () {
      if (this.checked) {
        body.classList.add('annual-pricing');
      } else {
        body.classList.remove('annual-pricing');
      }
    });
  }

  // Generic button logger
  document.addEventListener('DOMContentLoaded', function() {
    // Handle "Learn More" button scroll to features container
    const learnMoreBtn = document.querySelector('.btn-secondary.btn-hero');
    const featuresContainer = document.querySelector('.features-container');
    
    if (learnMoreBtn && featuresContainer) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            e.stopPropagation(); // Stop event bubbling
            
            console.log('Learn More clicked - scrolling to features'); // Debug log
            
            // Smooth scroll to features container with offset
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = featuresContainer.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    } else {
        console.log('Learn More button or features container not found');
        console.log('Button found:', !!learnMoreBtn);
        console.log('Container found:', !!featuresContainer);
    }
});


  // Logo click scroll-to-top
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Tag input population on click/hover
  const searchInput = document.querySelector('.search-container input');
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseover', () => {
      if (searchInput) searchInput.value = tag.textContent.trim();
    });
    tag.addEventListener('mouseout', () => {
      if (searchInput) searchInput.value = '';
    });
    tag.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = tag.textContent.trim();
        searchInput.focus();
      }
    });
  });

  // SVG feature-item enter animations
  document.querySelectorAll('.feature-item').forEach((item, idx) => {
    item.style.opacity = 0;
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s cubic-bezier(.51,.22,.09,1)';
      item.style.opacity = 1;
    }, 400 + idx * 120);
  });

  // scroll logo container only if buttons exist
  const container = document.getElementById('logoContainer');
  const btnLeft = document.getElementById('scrollLeft');
  const btnRight = document.getElementById('scrollRight');
  if (container && btnLeft && btnRight) {
    btnLeft.addEventListener('click', () => {
      container.scrollBy({ left: -150, behavior: 'smooth' });
    });
    btnRight.addEventListener('click', () => {
      container.scrollBy({ left: 150, behavior: 'smooth' });
    });
  }

  // Animate SVG paths with .draw
  document.querySelectorAll('path.draw').forEach(function (path) {
    path.classList.add('draw');
  });

  // SVG circles interaction
  document.querySelectorAll('circle').forEach(circle => {
    circle.addEventListener('click', function () {
      document.querySelectorAll('circle').forEach(c => {
        c.classList.remove('active');
        c.classList.add('inactive');
      });
      this.classList.remove('inactive');
      this.classList.add('active');
      const circleId = this.id?.replace('c', '');
      if (circleId) {
        document.querySelectorAll('path').forEach(function (path) {
          if (path.id && path.id.includes(circleId)) {
            path.classList.add('draw');
          } else if (path.classList.contains('draw')) {
            path.classList.remove('draw');
          }
        });
      }
    });
  });

  // Deep box fade-in animation
  document.querySelectorAll('.deep-box').forEach((box, i) => {
    box.style.opacity = 0;
    setTimeout(() => {
      box.style.transition = 'opacity 0.7s cubic-bezier(.53,.32,.16,1)';
      box.style.opacity = 1;
    }, 220 + i * 90);
  });
});
document.querySelector('.mobile-toggle').addEventListener('click', function () {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('show');
  }
});
// Testimonial Carousel
initTestimonialCarousel();// Testimonial Carousel
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.dot');

  let currentSlide = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) {
        dots[i].classList.remove('active');
      }
    });

    // Show current slide
    if (slides[index]) {
      slides[index].classList.add('active');
      if (dots[index]) {
        dots[index].classList.add('active');
      }
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-advance slides
  setInterval(nextSlide, 5000);

  // Initialize first slide
  showSlide(0);
}// JavaScript for smooth scrolling to pricing section
document.addEventListener('DOMContentLoaded', () => {
  // SEARCH BAR REDIRECT FUNCTIONALITY
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    // Primary redirect functionality
    searchInput.addEventListener('click', function () {
      window.location.href = 'index1.html';
    });
    
    // Also redirect on focus for better UX
    searchInput.addEventListener('focus', function () {
      window.location.href = 'index1.html';
    });
    
    // Optional: Keep only the placeholder animation (simplified)
    const phrases = [
      "Describe what you're looking for…",
      "What is the latest on quantum computing?",
      "Find papers about ML in healthcare"
    ];
    
    let phraseIdx = 0, charIdx = 0, deleting = false;
    
    function typeLoop() {
      const text = phrases[phraseIdx];
      searchInput.placeholder = text.substring(0, charIdx);
      
      if (!deleting) {
        charIdx++;
        if (charIdx === text.length + 1) {
          deleting = true;
          setTimeout(typeLoop, 800);
          return;
        }
      } else {
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(typeLoop, 400);
          return;
        }
      }
      
      setTimeout(typeLoop, deleting ? 40 : 80);
    }
    
    setTimeout(typeLoop, 500);
  }

  // PRICING BUTTONS SCROLL FUNCTIONALITY
  const pricingButtons = document.querySelectorAll('.btn-pricing');
  const pricingSection = document.getElementById('pricing');

  pricingButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      pricingSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Initialize testimonial carousel
  initTestimonialCarousel();
});

document.addEventListener('DOMContentLoaded', function() {
    // Handle hash-based scrolling when page loads
    function scrollToPricingIfNeeded() {
        const hash = window.location.hash;
        
        if (hash === '#pricing') {
            setTimeout(() => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = pricingSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100); // Small delay to ensure page is fully loaded
        }
    }
    
    // Scroll on page load
    scrollToPricingIfNeeded();
    
    // Also handle if hash changes
    window.addEventListener('hashchange', scrollToPricingIfNeeded);
});
document.querySelector('.ghost-btn').addEventListener('click', function() {
    window.location.href = 'index1.html?source=index-example';
});
