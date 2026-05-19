// =======================================
//              AOS INIT
// =======================================

AOS.init({
    duration: 1200,
    once: true,
    offset: 100
});


// =======================================
//          GLOBAL SELECTORS
// =======================================

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");


// =======================================
//          NAVBAR SCROLL EFFECT
// =======================================

window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// =======================================
//          ACTIVE NAV LINK
// =======================================

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active-link",
            link.getAttribute("href") === `#${current}`
        );
    });

});


// =======================================
//          HERO TYPING EFFECT
// =======================================

const typingText = document.querySelector(".hero-tagline");
const text = "Digital solutions for digital problems.";
let index = 0;

function typeEffect() {
    if (!typingText) return;

    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 70);
    }
}

window.addEventListener("load", () => {
    if (typingText) {
        typingText.textContent = "";
        typeEffect();
    }
});


// =======================================
//          SWIPER (REVIEWS)
// =======================================

if (document.querySelector(".reviewSwiper")) {

    new Swiper(".reviewSwiper", {

        loop: true,
        grabCursor: true,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        slidesPerView: 1,

        breakpoints: {
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }

    });

}


// =======================================
//          BUTTON RIPPLE EFFECT
// =======================================

const buttons = document.querySelectorAll(".main-btn");

buttons.forEach(button => {

    button.style.position = "relative";
    button.style.overflow = "hidden";

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.classList.add("ripple");
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

    });

});


// =======================================
//          FLOATING EFFECT
// =======================================

const floatingCards = document.querySelectorAll(".glass-card, .service-card");

floatingCards.forEach((card, i) => {
    card.style.animation = "floatCard 4s ease-in-out infinite";
    card.style.animationDelay = `${i * 0.2}s`;
});


// =======================================
//          PARALLAX HERO
// =======================================

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");
    if (!hero) return;

    const scrollTop = window.scrollY;

    if (Math.abs(scrollTop - lastScroll) < 5) return;

    hero.style.backgroundPositionY = `${scrollTop * 0.3}px`;

    lastScroll = scrollTop;
});


// =======================================
//          PRELOADER (FIXED - IMPORTANT)
// =======================================

const preloader = document.createElement("div");
preloader.classList.add("preloader");

preloader.innerHTML = `
<div class="loader">
    <div class="loader-circle"></div>
    <h2>System Cares IT Solutions</h2>
</div>
`;

document.body.appendChild(preloader);

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hide-preloader");

        setTimeout(() => {
            preloader.remove(); // 🔥 FIX: removes ghost layout issue
        }, 800);

    }, 1200);

});


// =======================================
//          CURSOR GLOW
// =======================================

const glow = document.createElement("div");
glow.classList.add("cursor-glow");
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});


// =======================================
//          MOBILE MENU AUTO CLOSE
// =======================================

const navCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navCollapse && navCollapse.classList.contains("show")) {
            new bootstrap.Collapse(navCollapse).hide();
        }

    });

});


// =======================================
//          DYNAMIC YEAR
// =======================================

const copyright = document.querySelector(".copyright");

if (copyright) {
    copyright.innerHTML =
        `© ${new Date().getFullYear()} System Cares IT Solutions. All Rights Reserved.`;
}


// =======================================
//          GLOBAL OVERFLOW FIX
// =======================================

window.addEventListener("load", () => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.scrollLeft = 0;
});


// =======================================
//          CONSOLE BRANDING
// =======================================

console.log(
    "%cSystem Cares IT Solutions",
    "color:red; font-size:22px; font-weight:bold;"
);

console.log(
    "%cAn Aspiring Technology Partner",
    "color:black; font-size:14px;"
);