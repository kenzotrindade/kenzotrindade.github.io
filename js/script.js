// Cursor Glow Effect
const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Terminal Text Animation
const typingText = document.getElementById("terminal-text");
const commands = [
  "npm run dev",
  'git commit -m "feat: new feature"',
  "docker-compose up",
  "python app.py",
  "bash deploy.sh",
  "git push origin main",
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeCommand() {
  const currentCommand = commands[commandIndex];

  if (!isDeleting && charIndex <= currentCommand.length) {
    typingText.textContent = currentCommand.substring(0, charIndex);
    charIndex++;
    setTimeout(typeCommand, 80);
  } else if (!isDeleting && charIndex > currentCommand.length) {
    setTimeout(() => {
      isDeleting = true;
      typeCommand();
    }, 2000);
  } else if (isDeleting && charIndex > 0) {
    typingText.textContent = currentCommand.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(typeCommand, 40);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    commandIndex = (commandIndex + 1) % commands.length;
    setTimeout(typeCommand, 500);
  }
}

// Start terminal animation after page load
setTimeout(typeCommand, 1000);

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all cards for animation on scroll
document
  .querySelectorAll(".skill-card, .project-card, .contact-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

// Security: Prevent right-click on sensitive content (optional)
// Uncomment if you want to protect images/content
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
*/

// Add active state to navigation on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Disable cursor glow on mobile devices for performance
if (window.matchMedia("(max-width: 768px)").matches) {
  cursorGlow.style.display = "none";
}

// Performance: Debounce scroll events
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = window.requestAnimationFrame(() => {
    // Add any scroll-based animations here
  });
});

// Sanitize external links (security best practice)
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  if (!link.hasAttribute("rel")) {
    link.setAttribute("rel", "noopener noreferrer");
  }
});

// Console Message (Easter Egg for developers)
console.log(
  "%c👋 Hello Developer!",
  "color: #00f5ff; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cIntéressé par le code ? Retrouvez-moi sur GitHub!",
  "color: #7b2ff7; font-size: 14px;"
);
