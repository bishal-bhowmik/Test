document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".js-anim-card", { 
    y: 150,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    
    scrollTrigger: {
      trigger: ".card-container",
      start: "top 85%",
     
      toggleActions: "restart none restart none"
    }
  });
});