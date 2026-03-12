gsap.registerPlugin(ScrollTrigger);

// --- 1. Original: Reveal Up (Standard) ---
const allCards = gsap.utils.toArray('.reveal-card');

allCards.forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "restart none restart none"
        },
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out"
    });
});

// --- 2. New: Reveal From LEFT ---

const leftCards = gsap.utils.toArray('.reveal-left');

leftCards.forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reset"
        },
        x: -100,    // Start 100px to the left
        opacity: 0, // Fade in
        duration: 1,
        ease: "power3.out"
    });
});

// --- 3. New: Reveal From RIGHT ---

const rightCards = gsap.utils.toArray('.reveal-right');

rightCards.forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
           toggleActions: "restart none restart none"
        },
        x: 100,     // Start 100px to the right
        opacity: 0, // Fade in
        duration: 1,
        ease: "power3.out"
    });
});