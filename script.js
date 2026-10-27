
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

// Mobile navigation
menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
});

navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
    });
});

// Cake search
const cakeSearch = document.getElementById("cakeSearch");
const cakeCards = document.querySelectorAll(".cake-card");
const noResults = document.getElementById("noResults");

cakeSearch.addEventListener("input", () => {
    const searchText = cakeSearch.value.toLowerCase().trim();
    let visibleCount = 0;

    cakeCards.forEach((card) => {
        const cakeName = card.dataset.name.toLowerCase();
        const cakeDescription = card.textContent.toLowerCase();
        const matches =
            cakeName.includes(searchText) ||
            cakeDescription.includes(searchText);

        card.hidden = !matches;

        if (matches) {
            visibleCount++;
        }
    });

    noResults.hidden = visibleCount !== 0;
});

// Cake photo viewer
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".cake-photo").forEach((button) => {
    button.addEventListener("click", () => {
        lightboxImage.src = button.dataset.image;
        lightboxImage.alt = button.dataset.title;
        lightboxTitle.textContent = button.dataset.title;

        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

// Prepare an inquiry for WhatsApp
function sendWhatsAppInquiry(name, phone, cake, message) {
    // This is the business phone number in international format.
    const businessNumber = "639457068519";

    const inquiry =
        "Hello Sweet Creation By Jhen!\n\n" +
        "I would like to inquire about a cake.\n\n" +
        "Name: " + name + "\n" +
        "Contact Number: " + phone + "\n" +
        "Cake: " + cake + "\n" +
        "Order Details: " + message;

    const whatsappURL =
        "https://wa.me/" + businessNumber +
        "?text=" + encodeURIComponent(inquiry);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".order-btn").forEach((button) => {
    button.addEventListener("click", () => {
        document.getElementById("cakeChoice").value = button.dataset.cake;
        document.getElementById("contact").scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const cake = document.getElementById("cakeChoice").value.trim();
    const message = document.getElementById("customerMessage").value.trim();

    if (!name || !phone || !cake || !message) {
        alert("Please complete all fields before sending your inquiry.");
        return;
    }

    sendWhatsAppInquiry(name, phone, cake, message);
});
