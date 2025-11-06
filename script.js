document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle")) {
    const details = document.getElementById(e.target.getAttribute("aria-controls"));
    const expanded = e.target.getAttribute("aria-expanded") === "true";

    e.target.setAttribute("aria-expanded", String(!expanded));
    e.target.textContent = expanded ? "Show details" : "Hide details";
    details.hidden = expanded ? true : false;
    details.classList.toggle("show");
  }
});
