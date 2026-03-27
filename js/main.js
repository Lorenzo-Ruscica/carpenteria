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
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Costruzione del mailto link nativo per GitHub Pages (nessun server richiesto)
            const subject = encodeURIComponent(`Nuova richiesta dal Sito Web da: ${name}`);
            const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nServizio di Interesse: ${service}\n\nMessaggio:\n${message}`);
            const mailtoLink = `mailto:lorenzo.ruscica2008@gmail.com?subject=${subject}&body=${body}`;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Apertura client Email...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            // Attiva il client di posta dell'utente
            window.location.href = mailtoLink;

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                
                formSuccess.innerText = "Il client di posta si è aperto! Ricordati di premere 'Invia' dalla tua app per completare la richiesta.";
                formSuccess.style.color = '#4CAF50';
                formSuccess.style.borderColor = 'rgba(76, 175, 80, 0.2)';
                formSuccess.classList.remove('hidden');
                
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 8000);
            }, 1500);
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
