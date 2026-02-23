document.addEventListener("DOMContentLoaded", () => {
  // =========================
  
  // =========================
  (function initDrivers() {
    const root = document.getElementById("driversSlider");
    if (!root) return;

    const track = root.querySelector(".slider__track");
    const slides = Array.from(root.querySelectorAll(".slider__slide"));
    const dotsWrap = root.querySelector(".slider__dots");

    if (!track || !slides.length || !dotsWrap) return;

    let index = 0;

    // build dots
    dotsWrap.innerHTML = "";
    const dots = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "slider__dot" + (i === 0 ? " is-active" : "");
      b.addEventListener("click", () => go(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }

    function go(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    update();
  })();

});
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("clientSlider");
  if (!slider) return;

  const viewport = slider.querySelector(".client-viewport");
  const slides = Array.from(slider.querySelectorAll(".client-slide"));
  const dots = Array.from(slider.querySelectorAll(".client-dot"));

  let activeIndex = 0;
  let rafId = null;

  function updateActiveClasses(i) {
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
  }

  function scrollToSlide(i, smooth = true) {
    if (!slides[i]) return;

    const slide = slides[i];

    
    const targetLeft =
      slide.offsetLeft - (viewport.clientWidth - slide.clientWidth) / 2;

    viewport.scrollTo({
      left: targetLeft,
      behavior: smooth ? "smooth" : "auto",
    });

    activeIndex = i;
    updateActiveClasses(i);
  }

  function getClosestIndexToCenter() {
    const center = viewport.scrollLeft + viewport.clientWidth / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const dist = Math.abs(center - slideCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    return closestIdx;
  }


  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => scrollToSlide(i, true));
  });

  
  viewport.addEventListener("scroll", () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const i = getClosestIndexToCenter();
      if (i !== activeIndex) {
        activeIndex = i;
        updateActiveClasses(i);
      }
    });
  });


  window.addEventListener("resize", () => {
    scrollToSlide(activeIndex, false);
  });

  scrollToSlide(0, false);
});


/////////////////////////rating///////////////////////////
(() => {
  const track = document.getElementById("reviewsTrack");
  const template = document.getElementById("reviewTemplate");
  const dotsWrap = document.getElementById("reviewsDots");
  const prevBtn = document.querySelector(".rev-arrow--prev");
  const nextBtn = document.querySelector(".rev-arrow--next");

  if (!track || !template || !dotsWrap || !prevBtn || !nextBtn) return;

  const reviewsData = [
    {
      text: "هو منصة ذكية بتربط العملاء بالسائقين لنقل جميع أنواع الشحنات بطريقة آمنة وسريعة. من أول الطلب لحد التسليم",
      name: "John Carter",
      role: "سائق محترف",
    },
    {
      text: "هو منصة ذكية بتربط العملاء بالسائقين لنقل جميع أنواع الشحنات بطريقة آمنة وسريعة. من أول الطلب لحد التسليم",
      name: "John Carter",
      role: "سائق محترف",
    },
    {
      text: "هو منصة ذكية بتربط العملاء بالسائقين لنقل جميع أنواع الشحنات بطريقة آمنة وسريعة. من أول الطلب لحد التسليم",
      name: "John Carter",
      role: "سائق محترف",
    },
    {
      text: "هو منصة ذكية بتربط العملاء بالسائقين لنقل جميع أنواع الشحنات بطريقة آمنة وسريعة. من أول الطلب لحد التسليم",
      name: "John Carter",
      role: "سائق محترف",
    },
    {
      text: "هو منصة ذكية بتربط العملاء بالسائقين لنقل جميع أنواع الشحنات بطريقة آمنة وسريعة. من أول الطلب لحد التسليم",
      name: "John Carter",
      role: "سائق محترف",
    },
    {
      text: "هو منصة ذكية بتربط العملاء بالسائقين لنقل جميع أنواع الشحنات بطريقة آمنة وسريعة. من أول الطلب لحد التسليم",
      name: "John Carter",
      role: "سائق محترف",
    },
    {
      text: "هو منصة ذكية بتربط العملاء بالسائقين لنقل جميع أنواع الشحنات بطريقة آمنة وسريعة. من أول الطلب لحد التسليم",
      name: "John Carter",
      role: "سائق محترف",
    },
    {
      text: "هو منصة ذكية بتربط العملاء بالسائقين لنقل جميع أنواع الشحنات بطريقة آمنة وسريعة. من أول الطلب لحد التسليم",
      name: "John Carter",
      role: "سائق محترف",
    },
  ];

  const renderCards = () => {
    track.innerHTML = "";
    reviewsData.forEach((item) => {
      const card = template.cloneNode(true);
      card.removeAttribute("id");

      card.querySelector(".rev-card__text").textContent = item.text;
      card.querySelector(".rev-card__name").textContent = item.name;
      card.querySelector(".rev-card__role").textContent = item.role;

      track.appendChild(card);
    });
  };

  
  const getVisibleCount = () => {
    const w = window.innerWidth;
    if (w <= 520) return 1;
    if (w <= 900) return 2;
    return 3; // Desktop
  };


  const getStep = () => {
    const card = track.querySelector(".rev-card");
    if (!card) return 0;

    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || "0");
    return card.getBoundingClientRect().width + gap;
  };

  let index = 0;

 
  const getMaxIndex = () => {
    const total = track.querySelectorAll(".rev-card").length; // أدق بعد الريندر
    const visible = getVisibleCount();
    return Math.max(0, total - visible);
  };

  const setArrowsState = () => {
    const max = getMaxIndex();
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === max;
  };

  const buildDots = () => {
    dotsWrap.innerHTML = "";
    const max = getMaxIndex();
    const dotsCount = max + 1;

    for (let i = 0; i < dotsCount; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = i === index ? "is-active" : "";
      b.addEventListener("click", () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(b);
    }
  };

  const updateDots = () => {
    const dots = [...dotsWrap.querySelectorAll("button")];
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  };

  const update = () => {
    const max = getMaxIndex();

    // ✅ clamp
    if (index < 0) index = 0;
    if (index > max) index = max;

    const x = getStep() * index;

 
    track.style.transform = `translateX(-${x}px)`;

    updateDots();
    setArrowsState();
  };

  prevBtn.addEventListener("click", () => {
    index -= 1;
    update();
  });

  nextBtn.addEventListener("click", () => {
    index += 1;
    update();
  });

  window.addEventListener("resize", () => {
  
    const max = getMaxIndex();
    if (index > max) index = max;

    buildDots();
    update();
  });

  renderCards();
  buildDots();
  update();
})();




































































/////////////////////////rating end///////////////////////////
//////////////////////////download///////////////////////////
(() => {
  const section = document.getElementById("download");
  if (!section) return;

  const counters = section.querySelectorAll(".counter");
  let started = false;

  const format = (value, decimals = 0) => {
    return Number(value).toFixed(decimals);
  };

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";

    const duration = 1100; 
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = target * progress;

      el.textContent = format(current, decimals) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = format(target, decimals) + suffix;
    };

    requestAnimationFrame(tick);
  };

  const start = () => {
    if (started) return;
    started = true;
    counters.forEach(animateCounter);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) start();
      });
    },
    { threshold: 0.35 }
  );

  io.observe(section);
})();
//////////////////////////download-end///////////////////////////