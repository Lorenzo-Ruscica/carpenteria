document.addEventListener('DOMContentLoaded', () => {
    /* Mobile Menu Toggle */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    /* Navbar Scroll Effect */
    const navbar = document.querySelector('.navbar');
    
    if (navbar && window.scrollY > 20 && !navbar.classList.contains('solid-bg')) {
        navbar.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (navbar && !navbar.classList.contains('solid-bg')) {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    /* Scroll Animations via IntersectionObserver */
    // Clean, professional reveal animations
    const animationElements = document.querySelectorAll('.fade-in-up, .slide-up, .slide-right, .slide-left, .fade-in, .slide-up-group');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        if (el.classList.contains('slide-up-group')) {
            let delayCount = 1;
            const children = el.querySelectorAll('.fade-in, .slide-up, .slide-right, .slide-left');
            children.forEach(child => {
                child.style.setProperty('--delay', `${delayCount * 0.1}s`);
                delayCount++;
                scrollObserver.observe(child);
            });
            scrollObserver.observe(el);
        } else {
            scrollObserver.observe(el);
        }
    });

    /* Contact Form Submission Mock */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Invio in corso...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                contactForm.reset();
                formSuccess.classList.remove('hidden');
                
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }, 1000);
        });
    }

    /* Page Navigation Smooth Transitions */
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            // If internal html link
            if (targetHref && targetHref.endsWith('.html') && this.target !== '_blank') {
                e.preventDefault();
                document.body.classList.add('page-transitioning');
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 400);
            }
        });
    });

    // Handle BFCache (Back/Forward browser buttons)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('page-transitioning');
        }
    });

});
