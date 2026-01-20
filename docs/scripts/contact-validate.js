(function () {
    'use strict';

    function setError(el, message) {
        const err = document.getElementById(el.id + '-error');
        if (err) err.textContent = message || '';
        if (message) el.classList.add('input-error'); else el.classList.remove('input-error');
    }

    function validateName(value) {
        return value.trim().length >= 2;
    }

    function validateEmail(value) {
        // simple email check
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    function validateMessage(value) {
        return value.trim().length >= 10;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const status = document.getElementById('contact-status');

        // Real-time feedback
        if (name) {
            name.addEventListener('input', function () {
                setError(name, validateName(name.value) ? '' : 'Please enter your full name (2+ characters).');
            });
        }

        if (email) {
            email.addEventListener('input', function () {
                setError(email, validateEmail(email.value) ? '' : 'Please enter a valid email address.');
            });
        }

        if (message) {
            message.addEventListener('input', function () {
                setError(message, validateMessage(message.value) ? '' : 'Please enter a message (10+ characters).');
            });
        }

        form.addEventListener('submit', function (e) {
            // prevent default submission to validate first
            e.preventDefault();

            let valid = true;

            if (!validateName(name.value)) {
                setError(name, 'Please enter your full name (2+ characters).');
                valid = false;
            } else setError(name, '');

            if (!validateEmail(email.value)) {
                setError(email, 'Please enter a valid email address.');
                valid = false;
            } else setError(email, '');

            if (!validateMessage(message.value)) {
                setError(message, 'Please enter a message (10+ characters).');
                valid = false;
            } else setError(message, '');

            // honeypot check (should be empty)
            const website = document.getElementById('website');
            if (website && website.value.trim() !== '') {
                // silently fail as bot
                valid = false;
            }

            if (!valid) {
                if (status) {
                    status.classList.remove('sr-only');
                    status.textContent = 'Please fix the errors in the form.';
                }
                return;
            }

            // show basic success feedback; integration with backend can replace this block
            if (status) {
                status.classList.remove('sr-only');
                status.textContent = 'Thanks — your message appears valid. Sending...';
            }

            // Optionally: send via fetch to /api/contact (uncomment and adapt server endpoint)
            // fetch(form.action, { method: 'POST', body: new FormData(form) })
            //   .then(r => { status.textContent = 'Message sent.'; form.reset(); })
            //   .catch(() => { status.textContent = 'There was an error sending your message.'; });

            // For now: simulate success and clear form
            setTimeout(function () {
                if (status) status.textContent = 'Message validated locally — form ready to submit.';
                form.reset();
            }, 600);
        });
    });
})();