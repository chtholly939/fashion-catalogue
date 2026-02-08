const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";

if (searchInput && filterButtons.length > 0 && productCards.length > 0) {
  function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const categoriesRaw = (card.dataset.category || "").toLowerCase();
    const title = (card.dataset.title || "").toLowerCase();
    const fabric = (card.dataset.fabric || "").toLowerCase();

    // ✅ split categories into an array (exact match)
    const categories = categoriesRaw.split(" ").filter(Boolean);

    const matchesFilter =
      activeFilter === "all" || categories.includes(activeFilter);

    const matchesSearch =
      title.includes(query) ||
      fabric.includes(query) ||
      categoriesRaw.includes(query);

    if (matchesFilter && matchesSearch) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? "block" : "none";
  }
}

  // Filter button click
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      activeFilter = btn.dataset.filter || "all";
      applyFilters();
    });
  });

  // Search typing
  searchInput.addEventListener("input", applyFilters);

  // Default load
  window.addEventListener("load", applyFilters);
}