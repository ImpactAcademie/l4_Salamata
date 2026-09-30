const topics = {
  family: {
    kicker: "LIENS QUI NOUS UNISSENT",
    title: "La famille avant tout.",
    copy: "Les éléphants vivent en groupes familiaux soudés. Les femelles plus âgées guident souvent le troupeau, transmettant aux plus jeunes les chemins et les savoirs du groupe.",
  },
  trunk: {
    kicker: "UN OUTIL EXTRAORDINAIRE",
    title: "Une trompe, mille usages.",
    copy: "La trompe sert à respirer, sentir, boire, saisir et communiquer. Elle contient des dizaines de milliers de muscles, ce qui lui permet des gestes à la fois puissants et délicats.",
  },
  home: {
    kicker: "DES PAYSAGES À PARCOURIR",
    title: "Un grand territoire à vivre.",
    copy: "Les éléphants d’Afrique et d’Asie habitent des environnements variés, des savanes aux forêts. Ils ont besoin de vastes espaces et de passages sûrs entre les zones où ils trouvent eau et nourriture.",
  },
  care: {
    kicker: "UNE COHABITATION POSSIBLE",
    title: "Préserver leur avenir.",
    copy: "La protection des habitats et des corridors naturels aide les éléphants à se déplacer. Des solutions pensées avec les communautés locales favorisent une cohabitation plus sereine.",
  },
};

const tabs = [...document.querySelectorAll(".fact-tab")];
const panel = document.querySelector("#fact-panel");
const kicker = document.querySelector("#fact-kicker");
const title = document.querySelector("#fact-title");
const copy = document.querySelector("#fact-copy");
const factNumber = document.querySelector("#fact-number");
const curiosities = [
  "La trompe d’un éléphant réunit le nez et la lèvre supérieure. Elle peut saisir de tout petits objets comme déplacer de lourdes branches.",
  "Les éléphants communiquent aussi avec des sons très graves, dont certains peuvent parcourir de longues distances.",
  "Le bain de poussière aide les éléphants à protéger leur peau du soleil et des insectes.",
  "Un éléphanteau peut se tenir debout peu après sa naissance, mais il restera longtemps proche de sa famille.",
];
let curiosityIndex = 0;

function selectTopic(button) {
  const topicKey = button.dataset.topic;
  const topic = topics[topicKey];
  const topicIndex = Object.keys(topics).indexOf(topicKey) + 1;

  for (const tab of tabs) {
    const isSelected = tab === button;
    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  }

  panel.setAttribute("aria-labelledby", button.id);
  kicker.textContent = topic.kicker;
  title.textContent = topic.title;
  copy.textContent = topic.copy;
  factNumber.textContent = `${String(topicIndex).padStart(2, "0")} — 04`;
}

for (const [index, tab] of tabs.entries()) {
  tab.addEventListener("click", () => selectTopic(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
    selectTopic(nextTab);
    nextTab.focus();
  });
}

document.querySelector("#new-fact").addEventListener("click", () => {
  curiosityIndex = (curiosityIndex + 1) % curiosities.length;
  document.querySelector("#random-fact").textContent = curiosities[curiosityIndex];
});