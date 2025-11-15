// JavaScript for Dhanasekaran R Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    // Use scrollIntoView so the CSS `scroll-margin-top` on sections is respected
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only handle internal anchors
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const targetSection = document.querySelector(href);

            if (targetSection) {
                // Rely on CSS scroll-margin-top for offset (keeps behavior consistent across devices)
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Active navigation link highlighting using IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

<<<<<<< HEAD
    // Convert to array and track current section index for swipe navigation
    const sectionsArray = Array.from(sections);
    let currentSectionIndex = 0;

=======
>>>>>>> 55547799a5bd33045fed77017648c30929388d52
    // Helper to set active classes
    function setActiveLink(id) {
        navItems.forEach(item => {
            item.classList.remove('text-green-400');
            item.classList.add('text-gray-300');
            if (item.getAttribute('href') === `#${id}`) {
                item.classList.remove('text-gray-300');
                item.classList.add('text-green-400');
            }
        });
    }

    // Observe sections to highlight nav links when they appear
    const navObserverOptions = {
        root: null,
        threshold: 0.45 // roughly half the section
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
<<<<<<< HEAD
                // update current index when a section becomes active
                const idx = sectionsArray.indexOf(entry.target);
                if (idx !== -1) currentSectionIndex = idx;
=======
>>>>>>> 55547799a5bd33045fed77017648c30929388d52
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create mailto link
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:dhanasekaran080102@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Thank you! Your email client should open now.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .education-item, .certificate-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('#home h2');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }

<<<<<<< HEAD
    // Parallax effect for hero inner content (do not move the section itself)
    (function setupParallax() {
        const heroInner = document.querySelector('#home .hero-inner');
        if (!heroInner) return;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            // Only apply a subtle parallax while the hero is visible
            const heroRect = heroInner.getBoundingClientRect();
            if (heroRect.bottom > 0) {
                // Use a smaller multiplier so visual shift is subtle
                const translateY = Math.min(scrolled * 0.15, window.innerHeight * 0.35);
                heroInner.style.transform = `translateY(${translateY}px)`;
            } else {
                heroInner.style.transform = '';
            }
        }, { passive: true });
    })();
=======
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
>>>>>>> 55547799a5bd33045fed77017648c30929388d52

    // Skill badges hover effect
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add glitch effect to name on hover
    const nameElement = document.querySelector('#home h1 span');
    if (nameElement) {
        nameElement.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
            this.setAttribute('data-text', this.textContent);
        });
        
        nameElement.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    }

    // Terminal-style typing effect for skills
    function createTerminalEffect() {
        const terminalElements = document.querySelectorAll('.skill-badge');
        terminalElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.5s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    }

    // Trigger terminal effect when skills section is visible
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    createTerminalEffect();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }

    // Add cyber grid background animation
    function createCyberGrid() {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'fixed inset-0 pointer-events-none opacity-5';
        gridContainer.style.backgroundImage = `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
        `;
        gridContainer.style.backgroundSize = '20px 20px';
        gridContainer.style.animation = 'cyberGridMove 20s linear infinite';
        
        document.body.appendChild(gridContainer);
    }

    // Add cyber grid animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cyberGridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(20px, 20px); }
        }
    `;
    document.head.appendChild(style);

    // Initialize cyber grid
    createCyberGrid();

    // Add particle effect
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'fixed inset-0 pointer-events-none overflow-hidden';
        particleContainer.style.zIndex = '1';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-green-400 rounded-full opacity-30';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `particleFloat ${5 + Math.random() * 10}s linear infinite`;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }

    // Add particle animation keyframes
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Initialize particles
    createParticles();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded class styles
        const loadedStyle = document.createElement('style');
        loadedStyle.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #111827;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            body:not(.loaded)::after {
                content: 'Loading...';
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #22c55e;
                font-size: 1.5rem;
                font-weight: bold;
                z-index: 10000;
                animation: pulse 1s infinite;
            }
        `;
        document.head.appendChild(loadedStyle);
    });

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 w-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 z-50 transition-all duration-300';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    createScrollProgress();

<<<<<<< HEAD
    // --- Touch / swipe navigation (vertical sections) ---
    let touchStartY = 0;
    let touchEndY = 0;
    const SWIPE_THRESHOLD = 50; // pixels

    // Ensure initial current section index (useful on page load)
    function updateCurrentFromViewport() {
        for (let i = 0; i < sectionsArray.length; i++) {
            const rect = sectionsArray[i].getBoundingClientRect();
            // if section is roughly centered in viewport, select it
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.25) {
                currentSectionIndex = i;
                break;
            }
        }
    }

    updateCurrentFromViewport();

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        const delta = touchStartY - touchEndY;
        if (Math.abs(delta) < SWIPE_THRESHOLD) return; // not a swipe

        if (delta > 0) {
            // swipe up -> go to next section
            const next = Math.min(currentSectionIndex + 1, sectionsArray.length - 1);
            if (next !== currentSectionIndex) {
                sectionsArray[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
                currentSectionIndex = next;
            }
        } else {
            // swipe down -> go to previous section
            const prev = Math.max(currentSectionIndex - 1, 0);
            if (prev !== currentSectionIndex) {
                sectionsArray[prev].scrollIntoView({ behavior: 'smooth', block: 'start' });
                currentSectionIndex = prev;
            }
        }
    }, false);

=======
>>>>>>> 55547799a5bd33045fed77017648c30929388d52
    // Add theme toggle (optional for future enhancement)
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'fixed bottom-4 right-4 w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-green-400 hover:border-green-400 transition-all duration-300 z-40';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Toggle Theme';
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
        
        document.body.appendChild(themeToggle);
    }

    // Uncomment to enable theme toggle
    // createThemeToggle();

    // Note: GitHub Projects API integration removed because the page uses static project cards

    console.log('🚀 Portfolio website loaded successfully!');
    console.log('👨‍💻 Developed By Dhanasekaran R');
    console.log('🔒 MERN STACK DEVELOPER');
});
