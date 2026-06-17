/* BMD Learning site interactions */
(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Sticky header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // Contact form: submit to HubSpot's Forms API (keeps our own styling/markup)
  var form = document.getElementById('contact-form');
  if (form) {
    var PORTAL_ID = '144888725';
    var FORM_GUID = 'f8a9b017-3f34-4eff-885b-b4d25455083a';
    var ENDPOINT = 'https://api-eu1.hsforms.com/submissions/v3/integration/submit/' +
      PORTAL_ID + '/' + FORM_GUID;
    var status = document.getElementById('form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    var setStatus = function (msg, ok) {
      if (!status) return;
      status.innerHTML = msg;
      status.classList.add('show');
      status.classList.toggle('ok', !!ok);
      status.classList.toggle('err', !ok);
    };

    var val = function (id) {
      var el = form.querySelector('#' + id);
      return el && el.value ? el.value.trim() : '';
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
        return;
      }

      var fields = [
        { name: 'firstname', value: val('firstname') },
        { name: 'lastname', value: val('lastname') },
        { name: 'email', value: val('email') },
        { name: 'message', value: val('message') }
      ];
      var phone = val('phone');
      if (phone) { fields.push({ name: 'phone', value: phone }); }
      var interest = val('interest');
      if (interest) {
        fields.push({ name: 'what_are_you_interested_in_hearing_more_about_', value: interest });
      }

      var payload = {
        fields: fields,
        context: { pageUri: window.location.href, pageName: document.title }
      };
      var hutk = (document.cookie.match(/hubspotutk=([^;]+)/) || [])[1];
      if (hutk) { payload.context.hutk = hutk; }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '.65'; }
      setStatus('Sending your enquiry…', true);

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (res.ok) {
          var first = val('firstname');
          form.reset();
          setStatus('Thanks' + (first ? ', ' + first : '') +
            '. Your enquiry has been received and a member of the BMD Learning team will be in touch shortly.', true);
        } else {
          setStatus('Sorry, something went wrong sending your enquiry. Please email us directly at ' +
            '<a href="mailto:info@bmdlearning.com">info@bmdlearning.com</a>.', false);
        }
      }).catch(function () {
        setStatus('Sorry, something went wrong sending your enquiry. Please email us directly at ' +
          '<a href="mailto:info@bmdlearning.com">info@bmdlearning.com</a>.', false);
      }).then(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = ''; }
      });
    });
  }
})();
