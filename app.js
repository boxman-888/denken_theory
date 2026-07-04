const data = window.THEORY_DATA;
const formulas = data.formulas;
const ALL = "すべて";

const state = {
  mode: "overview",
  query: "",
  category: ALL,
  importance: ALL,
  memorizeImportance: ALL,
  trainerIndex: 0,
  memorizeIndex: 0,
  revealed: false,
  mastered: new Set(JSON.parse(localStorage.getItem("theory-mastered") || "[]"))
};

const views = {
  overview: document.querySelector("#overviewView"),
  cards: document.querySelector("#cardsView"),
  trainer: document.querySelector("#trainerView"),
  memorize: document.querySelector("#memorizeView"),
  map: document.querySelector("#mapView")
};

const searchInput = document.querySelector("#searchInput");
const categoryTabs = document.querySelector("#categoryTabs");
const importanceTabs = document.querySelector("#importanceTabs");
const masteredCount = document.querySelector("#masteredCount");
const totalCount = document.querySelector("#totalCount");

const categories = [ALL, ...new Set(formulas.map((item) => item.category).filter(Boolean))];
const importances = [ALL, "S", "A", "B"];

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function plainMath(text) {
  return String(text || "")
    .replaceAll("\\dfrac", "\\frac")
    .replaceAll("\\times", "×")
    .replaceAll("\\cdot", "・")
    .replaceAll("\\cdots", "…")
    .replaceAll("\\Delta", "Δ")
    .replaceAll("\\theta", "θ")
    .replaceAll("\\varepsilon", "ε")
    .replaceAll("\\epsilon", "ε")
    .replaceAll("\\rho", "ρ")
    .replaceAll("\\mu", "μ")
    .replaceAll("\\Phi", "Φ")
    .replaceAll("\\phi", "φ")
    .replaceAll("\\pi", "π")
    .replaceAll("\\Omega", "Ω")
    .replaceAll("\\alpha", "α")
    .replaceAll("\\tau", "τ")
    .replaceAll("\\eta", "η")
    .replaceAll("\\approx", "≈")
    .replaceAll("\\left", "")
    .replaceAll("\\right", "")
    .replaceAll("\\,", " ")
    .replaceAll("\\ ", " ");
}

function renderMath(raw) {
  const cleaned = plainMath(raw)
    .replace(/\*\*/g, "")
    .replace(/\$/g, "")
    .replace(/\\text\{([^{}]+)\}/g, "$1");

  const parts = cleaned
    .split(/、|，|。/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.map((part) => `<div class="math-line">${renderInlineMath(part)}</div>`).join("");
}

function renderInlineMath(input) {
  let text = escapeHtml(input);
  let previous = "";
  while (previous !== text) {
    previous = text;
    text = text.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_, num, den) => {
      return `<span class="frac"><span class="num">${renderInlineMath(num)}</span><span class="den">${renderInlineMath(den)}</span></span>`;
    });
  }
  text = text
    .replace(/\\sqrt\{([^{}]+)\}/g, (_, body) => `√<span class="sqrt">${renderInlineMath(body)}</span>`)
    .replace(/\\overline\{([^{}]+)\}/g, (_, body) => `<span class="overline">${renderInlineMath(body)}</span>`)
    .replace(/([A-Za-zα-ωΑ-Ω])_\{([^{}]+)\}/g, "$1<sub>$2</sub>")
    .replace(/([A-Za-zα-ωΑ-Ω])_([0-9A-Za-z])/g, "$1<sub>$2</sub>")
    .replace(/\^\{([^{}]+)\}/g, "<sup>$1</sup>")
    .replace(/\^([0-9A-Za-z+-]+)/g, "<sup>$1</sup>");
  return plainMath(text);
}

function filteredFormulas({ excludeMastered = false, importance = state.importance } = {}) {
  const query = state.query.trim().toLowerCase();
  return formulas.filter((item) => {
    const text = Object.values(item).join(" ").toLowerCase();
    const byCategory = state.category === ALL || item.category === state.category;
    const byImportance = importance === ALL || item.importance === importance;
    const byMastery = !excludeMastered || !state.mastered.has(item.id);
    return byCategory && byImportance && byMastery && (!query || text.includes(query));
  });
}

function clamp(index, length) {
  if (!length) return 0;
  return (index + length) % length;
}

function saveMastery() {
  localStorage.setItem("theory-mastered", JSON.stringify([...state.mastered]));
}

function badgeClass(value) {
  return value === "S" ? "s" : value === "A" ? "a" : "b";
}

function formulaDensityClass(formula) {
  const length = plainMath(formula).replace(/\s/g, "").length;
  if (length > 150) return " dense";
  if (length > 84) return " compact";
  return "";
}

function memorizeImportanceForMode() {
  if (state.mode === "memorizeS") return "S";
  if (state.mode === "memorizeA") return "A";
  if (state.mode === "memorizeB") return "B";
  return state.memorizeImportance;
}

function renderTabs() {
  importanceTabs.innerHTML = importances.map((item) => {
    const active = state.importance === item ? " active" : "";
    return `<button class="tab${active}" type="button" data-importance="${item}">${item === ALL ? "重要度すべて" : `重要度${item}`}</button>`;
  }).join("");

  categoryTabs.innerHTML = categories.map((item) => {
    const active = state.category === item ? " active" : "";
    return `<button class="tab${active}" type="button" data-category="${escapeHtml(item)}">${item}</button>`;
  }).join("");
}

function renderOverview() {
  const counts = formulas.reduce((acc, item) => {
    acc[item.importance] = (acc[item.importance] || 0) + 1;
    return acc;
  }, {});

  views.overview.innerHTML = `
    <section class="panel">
      <h3>このサイトの方針</h3>
      <div class="strategy-list">
        ${data.premise.map((item, index) => `
          <div class="strategy-item">
            <strong>${index + 1}. ${item.split("。")[0]}。</strong>
            <p>${item}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <section class="panel">
      <h3>優先順位</h3>
      <div class="mini-grid">
        <div class="stat"><strong>S分野 ${counts.S || 0}件</strong><p>まず60点分の骨格を作る。</p></div>
        <div class="stat"><strong>A分野 ${counts.A || 0}件</strong><p>70〜85点への上積み。</p></div>
        <div class="stat"><strong>B分野 ${counts.B || 0}件</strong><p>出たら拾う。後回しでよい。</p></div>
      </div>
    </section>

    <section class="panel">
      <h3>3段階ロードマップ</h3>
      <div class="roadmap">
        ${data.roadmap.map((item) => `
          <div class="roadmap-item">
            <strong>${item.stage}：${item.title}</strong>
            <p>${item.goal}</p>
            <p>${item.target}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCard(item, index) {
  const mastered = state.mastered.has(item.id);
  return `
    <article class="formula-card${index === 0 ? " featured" : ""}${mastered ? " mastered" : ""}">
      <div class="card-top">
        <div>
          <p class="category">${item.id} / ${item.category}</p>
          <h2 class="title">${item.title}</h2>
          <div class="badges">
            <span class="badge ${badgeClass(item.importance)}">重要度${item.importance}</span>
            <span class="badge">${item.frequency || "頻度未設定"}</span>
          </div>
        </div>
        <button class="mark${mastered ? " done" : ""}" type="button" data-master="${item.id}">${mastered ? "済" : "未"}</button>
      </div>
      <div class="formula${formulaDensityClass(item.formula)}">${renderMath(item.formula)}</div>
      <div class="card-body">
        <div class="meta-block"><p class="meta-label">問題文キーワード</p><p class="note">${item.trigger || "未設定"}</p></div>
        <div class="meta-block"><p class="meta-label">何を求めるか</p><p class="note">${item.purpose || "未設定"}</p></div>
        <div class="meta-block"><p class="meta-label">使う前の確認</p><p class="note">${item.before || "未設定"}</p></div>
        <div class="meta-block core"><p class="meta-label">理解の核</p><p class="note">${item.core || "未設定"}</p></div>
        <div class="meta-block mnemonic"><p class="meta-label">覚え方</p><p class="note">${item.mnemonic || "未設定"}</p></div>
        <div class="meta-block warning"><p class="meta-label">よくあるミス</p><p class="note">${item.mistakes || "未設定"}</p></div>
        <div class="card-actions">
          <button class="master-button${mastered ? " mastered" : ""}" type="button" data-master="${item.id}">${mastered ? "完全暗記を解除" : "完全に覚えた"}</button>
          <button class="ghost-button" type="button" data-focus="${item.id}">キーワードで確認</button>
        </div>
      </div>
    </article>
  `;
}

function renderCards() {
  const items = filteredFormulas();
  views.cards.innerHTML = items.length
    ? items.map(renderCard).join("")
    : `<div class="empty">条件に合う公式がありません。</div>`;
}

function renderTrainer() {
  const items = filteredFormulas();
  if (!items.length) {
    views.trainer.innerHTML = `<div class="empty">出題できる公式がありません。</div>`;
    return;
  }

  state.trainerIndex = clamp(state.trainerIndex, items.length);
  const item = items[state.trainerIndex];
  views.trainer.innerHTML = `
    <article class="quiz-panel">
      <p class="quiz-kicker">キーワード出題 / ${state.trainerIndex + 1}問目</p>
      <h2>この条件で使う公式は？</h2>
      <div class="quiz-question">
        <p class="meta-label">問題文キーワード</p>
        <p class="note">${item.trigger || item.purpose}</p>
      </div>
      <div id="trainerAnswer" class="quiz-answer hidden">
        <div class="card-top">
          <div>
            <p class="category">${item.id} / ${item.category}</p>
            <h2 class="title">${item.title}</h2>
          </div>
        </div>
        <div class="formula${formulaDensityClass(item.formula)}">${renderMath(item.formula)}</div>
        <div class="card-body">
          <div class="meta-block core"><p class="meta-label">理解の核</p><p class="note">${item.core || "未設定"}</p></div>
          <div class="meta-block warning"><p class="meta-label">よくあるミス</p><p class="note">${item.mistakes || "未設定"}</p></div>
        </div>
      </div>
      <div class="quiz-actions three">
        <button type="button" data-trainer="prev">ひとつ前</button>
        <button class="primary-button" type="button" data-trainer="show">答えを見る</button>
        <button type="button" data-trainer="next">次へ</button>
      </div>
    </article>
  `;
}

function renderMemorize() {
  const fixedImportance = memorizeImportanceForMode();
  const items = filteredFormulas({ excludeMastered: true, importance: fixedImportance });
  const modeLabel = fixedImportance === ALL ? "暗記モード" : `重要度${fixedImportance} 暗記モード`;
  if (!items.length) {
    views.memorize.innerHTML = `
      <article class="quiz-panel">
        <p class="quiz-kicker">${modeLabel}</p>
        <h2>この条件の公式はすべて完全暗記済みです</h2>
        <p class="note">絞り込みを変えるか、公式カードで完全暗記を解除できます。</p>
      </article>
    `;
    return;
  }

  state.memorizeIndex = clamp(state.memorizeIndex, items.length);
  const item = items[state.memorizeIndex];
  views.memorize.innerHTML = `
    <article class="quiz-panel">
      <p class="quiz-kicker">${modeLabel} / ${state.memorizeIndex + 1}枚目</p>
      <h2>${item.id} ${item.title}</h2>
      <div class="quiz-question">
        <p class="meta-label">先に思い出す</p>
        <p class="note">${item.trigger || item.purpose}</p>
      </div>
      <div class="quiz-answer">
        <div class="formula${state.revealed ? formulaDensityClass(item.formula) : " masked"}">${state.revealed ? renderMath(item.formula) : "<span>?</span>"}</div>
        ${state.revealed ? `
          <div class="card-body">
            <div class="meta-block mnemonic"><p class="meta-label">覚え方</p><p class="note">${item.mnemonic || "未設定"}</p></div>
            <div class="meta-block"><p class="meta-label">使う前の確認</p><p class="note">${item.before || "未設定"}</p></div>
          </div>
        ` : ""}
      </div>
      <div class="memorize-actions">
        <button type="button" data-memorize="prev">ひとつ前</button>
        <button class="primary-button" type="button" data-memorize="reveal">${state.revealed ? "隠す" : "答えを見る"}</button>
        <button type="button" data-memorize="next">まだ不安</button>
        <button class="master-button" type="button" data-memorize="master">完全に覚えた</button>
      </div>
    </article>
  `;
}

function renderMap() {
  views.map.innerHTML = `
    <section class="panel">
      <h3>全体マップ</h3>
      <div class="map-list">
        ${data.map.map((item) => `
          <article class="map-row">
            <div class="map-title">
              <strong>${item.no}. ${item.field}</strong>
              <span class="badge ${badgeClass(item.importance)}">${item.importance}</span>
            </div>
            <p class="note">${item.frequency} / 公式暗記量：${item.amount} / ${item.priority}</p>
            <p class="note">${item.strategy}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function updateCounts() {
  masteredCount.textContent = state.mastered.size;
  totalCount.textContent = `/ ${formulas.length}`;
}

function renderAll() {
  renderTabs();
  renderOverview();
  renderCards();
  renderTrainer();
  renderMemorize();
  renderMap();
  updateCounts();
}

function setMode(mode) {
  state.mode = mode;
  const viewKey = mode.startsWith("memorize") ? "memorize" : mode;
  Object.entries(views).forEach(([key, view]) => view.classList.toggle("hidden", key !== viewKey));
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  if (mode.startsWith("memorize")) {
    state.memorizeIndex = 0;
    state.revealed = false;
    renderMemorize();
  }
}

importanceTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-importance]");
  if (!button) return;
  state.importance = button.dataset.importance;
  state.trainerIndex = 0;
  state.memorizeIndex = 0;
  state.revealed = false;
  renderAll();
});

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  state.trainerIndex = 0;
  state.memorizeIndex = 0;
  state.revealed = false;
  renderAll();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.trainerIndex = 0;
  state.memorizeIndex = 0;
  state.revealed = false;
  renderCards();
  renderTrainer();
  renderMemorize();
});

document.querySelector(".mode-switch").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  if (button.dataset.mode === "memorize") {
    state.memorizeImportance = state.importance;
  }
  setMode(button.dataset.mode);
});

document.querySelector("#resumeButton").addEventListener("click", () => {
  state.memorizeImportance = state.importance;
  setMode("memorize");
  renderMemorize();
});

views.cards.addEventListener("click", (event) => {
  const masterButton = event.target.closest("[data-master]");
  const focusButton = event.target.closest("[data-focus]");
  if (masterButton) {
    const id = masterButton.dataset.master;
    state.mastered.has(id) ? state.mastered.delete(id) : state.mastered.add(id);
    saveMastery();
    renderCards();
    renderMemorize();
    updateCounts();
  }
  if (focusButton) {
    const id = focusButton.dataset.focus;
    const items = filteredFormulas();
    state.trainerIndex = Math.max(0, items.findIndex((item) => item.id === id));
    setMode("trainer");
    renderTrainer();
  }
});

views.trainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-trainer]");
  if (!button) return;
  if (button.dataset.trainer === "show") {
    document.querySelector("#trainerAnswer")?.classList.remove("hidden");
  }
  if (button.dataset.trainer === "next") {
    state.trainerIndex += 1;
    renderTrainer();
  }
  if (button.dataset.trainer === "prev") {
    state.trainerIndex -= 1;
    renderTrainer();
  }
});

views.memorize.addEventListener("click", (event) => {
  const button = event.target.closest("[data-memorize]");
  if (!button) return;
  const items = filteredFormulas({ excludeMastered: true, importance: memorizeImportanceForMode() });
  if (!items.length) return;

  if (button.dataset.memorize === "reveal") {
    state.revealed = !state.revealed;
  }
  if (button.dataset.memorize === "next") {
    state.memorizeIndex += 1;
    state.revealed = false;
  }
  if (button.dataset.memorize === "prev") {
    state.memorizeIndex -= 1;
    state.revealed = false;
  }
  if (button.dataset.memorize === "master") {
    state.mastered.add(items[state.memorizeIndex].id);
    saveMastery();
    state.revealed = false;
  }
  renderCards();
  renderMemorize();
  updateCounts();
});

renderAll();
setMode("overview");
