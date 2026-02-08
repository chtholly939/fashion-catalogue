const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      inquiry_type: formData.get("inquiry_type"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        alert("✨ Thank you! Your inquiry has been sent.");
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("⚠️ Network error. Please check your connection.");
    }
  });
}