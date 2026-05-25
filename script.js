console.log("script loaded");

/* =========================
   COUNTDOWN
========================= */

const LAUNCH_DATE =
    new Date("Nov 1, 2025 07:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateCountdown() {

    const now = new Date().getTime();

    const distance = LAUNCH_DATE - now;

    const days =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

    daysEl.textContent = formatTime(days);
    hoursEl.textContent = formatTime(hours);
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* =========================
   PAGE NAVIGATION
========================= */

const pages = {
    countdown: document.getElementById("countdown-page"),
    rundown: document.getElementById("rundown-page"),
    gallery: document.getElementById("gallery-page")
};

const navButtons = {
    countdown: document.getElementById("show-countdown"),
    rundown: document.getElementById("show-rundown"),
    gallery: document.getElementById("show-gallery")
};

function switchPage(targetPage) {

    Object.values(pages).forEach(page => {
        page.classList.add("hidden");
    });

    Object.values(navButtons).forEach(button => {
        button.classList.remove("active");
    });

    pages[targetPage].classList.remove("hidden");

    navButtons[targetPage].classList.add("active");
}

Object.keys(navButtons).forEach(key => {

    navButtons[key].addEventListener("click", () => {
        switchPage(key);
    });

});

switchPage("countdown");

/* =========================
   GALLERY
========================= */

const GALLERY_IMAGES = [

    {
        src: "assets/villa1.jpeg",
        alt: "Villa 1"
    },

    {
        src: "assets/villa2.jpeg",
        alt: "Villa 2"
    },

    {
        src: "assets/villa3.jpeg",
        alt: "Villa 3"
    }

];

const galleryGrid =
    document.getElementById("gallery-grid");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightbox-image");

const lightboxCaption =
    document.querySelector(".lightbox-caption");

const imageCounter =
    document.querySelector(".image-counter");

const closeBtn =
    document.querySelector(".close-btn");

const prevBtn =
    document.querySelector(".prev-btn");

const nextBtn =
    document.querySelector(".next-btn");

let currentIndex = 0;

/* CREATE GALLERY */

function createGallery() {

    galleryGrid.innerHTML = "";

    GALLERY_IMAGES.forEach((image, index) => {

        const img = document.createElement("img");

        img.src = image.src;

        img.alt = image.alt;

        img.classList.add("gallery-item");

        img.addEventListener("click", () => {
            openLightbox(index);
        });

        galleryGrid.appendChild(img);

    });
}

/* LIGHTBOX */

function updateLightboxContent() {

    const currentItem =
        GALLERY_IMAGES[currentIndex];

    lightboxImage.src = currentItem.src;

    lightboxCaption.textContent =
        currentItem.alt;

    imageCounter.textContent =
        `${currentIndex + 1} / ${GALLERY_IMAGES.length}`;
}

function openLightbox(index) {

    currentIndex = index;

    updateLightboxContent();

    lightbox.classList.remove("hidden");

    document.body.style.overflow = "hidden";
}

function closeLightbox() {

    lightbox.classList.add("hidden");

    document.body.style.overflow = "";
}

if (prevBtn) {

    prevBtn.addEventListener("click", () => {

        currentIndex =
            (currentIndex - 1 + GALLERY_IMAGES.length)
            % GALLERY_IMAGES.length;

        updateLightboxContent();

    });

}

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        currentIndex =
            (currentIndex + 1)
            % GALLERY_IMAGES.length;

        updateLightboxContent();

    });

}

if (closeBtn) {

    closeBtn.addEventListener("click", () => {
        closeLightbox();
    });

}

document.addEventListener("keydown", (e) => {

    if (
        e.key === "Escape" &&
        !lightbox.classList.contains("hidden")
    ) {
        closeLightbox();
    }

});

createGallery();

/* =========================
   MAPS BUTTON
========================= */

const mapsLink =
    document.querySelector(".click-maps-link");

if (mapsLink) {

    mapsLink.addEventListener("click", (e) => {

        e.preventDefault();

        switchPage("gallery");

        setTimeout(() => {

            const target =
                document.getElementById("lokasi-villa");

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 100);

    });

}
