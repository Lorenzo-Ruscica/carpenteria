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
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Invio in corso...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Invia silensiosamente via Vercel-friendly API (FormSubmit)
            fetch("https://formsubmit.co/ajax/bruinofilifer@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Nome: name,
                    Email: email,
                    ServizioRichiesto: service,
                    Messaggio: message,
                    _subject: "Nuova richiesta dal Sito Web - " + name
                })
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                
                if(data.success === "true" || data.success === true) {
                    formSuccess.innerText = "Messaggio inviato con successo! Ti risponderemo al più presto.";
                    formSuccess.style.color = '#4CAF50';
                    formSuccess.style.borderColor = 'rgba(76, 175, 80, 0.2)';
                    contactForm.reset();
                } else {
                    formSuccess.innerText = "Devi attivare il form! Controlla la mail bruinofilifer@gmail.com per confermare.";
                    formSuccess.style.color = '#ff5500';
                    formSuccess.style.borderColor = 'rgba(255, 85, 0, 0.2)';
                }
                
                formSuccess.classList.remove('hidden');
                setTimeout(() => formSuccess.classList.add('hidden'), 10000);
            })
            .catch(error => {
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                formSuccess.innerText = "Errore di connessione. Riprova più tardi.";
                formSuccess.style.color = '#ff5500';
                formSuccess.classList.remove('hidden');
            });
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
