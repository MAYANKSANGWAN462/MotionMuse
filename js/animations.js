/**
 * MotionMuse - Animation System
 * This file manages all GSAP animations and effects for the website
 */

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations only when page is fully loaded
    window.addEventListener('load', () => {
        // Remove loader and reveal the page
        setTimeout(() => {
            initPageReveal();
            
            // Initialize all animations
            initParallaxEffects();
            initScrollAnimations();
            initHoverEffects();
        }, 500); // Small delay to ensure everything is ready
    });
});

/**
 * Initial page reveal animation
 */
function initPageReveal() {
    const loader = document.querySelector('.loader');
    const tl = gsap.timeline();
    
    // Ensure initial body visibility immediately
    document.body.style.opacity = "1";
    
    // Initial body fade in with GSAP
    gsap.to('body', {
        opacity: 1,
        duration: 0.5
    });
    
    // Page reveal animation
    tl.to('.loader-content', {
        opacity: 0,
        y: -20,
        duration: 0.5
    })
    .to(loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            loader.style.display = 'none';
        }
    })
    .to('.hero-logo', {
        opacity: 1,
        scale: 1,
        rotateY: 360,
        duration: 1.5,
        ease: 'power3.out'
    }, '-=0.2')
    .to('.hero-logo-inner', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
    }, '-=0.5')
    .from('.logo-circle', {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.7')
    .from('.logo-content', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.nav-logo', {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.6')
    .from('.nav-links a', {
        opacity: 0,
        y: -10,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.5')
    .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.7')
    .from('.cta-button', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.7')
    .from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5')
    .fromTo('.particle', 
        { opacity: 0, scale: 0 },
        { 
            opacity: function(i) {
                return 0.3 + (i * 0.05);
            },
            scale: 1,
            duration: 1.5,
            delay: function(i) {
                return 0.2 * i;
            },
            ease: 'power2.out',
            stagger: 0.1 
        }, '-=1')
    .fromTo('.accent-shape', 
        { opacity: 0, scale: 0.5 },
        { 
            opacity: 0.3,
            scale: 1,
            duration: 2,
            stagger: 0.5,
            ease: 'elastic.out(1, 0.5)'
        }, '-=1.5');
    
    // Add floating animation to the logo with subtle 3D rotation
    gsap.to('.hero-logo-container', {
        y: -10,
        rotateX: 5,
        rotateY: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Add pulse animation to the logo circle
    gsap.to('.logo-circle', {
        boxShadow: '0 0 60px var(--color-accent)',
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Particles continuous animation
    gsap.utils.toArray('.particle').forEach((particle, i) => {
        // Start the animation
        gsap.set(particle, {
            opacity: function() {
                return 0.4 + (Math.random() * 0.4);
            }
        });
    });
}

/**
 * Initialize parallax effects on scroll
 */
function initParallaxEffects() {
    // Hero section parallax
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed') || 0;
        
        // Vertical movement on scroll
        gsap.to(layer, {
            y: () => (window.innerHeight * speed),
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // Subtle rotating effect for background elements
        if (layer.classList.contains('layer-bg')) {
            gsap.to(layer, {
                rotation: 2,
                scale: 1.05,
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    });
    
    // Add mouse movement parallax
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 0;
            const isBackground = layer.classList.contains('layer-bg');
            
            // Move layers slightly with mouse movement
            gsap.to(layer, {
                x: isBackground ? (mouseX - 0.5) * 20 : (mouseX - 0.5) * 30 * speed,
                y: isBackground ? (mouseY - 0.5) * 20 : (mouseY - 0.5) * 30 * speed,
                duration: 1,
                ease: 'power1.out'
            });
        });
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // About section animations
    animateAboutSection();
    
    // Work section animations
    animateWorkSection();
    
    // Contact section animations
    animateContactSection();
    
    // Header background change on scroll
    animateHeader();
}

/**
 * Animate the About section elements
 */
function animateAboutSection() {
    // About text animation
    gsap.fromTo('.about-text',
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
    
    // About stats animation
    gsap.fromTo('.about-stats',
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.about-stats',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
    
    // Service cards animation
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

/**
 * Animate the Work section elements
 */
function animateWorkSection() {
    // Project cards animation with stagger
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

/**
 * Animate the Contact section elements
 */
function animateContactSection() {
    // Contact info animation
    gsap.fromTo('.contact-info',
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
    
    // Contact form animation
    gsap.fromTo('.contact-form',
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
}

/**
 * Animate header background and logo on scroll
 */
function animateHeader() {
    // Initial logo setup to ensure the inner content is visible
    gsap.set('.hero-logo-inner', {
        opacity: 1,
        scale: 1
    });
    
    // Show the logo only on the main screen and hide it on scroll
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onLeave: () => {
            // Hide the logo completely when scrolling out of hero section
            gsap.to('.hero-logo-container', {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.set('.hero-logo-container', { display: 'none' });
                }
            });
        },
        onEnterBack: () => {
            // Show the logo when scrolling back to hero section
            gsap.set('.hero-logo-container', { display: 'flex' });
            gsap.to('.hero-logo-container', {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
    
    // Add 3D effect to the logo that follows cursor movement only in the hero section
    const logoContainer = document.querySelector('.hero-logo-container');
    const logo = document.querySelector('.hero-logo');
    const logoInner = document.querySelector('.hero-logo-inner');
    
    if (logoContainer && logo && logoInner) {
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
            // Only apply the effect if the logo is visible and we're in the hero section
            if (window.scrollY < window.innerHeight && logoContainer.style.display !== 'none') {
                const rect = logoContainer.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Calculate the angle of rotation based on mouse position
                const moveX = (e.clientX - centerX) / 30;
                const moveY = (e.clientY - centerY) / 30;
                
                // Apply the 3D rotation effect to the logo
                gsap.to(logo, {
                    rotateY: moveX,
                    rotateX: -moveY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                // Make inner circle follow but with less movement
                gsap.to(logoInner, {
                    rotateY: moveX * 0.7,
                    rotateX: -moveY * 0.7,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
        
        // Reset rotation when mouse leaves hero section
        document.querySelector('.hero').addEventListener('mouseleave', () => {
            gsap.to([logo, logoInner], {
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
    
    // Just change header background on scroll
    ScrollTrigger.create({
        trigger: '.hero',
        start: 'bottom 90%',
        onEnter: () => {
            document.querySelector('.header').classList.add('scrolled');
        },
        onLeaveBack: () => {
            document.querySelector('.header').classList.remove('scrolled');
        }
    });
    
    // Parallax scroll for background layers
    gsap.utils.toArray('.parallax-layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed') || 0;
        const isBackground = layer.classList.contains('layer-bg');
        
        // Enhanced parallax effect with rotation
        gsap.to(layer, {
            y: () => (window.innerHeight * speed * 1.5),
            rotation: isBackground ? 5 : speed * 10,
            scale: isBackground ? 1.1 : 1 + Math.abs(speed) * 0.2,
            opacity: layer.classList.contains('layer-1') ? 0.9 : undefined,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.project-image'), {
                rotateX: 5,
                rotateY: 5,
                translateZ: 20,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.project-image'), {
                rotateX: 0,
                rotateY: 0,
                translateZ: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        // Add mouse movement effect to enhance 3D feel
        card.addEventListener('mousemove', function(e) {
            const image = this.querySelector('.project-image');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            // Calculate rotation based on mouse position
            const rotateX = (y - rect.height / 2) / 20;
            const rotateY = (rect.width / 2 - x) / 20;
            
            gsap.to(image, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Parallax Effect for Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .team-member, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});

// Fun Text Animation
const titles = document.querySelectorAll('.section-title, .hero-title');
titles.forEach(title => {
    title.addEventListener('mouseover', () => {
        title.style.transform = 'scale(1.1) rotate(-2deg)';
        title.style.transition = 'transform 0.3s ease';
    });
    
    title.addEventListener('mouseout', () => {
        title.style.transform = 'scale(1) rotate(0)';
    });
});

// Process Timeline Animation
const processSteps = document.querySelectorAll('.process-step');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

processSteps.forEach(step => {
    observer.observe(step);
});

// Fun Button Hover Effect
const buttons = document.querySelectorAll('.cta-button, .secondary-button');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px) scale(1.05)';
        button.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
});

// Smooth Scroll with Fun Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add a fun bounce effect to the target section
            target.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                target.style.animation = '';
            }, 500);
        }
    });
});

// Add Fun Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements in sequence
    const elements = document.querySelectorAll('.hero-content > *, .service-card, .team-member, .process-step');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in');
        }, index * 200);
    });
});

// Custom cursor with reduced delay
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-dot-outline'),
    init: function() {
        document.addEventListener('mousemove', (e) => {
            this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            this.outline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
        
        document.addEventListener('mouseenter', () => {
            this.dot.classList.add('visible');
            this.outline.classList.add('visible');
        });
        
        document.addEventListener('mouseleave', () => {
            this.dot.classList.remove('visible');
            this.outline.classList.remove('visible');
        });
    }
};

// 3D Logo rotation
const logo = {
    element: document.querySelector('.hero-logo-inner'),
    init: function() {
        document.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        document.addEventListener('mouseleave', () => {
            this.element.style.transform = 'rotateX(0) rotateY(0)';
        });
    }
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    cursor.init();
    logo.init();
    
    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.section-title, .service-card, .team-member, .process-step').forEach(el => {
    observer.observe(el);
});

// Parallax effect
const parallaxSections = document.querySelectorAll('.parallax');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            parallaxSections.forEach(section => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                const bg = section.querySelector('.parallax-bg');
                if (bg) {
                    bg.style.setProperty('--parallax-offset', `${rate}px`);
                }
            });
            ticking = false;
        });
        ticking = true;
    }
});

// 3D Sphere Logo Interaction
const sphere = document.querySelector('.sphere-container');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.01;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.01;
});

function animateSphere() {
    if (sphere) {
        sphere.style.transform = `rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    }
    requestAnimationFrame(animateSphere);
}

animateSphere();

// Mobile menu animations
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll with animation
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

// Add animation delay to cards
document.querySelectorAll('.service-card, .team-member, .process-step').forEach((el, index) => {
    el.style.setProperty('--index', index + 1);
});

document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Sphere Animation
    const sphere = document.querySelector('.sphere');
    const sphereContainer = document.querySelector('.sphere-container');
    const parallaxSphere = document.querySelector('.parallax-sphere');
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let isHovered = false;

    // Mouse movement tracking with smooth interpolation and bounds
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to window center
        const bounds = 0.5; // Reduce movement bounds for more subtle effect
        mouseX = ((e.clientX / window.innerWidth) * 2 - 1) * bounds;
        mouseY = ((e.clientY / window.innerHeight) * 2 - 1) * bounds;
    });

    // Enhanced hover effects
    if (parallaxSphere) {
        parallaxSphere.addEventListener('mouseenter', () => {
            isHovered = true;
            gsap.to(sphereContainer, {
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        parallaxSphere.addEventListener('mouseleave', () => {
            isHovered = false;
            gsap.to(sphereContainer, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    // Smooth animation loop with physics
    function animate() {
        // Apply spring physics for smooth movement
        const spring = isHovered ? 0.1 : 0.05;
        const friction = 0.9; // Increased friction for smoother movement

        // Update velocity with spring physics
        velocityX = velocityX * friction + (mouseX - targetX) * spring;
        velocityY = velocityY * friction + (mouseY - targetY) * spring;

        // Update target position
        targetX += velocityX;
        targetY += velocityY;

        if (sphere && sphereContainer) {
            // Reduced rotation and movement values
            const rotationStrength = isHovered ? 20 : 10;
            const moveStrength = isHovered ? 15 : 8;

            // Apply transformations to sphere
            sphere.style.transform = `
                translate(-50%, -50%)
                rotateX(${-targetY * rotationStrength}deg)
                rotateY(${targetX * rotationStrength}deg)
                translateX(${targetX * moveStrength}px)
                translateY(${targetY * moveStrength}px)
            `;
            
            // Update ring rotations with maintained center alignment
            document.querySelectorAll('.sphere-ring').forEach((ring, index) => {
                const speed = (index + 1) * 0.2;
                const baseRotation = index * 45;
                ring.style.transform = `
                    translate(-50%, -50%)
                    rotateX(${baseRotation + targetY * rotationStrength * speed}deg)
                    rotateY(${targetX * rotationStrength * speed}deg)
                    rotateZ(${targetX * targetY * rotationStrength * speed}deg)
                `;
            });
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Add subtle bounce effect on scroll
    let lastScrollY = window.pageYOffset;
    let bounceVelocity = 0;
    const bounceSpring = 0.05;
    const bounceFriction = 0.9;

    window.addEventListener('scroll', () => {
        const scrollDelta = window.pageYOffset - lastScrollY;
        bounceVelocity += scrollDelta * 0.02;
        lastScrollY = window.pageYOffset;
    });

    function bounceAnimation() {
        if (sphereContainer) {
            bounceVelocity *= bounceFriction;
            const bounceOffset = bounceVelocity * bounceSpring;

            // Apply bounce transform while maintaining center alignment
            sphereContainer.style.transform = `
                translate(-50%, -50%)
                translateY(${bounceOffset}px)
            `;
        }
        requestAnimationFrame(bounceAnimation);
    }

    bounceAnimation();
}); 