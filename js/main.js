// OPEN / CLOSE MENU
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  const allNavAnchors = navLinks.querySelectorAll("a");
  allNavAnchors.forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    const clickedInsideNavbar = 
    e.target.closest(".navbar") || e.target.closest("#navLink");
    if (!clickedInsideNavbar) {
      navLinks.classList.remove("show");
    }
  });
}

// SMOOTH SCROLLING
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth" });
}

window.scrollToSection = scrollToSection;

// ORDER  TRACKING
const ordersDB = {
  VL1023: {
    customer: "Client A",
    status: "Material Sourcing",
    progress: 55,
    eta: "5-7 Days",
    note: "Premium fabric selection and accessories are being finalized."
  },
  VL2047: {
    customer: "Client B",
    status: "Stitching & Crafting",
    progress: 72,
    eta: "3-5 Days",
    note: "Tailoring has started. Final finishing will begin soon."
  },
  VL3091: {
    customer: "Client C",
    status: "Quality Check",
    progress: 90,
    eta: "1-2 Days",
    note: "Final QC inspection ongoing. Packaging will follow."
  },
  VL4008: {
    customer: "Client D",
    status: "Ready / Shipped",
    progress: 99,
    eta: "Delivered / Ready",
    note: "Your order is ready and dispatched or available for pickup."
  }
};

/* ====== Tracking UI Elements ====== */
const orderIdInput = document.getElementById("orderIdInput");
const trackBtn = document.getElementById("trackBtn");
const statusCard = document.getElementById("statusCard");

function renderStatusCard(orderId) {
  if (!statusCard) return;

  const cleanId = orderId.trim().toUpperCase();

  // Empty case
  if (cleanId.length === 0) {
    statusCard.innerHTML = `
      <h3>Status</h3>
      <p class="muted">Enter an Order ID to view details.</p>
    `;
    return;
  }

  // Not found case
  if (!ordersDB[cleanId]) {
    statusCard.innerHTML = `
      <h3>Status</h3>
      <p><strong>Order ID:</strong> ${cleanId}</p>
      <p class="muted">No order found. Try: <b>VL1023</b>, <b>VL2047</b>, <b>VL3091</b></p>
    `;
    return;
  }

  const order = ordersDB[cleanId];

  statusCard.innerHTML = `
    <h3>Status</h3>
    <p><strong>Order ID:</strong> ${cleanId}</p>
    <p><strong>Current Stage:</strong> <span style="color: var(--gold)">${order.status}</span></p>
    <p><strong>ETA:</strong> ${order.eta}</p>

    <div style="margin-top: 14px;">
      <p class="muted" style="margin-bottom:8px;">Progress: ${order.progress}%</p>
      <div style="
        width: 100%;
        height: 11px;
        border-radius: 999px;
        background: rgba(255,255,255,0.06);
        border: 1px solid var(--border-soft);
        overflow: hidden;">
        
        <div style="
          width: ${order.progress}%;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
        "></div>
      </div>
    </div>

    <p class="muted" style="margin-top: 12px;">${order.note}</p>
  `;
}

/* Track Button Click */
if (trackBtn && orderIdInput) {
  trackBtn.addEventListener("click", () => {
    renderStatusCard(orderIdInput.value);
  });

  // Track when pressing Enter
  orderIdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      renderStatusCard(orderIdInput.value);
    }
  });
}

/* ===============================
   Smooth Page Transitions
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    // Skip external links & anchors
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      link.hasAttribute("target")
    ) {
      return;
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });
});


// HIGHLIGHTING WHILE SCROLLING
// const sections = document.querySelectorAll("section[id]");
// const navItems = document.querySelectorAll(".nav-links a");

// function setActiveLink() {
//   let currentSectionId = "";

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop - 90;
//     const sectionHeight = section.offsetHeight;
//     const scrollY = window.scrollY;

//     if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
//       currentSectionId = section.getAttribute("id");
//     }
//   });

//   navItems.forEach((a) => {
//     a.classList.remove("active");
//     const href = a.getAttribute("href");

//     if (href && href === `#${currentSectionId}`) {
//       a.classList.add("active");
//     }
//   });
// }

// window.addEventListener("scroll",setActiveLink);

