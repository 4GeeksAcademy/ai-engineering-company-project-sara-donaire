// Nexova Solutions - candidate application form validation.
// Validates every field on blur and while typing (once a field has been touched),
// blocks submission while there are errors and simulates a successful submission.

(function () {
  'use strict';

  const form = document.getElementById('application-form');
  if (!form) return;

  const successBox = document.getElementById('form-success');
  const errorBox = document.getElementById('form-errors');
  const errorCount = document.getElementById('form-errors-count');
  const summaryCount = document.getElementById('summary-count');

  const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_PATTERN = /^\+\d{1,3}[\d ]{6,14}$/;
  const LINKEDIN_PATTERN = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]{3,100}\/?$/;
  const CV_EXTENSIONS = ['pdf', 'docx'];
  const CV_MAX_BYTES = 5 * 1024 * 1024;

  function todayISO() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 10);
  }

  function inOneYearISO() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  }

  // Each rule returns an error message, or an empty string when the value is valid.
  const rules = {
    firstName(value) {
      if (!value) return 'Enter your first name.';
      if (value.length < 2) return 'Your first name must have at least 2 characters.';
      if (!NAME_PATTERN.test(value)) return 'Use letters only (spaces, hyphens and apostrophes are allowed).';
      return '';
    },
    lastName(value) {
      if (!value) return 'Enter your last name.';
      if (value.length < 2) return 'Your last name must have at least 2 characters.';
      if (!NAME_PATTERN.test(value)) return 'Use letters only (spaces, hyphens and apostrophes are allowed).';
      return '';
    },
    email(value) {
      if (!value) return 'Enter your email address.';
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address, for example name@company.com.';
      return '';
    },
    phone(value) {
      if (!value) return 'Enter your phone number.';
      if (!value.startsWith('+')) return 'Start with the country code, for example +34 or +1.';
      if (!PHONE_PATTERN.test(value)) return 'Use only digits and spaces after the country code (8 to 15 digits).';
      const country = form.elements.country.value;
      const digits = value.replace(/\D/g, '');
      if (country === 'ES' && !(digits.startsWith('34') && digits.length === 11)) {
        return 'A Spanish number has the code +34 followed by 9 digits.';
      }
      if (country === 'US' && !(digits.startsWith('1') && digits.length === 11)) {
        return 'A US number has the code +1 followed by 10 digits.';
      }
      return '';
    },
    country(value) {
      return value ? '' : 'Select the country where you live.';
    },
    city(value) {
      if (!value) return 'Enter the city where you live.';
      if (value.length < 2) return 'The city name must have at least 2 characters.';
      if (!NAME_PATTERN.test(value)) return 'The city name can only contain letters, spaces and hyphens.';
      return '';
    },
    desiredRole(value) {
      if (!value) return 'Tell us which role you are looking for.';
      if (value.length < 3) return 'The role must have at least 3 characters.';
      return '';
    },
    sector(value) {
      return value ? '' : 'Select the sector you work in.';
    },
    seniority(value) {
      return value ? '' : 'Select your seniority level.';
    },
    yearsExperience(value) {
      if (value === '') return 'Enter your years of professional experience.';
      const years = Number(value);
      if (!Number.isInteger(years)) return 'Enter a whole number of years.';
      if (years < 0 || years > 50) return 'Years of experience must be between 0 and 50.';
      const seniority = form.elements.seniority.value;
      if (seniority === 'senior-management' && years < 5) return 'Senior management profiles need at least 5 years of experience.';
      if (seniority === 'executive' && years < 8) return 'Executive profiles need at least 8 years of experience.';
      return '';
    },
    englishLevel(value) {
      return value ? '' : 'Select your English level.';
    },
    salaryExpectation(value) {
      if (value === '') return 'Enter your gross annual salary expectation.';
      const amount = Number(value);
      if (!Number.isFinite(amount)) return 'Enter the amount as a number, without dots or commas.';
      if (amount < 20000) return 'The minimum salary expectation we accept is 20,000 per year.';
      if (amount > 400000) return 'The maximum salary expectation we accept is 400,000 per year.';
      return '';
    },
    availableFrom(value) {
      if (!value) return 'Select the date you could start.';
      if (value < todayISO()) return 'The date cannot be in the past.';
      if (value > inOneYearISO()) return 'Choose a date within the next 12 months.';
      return '';
    },
    linkedinUrl(value) {
      if (!value) return 'Enter the URL of your LinkedIn profile.';
      if (!value.startsWith('https://')) return 'The URL must start with https://';
      if (!LINKEDIN_PATTERN.test(value)) return 'Use your public profile URL, for example https://www.linkedin.com/in/your-name';
      return '';
    },
    cv(_value, field) {
      const file = field.files && field.files[0];
      if (!file) return 'Attach your CV.';
      const extension = file.name.split('.').pop().toLowerCase();
      if (!CV_EXTENSIONS.includes(extension)) return 'Your CV must be a PDF or DOCX file.';
      if (file.size > CV_MAX_BYTES) return 'Your CV is larger than 5 MB. Please attach a smaller file.';
      return '';
    },
    summary(value) {
      if (!value) return 'Write a short summary of your experience.';
      if (value.length < 50) return `Write at least 50 characters (${50 - value.length} more).`;
      if (value.length > 1000) return 'The summary cannot be longer than 1,000 characters.';
      return '';
    },
    privacyConsent(_value, field) {
      return field.checked ? '' : 'You need to accept the privacy terms so we can store your application.';
    }
  };

  // Fields whose validity depends on another field.
  const dependants = {
    country: ['phone'],
    seniority: ['yearsExperience']
  };

  const touched = new Set();

  function showError(field, message) {
    const errorEl = document.getElementById(`${field.id}-error`);
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    } else {
      field.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
  }

  function validateField(name) {
    const field = form.elements[name];
    const value = field.type === 'checkbox' || field.type === 'file' ? '' : field.value.trim();
    const message = rules[name](value, field);
    showError(field, message);
    return message === '';
  }

  function clearField(name) {
    const field = form.elements[name];
    field.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(`${field.id}-error`);
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }

  function updateSummaryCount() {
    summaryCount.textContent = `${form.elements.summary.value.length} / 1000`;
  }

  Object.keys(rules).forEach((name) => {
    const field = form.elements[name];

    field.addEventListener('blur', () => {
      touched.add(name);
      validateField(name);
    });

    const liveEvent = field.tagName === 'SELECT' || field.type === 'checkbox' || field.type === 'file' || field.type === 'date' ? 'change' : 'input';
    field.addEventListener(liveEvent, () => {
      if (liveEvent === 'change') touched.add(name);
      if (touched.has(name)) validateField(name);
      (dependants[name] || []).forEach((dependant) => {
        if (touched.has(dependant)) validateField(dependant);
      });
      if (name === 'summary') updateSummaryCount();
    });
  });

  // Restrict the date picker to the allowed window.
  form.elements.availableFrom.min = todayISO();
  form.elements.availableFrom.max = inOneYearISO();

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
      form.elements[invalid[0]].focus();
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
      updateSummaryCount();
    }, 0);
  });
})();
