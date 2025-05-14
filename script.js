// Custom cursor effect
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');
cursor.classList.add('cursor');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add a slight delay to the follower for a smooth effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Expand cursor on hoverable elements
const hoverables = document.querySelectorAll('a, button, .project-card, .skill-item, .social-icon');
hoverables.forEach(hoverable => {
    hoverable.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
    });
    
    hoverable.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.backgroundColor = 'transparent';
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a, .scroll-indicator a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealElementsOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealElementsOnScroll);
window.addEventListener('load', revealElementsOnScroll);

// Typing animation for hero section
const typeWriter = (element, text, speed = 100, delay = 0) => {
    let i = 0;
    setTimeout(() => {
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    }, delay);
};

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content h2');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        typeWriter(heroTitle, titleText, 100);
        typeWriter(heroSubtitle, subtitleText, 80, titleText.length * 100 + 500);
    }
});

// Project filter functionality
const filterProjects = (category) => {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
};

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-filter');
        filterProjects(category);
    });
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (!nameInput.value.trim()) {
            isValid = false;
            nameInput.classList.add('error');
        } else {
            nameInput.classList.remove('error');
        }
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            isValid = false;
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
        }
        
        if (!messageInput.value.trim()) {
            isValid = false;
            messageInput.classList.add('error');
        } else {
            messageInput.classList.remove('error');
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formSuccess = document.createElement('div');
            formSuccess.classList.add('form-success');
            formSuccess.textContent = 'Thank you! Your message has been sent.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(formSuccess);
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Parallax effect for background elements
const parallaxElements = document.querySelectorAll('.parallax');
window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        const moveX = (x - 0.5) * speed * 100;
        const moveY = (y - 0.5) * speed * 100;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Dark/Light mode toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save preference to localStorage
        const isDarkMode = !document.body.classList.contains('light-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'false') {
        document.body.classList.add('light-mode');
    }
}

// Skill progress animation
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach(skill => {
        const percentage = skill.getAttribute('data-percentage');
        skill.style.width = percentage + '%';
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate skills on page load
    animateSkills();
    
    // Initialize AOS (Animate On Scroll) if you're using it
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Set active nav link based on current section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    const setActiveNavLink = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
});

// Project modal functionality
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        const projectModal = document.querySelector(`.project-modal[data-id="${projectId}"]`);
        
        if (projectModal) {
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal when clicking outside or on close button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-modal') || e.target.classList.contains('modal-close')) {
        document.querySelectorAll('.project-modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.project-modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

// Skill category switching
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories
        document.querySelectorAll('.skill-category').forEach(cat => {
            cat.classList.remove('active');
        });
        
        // Add active class to clicked category
        category.classList.add('active');
        
        const selectedCategory = category.getAttribute('data-category');
        
        // Show/hide skills based on category
        document.querySelectorAll('.skill-logo').forEach(skill => {
            if (skill.getAttribute('data-category') === selectedCategory) {
                skill.style.display = 'flex';
            } else {
                skill.style.display = 'none';
            }
        });
    });
});

// Initialize skills display
document.addEventListener('DOMContentLoaded', () => {
    const activeCategory = document.querySelector('.skill-category.active');
    if (activeCategory) {
        const selectedCategory = activeCategory.getAttribute('data-category');
        document.querySelectorAll('.skill-logo').forEach(skill => {
            if (skill.getAttribute('data-category') === selectedCategory) {
                skill.style.display = 'flex';
            } else {
                skill.style.display = 'none';
            }
        });
    }
});