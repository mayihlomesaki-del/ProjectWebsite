const menuToggle = document.querySelector(".arena-menu-toggle");
const header = document.querySelector(".arena-header");

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    header.classList.toggle("arena-menu-open", !isOpen);
  });

  document.querySelector(".arena-nav")?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      header.classList.remove("arena-menu-open");
    }
  });
}

document.querySelectorAll(".arena-year, #arena-year").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const bookingForm = document.querySelector("#arena-booking-form");

if (bookingForm) {
  const dateField = bookingForm.elements.namedItem("date");
  dateField.min = new Date().toISOString().slice(0, 10);

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const details = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Session: ${formData.get("session")}`,
      `Preferred date: ${formData.get("date") || "Flexible"}`,
      `Group size: ${formData.get("groupSize") || "Not specified"}`,
      `Notes: ${formData.get("notes") || "None"}`,
    ].join("\n");
    const subject = encodeURIComponent(`Gaming booking enquiry — ${formData.get("session")}`);
    const body = encodeURIComponent(details);

    window.location.href = `mailto:hello@nextlevelgaming.com?subject=${subject}&body=${body}`;
  });
}
