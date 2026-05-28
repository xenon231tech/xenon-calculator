// ============================================
// XENON PROFESSIONAL WEBSITE - JAVASCRIPT
// Repository: xenon-calculator
// ============================================

// ============================================
// THEME MANAGEMENT
// ============================================

const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeButton();
    }
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButton();
}

// Update theme button text
function updateThemeButton() {
    if (themeToggle) {
        const isDark = !document.body.classList.contains('light-mode');
        themeToggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.feature-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// GITHUB API - FETCH REPOSITORY STATS
// ============================================

async function fetchGitHubStats() {
    try {
        const response = await fetch('https://api.github.com/repos/xenon231tech/xenon-calculator');
        const data = await response.json();
        
        // Update stats if elements exist
        const starsEl = document.getElementById('stars');
        const forksEl = document.getElementById('forks');
        const watchersEl = document.getElementById('watchers');
        const updatedEl = document.getElementById('updated');
        
        if (starsEl) starsEl.textContent = formatNumber(data.stargazers_count || 0);
        if (forksEl) forksEl.textContent = formatNumber(data.forks_count || 0);
        if (watchersEl) watchersEl.textContent = formatNumber(data.watchers_count || 0);
        
        if (updatedEl) {
            const updated = new Date(data.updated_at);
            const days = Math.floor((new Date() - updated) / (1000 * 60 * 60 * 24));
            updatedEl.textContent = days === 0 ? 'Today' : days + 'd ago';
        }
    } catch (error) {
        console.log('GitHub API error:', error);
    }
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ============================================
// PARTICLES ANIMATION
// ============================================

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ============================================
// SCROLL EFFECTS
// ============================================

let ticking = false;

function updateScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (scrolled > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
    }
});

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '';
                }
                
                if (input.type === 'email' && !validateEmail(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                }
            });
            
            if (isValid) {
                alert('Thank you! Your message has been sent.');
                form.reset();
            }
        });
    });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav?.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        nav?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
}

// ============================================
// ANALYTICS TRACKING
// ============================================

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('engagement', 'button_click', btn.textContent);
    });
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    createParticles();
    setupFormValidation();
    setupLazyLoading();
    setupMobileMenu();
    fetchGitHubStats();
    
    // Refresh GitHub stats every 5 minutes
    setInterval(fetchGitHubStats, 5 * 60 * 1000);
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });
        
        observer.observe({ entryTypes: ['navigation', 'resource'] });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

console.log('✨ Website loaded successfully!');
