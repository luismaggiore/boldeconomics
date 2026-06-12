document.addEventListener("DOMContentLoaded", (event) => {
  const hasGsap =
    window.gsap &&
    window.ScrollTrigger &&
    window.ScrollSmoother &&
    window.ScrollToPlugin &&
    window.SplitText;

  if (hasGsap) {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      ScrollToPlugin,
      SplitText
    );

    ScrollSmoother.create({
      wrapper: ".wrapper",
      content: ".content",
      smooth: 1.1,
      effects: true,
    });
  }

  document.querySelectorAll(".accordeon-nav").forEach((accordeon) => {
    const links = Array.from(accordeon.querySelectorAll(".link-a"));
    const tabs = Array.from(accordeon.querySelectorAll(".tab-nav"));

    if (!links.length || !tabs.length) return;

    function activateTab(activeIndex) {
      links.forEach((link, index) => {
        const isActive = index === activeIndex;

        link.classList.toggle("active", isActive);
        link.setAttribute("aria-selected", isActive ? "true" : "false");
        link.tabIndex = isActive ? 0 : -1;
      });

      tabs.forEach((tab, index) => {
        const isActive = index === activeIndex;

        tab.classList.toggle("active", isActive);
        tab.hidden = !isActive;
      });
    }

    function focusTab(index) {
      const nextIndex = (index + links.length) % links.length;

      activateTab(nextIndex);
      links[nextIndex].focus();
    }

    links.forEach((link, index) => {
      link.addEventListener("mouseenter", () => activateTab(index));
      link.addEventListener("focus", () => activateTab(index));

      link.addEventListener("click", (event) => {
        event.preventDefault();
        activateTab(index);
      });

      link.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          focusTab(index + 1);
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          focusTab(index - 1);
        }

        if (event.key === "Home") {
          event.preventDefault();
          focusTab(0);
        }

        if (event.key === "End") {
          event.preventDefault();
          focusTab(links.length - 1);
        }
      });
    });

    const initialIndex = Math.max(
      links.findIndex((link) => link.classList.contains("active")),
      0
    );

    activateTab(initialIndex);
  });

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
      const r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
      const gradient = `radial-gradient(circle at center, rgba(${r},${g},${b},0.18) 0%, rgba(${r},${g},${b},0.06) 55%, rgba(${r},${g},${b},0) 100%)`;
      square.style.setProperty("--particle-color", gradient);
      square.style.setProperty("--border-color", `rgba(${r},${g},${b},0.12)`);

      particlesContainer.appendChild(square);
    }

    function randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }
  }

  if (hasGsap && document.querySelector(".split")) {
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
  if (hasGsap) {
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
  }

  //end of DOM CONTENT LOADED
});

  // ── SERVICE TABS (01/02/03 tab system on service pages) ──────
  document.querySelectorAll(".service-tabs-wrap").forEach(wrap => {
    const btns = Array.from(wrap.querySelectorAll(".service-tab-btn"));
    const panels = Array.from(wrap.querySelectorAll(".service-tab-panel"));
    if (!btns.length) return;
    function activateTab(i) {
      btns.forEach((b,idx) => b.classList.toggle("active", idx === i));
      panels.forEach((p,idx) => p.classList.toggle("active", idx === i));
    }
    btns.forEach((btn,i) => btn.addEventListener("click", () => activateTab(i)));
    activateTab(0);
  });

  // ── SERVICES LANDING HOVER PANELS ────────────────────────────
  const serviceLinks = Array.from(document.querySelectorAll(".service-link[data-panel]"));
  const servicePanels = Array.from(document.querySelectorAll(".service-panel"));
  if (serviceLinks.length) {
    function activateServicePanel(i) {
      serviceLinks.forEach((l,idx) => { l.classList.toggle("active", idx===i); l.setAttribute("aria-selected", idx===i?"true":"false"); });
      servicePanels.forEach((p,idx) => p.classList.toggle("active", idx===i));
    }
    serviceLinks.forEach((link,i) => {
      link.addEventListener("mouseenter", () => activateServicePanel(i));
      link.addEventListener("click", e => { if(window.innerWidth < 768){ e.preventDefault(); activateServicePanel(i); } });
    });
  }

  // ── INDUSTRIES HOVER (desktop) / ACCORDION (mobile) ──────────
  const industryLinks = Array.from(document.querySelectorAll(".industry-link"));
  const industryPanelsDesktop = Array.from(document.querySelectorAll(".industries-panels-desktop .industry-panel"));
  const industryPanelsInline = Array.from(document.querySelectorAll(".industry-panel-inline"));

  if (industryLinks.length) {
    if (window.innerWidth >= 768) {
      // Desktop: hover activates right-column panel
      function activateIndustryDesktop(i) {
        industryLinks.forEach((l,idx) => l.classList.toggle("active", idx===i));
        industryPanelsDesktop.forEach((p,idx) => p.classList.toggle("active", idx===i));
      }
      industryLinks.forEach((link,i) => {
        link.addEventListener("mouseenter", () => activateIndustryDesktop(i));
        link.addEventListener("click", e => e.preventDefault());
      });
      activateIndustryDesktop(0);
    } else {
      // Mobile: start fully closed, click toggles inline panel below trigger
      industryLinks.forEach(l => l.classList.remove("active"));
      industryPanelsInline.forEach(p => p.classList.remove("active"));

      industryLinks.forEach((link, i) => {
        link.addEventListener("click", e => {
          e.preventDefault();
          const isOpen = link.classList.contains("active");
          // close all
          industryLinks.forEach(l => l.classList.remove("active"));
          industryPanelsInline.forEach(p => p.classList.remove("active"));
          // open this one if it was closed
          if (!isOpen) {
            link.classList.add("active");
            if (industryPanelsInline[i]) industryPanelsInline[i].classList.add("active");
          }
        });
      });
    }
  }

  // ── SIDEBAR SCROLL SPY ────────────────────────────────────────
  const spySections = Array.from(document.querySelectorAll("[data-spy]"));
  const spyLinks = Array.from(document.querySelectorAll(".sidebar-link[href^='#']"));
  if (spySections.length && spyLinks.length) {
    window.addEventListener("scroll", () => {
      let current = spySections[0]?.id || "";
      spySections.forEach(el => { if(window.scrollY >= el.offsetTop - 130) current = el.id; });
      spyLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#"+current));
    }, { passive:true });
  }

  // ── HEADER CANVAS: floating squares ──────────────────────────
  (function() {
    const COLORS = [
      'rgba(11,37,69,',    // azul marino
      'rgba(214,73,51,',   // rojo coral
      'rgba(192,133,82,',  // camel
      'rgba(141,153,174,', // azul grisáceo
      'rgba(45,49,66,',    // azul oscuro
      'rgba(234,233,225,', // marfil
    ];

    const SIZES = [14, 20, 28, 36, 48, 64, 80, 96];

    function initCanvas(hero) {
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;';
      // Insert before ::after pseudo (which is z-index:0 overlay) — put canvas at z-index 0, text at z-index 1
      hero.insertBefore(canvas, hero.firstChild);

      const ctx = canvas.getContext('2d');
      let W, H, squares, raf;

      function resize() {
        W = canvas.width  = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
      }

      function makeSquare() {
        const size  = SIZES[Math.floor(Math.random() * SIZES.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return {
          x:     Math.random() * (W - size),
          y:     Math.random() * (H - size),
          size,
          color,
          alpha:  0,
          target: Math.random() * 0.4 + 0.6,   // max opacity 60–100%
          speed:  Math.random() * 0.004 + 0.002,  // fade speed
          phase: 'in',   // in → hold → out
          hold:  0,
          holdMax: Math.random() * 140 + 60,      // frames to hold
        };
      }

      function init() {
        resize();
        // seed with ~30 squares at various phases
        squares = Array.from({ length: 30 }, () => {
          const sq = makeSquare();
          sq.alpha  = Math.random() * sq.target;
          sq.phase  = Math.random() < 0.5 ? 'hold' : 'in';
          sq.hold   = Math.random() * sq.holdMax;
          return sq;
        });
      }

      function draw() {
        ctx.clearRect(0, 0, W, H);

        squares.forEach(sq => {
          // update alpha
          if (sq.phase === 'in') {
            sq.alpha += sq.speed;
            if (sq.alpha >= sq.target) { sq.alpha = sq.target; sq.phase = 'hold'; }
          } else if (sq.phase === 'hold') {
            sq.hold++;
            if (sq.hold >= sq.holdMax) sq.phase = 'out';
          } else {
            sq.alpha -= sq.speed;
            if (sq.alpha <= 0) {
              // recycle
              Object.assign(sq, makeSquare());
            }
          }

          ctx.fillStyle = sq.color + sq.alpha + ')';
          ctx.fillRect(sq.x, sq.y, sq.size, sq.size);
        });

        raf = requestAnimationFrame(draw);
      }

      // pause when off-screen for perf
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          if (!raf) draw();
        } else {
          cancelAnimationFrame(raf);
          raf = null;
        }
      }, { threshold: 0 });
      obs.observe(hero);

      window.addEventListener('resize', () => { resize(); }, { passive: true });

      init();
      draw();
    }

    // Apply to .hero-inner and .hero
    document.querySelectorAll('.hero-inner, .hero').forEach(initCanvas);
  })();
