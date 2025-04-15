/**
 * MotionMuse - Main JavaScript
 * This file handles core functionality like navigation, form handling, and interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
});

/**
 * Initialize mobile navigation functionality
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile navigation
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Add body scroll lock when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile navigation when clicking on links
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile navigation when clicking outside
    document.addEventListener('click', e => {
        const isNavLink = e.target.closest('.nav-links');
        const isNavToggle = e.target.closest('.nav-toggle');
        
        if (!isNavLink && !isNavToggle && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize contact form with validation and submission handling
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Basic form validation
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const subject = form.querySelector('#subject').value.trim();
            const message = form.querySelector('#message').value.trim();
            let isValid = true;
            
            // Simple validation
            if (name === '') {
                showFieldError(form.querySelector('#name'), 'Please enter your name');
                isValid = false;
            }
            
            if (email === '') {
                showFieldError(form.querySelector('#email'), 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showFieldError(form.querySelector('#email'), 'Please enter a valid email address');
                isValid = false;
            }
            
            if (subject === '') {
                showFieldError(form.querySelector('#subject'), 'Please enter a subject');
                isValid = false;
            }
            
            if (message === '') {
                showFieldError(form.querySelector('#message'), 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, process submission
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll simulate a successful submission
                
                // Disable submit button and show loading state
                const submitButton = form.querySelector('.submit-button');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate form submission delay
                setTimeout(() => {
                    // Reset the form
                    form.reset();
                    
                    // Show success message
                    showFormMessage(form, 'Thank you! Your message has been sent successfully.', 'success');
                    
                    // Restore button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    
                    // Remove success message after a delay
                    setTimeout(() => {
                        clearFormMessage(form);
                    }, 5000);
                }, 1500);
            }
        });
        
        // Clear validation errors when user types
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                clearFieldError(input);
            });
        });
    }
}

/**
 * Show error message for a form field
 */
function showFieldError(field, message) {
    // Clear any existing error first
    clearFieldError(field);
    
    // Create and add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.style.color = 'rgba(255, 0, 0, 0.8)';
    errorElement.style.fontSize = '1.2rem';
    errorElement.style.marginTop = '0.5rem';
    
    // Add red border to the field
    field.style.borderColor = 'rgba(255, 0, 0, 0.5)';
    
    // Add error message after the field
    field.parentNode.appendChild(errorElement);
}

/**
 * Clear error message for a form field
 */
function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
    
    // Reset field border color
    field.style.borderColor = '';
}

/**
 * Show a form-wide message (success/error)
 */
function showFormMessage(form, message, type = 'error') {
    // Clear any existing messages
    clearFormMessage(form);
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    
    // Style based on message type
    if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(0, 128, 0, 0.1)';
        messageElement.style.color = '#00c853';
    } else {
        messageElement.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        messageElement.style.color = '#ff5252';
    }
    
    // Additional styling
    messageElement.style.padding = '1.5rem';
    messageElement.style.borderRadius = '0.4rem';
    messageElement.style.marginBottom = '2rem';
    
    // Add to the top of the form
    form.prepend(messageElement);
    
    // Scroll to see the message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Clear form-wide message
 */
function clearFormMessage(form) {
    const messageElement = form.querySelector('.form-message');
    if (messageElement) {
        messageElement.remove();
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if the href is just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height to adjust scroll position
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
} 