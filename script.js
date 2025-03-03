let activeDropdown = null;

function toggleDropdown(index) {
  const dropdowns = document.querySelectorAll('.dropdown-content');
  const icons = document.querySelectorAll('.dropdown-header .icon');

  if (activeDropdown === index) {
    dropdowns[index].classList.remove('active');
    icons[index].textContent = '+';
    activeDropdown = null;
  } else {
    dropdowns.forEach((content, i) => {
      content.classList.remove('active');
      icons[i].textContent = '+';
    });
    dropdowns[index].classList.add('active');
    icons[index].textContent = '−';
    activeDropdown = index;
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   const counters = document.querySelectorAll(".stat-number1");

//   counters.forEach(counter => {
//       counter.innerText = "0";
//       const updateCount = () => {
//           const target = +counter.getAttribute("data-target");
//           const count = +counter.innerText;
//           const speed = 400; // Adjust speed
//           const increment = Math.ceil(target / speed);

//           if (count < target) {
//               counter.innerText = count + increment;
//               setTimeout(updateCount, 220);
//           } else {
//               counter.innerText = target; // Ensure final number is exact
//           }
//       };
//       updateCount();
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const counters = document.querySelectorAll(".stat-number2");

//   counters.forEach(counter => {
//       counter.innerText = "0";
//       const updateCount = () => {
//           const target = +counter.getAttribute("data-target");
//           const count = +counter.innerText;
//           const speed = 1000000000000000000000000000000000000000000000000000000000000000000000000000000000; // Adjust speed
//           const increment = Math.ceil(target / speed);

//           if (count < target) {
//               counter.innerText = count + increment;
//               setTimeout(updateCount, 8);
//           } else {
//               counter.innerText = target; // Ensure final number is exact
//           }
//       };
//       updateCount();
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const counters = document.querySelectorAll(".stat-number3");

//   counters.forEach(counter => {
//       counter.innerText = "0";
//       const updateCount = () => {
//           const target = +counter.getAttribute("data-target");
//           const count = +counter.innerText;
//           const speed = 400000000; // Adjust speed
//           const increment = Math.ceil(target / speed);

//           if (count < target) {
//               counter.innerText = count + increment;
//               setTimeout(updateCount, 260);
//           } else {
//               counter.innerText = target; // Ensure final number is exact
//           }
//       };
//       updateCount();
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const animateCounters = (selector, speed, delay) => {
    const counters = document.querySelectorAll(selector);

    counters.forEach(counter => {
      if (counter.getAttribute("data-started") === "true") return; // Evităm re-animarea

      if (isElementInViewport(counter)) {
        counter.setAttribute("data-started", "true");
        counter.innerText = "0";

        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const increment = Math.ceil(target / speed);

          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, delay);
          } else {
            counter.innerText = target; // Asigură numărul exact final
          }
        };

        updateCount();
      }
    });
  };

  const checkAndAnimate = () => {
    animateCounters(".stat-number1", 400, 220); // Config 1
    animateCounters(".stat-number2", 1000000, 8); // Config 2
    animateCounters(".stat-number3", 400000000, 260); // Config 3
  };

  window.addEventListener("scroll", checkAndAnimate); // Rulează la scroll
  checkAndAnimate(); // Rulează imediat la încărcare dacă elementul este deja vizibil
});


  let currentSlide = 0;
  const slides = document.querySelectorAll('.blog-post');

  function showSlide(index) {
    const offset = index * -100;
    slides.forEach((slide) => {
      slide.style.transform = `translateX(${offset}%)`;
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Initialize the first slide
  showSlide(currentSlide);
console.log("Am ajuns aici");
let numeID =document.getElementById("nume");
let firmaID =document.getElementById("firma");
let emailID =document.getElementById("email");
let telefonID =document.getElementById("telefon");
let mesajID =document.getElementById("mesaj").value;
let nume = numeID.getAttribute("name");

function sendMail(event){
  event.preventDefault(); // Oprește refresh-ul paginii
  let parms = {
    nume: document.getElementById("nume"). value,
    firma: document.getElementById("firma").value,
    telefon: document.getElementById("telefon").value,
    email: document.getElementById("email").value,
    mesaj: document.getElementById("mesaj").value,
  }
  console.log(parms);
  console.log("Am ajuns aici");
  emailjs.send("service_6vch1mn", "template_ia4reto", parms).then(function(response) {
    showNotification("Mesajul a fost trimis cu succes!", true);
    console.log("SUCCESS!", response);
    document.querySelector(".contact-form").reset();
}, function(error) {
    showNotification("Eroare la trimiterea mesajului!", false);
    console.log("FAILED...", error);
});
}

function showNotification(message, success = true) {
  let notification = document.getElementById("notification");
  notification.innerText = message;
  notification.style.backgroundColor = success ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"; // Verde pentru succes, roșu pentru eroare
  notification.classList.remove("hidden");
  notification.classList.add("show");

  setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
          notification.classList.add("hidden");
      }, 500);
  }, 4000); // Se ascunde după 3 secunde
}