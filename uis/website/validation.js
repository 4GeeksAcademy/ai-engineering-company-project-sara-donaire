// Nexova - talent pool registration form validation.
// Field names, rules and error messages follow BRIEFING.md.
// Validates on blur and while typing (once a field has been touched),
// blocks submission while there are errors and simulates a successful submission.

(function () {
  'use strict';

  const form = document.getElementById('talent-form');
  if (!form) return;

  const successBox = document.getElementById('form-success');
  const errorBox = document.getElementById('form-errors');
  const errorCount = document.getElementById('form-errors-count');
  const commentsCount = document.getElementById('comments-count');

  const COMMENTS_MAX = 500;
  // At least two words made of letters (accents, apostrophes and hyphens allowed).
  const WORD_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+$/;
  // Something before @, a domain name, a dot and an extension of 2+ letters.
  const EMAIL_PATTERN = /^[^\s@]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  // + followed by a country code (1-3 digits), then the number (digits and spaces, 6-14 digits).
  const PHONE_PATTERN = /^\+\d{1,3}(\s?\d){6,14}$/;

  const MESSAGES = {
    fullName: 'Name must contain at least first and last name',
    email: 'Enter a valid email (example: name@company.com)',
    phone: 'Phone must include country code (example: +34 612 345 678)',
    country: 'Select your country of residence',
    yearsExperience: 'Years of experience must be between 0 and 50',
    sector: 'Select your sector of interest',
    englishLevel: 'Indicate your English level',
    availability: 'Select your availability',
    linkedin: 'If you include LinkedIn, it must be a valid URL',
    comments: (remaining) => `Comments cannot exceed 500 characters (${remaining} remaining)`,
    dataPolicy: 'You must accept the data processing policy to continue'
  };

  function isValidUrl(value) {
    if (!/^https?:\/\//i.test(value)) return false;
    try {
      const url = new URL(value);
      return url.hostname.includes('.');
    } catch (error) {
      return false;
    }
  }

  // Each rule returns an error message, or an empty string when the value is valid.
  const rules = {
    fullName(value) {
      const words = value.split(/\s+/).filter(Boolean);
      const valid = words.length >= 2 && words.every((word) => WORD_PATTERN.test(word));
      return valid ? '' : MESSAGES.fullName;
    },
    email(value) {
      return EMAIL_PATTERN.test(value) ? '' : MESSAGES.email;
    },
    phone(value) {
      return PHONE_PATTERN.test(value) ? '' : MESSAGES.phone;
    },
    country(value) {
      return value ? '' : MESSAGES.country;
    },
    yearsExperience(value) {
      if (value === '') return MESSAGES.yearsExperience;
      const years = Number(value);
      const valid = Number.isInteger(years) && years >= 0 && years <= 50;
      return valid ? '' : MESSAGES.yearsExperience;
    },
    sector(value) {
      return value ? '' : MESSAGES.sector;
    },
    englishLevel(value) {
      return value ? '' : MESSAGES.englishLevel;
    },
    availability(value) {
      return value ? '' : MESSAGES.availability;
    },
    linkedin(value) {
      // Optional: only validated when something has been typed.
      if (!value) return '';
      return isValidUrl(value) ? '' : MESSAGES.linkedin;
    },
    comments(_value, field) {
      // Optional: only the length is limited. Counted without trimming.
      const remaining = COMMENTS_MAX - field.value.length;
      return remaining >= 0 ? '' : MESSAGES.comments(remaining);
    },
    dataPolicy(_value, field) {
      return field.checked ? '' : MESSAGES.dataPolicy;
    }
  };

  const touched = new Set();

  // Radio buttons share one name, so they come back as a list.
  function controlsOf(name) {
    const element = form.elements[name];
    return element instanceof RadioNodeList ? Array.from(element) : [element];
  }

  function valueOf(name) {
    const element = form.elements[name];
    if (element instanceof RadioNodeList) return element.value;
    if (element.type === 'checkbox') return '';
    return element.value.trim();
  }

  function showError(name, message) {
    const errorEl = document.getElementById(`${name}-error`);
    controlsOf(name).forEach((control) => control.setAttribute('aria-invalid', message ? 'true' : 'false'));
    errorEl.textContent = message;
    errorEl.classList.toggle('hidden', !message);
    if (name === 'availability') {
      const group = document.getElementById('availability-group');
      group.classList.toggle('border-red-600', Boolean(message));
      group.classList.toggle('border-slate-200', !message);
    }
  }

  function validateField(name) {
    const message = rules[name](valueOf(name), form.elements[name]);
    showError(name, message);
    return message === '';
  }

  function clearField(name) {
    controlsOf(name).forEach((control) => control.removeAttribute('aria-invalid'));
    const errorEl = document.getElementById(`${name}-error`);
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
    if (name === 'availability') {
      const group = document.getElementById('availability-group');
      group.classList.remove('border-red-600');
      group.classList.add('border-slate-200');
    }
  }

  function updateCommentsCount() {
    const remaining = COMMENTS_MAX - form.elements.comments.value.length;
    commentsCount.textContent = `${remaining} characters remaining`;
    commentsCount.classList.toggle('text-red-700', remaining < 0);
    commentsCount.classList.toggle('font-semibold', remaining < 0);
    commentsCount.classList.toggle('text-slate-600', remaining >= 0);
  }

  Object.keys(rules).forEach((name) => {
    controlsOf(name).forEach((control) => {
      const usesChange = control.tagName === 'SELECT' || control.type === 'checkbox' || control.type === 'radio';

      control.addEventListener('blur', () => {
        // For radios, wait until focus has left the whole group.
        if (control.type === 'radio') return;
        touched.add(name);
        validateField(name);
      });

      control.addEventListener(usesChange ? 'change' : 'input', () => {
        if (usesChange || name === 'comments') touched.add(name);
        if (touched.has(name)) validateField(name);
        if (name === 'comments') updateCommentsCount();
      });
    });
  });

  // Radio group: validate when focus leaves the group.
  document.getElementById('availability-group').addEventListener('focusout', (event) => {
    const group = event.currentTarget;
    if (!group.contains(event.relatedTarget)) {
      touched.add('availability');
      validateField('availability');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successBox.classList.add('hidden');

    const invalid = Object.keys(rules).filter((name) => {
      touched.add(name);
      return !validateField(name);
    });

    if (invalid.length > 0) {
      errorCount.textContent = invalid.length === 1
        ? '1 field needs your attention.'
        : `${invalid.length} fields need your attention.`;
      errorBox.classList.remove('hidden');
      controlsOf(invalid[0])[0].focus();
      return;
    }

    // No backend yet: simulate a successful submission.
    errorBox.classList.add('hidden');
    form.reset();
    successBox.classList.remove('hidden');
    successBox.focus();
  });

  // "Clear form" button: the browser empties the fields; we also clear messages and states.
  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      touched.clear();
      Object.keys(rules).forEach(clearField);
      errorBox.classList.add('hidden');
      updateCommentsCount();
    }, 0);
  });
})();
