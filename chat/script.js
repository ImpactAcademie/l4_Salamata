const filterButtons = document.querySelectorAll(".filter-button");
const searchInput = document.querySelector("#cat-search");
const catCards = [...document.querySelectorAll(".cat-card")];
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const catDialog = document.querySelector("#cat-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogNote = document.querySelector("#dialog-note");
let activeFilter = "all";

function updateCats() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase("fr");
  let visibleCount = 0;

  for (const card of catCards) {
    const matchesFilter = activeFilter === "all" || card.dataset.mood.includes(activeFilter);
    const matchesSearch = card.dataset.name.toLocaleLowerCase("fr").includes(searchTerm);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "chat dans le jardin" : "chats dans le jardin"}`;
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
    updateCats();
  });
}

searchInput.addEventListener("input", updateCats);

for (const button of document.querySelectorAll("[data-details]")) {
  button.addEventListener("click", () => {
    const card = button.closest(".cat-card");
    dialogTitle.textContent = card.dataset.name;
    dialogNote.textContent = card.dataset.note;
    catDialog.showModal();
  });
}

for (const button of document.querySelectorAll(".favorite-button")) {
  button.addEventListener("click", () => {
    const isFavorite = button.getAttribute("aria-pressed") !== "true";
    const catName = button.closest(".cat-card").dataset.name;
    button.setAttribute("aria-pressed", String(isFavorite));
    button.textContent = isFavorite ? "♥" : "♡";
    button.setAttribute("aria-label", `${isFavorite ? "Retirer" : "Ajouter"} ${catName} ${isFavorite ? "des" : "aux"} favoris`);
  });
}

document.querySelector(".dialog-close").addEventListener("click", () => catDialog.close());
catDialog.addEventListener("click", (event) => {
  if (event.target === catDialog) catDialog.close();
});

document.querySelector("[data-scroll-gallery]").addEventListener("click", () => {
  document.querySelector("#cats").scrollIntoView({ behavior: "smooth" });
});