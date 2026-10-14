const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const backToTop = document.getElementById("back-to-top");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Año automático del pie de página
document.getElementById("year").textContent = new Date().getFullYear();

// Menú para teléfonos y tabletas
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Cerrar el menú después de seleccionar una sección
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

// Mostrar el botón de volver arriba
window.addEventListener("scroll", () => {
  if (window.scrollY > 450) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Preparar el mensaje del formulario
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const asunto = document.getElementById("asunto").value;
  const mensaje = document.getElementById("mensaje").value.trim();

  const texto = [
    "CONSULTA PARA ECOVIDA",
    "---------------------",
    `Nombre: ${nombre}`,
    `Correo: ${correo}`,
    `Asunto: ${asunto}`,
    "",
    "Mensaje:",
    mensaje
  ].join("\n");

  formStatus.textContent = "Preparando tu mensaje...";

  try {
    await navigator.clipboard.writeText(texto);

    formStatus.textContent =
      "¡Mensaje preparado y copiado! Ahora puedes pegarlo en tu correo o aplicación de mensajería.";
  } catch (error) {
    formStatus.textContent =
      "No se pudo copiar automáticamente. Puedes copiar tus datos y mensaje manualmente.";
  }
});