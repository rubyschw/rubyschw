/** Sidebar Dropdown Menu */

const dropdown = document.querySelector('.dropdown');
const toggle = document.getElementById('portfolio-toggle');

toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

/** Slideshow Functionality */

document.querySelectorAll('[data-slideshow]').forEach((slideshow) => {
    const slides = slideshow.querySelectorAll('.slide');
    const prevBtn = slideshow.querySelector('.prev');
    const nextBtn = slideshow.querySelector('.next');
    let current = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        });
    };

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    });
});

/** Fullscreen */
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("fullscreenOverlay");
    const fullscreenImg = document.getElementById("fullscreenImage");
    const fullscreenCaption = document.getElementById("fullscreenCaption");
    const closeBtn = document.getElementById("closeOverlay");

    let scrollY = 0;

    function openFullscreen(img) {
        fullscreenImg.src = img.src;
        fullscreenImg.alt = img.alt;

        const caption = img.closest("figure")?.querySelector("figcaption");
        fullscreenCaption.textContent = caption ? caption.textContent : "";

        scrollY = window.scrollY;

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';

        overlay.classList.add("active");
    }

    function closeFullscreen() {
        overlay.classList.remove("active");

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);

        setTimeout(() => {
            fullscreenImg.src = "";
            fullscreenCaption.textContent = "";
        }, 300);
    }

    document.querySelectorAll(".image-grid img").forEach(img => {
        img.addEventListener("click", () => openFullscreen(img));
    });

    closeBtn.addEventListener("click", closeFullscreen);

    overlay.addEventListener("click", e => {
        if (e.target === overlay) closeFullscreen();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeFullscreen();
    });
});
