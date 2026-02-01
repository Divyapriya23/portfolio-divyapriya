// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Dynamic Year in Footer
function setCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    const isDark = body.dataset.theme === 'dark';
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme and set current year
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.dataset.theme = savedTheme;
    const isDark = savedTheme === 'dark';
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    setCurrentYear();
});

// Modal Functions
function openModal(src) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal-img").src = src;
}

function closeModal(e) {
    if (e.target.id === "modal" || e.target.classList.contains("close")) {
        document.getElementById("modal").style.display = "none";
    }
}

// Skills Progress Bars
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Profile Image Slider
const images = ["images/profiledp.png", "images/profile2.png"];
let index = 0;

function slideProfile() {
    const img = document.getElementById("profileSlider");
    img.style.opacity = 0;
    setTimeout(() => {
        index = (index + 1) % images.length;
        img.src = images[index];
        img.style.opacity = 1;
    }, 400);
}

setInterval(slideProfile, 5000);

// Scroll Animations
const sections = document.querySelectorAll(".fade-section");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });

            if (entry.target.id === 'skills') animateSkills();
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Navbar scroll spy
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Initialize
window.addEventListener('load', () => {
    animateSkills();
});
