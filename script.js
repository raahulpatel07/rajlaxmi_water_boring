// =================================
// LANGUAGE TRANSLATIONS
// =================================

const translations = {

    hi: {
        navHome: "होम",
        navServices: "सेवाएं",
        navAbout: "हमारे बारे में",
        navGallery: "गैलरी",
        navContact: "संपर्क",

        badge: "🚜 आपकी बोरिंग सेवा के लिए संपर्क करें",

        call: "📞 अभी कॉल करें",
        whatsapp: "💬 WhatsApp करें",
        explore: "हमारी सेवाएं",

        servicesTitle: "हमारी <span>सेवाएं</span>",
        servicesSubtitle: "पानी की बोरिंग से जुड़ी सेवाओं की जानकारी",

        service1Title: "वाटर बोरिंग",
        service1Desc: "पानी की जरूरत के लिए बोरिंग कार्य की जानकारी और सुविधा के लिए संपर्क करें।",

        service2Title: "बोरवेल ड्रिलिंग",
        service2Desc: "बोरवेल ड्रिलिंग से जुड़ी जानकारी और उपलब्ध सेवाओं के लिए हमसे बात करें।",

        service3Title: "बोरिंग की जानकारी",
        service3Desc: "बोरिंग कार्य, स्थान और अन्य जरूरी जानकारी के लिए सीधे संपर्क करें।",

        aboutTitle: "Rajrani <span>Water Boring</span>",
        aboutDesc: "राजरानी वाटर बोरिंग, भरतकूप मंदिर, चित्रकूट, उत्तर प्रदेश में स्थित है। वाटर बोरिंग और बोरवेल से जुड़ी सेवाओं की जानकारी के लिए हमसे संपर्क करें।",

        contactNow: "📞 आज ही संपर्क करें",

        galleryTitle: "हमारी <span>गैलरी</span>",
        gallerySubtitle: "वाटर बोरिंग और मशीन की झलकियां",

        gallery1: "वाटर बोरिंग मशीन",
        gallery2: "बोरवेल ड्रिलिंग",
        gallery3: "बोरिंग कार्य",

        contactTitle: "हमसे <span>संपर्क करें</span>",
        contactSubtitle: "बोरिंग की जानकारी के लिए कॉल या WhatsApp करें।",

        phoneLabel: "📞 मोबाइल नंबर",
        addressLabel: "📍 हमारा पता",
        businessLabel: "🚜 व्यवसाय",

        footerAddress: "📍 भरतकूप मंदिर, चित्रकूट, उत्तर प्रदेश",
        footerText: "💧 पानी की हर जरूरत का भरोसेमंद समाधान"
    },

    en: {
        navHome: "Home",
        navServices: "Services",
        navAbout: "About Us",
        navGallery: "Gallery",
        navContact: "Contact",

        badge: "🚜 Contact Us for Water Boring Services",

        call: "📞 Call Now",
        whatsapp: "💬 WhatsApp Us",
        explore: "Our Services",

        servicesTitle: "Our <span>Services</span>",
        servicesSubtitle: "Explore our water boring services",

        service1Title: "Water Boring",
        service1Desc: "Contact us for information and availability of water boring services.",

        service2Title: "Borewell Drilling",
        service2Desc: "Get in touch to learn more about borewell drilling and available services.",

        service3Title: "Boring Enquiries",
        service3Desc: "Contact us directly for information about boring work, locations and other details.",

        aboutTitle: "Rajrani <span>Water Boring</span>",
        aboutDesc: "Rajrani Water Boring is located near Bharatkoop Mandir, Chitrakoot, Uttar Pradesh. Contact us to learn more about water boring and borewell-related services.",

        contactNow: "📞 Contact Now",

        galleryTitle: "Our <span>Gallery</span>",
        gallerySubtitle: "Water boring and machinery highlights",

        gallery1: "Water Boring Machine",
        gallery2: "Borewell Drilling",
        gallery3: "Boring Work",

        contactTitle: "Contact <span>Us</span>",
        contactSubtitle: "Call or WhatsApp us for boring enquiries.",

        phoneLabel: "📞 Phone Number",
        addressLabel: "📍 Our Address",
        businessLabel: "🚜 Business",

        footerAddress: "📍 Bharatkoop Mandir, Chitrakoot, Uttar Pradesh",
        footerText: "💧 A trusted name for your water needs"
    }
};

// =================================
// HERO SLIDER
// =================================

const slides = {
    hi: [
        {
            title: "RAJRANI <span>WATER BORING</span>",
            desc: "पानी की हर जरूरत का भरोसेमंद समाधान"
        },
        {
            title: "MODERN <span>BOREWELL SERVICES</span>",
            desc: "वाटर बोरिंग और बोरवेल ड्रिलिंग की सुविधा"
        },
        {
            title: "BHARATKOOP <span>CHITRAKOOT</span>",
            desc: "आज ही संपर्क करें – 📞 1234567890"
        }
    ],

    en: [
        {
            title: "RAJRANI <span>WATER BORING</span>",
            desc: "A Trusted Name for Your Water Needs"
        },
        {
            title: "MODERN <span>BOREWELL SERVICES</span>",
            desc: "Water Boring and Borewell Drilling Services"
        },
        {
            title: "BHARATKOOP <span>CHITRAKOOT</span>",
            desc: "Contact Us Today – 📞 1234567890"
        }
    ]
};

let currentLanguage =
    localStorage.getItem("rajraniLanguage") || "hi";

let currentSlide = 0;

const slideContent = document.getElementById("slideContent");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    currentSlide = index;

    const slide = slides[currentLanguage][currentSlide];

    slideContent.classList.remove("slide-text");

    void slideContent.offsetWidth;

    slideContent.innerHTML = `
        <h1>${slide.title}</h1>
        <p>${slide.desc}</p>
    `;

    slideContent.classList.add("slide-text");

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.slide));
    });
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    showSlide(currentSlide);
}, 5000);

// =================================
// LANGUAGE SWITCH
// =================================

const langBtn = document.getElementById("langBtn");

function applyLanguage() {
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (translations[currentLanguage][key]) {
            element.innerHTML = translations[currentLanguage][key];
        }
    });

    langBtn.textContent =
        currentLanguage === "hi" ? "🌐 EN" : "🌐 हिंदी";

    showSlide(currentSlide);
}

langBtn.addEventListener("click", () => {
    currentLanguage =
        currentLanguage === "hi" ? "en" : "hi";

    localStorage.setItem("rajraniLanguage", currentLanguage);

    applyLanguage();
});

applyLanguage();

// =================================
// THEME SWITCH
// =================================

const themeBtn = document.getElementById("themeBtn");

let currentTheme =
    localStorage.getItem("rajraniTheme") || "dark";

function applyTheme() {
    document.body.classList.toggle(
        "light",
        currentTheme === "light"
    );

    themeBtn.textContent =
        currentTheme === "dark" ? "☀️" : "🌙";
}

themeBtn.addEventListener("click", () => {
    currentTheme =
        currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("rajraniTheme", currentTheme);

    applyTheme();
});

applyTheme();

// =================================
// BACKGROUND ANIMATION SWITCH
// =================================

const animationScenes =
    document.querySelectorAll(".animation-scene");

let currentAnimation = 0;

setInterval(() => {
    animationScenes[currentAnimation]
        .classList.remove("active");

    currentAnimation =
        (currentAnimation + 1) % animationScenes.length;

    animationScenes[currentAnimation]
        .classList.add("active");
}, 8000);

// =================================
// SCROLL ANIMATIONS
// =================================

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

// =================================
// FOOTER YEAR
// =================================

document.getElementById("year").textContent =
    new Date().getFullYear();