(function(){
  const burger = document.querySelector("[data-burger]");
  const mobile = document.querySelector("[data-mobile]");
  if (burger && mobile){
    burger.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Active nav link (simple match)
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav] a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });
  document.querySelectorAll("[data-mobile] a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // Contact form: open mail client with a prefilled email (no backend required)
  const form = document.querySelector("[data-contact-form]");
  const toast = document.querySelector("[data-toast]");
  function showToast(title, msg){
    if (!toast) return;
    toast.querySelector(".t").textContent = title;
    toast.querySelector(".m").textContent = msg;
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"), 5000);
  }
  if (form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const company = (data.get("company") || "").toString().trim();
      const role = (data.get("role") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      const subject = encodeURIComponent("FPrimeAI Demo Request");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nRole: ${role}\n\nMessage:\n${message}\n`
      );

      // Change this to your sales inbox
      const to = "sales@fprime.ai";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      showToast("Opening your email app", "We prepared a demo request email. Replace the recipient if needed.");
      form.reset();
    });
  }
})();
