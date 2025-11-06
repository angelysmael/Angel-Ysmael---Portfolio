document.addEventListener('DOMContentLoaded', () => {
  // --- Project card toggles (CP & VM pages) ---
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle');
    if (!btn) return;

    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    btn.setAttribute('aria-expanded', String(!expanded));
    btn.textContent = expanded ? 'Show details' : 'Hide details';
    panel.hidden = expanded;
    panel.classList.toggle('show', !expanded);
  });

  // --- Contact form validation (Contact page only) ---
  const form = document.getElementById('contact-form');
  if (form) {
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      message: document.getElementById('message'),
    };
    const errs = {
      name: document.getElementById('name-err'),
      email: document.getElementById('email-err'),
      message: document.getElementById('message-err'),
    };
    const status = document.getElementById('form-status');

    const setError = (k, msg) => {
      fields[k].setAttribute('aria-invalid', 'true');
      errs[k].textContent = msg;
    };
    const clearError = (k) => {
      fields[k].removeAttribute('aria-invalid');
      errs[k].textContent = '';
    };

    const validate = () => {
      let ok = true;
      if (!fields.name.value.trim()) { setError('name', 'Please enter your name.'); ok = false; } else clearError('name');
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim());
      if (!emailOk) { setError('email', 'Enter a valid email (e.g., name@example.com).'); ok = false; } else clearError('email');
      if (fields.message.value.trim().length < 10) { setError('message', 'Message should be at least 10 characters.'); ok = false; } else clearError('message');
      return ok;
    };

    form.addEventListener('submit', (e) => {
      if (!validate()) {
        e.preventDefault();
        status.textContent = 'Please fix the errors above.';
        form.querySelector('[aria-invalid="true"]')?.focus();
      } else {
        e.preventDefault();
        status.textContent = 'Thanks! Your message is valid and ready to send.';
      }
    });

    form.addEventListener('input', validate);
    form.addEventListener('blur', validate, true);
  }
});
