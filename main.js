document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);
  // gsap code here!

  let smoother = ScrollSmoother.create({
    wrapper: ".wrapper",
    content: ".content",
    smooth: 1.1,
    effects: true,
  });

  if (document.querySelector(".accordeon-nav")) {
    const links = document.querySelectorAll(".link-a");
    const tabs = document.querySelectorAll(".tab-nav");

    links.forEach((link, index) => {
      link.addEventListener("mouseenter", () => {
        links.forEach((t) => {
          t.classList.remove("active");
        });

        link.classList.add("active");

        tabs.forEach((t) => {
          t.classList.remove("active");
        });

        tabs[index].classList.add("active");
      });
    });
  }

  if (document.querySelector(".carousel-cards")) {
    const carousel = document.querySelector(".carousel-cards");
    const cards = carousel.querySelectorAll(".card-tab");

    let currentIndex = 0;
    let intervalId = null;

    cards.forEach((card) => card.classList.remove("active"));

    if (cards.length > 0) {
      cards[currentIndex].classList.add("active");
    }

    function nextCard() {
      cards.forEach((card) => card.classList.remove("active"));

      currentIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;

      cards[currentIndex].classList.add("active");
    }

    function startCarousel() {
      if (intervalId !== null || cards.length <= 1) return;

      intervalId = setInterval(nextCard, 3000);
    }

    function stopCarousel() {
      clearInterval(intervalId);
      intervalId = null;
    }

    startCarousel();

    carousel.addEventListener("mouseenter", stopCarousel);
    carousel.addEventListener("mouseleave", startCarousel);
  }

  if (document.getElementById("heroParticles")) {
    const particlesContainer = document.getElementById("heroParticles");

    const colors = [
      "#0B2545",
      "#D64933",
      "#EAE9E1",
      "#C08552",
      "#8D99AE",
      "#2D3142",
    ];

    const particleAmount = 14;

    for (let i = 0; i < particleAmount; i++) {
      const square = document.createElement("span");

      const size = randomNumber(24, 96);
      const x = randomNumber(4, 92);
      const y = randomNumber(8, 88);
      const duration = randomNumber(6, 12);
      const delay = randomNumber(0, 8);
      const opacity = Math.random() > 0.6 ? 0.55 : 0.85;
      const color = colors[Math.floor(Math.random() * colors.length)];

      square.classList.add("particle-square");

      square.style.setProperty("--size", `${size}px`);
      square.style.setProperty("--x", `${x}%`);
      square.style.setProperty("--y", `${y}%`);
      square.style.setProperty("--duration", `${duration}s`);
      square.style.setProperty("--delay", `${delay}s`);
      square.style.setProperty("--opacity", opacity);
      square.style.setProperty("--particle-color", color);

      particlesContainer.appendChild(square);
    }

    function randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }
  }

  if (document.querySelector(".split")) {
    // split all elements with the class "split" into words and characters
    let split = SplitText.create(".split", { type: "words, chars" });

    // now animate the characters in a staggered fashion
    gsap.from(split.words, {
      duration: 0.2,
      ease: "power1.out",
      x: 20, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.1, // 0.05 seconds between each
    });
  }
  document.querySelectorAll(".row").forEach((row) => {
    gsap.from(row.querySelectorAll(".col"), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: row,
        start: "top 90%",
        once: true,
      },
    });
  });

  //end of DOM CONTENT LOADED
});
