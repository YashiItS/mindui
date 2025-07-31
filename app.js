

document.addEventListener('DOMContentLoaded', function() {
    const howWorksBtn = document.getElementById('howThisWorksBtn');
    if (howWorksBtn) {
        howWorksBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentPage = window.location.pathname;
            const isOnIndexPage = currentPage.includes('index.html') || currentPage === "/" || currentPage === "/index" || currentPage.endsWith("/index");

            if (isOnIndexPage) {
                // Already on index.html, so just scroll!
                const target = document.querySelector('.features-container');
                if (target) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPos = target.offsetTop - headerHeight;
                    window.scrollTo({top: targetPos, behavior: 'smooth'});
                }
            } else {
                // Not on index.html, go there with hash to scroll
                window.location.href = 'index.html#features-container';
            }
        });
    }

    // --- hash based scroll fix ---
    if (window.location.hash === '#features-container') {
        setTimeout(function() {
            const target = document.querySelector('.features-container');
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPos = target.offsetTop - headerHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        }, 200);
    }
});
// Theme Management
class ThemeManager {
    constructor() {
        // Default to dark theme as specified
        this.currentTheme = localStorage.getItem('undermind-theme') || 'dark';
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-toggle__icon');

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('undermind-theme', this.currentTheme);
    }

    applyTheme(theme) {
        document.body.setAttribute('data-color-scheme', theme);
        if (this.themeIcon) {
            // Sun icon for light mode toggle, moon icon for dark mode toggle
            this.themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
}




// Modal Management
class ModalManager {
    constructor() {
        this.modal = document.getElementById('authModal');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalClose = document.getElementById('modalClose');
        this.modalTitle = document.getElementById('modalTitle');

        // Forms
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.forgotPasswordForm = document.getElementById('forgotPasswordForm');

        // Toggle elements
        this.authToggleBtn = document.getElementById('authToggleBtn');
        this.authToggleText = this.authToggleBtn?.querySelector('.auth-toggle__text');
        this.forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
        this.backToAuthBtn = document.getElementById('backToAuthBtn');
        this.authToggle = document.querySelector('.auth-toggle');
        this.authBack = document.querySelector('.auth-back');

        this.currentMode = 'login'; // 'login', 'register', 'forgot'

        this.init();
    }

    init() {
        if (!this.modal) return;

        // Close modal events
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', () => this.closeModal());
        }

        // Form toggle events
        if (this.authToggleBtn) {
            this.authToggleBtn.addEventListener('click', () => this.toggleAuthMode());
        }
        if (this.forgotPasswordBtn) {
            this.forgotPasswordBtn.addEventListener('click', () => this.showForgotPassword());
        }
        if (this.backToAuthBtn) {
            this.backToAuthBtn.addEventListener('click', () => this.showLogin());
        }

        // Form submissions
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        if (this.forgotPasswordForm) {
            this.forgotPasswordForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }

    openModal(mode = 'login') {
        if (!this.modal) return;

        this.currentMode = mode;
        this.updateModalContent();
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Focus first input
        setTimeout(() => {
            const firstInput = this.modal.querySelector('input:not([type="checkbox"])');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    closeModal() {
        if (!this.modal) return;

        this.modal.classList.add('hidden');
        document.body.style.overflow = '';
        this.clearForms();
    }

    toggleAuthMode() {
        this.currentMode = this.currentMode === 'login' ? 'register' : 'login';
        this.updateModalContent();
    }

    showForgotPassword() {
        this.currentMode = 'forgot';
        this.updateModalContent();
    }

    showLogin() {
        this.currentMode = 'login';
        this.updateModalContent();
    }

    updateModalContent() {
        if (!this.modal) return;

        // Hide all forms
        if (this.loginForm) this.loginForm.classList.add('hidden');
        if (this.registerForm) this.registerForm.classList.add('hidden');
        if (this.forgotPasswordForm) this.forgotPasswordForm.classList.add('hidden');
        if (this.authToggle) this.authToggle.classList.remove('hidden');
        if (this.authBack) this.authBack.classList.add('hidden');

        switch (this.currentMode) {
            case 'login':
                if (this.modalTitle) this.modalTitle.textContent = 'Welcome Back';
                if (this.loginForm) this.loginForm.classList.remove('hidden');
                if (this.authToggleText) this.authToggleText.textContent = 'Sign up';
                if (this.authToggleBtn && this.authToggleBtn.firstChild) {
                    this.authToggleBtn.firstChild.textContent = "Don't have an account? ";
                }
                break;

            case 'register':
                if (this.modalTitle) this.modalTitle.textContent = 'Create Account';
                if (this.registerForm) this.registerForm.classList.remove('hidden');
                if (this.authToggleText) this.authToggleText.textContent = 'Sign in';
                if (this.authToggleBtn && this.authToggleBtn.firstChild) {
                    this.authToggleBtn.firstChild.textContent = "Already have an account? ";
                }
                break;

            case 'forgot':
                if (this.modalTitle) this.modalTitle.textContent = 'Reset Password';
                if (this.forgotPasswordForm) this.forgotPasswordForm.classList.remove('hidden');
                if (this.authToggle) this.authToggle.classList.add('hidden');
                if (this.authBack) this.authBack.classList.remove('hidden');
                break;
        }
    }

    clearForms() {
        if (this.loginForm) this.loginForm.reset();
        if (this.registerForm) this.registerForm.reset();
        if (this.forgotPasswordForm) this.forgotPasswordForm.reset();
        this.clearErrors();
    }

    clearErrors() {
        if (!this.modal) return;

        const errorElements = this.modal.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());

        const errorInputs = this.modal.querySelectorAll('.form-control.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    }

    showError(input, message) {
        this.clearErrors();

        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--space-4)';

        input.parentNode.appendChild(errorDiv);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail')?.value.trim();
        const password = document.getElementById('loginPassword')?.value;

        if (!email) {
            this.showError(document.getElementById('loginEmail'), 'Email is required');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError(document.getElementById('loginEmail'), 'Please enter a valid email');
            return;
        }

        if (!password) {
            this.showError(document.getElementById('loginPassword'), 'Password is required');
            return;
        }

        // Simulate login success
        this.showSuccess('Login successful! Welcome back.');
        setTimeout(() => this.closeModal(), 1500);
    }

    handleRegister(e) {
        e.preventDefault();

        const name = document.getElementById('registerName')?.value.trim();
        const email = document.getElementById('registerEmail')?.value.trim();
        const password = document.getElementById('registerPassword')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;

        if (!name) {
            this.showError(document.getElementById('registerName'), 'Full name is required');
            return;
        }

        if (!email) {
            this.showError(document.getElementById('registerEmail'), 'Email is required');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError(document.getElementById('registerEmail'), 'Please enter a valid email');
            return;
        }

        if (!password) {
            this.showError(document.getElementById('registerPassword'), 'Password is required');
            return;
        }

        if (password.length < 6) {
            this.showError(document.getElementById('registerPassword'), 'Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            this.showError(document.getElementById('confirmPassword'), 'Passwords do not match');
            return;
        }

        // Simulate registration success
        this.showSuccess('Account created successfully! Please check your email.');
        setTimeout(() => this.closeModal(), 1500);
    }

    handleForgotPassword(e) {
        e.preventDefault();

        const email = document.getElementById('forgotEmail')?.value.trim();

        if (!email) {
            this.showError(document.getElementById('forgotEmail'), 'Email is required');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError(document.getElementById('forgotEmail'), 'Please enter a valid email');
            return;
        }

        // Simulate password reset success
        this.showSuccess('Password reset link sent to your email!');
        setTimeout(() => {
            this.showLogin();
        }, 1500);
    }

    showSuccess(message) {
        this.clearErrors();

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.color = 'var(--color-success)';
        successDiv.style.fontSize = 'var(--font-size-sm)';
        successDiv.style.textAlign = 'center';
        successDiv.style.padding = 'var(--space-8)';
        successDiv.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
        successDiv.style.borderRadius = 'var(--radius-base)';
        successDiv.style.marginBottom = 'var(--space-16)';

        const modalBody = this.modal?.querySelector('.modal__body');
        if (modalBody) {
            modalBody.insertBefore(successDiv, modalBody.firstChild);
        }
    }
}

// Navigation and Page Management
class PageManager {
    constructor() {
        this.mainContent = document.getElementById('mainContent');
        this.examplesSection = document.getElementById('examplesSection');
        this.exploreExamplesBtn = document.getElementById('exploreExamplesBtn');
        this.backToMainBtn = document.getElementById('backToMainBtn');
        this.searchBar = document.getElementById('searchBar');
        this.log = document.getElementById('log');

        this.subscribeCard = document.getElementById('subscribeCard');
        this.infoBtn = document.getElementById('infoBtn');
        this.logoLink = document.querySelector('.header__logo h2');

        this.init();
    }

    init() {
        // Main navigation events
        if (this.exploreExamplesBtn) {
            this.exploreExamplesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showExamples();
            });
        }

        if (this.backToMainBtn) {
            this.backToMainBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showMain();
            });
        }

        if (this.searchBar) {
            this.searchBar.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerLogin();
            });
        }
        if (this.log) {
            this.log.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerLogin();
            });
        }

        if (this.subscribeCard) {
            this.subscribeCard.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerLogin();
            });
        }

        if (this.infoBtn) {
            this.infoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openUndermindWebsite();
            });
        }

        if (this.logoLink) {
            this.logoLink.style.cursor = 'pointer';
            this.logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showMain();
            });
        }

        // Features link
        const featuresLink = document.querySelector('a[href="#features"]');
        if (featuresLink) {
            featuresLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToFeatures();
            });
        }

        // Add hover effects
        this.addInteractiveEffects();
    }

    showExamples() {
        if (this.mainContent) this.mainContent.classList.add('hidden');
        if (this.examplesSection) this.examplesSection.classList.remove('hidden');
        this.scrollToTop();
    }

    showMain() {
        if (this.examplesSection) this.examplesSection.classList.add('hidden');
        if (this.mainContent) this.mainContent.classList.remove('hidden');
        this.scrollToTop();
    }

    scrollToFeatures() {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    triggerLogin() {
        if (window.modalManager) {
            window.modalManager.openModal('login');
        }
    }

    openUndermindWebsite() {
        window.open('https://app.undermind.ai/', '_blank');
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    addInteractiveEffects() {
        // Add loading states to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                // Don't add loading state to form submit buttons
                if (this.type === 'submit') return;

                if (!this.classList.contains('btn--loading')) {
                    const originalText = this.textContent;
                    this.classList.add('btn--loading');
                    this.textContent = 'Loading...';

                    setTimeout(() => {
                        this.classList.remove('btn--loading');
                        this.textContent = originalText;
                    }, 800);
                }
            });
        });

        // Add hover effects to cards
        const cards = document.querySelectorAll('.feature-card, .testimonial, .example-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });
        });
    }
}

// Animation utilities
class AnimationUtils {
    static fadeIn(element, duration = 300) {
        if (!element) return;

        element.style.opacity = '0';
        element.style.display = 'block';

        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;

            element.style.opacity = Math.min(progress / duration, 1);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }

    static fadeOut(element, duration = 300) {
        if (!element) return;

        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;

            element.style.opacity = Math.max(1 - (progress / duration), 0);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }

        requestAnimationFrame(animate);
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing Undermind clone...');

    // Initialize all managers
    try {
        window.themeManager = new ThemeManager();
        console.log('Theme manager initialized');

        window.modalManager = new ModalManager();
        console.log('Modal manager initialized');

        window.modalManager.openModal('login'); // 👈 Auto-show modal on page load



        window.pageManager = new PageManager();
        console.log('Page manager initialized');

        // Add loaded class for animations
        document.body.classList.add('loaded');

        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animations
        const animatedElements = document.querySelectorAll('.feature-card, .testimonial, .example-card');
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        console.log('Undermind clone initialized successfully!');

    } catch (error) {
        console.error('Error initializing application:', error);
    }
});document.addEventListener('DOMContentLoaded', function() {
    // Pricing button click handler for different file
    const pricingButtons = document.querySelectorAll('.btn-pricing');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if we're already on index.html
            const currentPage = window.location.pathname;
            const isOnIndexPage = currentPage.includes('index.html') || currentPage === '/';
            
            if (isOnIndexPage) {
                // We're already on index.html, just scroll to pricing
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                    pricingSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                // Navigate to index.html with hash for pricing section
                window.location.href = 'index.html#pricing';
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    const popup = urlParams.get('popup');
    
    // Only show popup if NOT coming from index.html example
    if (popup === 'login' && source !== 'index-example') {
        setTimeout(() => {
            document.getElementById('loginBtn').click();
        }, 500);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Examples Modal Functionality
    const exploreBtn = document.getElementById('exploreExamplesBtn');
    const examplesModal = document.getElementById('examplesModal');
    const examplesOverlay = document.getElementById('examplesOverlay');
    const examplesClose = document.getElementById('examplesModalClose');
    
    // Open modal
    function openExamplesModal() {
        examplesModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Close modal
    function closeExamplesModal() {
        examplesModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Event listeners
    if (exploreBtn) {
        exploreBtn.addEventListener('click', openExamplesModal);
    }
    
    if (examplesClose) {
        examplesClose.addEventListener('click', closeExamplesModal);
    }
    
    if (examplesOverlay) {
        examplesOverlay.addEventListener('click', closeExamplesModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !examplesModal.classList.contains('hidden')) {
            closeExamplesModal();
        }
    });
    
    // Animate example items on scroll
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
    
    // Observe example items when modal opens
    function observeExampleItems() {
        const exampleItems = document.querySelectorAll('.example-item');
        exampleItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(item);
        });
    }
    
    // Initialize animations when modal opens
    exploreBtn?.addEventListener('click', () => {
        setTimeout(observeExampleItems, 300);
    });
});

