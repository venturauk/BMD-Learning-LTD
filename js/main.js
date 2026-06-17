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

  // Contact form: compose an email to BMD Learning via the visitor's mail app
  var form = document.getElementById('contact-form');
  if (form) {
    var RECIPIENT = 'david@frontandcentre.com';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Native browser validation for required fields
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) {
        return;
      }

      var val = function (id) {
        var el = form.querySelector('#' + id);
        return el && el.value ? el.value.trim() : '';
      };

      var name = val('name');
      var org = val('organisation');
      var email = val('email');
      var phone = val('phone');
      var interest = val('interest');
      var message = val('message');

      var subject = 'Website enquiry from ' + (name || 'a visitor') +
        (org ? ' (' + org + ')' : '');

      var lines = [
        'Name: ' + name,
        'Organisation: ' + (org || '-'),
        'Email: ' + email,
        'Phone: ' + (phone || '-'),
        'Interested in: ' + (interest || '-'),
        '',
        'Message:',
        message,
        '',
        '-- Sent from the BMD Learning website contact form'
      ];

      var href = 'mailto:' + RECIPIENT +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      var status = document.getElementById('form-status');
      if (status) {
        status.innerHTML = 'Thanks, ' + (name ? name.split(' ')[0] : 'there') +
          '. Your email app should now open with your enquiry ready to send. ' +
          'If nothing happens, email us directly at ' +
          '<a href="mailto:' + RECIPIENT + '">' + RECIPIENT + '</a>.';
        status.classList.add('show', 'ok');
      }
    });
  }
})();
