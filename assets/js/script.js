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
  const sliderTitle = document.querySelector(".websites .slider-title");
  const astronaut = document.querySelector(".contact .astronaut");
  window.addEventListener("scroll", () => {
    let s4 = window.scrollY / 4;
    let s8 = window.scrollY / 8;
    let s17 = window.scrollY / 17;
    if (s8 <= 200) {
      starTrail.style.transform = `translate(-50%, 0) rotate(${s8}deg)`;
    } else {
      s8 = 200;
    }
    sliderTitle.style.transform = `translate3d(0px, ${s4}px, 0px)`;
    astronaut.style.transform = `translate3d(0px, ${s17}px, 0px)`;
  });
  
  // Slider
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  next.addEventListener("click", function () {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").appendChild(items[0]); // appendChild Purpose: Adds a node to the end of the list.
  });
  prev.addEventListener("click", function () {
    let items = document.querySelectorAll(".item");
    document.querySelector(".slide").prepend(items[items.length - 1]); // prepend Purpose: Adds a node to the beginning of the list of children of a specified parent node.
  });
  
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

  
  