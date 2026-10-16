"use strict";

const PHONE = "8303746358";
const WHATSAPP = "918303746358";


// LANGUAGE

let currentLanguage = "hi";

try {
    currentLanguage =
        localStorage.getItem("rajlaxmi-language") === "en"
            ? "en"
            : "hi";
} catch (error) {
    currentLanguage = "hi";
}

const languageBtn = document.getElementById("languageBtn");

function applyLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-hi][data-en]").forEach(element => {

        element.textContent =
            language === "hi"
                ? element.dataset.hi
                : element.dataset.en;

    });

    languageBtn.textContent = language === "hi" ? "EN" : "हिं";

    try {
        localStorage.setItem("rajlaxmi-language", language);
    } catch (error) {
        // Continue without storage.
    }
}

languageBtn.addEventListener("click", () => {

    applyLanguage(currentLanguage === "hi" ? "en" : "hi");

});

applyLanguage(currentLanguage);


// THEME

const themeBtn = document.getElementById("themeBtn");

let currentTheme = "dark";

try {
    currentTheme =
        localStorage.getItem("rajlaxmi-theme") === "light"
            ? "light"
            : "dark";
} catch (error) {
    currentTheme = "dark";
}

function applyTheme(theme) {

    currentTheme = theme;

    document.body.dataset.theme = theme;

    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";

    try {
        localStorage.setItem("rajlaxmi-theme", theme);
    } catch (error) {
        // Continue without storage.
    }
}

themeBtn.addEventListener("click", () => {

    applyTheme(currentTheme === "dark" ? "light" : "dark");

});

applyTheme(currentTheme);


// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

function closeMenu() {

    navMenu.classList.remove("open");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {

    const open = navMenu.classList.toggle("open");

    menuBtn.textContent = open ? "✕" : "☰";

    menuBtn.setAttribute("aria-expanded", String(open));

});

navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", closeMenu);

});


// HERO SLIDER

const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".dot")];

let currentSlide = 0;
let slideTimer;

function showSlide(index) {

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

function startSlider() {

    clearInterval(slideTimer);

    slideTimer = setInterval(() => {

        if (!document.hidden) {
            showSlide(currentSlide + 1);
        }

    }, 5500);
}

document.getElementById("prevSlide").addEventListener("click", () => {

    showSlide(currentSlide - 1);
    startSlider();

});

document.getElementById("nextSlide").addEventListener("click", () => {

    showSlide(currentSlide + 1);
    startSlider();

});

dots.forEach(dot => {

    dot.addEventListener("click", () => {

        showSlide(Number(dot.dataset.slide));
        startSlider();

    });

});

startSlider();


// BACKGROUND VIDEOS

const videos = [
    document.getElementById("video1"),
    document.getElementById("video2")
];

let activeVideo = 0;
let switchingVideo = false;

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

async function playVideo(video) {

    try {
        await video.play();
        return true;
    } catch (error) {
        return false;
    }
}

async function switchBackgroundVideo() {

    if (
        switchingVideo ||
        reduceMotion ||
        document.hidden
    ) {
        return;
    }

    switchingVideo = true;

    const current = videos[activeVideo];

    const nextIndex = (activeVideo + 1) % videos.length;

    const next = videos[nextIndex];

    next.currentTime = 0;

    if (next.readyState < 2) {
        next.load();
    }

    const success = await playVideo(next);

    if (!success) {

        switchingVideo = false;

        current.currentTime = 0;

        await playVideo(current);

        return;
    }

    next.classList.add("active");

    setTimeout(() => {

        current.classList.remove("active");
        current.pause();

        activeVideo = nextIndex;

        switchingVideo = false;

    }, 1350);
}

videos.forEach((video, index) => {

    video.addEventListener("ended", () => {

        if (activeVideo === index) {
            switchBackgroundVideo();
        }

    });

});

if (!reduceMotion) {
    playVideo(videos[0]);
} else {
    videos.forEach(video => video.pause());
}

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        videos.forEach(video => video.pause());

    } else if (!reduceMotion && !switchingVideo) {

        playVideo(videos[activeVideo]);

    }

});


// SCROLL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.08
    });

    revealElements.forEach(element => observer.observe(element));

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// WHATSAPP

function openWhatsApp(message) {

    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

    window.location.href = url;

}


// PRICING BUTTONS

document.querySelectorAll(".price-btn").forEach(button => {

    button.addEventListener("click", () => {

        const service = button.dataset.service;

        const message = [
            "Namaste Raju Patel ji,",
            "",
            `Mujhe ${service} ka rate jaanna hai.`,
            "Kripya availability aur per-feet rate batayein.",
            "",
            "Rajlaxmi Water Boring Website"
        ].join("\n");

        openWhatsApp(message);

    });

});


// ENQUIRY FORM

document.getElementById("enquiryForm").addEventListener("submit", event => {

    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
        return;
    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const village = document.getElementById("customerVillage").value.trim();
    const type = document.getElementById("boringType").value;
    const date = document.getElementById("workDate").value;
    const details = document.getElementById("customerMessage").value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit mobile number.");

        return;
    }

    const message = [
        "Namaste Raju Patel ji,",
        "",
        "Mujhe water boring ki enquiry karni hai.",
        "",
        `Name: ${name}`,
        `Mobile: ${phone}`,
        `Village: ${village}`,
        `Boring Type: ${type}`,
        `Required Date: ${date || "Not decided"}`,
        `Details: ${details || "None"}`,
        "",
        "Kripya rate aur availability batayein."
    ].join("\n");

    openWhatsApp(message);

});


// GALLERY LIGHTBOX

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

let previousFocus = null;

function openLightbox(image, caption) {

    previousFocus = document.activeElement;

    lightboxImage.src = image;

    lightboxImage.alt = caption;

    lightboxCaption.textContent = caption;

    lightbox.classList.add("open");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");

    document.getElementById("closeLightbox").focus();
}

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.removeAttribute("src");

    document.body.classList.remove("lightbox-open");

    if (previousFocus) {
        previousFocus.focus();
    }
}

document.getElementById("galleryGrid").addEventListener("click", event => {

    const item = event.target.closest(".gallery-item");

    if (!item) {
        return;
    }

    openLightbox(item.dataset.image, item.dataset.caption);

});

document.getElementById("closeLightbox").addEventListener(
    "click",
    closeLightbox
);

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (lightbox.classList.contains("open")) {
            closeLightbox();
        }

        closeMenu();

    }

    if (event.key === "Tab" && lightbox.classList.contains("open")) {

        event.preventDefault();

        document.getElementById("closeLightbox").focus();

    }

});


// DYNAMIC SUPABASE GALLERY

async function loadDynamicGallery() {

    const client = window.getRajlaxmiSupabase();

    if (!client) {
        return;
    }

    const status = document.getElementById("galleryStatus");

    const { data, error } = await client
        .from(window.RAJLAXMI_CONFIG.galleryTable)
        .select("id, title, location, image_path, created_at")
        .order("created_at", { ascending: false })
        .limit(100);

    if (error) {

        console.error("Gallery error:", error.message);

        status.textContent =
            currentLanguage === "hi"
                ? "नई तस्वीरें अभी लोड नहीं हो सकीं।"
                : "New photos could not be loaded.";

        return;
    }

    const grid = document.getElementById("galleryGrid");

    data.forEach(photo => {

        const { data: imageData } = client.storage
            .from(window.RAJLAXMI_CONFIG.galleryBucket)
            .getPublicUrl(photo.image_path);

        const imageUrl = imageData.publicUrl;

        const button = document.createElement("button");

        button.className = "gallery-item";

        button.type = "button";

        button.dataset.image = imageUrl;

        button.dataset.caption =
            [photo.title, photo.location]
                .filter(Boolean)
                .join(" - ");

        const image = document.createElement("img");

        image.src = imageUrl;

        image.alt = photo.title || "Water boring work";

        image.loading = "lazy";

        const caption = document.createElement("span");

        caption.textContent = button.dataset.caption;

        button.append(image, caption);

        grid.appendChild(button);

    });

}

loadDynamicGallery();


// FOOTER YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();