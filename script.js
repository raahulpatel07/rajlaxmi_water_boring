"use strict";

/* =================================
   RAJLAXMI WATER BORING
   LANGUAGE TRANSLATIONS
================================= */

const translations = {

    hi: {

        navHome: "होम",
        navServices: "सेवाएं",
        navAbout: "हमारे बारे में",
        navGallery: "गैलरी",
        navContact: "संपर्क",

        heroBadge: "🚜 वाटर बोरिंग एवं बोरवेल सेवाएं",

        callNow: "📞 अभी कॉल करें",
        whatsapp: "💬 WhatsApp करें",
        ourServices: "हमारी सेवाएं",
        contactNow: "📞 आज ही संपर्क करें",

        servicesLabel: "हमारी सेवाएं",
        servicesTitle: "हमारी <span>सेवाएं</span>",
        servicesDescription: "वाटर बोरिंग और बोरवेल से जुड़ी जानकारी",

        service1Title: "वाटर बोरिंग",
        service1Description: "वाटर बोरिंग कार्य की जानकारी और उपलब्धता के लिए संपर्क करें।",

        service2Title: "बोरवेल ड्रिलिंग",
        service2Description: "बोरवेल ड्रिलिंग से जुड़ी सेवाओं के बारे में जानकारी प्राप्त करें।",

        service3Title: "बोरिंग की जानकारी",
        service3Description: "बोरिंग कार्य, स्थान और अन्य जानकारी के लिए सीधे कॉल करें।",

        learnMore: "अधिक जानें →",

        aboutLabel: "हमारे व्यवसाय के बारे में",
        aboutTitle: "Rajlaxmi <span>Water Boring</span>",

        aboutDescription:
            "राजलक्ष्मी वाटर बोरिंग, भरतकूप मंदिर, चित्रकूट, उत्तर प्रदेश में स्थित है। वाटर बोरिंग और बोरवेल ड्रिलिंग से जुड़ी जानकारी के लिए हमसे संपर्क करें।",

        aboutPoint1: "वाटर बोरिंग सेवाएं",
        aboutPoint2: "बोरवेल ड्रिलिंग",
        aboutPoint3: "फोन और WhatsApp संपर्क",

        galleryLabel: "फोटो गैलरी",
        galleryTitle: "हमारी <span>गैलरी</span>",
        galleryDescription: "वाटर बोरिंग और मशीन की तस्वीरें",

        gallery1: "वाटर बोरिंग मशीन",
        gallery2: "बोरवेल ड्रिलिंग",
        gallery3: "बोरिंग कार्य",

        contactLabel: "संपर्क करें",
        contactTitle: "हमसे <span>संपर्क करें</span>",
        contactDescription: "वाटर बोरिंग की जानकारी के लिए कॉल या WhatsApp करें।",

        phoneLabel: "मोबाइल नंबर",
        addressLabel: "हमारा पता",
        businessLabel: "व्यवसाय",

        footerAddress: "भरतकूप मंदिर, चित्रकूट, उत्तर प्रदेश",
        footerDescription: "पानी की हर जरूरत का भरोसेमंद समाधान"

    },

    en: {

        navHome: "Home",
        navServices: "Services",
        navAbout: "About Us",
        navGallery: "Gallery",
        navContact: "Contact",

        heroBadge: "🚜 Water Boring & Borewell Services",

        callNow: "📞 Call Now",
        whatsapp: "💬 WhatsApp Us",
        ourServices: "Our Services",
        contactNow: "📞 Contact Now",

        servicesLabel: "OUR SERVICES",
        servicesTitle: "Our <span>Services</span>",
        servicesDescription: "Information about water boring and borewell services",

        service1Title: "Water Boring",
        service1Description: "Contact us for water boring information and service availability.",

        service2Title: "Borewell Drilling",
        service2Description: "Get information about borewell drilling and related services.",

        service3Title: "Boring Enquiries",
        service3Description: "Call us for boring work, locations and other information.",

        learnMore: "Learn More →",

        aboutLabel: "ABOUT OUR BUSINESS",
        aboutTitle: "Rajlaxmi <span>Water Boring</span>",

        aboutDescription:
            "Rajlaxmi Water Boring is located near Bharatkoop Mandir, Chitrakoot, Uttar Pradesh. Contact us for information about water boring and borewell drilling services.",

        aboutPoint1: "Water Boring Services",
        aboutPoint2: "Borewell Drilling",
        aboutPoint3: "Phone and WhatsApp Contact",

        galleryLabel: "PHOTO GALLERY",
        galleryTitle: "Our <span>Gallery</span>",
        galleryDescription: "Water boring and machinery photos",

        gallery1: "Water Boring Machine",
        gallery2: "Borewell Drilling",
        gallery3: "Boring Work",

        contactLabel: "GET IN TOUCH",
        contactTitle: "Contact <span>Us</span>",
        contactDescription: "Call or WhatsApp us for water boring enquiries.",

        phoneLabel: "Phone Number",
        addressLabel: "Our Address",
        businessLabel: "Business",

        footerAddress: "Bharatkoop Mandir, Chitrakoot, Uttar Pradesh",
        footerDescription: "A trusted name for your water needs"

    }

};

/* =================================
   HERO SLIDES
================================= */

const slides = {

    hi: [
        {
            title: "RAJLAXMI <span>WATER BORING</span>",
            text: "पानी की हर जरूरत का भरोसेमंद समाधान"
        },
        {
            title: "PROFESSIONAL <span>BOREWELL SERVICES</span>",
            text: "वाटर बोरिंग और बोरवेल ड्रिलिंग सेवाएं"
        },
        {
            title: "BHARATKOOP <span>CHITRAKOOT</span>",
            text: "आज ही संपर्क करें – 📞 8303746358"
        }
    ],

    en: [
        {
            title: "RAJLAXMI <span>WATER BORING</span>",
            text: "A Trusted Name for Your Water Needs"
        },
        {
            title: "PROFESSIONAL <span>BOREWELL SERVICES</span>",
            text: "Water Boring and Borewell Drilling Services"
        },
        {
            title: "BHARATKOOP <span>CHITRAKOOT</span>",
            text: "Contact Us Today – 📞 8303746358"
        }
    ]

};

/* =================================
   LANGUAGE SETTINGS
================================= */

let language =
    localStorage.getItem("rajlaxmiLanguage") || "hi";

if (!translations[language]) {
    language = "hi";
}

const languageBtn = document.getElementById("languageBtn");
const heroSlider = document.getElementById("heroSlider");
const dots = document.querySelectorAll(".slider-dot");

let currentSlide = 0;
let slideInterval;

function showSlide(index) {

    const total = slides[language].length;

    currentSlide = (index + total) % total;

    const slide = slides[language][currentSlide];

    heroSlider.style.animation = "none";

    void heroSlider.offsetWidth;

    heroSlider.innerHTML = `
        <h1>${slide.title}</h1>
        <p>${slide.text}</p>
    `;

    heroSlider.style.animation = "slideUp .7s ease";

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });

}

function applyLanguage() {

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        if (translations[language][key]) {
            element.innerHTML = translations[language][key];
        }

    });

    languageBtn.textContent =
        language === "hi" ? "🌐 EN" : "🌐 हिंदी";

    showSlide(currentSlide);

}

languageBtn.addEventListener("click", () => {

    language = language === "hi" ? "en" : "hi";

    localStorage.setItem("rajlaxmiLanguage", language);

    applyLanguage();

});

/* =================================
   TEXT SLIDER
================================= */

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function startSlideTimer() {

    clearInterval(slideInterval);

    slideInterval = setInterval(nextSlide, 5000);

}

document.getElementById("nextSlide")
    .addEventListener("click", () => {

        nextSlide();
        startSlideTimer();

    });

document.getElementById("prevSlide")
    .addEventListener("click", () => {

        previousSlide();
        startSlideTimer();

    });

dots.forEach(dot => {

    dot.addEventListener("click", () => {

        showSlide(Number(dot.dataset.slide));
        startSlideTimer();

    });

});

applyLanguage();
startSlideTimer();

/* =================================
   THEME SWITCH
================================= */

const themeBtn = document.getElementById("themeBtn");

let theme =
    localStorage.getItem("rajlaxmiTheme") || "dark";

function applyTheme() {

    document.body.classList.toggle(
        "light",
        theme === "light"
    );

    themeBtn.textContent =
        theme === "dark" ? "☀️" : "🌙";

    themeBtn.setAttribute(
        "aria-label",
        theme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme"
    );

}

themeBtn.addEventListener("click", () => {

    theme = theme === "dark" ? "light" : "dark";

    localStorage.setItem("rajlaxmiTheme", theme);

    applyTheme();

});

applyTheme();

/* =================================
   OPTIMIZED VIDEO PLAYER
================================= */

const videos = [
    document.getElementById("drillingVideo"),
    document.getElementById("waterVideo")
];

let activeVideo = 0;
let switching = false;

const FADE_DURATION = 1200;

videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
});

async function startVideo(index) {

    const video = videos[index];

    if (video.error) {
        throw new Error("Video is unavailable");
    }

    try {
        video.currentTime = 0;
    } catch (error) {
        console.warn("Video seek unavailable:", error);
    }

    await video.play();

}

async function switchBackgroundVideo() {

    if (switching) return;

    switching = true;

    const oldIndex = activeVideo;
    const nextIndex = 1 - oldIndex;

    const oldVideo = videos[oldIndex];
    const nextVideo = videos[nextIndex];

    try {

        if (nextVideo.preload === "none") {
            nextVideo.preload = "auto";
            nextVideo.load();
        }

        await startVideo(nextIndex);

        nextVideo.classList.add("active");
        oldVideo.classList.remove("active");

        activeVideo = nextIndex;

        setTimeout(() => {

            oldVideo.pause();
            switching = false;

        }, FADE_DURATION);

    } catch (error) {

        console.warn("Video switching failed:", error);

        switching = false;

        if (!oldVideo.error) {

            try {
                oldVideo.currentTime = 0;
                await oldVideo.play();
            } catch (playError) {
                console.warn("Video restart failed:", playError);
            }

        }

    }

}

videos.forEach((video, index) => {

    video.addEventListener("ended", () => {

        if (index === activeVideo) {
            switchBackgroundVideo();
        }

    });

    video.addEventListener("error", () => {

        console.warn(
            "Video loading error:",
            video.currentSrc
        );

        if (index === activeVideo && !switching) {
            switchBackgroundVideo();
        }

    });

});

videos[0].play().catch(error => {

    console.warn("Autoplay unavailable:", error);

});

/* =================================
   MOBILE MENU
================================= */

const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

function closeMenu() {

    navigation.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");

}

menuBtn.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuBtn.textContent = isOpen ? "✕" : "☰";

    menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});

navigation.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", closeMenu);

});

/* =================================
   SCROLL REVEAL
================================= */

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    document.querySelectorAll(".reveal").forEach(element => {
        observer.observe(element);
    });

} else {

    document.querySelectorAll(".reveal").forEach(element => {
        element.classList.add("visible");
    });

}

/* =================================
   FOOTER YEAR
================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();