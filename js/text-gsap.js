(function() {
  'use strict';

  // --- 1. CONFIGURATION (100% SAFE FOR RICH TEXT) ---
  const ANIM_CONFIG = {
    
    // OLD NAME: 'char-stagger' -> NEW BEHAVIOR: Smooth Clip-Wipe
    // Perfectly preserves rich text colors, bolding, and font sizes!
    'char-stagger': {
      vars: { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", x: -20 },
      to:   { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", x: 0, duration: 1.2, ease: "power3.inOut" },
      triggerConfig: { toggleActions: "play reverse play reverse" }
    },
    
    // OLD NAME: 'masked-lines' -> NEW BEHAVIOR: Modern Skew-Up
    // Premium agency feel: slides up with a slight angle, safely moving the whole block
    'masked-lines': {
      vars: { y: 50, skewY: 4, opacity: 0 },
      to:   { y: 0, skewY: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      triggerConfig: { toggleActions: "play reverse play reverse" }
    },
    
    // OLD NAME: 'slide-right' -> NEW BEHAVIOR: Safe Slide Right
    // Fixed so it no longer breaks HTML blocks or cards!
    'slide-right': {
      vars: { x: -40, opacity: 0 },
      to:   { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      triggerConfig: { toggleActions: "play none none reset" }
    }
  };

  // --- 2. MAIN INIT ---
  const initAnimations = () => {
    console.log("Safe Animation System Active (Legacy Names Supported)");
    
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn("GSAP or ScrollTrigger not found. Ensure they are loaded globally.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    // ======================================================================
    // 1. DYNAMIC HUB SPOT RICH TEXT WRAPPER LOGIC
    // ======================================================================
    const richTextWrappers = document.querySelectorAll('.rich-text-anim-wrapper');

    richTextWrappers.forEach(wrapper => {
      // Read what animation styles this section should use
      const headingStyle = wrapper.getAttribute('data-heading-anim');
      const textStyle = wrapper.getAttribute('data-text-anim');

      if (headingStyle) {
        const headings = wrapper.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          heading.classList.add('js-anim-trigger');
          heading.setAttribute('data-anim', headingStyle);
        });
      }

      if (textStyle) {
        // Targeted the safest block elements to prevent breaking nested styles
        const textBlocks = wrapper.querySelectorAll('p, li, blockquote, pre, figcaption, dt, dd');
        textBlocks.forEach(text => {
          text.classList.add('js-anim-trigger');
          text.setAttribute('data-anim', textStyle);
        });
      }
    });

    // ======================================================================
    // 2. GSAP INITIALIZATION
    // ======================================================================
    const triggers = document.querySelectorAll('.js-anim-trigger');
    
    // Reveal the elements right before animating them (Overrides your CSS hiding)
    gsap.set(triggers, { autoAlpha: 1 });

    triggers.forEach(el => {
      const type = el.getAttribute('data-anim');
      
      // If the animation doesn't exist, fall back to the safe 'masked-lines' behavior
      const config = ANIM_CONFIG[type] || ANIM_CONFIG['masked-lines'];

      const actions = config.triggerConfig ? config.triggerConfig.toggleActions : "play none none reset";

      // Execute safe animation on the entire HTML block
      gsap.fromTo(el, config.vars, {
        ...config.to,
        scrollTrigger: {
          trigger: el,
          start: "top 85%", 
          toggleActions: actions,
        }
      });
    });
  };

  // --- 3. EXECUTION ---
  if (document.readyState === "complete" || document.readyState === "interactive") {
    initAnimations();
  } else {
    document.addEventListener("DOMContentLoaded", initAnimations);
  }

})();