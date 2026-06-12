/**
 * AfriTalent - JavaScript Principal
 * Fonctionnalités implémentées :
 * 1. Dark Mode avec localStorage
 * 2. Navbar dynamique au scroll
 * 3. Bouton retour en haut
 * 4. Compteurs animés (IntersectionObserver)
 * 5. Animations fade-in au scroll
 * 6. Filtrage dynamique des freelances
 * 7. Validation de formulaire de contact
 * 8. Copyright dynamique
 */

// ============================================
// 1. DARK MODE avec localStorage
// ============================================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Vérifier la préférence sauvegardée
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateDarkModeIcon(savedTheme);
} else {
    // Vérifier la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    updateDarkModeIcon(prefersDark ? 'dark' : 'light');
}

function updateDarkModeIcon(theme) {
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        }
    }
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);
    });
}

// ============================================
// 2. NAVBAR DYNAMIQUE AU SCROLL
// ============================================
const navbar = document.getElementById('mainNavbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// 3. BOUTON RETOUR EN HAUT
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// ============================================
// 4. COMPTEURS ANIMÉS & FADE-IN (IntersectionObserver)
// ============================================
// Fonction pour animer les compteurs
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.getAttribute('data-target'));
            if (target && !element.classList.contains('animated')) {
                animateCounter(element, target);
                element.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number, .number').forEach(counter => {
    counterObserver.observe(counter);
});

// Observer pour les animations fade-in
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(element => {
    fadeObserver.observe(element);
});