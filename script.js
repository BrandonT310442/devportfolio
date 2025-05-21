window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

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



// Show all projects by default (filter buttons removed)
const showAllProjects = () => {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        project.style.display = 'block';
        setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        }, 100);
    });
};

// Initialize all projects to be visible
document.addEventListener('DOMContentLoaded', () => {
    showAllProjects();
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

// Experience timeline interaction
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const experienceContents = document.querySelectorAll('.experience-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            experienceContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Show corresponding content
            const company = item.getAttribute('data-company');
            document.querySelector(`.experience-content[data-company="${company}"]`).classList.add('active');
        });
    });
});

// Remove the typing animation code
// This section is already commented out in your code

// Show More button for Other Projects
document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.querySelector('.show-more .btn');
    const projectCards = document.querySelectorAll('.other-project-card');
    
    // Initially show only first 6 projects
    const updateVisibility = () => {
        const isMobile = window.innerWidth <= 768;
        const initialVisible = isMobile ? 3 : 6;
        
        projectCards.forEach((card, index) => {
            if (index >= initialVisible) {
                card.style.display = 'none';
                card.dataset.hidden = 'true';
            }
        });
    };
    
    // Run on page load
    updateVisibility();
    
    // Show more projects when button is clicked
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            const hiddenProjects = document.querySelectorAll('.other-project-card[data-hidden="true"]');
            
            if (hiddenProjects.length > 0) {
                // Show all hidden projects
                hiddenProjects.forEach(project => {
                    project.style.display = 'flex';
                    project.dataset.hidden = 'false';
                    
                    // Add animation
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 10);
                });
                
                // Change button text to "Show Less"
                showMoreBtn.textContent = 'Show Less';
            } else {
                // Hide projects again
                updateVisibility();
                
                // Change button text back
                showMoreBtn.textContent = 'Show More';
            }
        });
    }
    
    // Update on window resize
    window.addEventListener('resize', updateVisibility);
});

// Keep this DOMContentLoaded event handler for hero content
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Immediately reveal hero section without waiting for scroll
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const btLogo = document.querySelector('.bt-logo-large');
    const btLetters = document.querySelectorAll('.bt-letter');
    
    if (heroContent) {
        heroContent.classList.add('revealed');
        // Also reveal all child elements immediately
        heroContent.querySelectorAll('*').forEach(element => {
            element.classList.add('revealed');
        });
    }
    
    if (heroImage) {
        heroImage.classList.add('revealed');
    }
    
    if (btLogo) {
        btLogo.classList.add('revealed');
    }
    
    if (btLetters) {
        btLetters.forEach(letter => {
            letter.classList.add('revealed');
        });
    }
    
    // Handle other reveal animations on scroll as usual
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.hero-content):not(.hero-image)');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
});



// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Toggle overlay
    if (nav.classList.contains('active')) {
        overlay.style.display = 'block';
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
    } else {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
});

// Close menu when clicking outside
overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    document.body.classList.remove('menu-open');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
});

// Close menu when clicking on a nav link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    });
});