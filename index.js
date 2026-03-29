document.addEventListener("DOMContentLoaded", () => {
  VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x333333,
    backgroundColor: 0x0,
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document
    .querySelectorAll(".skill-card, .folder")
    .forEach((el) => observer.observe(el));
});

function toggleFolder(el) {
  const isActive = el.classList.contains("active");
  document
    .querySelectorAll(".folder")
    .forEach((f) => f.classList.remove("active"));
  if (!isActive) el.classList.add("active");
}
