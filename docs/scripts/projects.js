(function () {
    'use strict';

    // Expose filterProjects to global scope as requested
    window.filterProjects = function (category) {
        const projects = document.querySelectorAll('.projects [role="listitem"]');
        if (!projects) return;

        projects.forEach(p => {
            const cat = p.getAttribute('data-category') || '';
            if (category === 'all' || category === '' || cat === category) {
                p.style.display = '';
                p.setAttribute('aria-hidden', 'false');
            } else {
                p.style.display = 'none';
                p.setAttribute('aria-hidden', 'true');
            }
        });

        // update aria-pressed state for filter buttons
        const buttons = document.querySelectorAll('.project-filters .filter-btn');
        buttons.forEach(btn => {
            const btnCat = btn.getAttribute('data-category') || '';
            btn.setAttribute('aria-pressed', btnCat === category ? 'true' : 'false');
        });
    };

    // Wire filter buttons
    document.addEventListener('DOMContentLoaded', function () {
        const buttons = document.querySelectorAll('.project-filters .filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function () {
                const cat = btn.getAttribute('data-category') || 'all';
                window.filterProjects(cat);
            });
        });

        // Initialize to "all"
        window.filterProjects('all');

        // Lightbox logic
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxClose = document.querySelector('.lightbox-close');
        let lastFocused = null;

        function openLightbox(src, alt, captionText) {
            if (!lightbox || !lightboxImage) return;
            lastFocused = document.activeElement;
            lightboxImage.src = src;
            lightboxImage.alt = alt || '';
            lightboxCaption.textContent = captionText || '';
            lightbox.setAttribute('aria-hidden', 'false');
            lightboxClose.focus();
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            if (!lightbox) return;
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxImage.src = '';
            lightboxCaption.textContent = '';
            document.body.style.overflow = '';
            if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
        }

        // Click thumbnails to open lightbox
        const thumbs = document.querySelectorAll('.project-thumb');
        thumbs.forEach(t => {
            t.style.cursor = 'zoom-in';
            t.addEventListener('click', function (e) {
                const img = e.currentTarget;
                const figure = img.closest('figure');
                const caption = figure ? (figure.querySelector('figcaption') ? figure.querySelector('figcaption').innerText : '') : '';
                openLightbox(img.src, img.alt, caption);
            });
        });

        // Close handlers
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightbox) {
            lightbox.addEventListener('click', function (e) {
                // Close when clicking the backdrop (but not when clicking the content)
                if (e.target === lightbox) closeLightbox();
            });
        }

        // ESC to close
        document.addEventListener('keydown', function (e) {
            if ((e.key === 'Escape' || e.key === 'Esc') && lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
                closeLightbox();
            }
        });
    });
})();