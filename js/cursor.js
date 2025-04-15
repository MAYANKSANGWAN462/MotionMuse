/**
 * MotionMuse - Custom cursor effects
 * This file handles the custom cursor animation and interaction effects
 */
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');
    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let speed = 0.2; // Cursor movement speed

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;

        // Show cursors
        cursor.classList.add('visible');
        cursorOutline.classList.add('visible');

        // Move dot cursor with slight delay
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    });

    // Smooth outline movement with trailing effect
    function updateCursorOutline() {
    const dx = cursorX - outlineX;
    const dy = cursorY - outlineY;

    // If the distance is small, snap directly
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        outlineX = cursorX;
        outlineY = cursorY;
    } else {
        outlineX += dx * speed;
        outlineY += dy * speed;
    }

    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;

    requestAnimationFrame(updateCursorOutline);
}

    updateCursorOutline();

    // Enhanced hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .team-member, .sphere-container');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
            speed = 0.1; // Slower movement on hover
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
            speed = 0.2; // Normal movement speed
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('visible');
        cursorOutline.classList.remove('visible');
    });

    document.addEventListener('mouseenter', () => {
        cursor.classList.add('visible');
        cursorOutline.classList.add('visible');
    });
});

// Custom cursor
// const cursor = {
//     dot: document.querySelector('.cursor-dot'),
//     outline: document.querySelector('.cursor-dot-outline'),
//     init: function() {
//         document.addEventListener('mousemove', (e) => {
//             this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
//             this.outline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
//         });
        
//         document.addEventListener('mouseenter', () => {
//             this.dot.classList.add('visible');
//             this.outline.classList.add('visible');
//         });
        
//         document.addEventListener('mouseleave', () => {
//             this.dot.classList.remove('visible');
//             this.outline.classList.remove('visible');
//         });
//     }
// };

// // Initialize cursor
// cursor.init(); 