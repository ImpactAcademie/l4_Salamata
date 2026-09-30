const filterButtons = document.querySelectorAll(".filter-button");
const searchInput = document.querySelector("#breed-search");
const breedCards = [...document.querySelectorAll(".breed-card")];
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const breedDialog = document.querySelector("#breed-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
let activeFilter = "all";

function updateBreeds() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase("fr");
  let visibleCount = 0;

  for (const card of breedCards) {
    const matchesFilter = activeFilter === "all" || card.dataset.size === activeFilter;
    const matchesSearch = card.dataset.name.toLocaleLowerCase("fr").includes(searchTerm);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  resultsCount.textContent = `${visibleCount} ${visibleCount > 1 ? "races à découvrir" : "race à découvrir"}`;
  emptyState.hidden = visibleCount !== 0;
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    for (const filterButton of filterButtons) {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    }
    updateBreeds();
  });
}

searchInput.addEventListener("input", updateBreeds);

for (const button of document.querySelectorAll("[data-details]")) {
  button.addEventListener("click", () => {
    const card = button.closest(".breed-card");
    dialogTitle.textContent = card.dataset.name;
    dialogDescription.textContent = card.dataset.temperament;
    breedDialog.showModal();
  });
}

document.querySelector(".dialog-close").addEventListener("click", () => breedDialog.close());

breedDialog.addEventListener("click", (event) => {
  if (event.target === breedDialog) breedDialog.close();
});