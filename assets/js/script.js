document.addEventListener("DOMContentLoaded", () => {
    // Remove the loading class from the body
    document.body.classList.remove("load");
    // Hide the loading screen
    var loading = document.querySelector(".loading");
    loading.style.display = "none";
    // Show the main content
    var main = document.querySelector("main");
    main.style.display = "block";
  });
  
  const cursor = document.querySelector(".cursor");
  const cursorOutline = document.querySelector(".cursor-outline");
  let posX = 0,
    posY = 0;
  function updateCursor(e) {
    cursor.style.left = `${posX}px`;
    cursor.style.top = `${posY}px`;
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: `forwards` }
    );
  }
  
  window.addEventListener("mousemove", (e) => {
    posX = e.clientX;
    posY = e.clientY;
    requestAnimationFrame(updateCursor);
  });
  
  const rocks = document.querySelectorAll(".parallax .meteors .rock");
  /* 
  Rocks length = 3
  Rocks Index = 0 1 2
  */
  function addAnimation(index) {
    if (index < rocks.length) {
      rocks[index].classList.add("fall");
      rocks[index].addEventListener(
        "animationend",
        () => {
          rocks[index].classList.remove("fall");
          requestAnimationFrame(() => addAnimation(index + 1));
        },
        { once: true }
      );
    }
  }
  function rocksFallAnimation() {
    setTimeout(() => requestAnimationFrame(() => addAnimation(0)), 4000);
  }
  rocksFallAnimation();
  setInterval(rocksFallAnimation, 14000);
  
  
  const starTrail = document.querySelector(".tech .star-trail");
  const astronaut = document.querySelector(".contact .astronaut");
  window.addEventListener("scroll", () => {
    let s8 = window.scrollY / 8;
    let s17 = window.scrollY / 17;
    if (s8 <= 200) {
      starTrail.style.transform = `translate(-50%, 0) rotate(${s8}deg)`;
    } else {
      s8 = 200;
    }
    astronaut.style.transform = `translate3d(0px, ${s17}px, 0px)`;
  });
  
  // ========== Projects Carousel ==========
  const carousel = document.getElementById("carousel");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  if (carousel && prevBtn && nextBtn) {
    const cards = carousel.querySelectorAll(".card");
    const total = cards.length;
    let currentIndex = 0;

    function updateCarousel() {
      cards.forEach((card, i) => {
        card.classList.remove("pos-center", "pos-left", "pos-right", "pos-hidden");
        if (i === currentIndex) {
          card.classList.add("pos-center");
        } else if (i === (currentIndex - 1 + total) % total) {
          card.classList.add("pos-left");
        } else if (i === (currentIndex + 1) % total) {
          card.classList.add("pos-right");
        } else {
          card.classList.add("pos-hidden");
        }
      });
    }

    function goTo(index) {
      currentIndex = (index + total) % total;
      updateCarousel();
    }

    function goNext() {
      goTo(currentIndex + 1);
    }

    function goPrev() {
      goTo(currentIndex - 1);
    }

    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);

    // Click center card to open link
    cards.forEach((card, i) => {
      card.addEventListener("click", (e) => {
        // Don't navigate if explore button was clicked (it has its own link)
        if (e.target.closest(".explore-btn")) return;
        if (i === currentIndex) {
          const url = card.getAttribute("data-url");
          if (url) window.open(url, "_blank");
        } else {
          goTo(i);
        }
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    });

    // Touch/swipe support
    let touchStartX = 0;
    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    carousel.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    });

    // Initialize
    updateCarousel();
  }
  
  // elements animations
  function animate() {
    const animate = document.querySelectorAll(".animate");
    for (let i = 0; i < animate.length; i++) {
      const windowHeight = window.innerHeight;
      const animateltop = animate[i].getBoundingClientRect().top;
      if (animateltop < windowHeight - 70) {
        animate[i].classList.add("a-ele");
      }
    }
  }
  window.addEventListener("scroll", animate);

  // Section reveal on scroll
  const revealSections = () => {
    const sections = document.querySelectorAll(".section-reveal");
    const windowHeight = window.innerHeight;
    const revealPoint = windowHeight * 0.75;
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top < revealPoint) {
        section.classList.add("revealed");
        const list = section.querySelector(".answer-stagger");
        if (list) list.classList.add("revealed");
      }
    });
  };
  window.addEventListener("scroll", revealSections);
  window.addEventListener("load", revealSections);

  
  