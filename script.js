/**
 * ==============================================================================
 * MEZAAN BOYS HOSTEL - OFFICIAL INTERACTION & SEO ENGINE
 * Sector G-9/4, Islamabad, Pakistan
 * Phone / WhatsApp: 0344-5661283 (+92 344 5661283)
 * ==============================================================================
 * 
 * [SINGLE HOSTEL CONFIGURATION BLOCK]
 * Update the details below if phone numbers, website domain, prices or rules change.
 */
const MEZAAN_CONFIG = {
  hostelName: "Mezaan Boys Hostel",
  area: "House # 117, Street # 85, Sector G-9/4, Islamabad, Pakistan",
  phoneRaw: "03445661283",
  phoneDisplay: "0344-5661283",
  phoneInternational: "+92 344 5661283",
  whatsappBaseUrl: "https://wa.me/923445661283",
  websiteUrl: "https://mezaanboyshostel.com/",
  visitingHours: "9:00 AM – 9:00 PM (Daily)",
  gateClosingTime: "10:30 PM",
  securityDeposit: "20,000",
  admissionFee: "5,000",
  // Official Verified Rates for Mezaan Boys Hostel (G-9/4 Islamabad)
  prices: {
    attached: {
      single: "35,000",
      double: "30,000",
      triple: "27,000",
      four: "25,000",
      five: "24,000",
      six: "22,000"
    },
    common: {
      single: "32,000",
      double: "27,000",
      triple: "25,000",
      four: "24,000",
      five: "22,000",
      six: "21,000"
    }
  },
  gscVerificationCode: "[EDIT: YOUR_GSC_VERIFICATION_CODE]",
  ga4MeasurementId: "[EDIT: G-XXXXXXXXXX]"
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Current Year in Footer
  const yearEls = document.querySelectorAll(".currentYear, #currentYear");
  yearEls.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // 2. Mobile Drawer Navigation
  initMobileDrawer();

  // 3. Smooth Scrolling for Navigation Links with Header Offset
  initSmoothScroll();

  // 4. Photo Gallery Filtering & Lightbox Modal
  initGalleryAndLightbox();

  // 5. FAQ Accordion (Interactive & Accessible)
  initFaqAccordion();

  // 6. Booking Inquiry Form -> Prefilled WhatsApp Generator
  initBookingForm();

  // 7. Quick Visit Booking Buttons
  initVisitBookingButtons();

  // 8. Back to Top Button
  initBackToTop();

  // 9. English / Urdu Overview Toggle
  initLanguageToggle();

  // 10. Subtle Scroll Reveal Animations
  initScrollAnimations();
  initPricingTabs();
});

/**
 * Mobile Drawer Menu Handler
 */
function initMobileDrawer() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const closeBtn = document.getElementById("mobileCloseBtn");
  const drawer = document.getElementById("mobileDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!menuBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", openDrawer);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("click", (e) => {
    if (drawer.classList.contains("open") && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
      closeDrawer();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const header = document.getElementById("header");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = header ? header.offsetHeight : 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/**
 * Photo Gallery Filter & Native Lightbox
 */
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute("data-category");
        if (filterVal === "all" || filterVal === itemCat) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  if (!lightboxModal) return;

  const triggers = Array.from(document.querySelectorAll(".lightbox-trigger"));
  let currentIndex = 0;

  function updateLightbox(index) {
    if (index < 0) index = triggers.length - 1;
    if (index >= triggers.length) index = 0;
    currentIndex = index;

    const trigger = triggers[currentIndex];
    const imgSrc = trigger.getAttribute("href");
    const caption = trigger.getAttribute("data-caption") || "";

    lightboxImg.src = imgSrc;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightboxCounter.textContent = `${currentIndex + 1} / ${triggers.length}`;
  }

  function openLightbox(index) {
    updateLightbox(index);
    lightboxModal.classList.add("active");
    lightboxModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxModal.classList.remove("active");
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  triggers.forEach((trigger, idx) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex - 1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex + 1);
    });
  }

  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      updateLightbox(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      updateLightbox(currentIndex + 1);
    }
  });

  // Mobile Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxModal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxModal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) {
      updateLightbox(currentIndex + 1);
    }
    if (touchEndX > touchStartX + 50) {
      updateLightbox(currentIndex - 1);
    }
  }, { passive: true });
}

/**
 * FAQ Accordion Setup
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");

    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {
          otherItem.classList.remove("active");
          const btn = otherItem.querySelector(".faq-question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });

        if (!isActive) {
          item.classList.add("active");
          questionBtn.setAttribute("aria-expanded", "true");
        } else {
          item.classList.remove("active");
          questionBtn.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
}

/**
 * WhatsApp Booking Inquiry Form Generator
 */
function initBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("userName")?.value.trim();
    const phone = document.getElementById("userPhone")?.value.trim();
    const occupation = document.getElementById("userOccupation")?.value;
    const roomType = document.getElementById("roomType")?.value;
    const moveDate = document.getElementById("moveDate")?.value;
    const notes = document.getElementById("userMsg")?.value.trim();

    if (!name || !phone || !occupation || !roomType) {
      alert("Please fill in all required fields (Name, Phone, Occupation status, and Room type).");
      return;
    }

    let messageText = `*Assalam-o-Alaikum Mezaan Boys Hostel (G-9/4 Islamabad)*,\n\n`;
    messageText += `I would like to inquire about room availability and booking:\n`;
    messageText += `• *Applicant Name:* ${name}\n`;
    messageText += `• *Contact Number:* ${phone}\n`;
    messageText += `• *Status:* ${occupation}\n`;
    messageText += `• *Room Category:* ${roomType}\n`;
    if (moveDate) {
      messageText += `• *Target Move-In Date:* ${moveDate}\n`;
    }
    if (notes) {
      messageText += `• *Notes / Questions:* ${notes}\n`;
    }
    messageText += `\nPlease confirm seat availability and monthly charges. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `${MEZAAN_CONFIG.whatsappBaseUrl}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

/**
 * Quick Visit Booking Buttons
 */
function initVisitBookingButtons() {
  const visitBtns = document.querySelectorAll(".book-visit-trigger");
  visitBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const message = `*Assalam-o-Alaikum Mezaan Boys Hostel*,\nI would like to schedule a free in-person tour of your hostel in Sector G-9/4 Islamabad. Please let me know suitable timings today.`;
      const url = `${MEZAAN_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * English / Urdu Overview Toggle
 */
function initLanguageToggle() {
  const toggleBtn = document.getElementById("langToggleBtn");
  if (!toggleBtn) return;

  const enSpan = toggleBtn.querySelector(".lang-en");
  const urSpan = toggleBtn.querySelector(".lang-ur");

  const savedLang = localStorage.getItem("mezaan_hostel_lang");
  if (savedLang === "ur") {
    setLanguageUrdu(true);
  }

  toggleBtn.addEventListener("click", () => {
    const isUrdu = document.body.classList.contains("lang-ur-active");
    setLanguageUrdu(!isUrdu);
  });

  function setLanguageUrdu(enableUrdu) {
    if (enableUrdu) {
      document.body.classList.add("lang-ur-active");
      if (enSpan) enSpan.classList.remove("active");
      if (urSpan) urSpan.classList.add("active");
      localStorage.setItem("mezaan_hostel_lang", "ur");
      toggleBtn.setAttribute("title", "اردو موڈ فعال ہے (Click to switch to English)");
    } else {
      document.body.classList.remove("lang-ur-active");
      if (urSpan) urSpan.classList.remove("active");
      if (enSpan) enSpan.classList.add("active");
      localStorage.setItem("mezaan_hostel_lang", "en");
      toggleBtn.setAttribute("title", "Switch overview to Urdu");
    }
  }
}

/**
 * Subtle Scroll Reveal Animation for Cards
 */
function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) return;

  const cards = document.querySelectorAll(".feature-card, .room-card, .facility-item, .rule-card, .audience-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(18px)";
    card.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    observer.observe(card);
  });
}


/**
 * Pricing Tabs: Attached Bath vs Common Bath Switcher
 */
function initPricingTabs() {
  const btnAttached = document.getElementById("btnTabAttached");
  const btnCommon = document.getElementById("btnTabCommon");
  const tabAttached = document.getElementById("tabAttachedRooms");
  const tabCommon = document.getElementById("tabCommonRooms");

  if (!btnAttached || !btnCommon || !tabAttached || !tabCommon) return;

  btnAttached.addEventListener("click", () => {
    btnAttached.classList.add("active");
    btnCommon.classList.remove("active");
    tabAttached.style.display = "block";
    tabCommon.style.display = "none";
  });

  btnCommon.addEventListener("click", () => {
    btnCommon.classList.add("active");
    btnAttached.classList.remove("active");
    tabCommon.style.display = "block";
    tabAttached.style.display = "none";
  });
}
