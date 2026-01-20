(function () {
    'use strict';

    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    const focusableLinks = nav.querySelectorAll('a');

    function openNav() {
        nav.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
    }

    function closeNav() {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
    }

    toggle.addEventListener('click', function () {
        if (nav.classList.contains('open')) closeNav();
        else openNav();
    });

    // Close when a nav link is activated (useful for single-page anchors)
    focusableLinks.forEach(link => link.addEventListener('click', function () {
        // small delay to allow native anchor jump before closing
        setTimeout(closeNav, 150);
    }));

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            closeNav();
            toggle.focus();
        }
    });

    // Close when clicking outside the nav on small screens
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('open')) {
            closeNav();
        }
    });
})();