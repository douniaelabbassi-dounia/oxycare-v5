/* OxyCare – proposition 5 */
const WHATSAPP = "212677447844";
const DEFAULT_MSG = "Bonjour OxyCare, je souhaite des informations.";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const waLink = text => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text || DEFAULT_MSG)}`;

/* Liens WhatsApp pré-remplis */
$$("[data-wa]").forEach(a => {
  a.href = waLink(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});

/* Menu mobile */
const burger = $("#burger"), nav = $("#nav");
const setMenu = open => {
  nav.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
};
burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
$$("a", nav).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* Apparition douce */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));
} else {
  $$(".reveal").forEach(el => el.classList.add("is-visible"));
}

/* Formulaire → WhatsApp */
const form = $("#contactForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  const ok = form.name.value.trim() && form.phone.value.replace(/\D/g, "").length >= 9 && form.type.value;
  $("#formError").classList.toggle("is-visible", !ok);
  $("#formOk").classList.remove("is-visible");
  if (!ok) return;
  const msg = [
    "Bonjour OxyCare,",
    `Demande : ${form.type.value}`,
    form.zone.value && `Secteur : ${form.zone.value}`,
    `Nom : ${form.name.value.trim()}`,
    `Numéro : ${form.phone.value.trim()}`,
    form.message.value.trim() && `Message : ${form.message.value.trim()}`,
  ].filter(Boolean).join("\n");
  window.open(waLink(msg), "_blank", "noopener");
  $("#formOk").classList.add("is-visible");
});

$$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
