const formulas = [
  {
    category: "直流",
    title: "オームの法則",
    formula: "V = IR",
    role: "電圧・電流・抵抗の基本関係。回路計算の最初に使う土台。",
    mnemonic: "V（ブイ）はアイ（I）アール（R）。Vは愛ある。"
  },
  {
    category: "直流",
    title: "抵抗",
    formula: "R = ρ [[l/S]]",
    role: "導体の長さ・断面積・材質から抵抗を求める。長いほど大きく、太いほど小さい。",
    mnemonic: "抵抗（R）するロー（ρ）は、上に長（l）く下はスリム（S）。"
  },
  {
    category: "直流",
    title: "電力",
    formula: "P = VI = I^2R = [[V^2/R]]",
    role: "電気がどれだけの速さで仕事や熱になるかを表す。",
    mnemonic: "パワー（P）のブイアイ（VI）、愛に（I^2）アール、ブイに（V^2）割るアール。"
  },
  {
    category: "直流",
    title: "電力量",
    formula: "W = Pt",
    role: "電力を時間分だけ積み上げた量。kWhの計算で使う。",
    mnemonic: "ワット（W）をパッと（Pt）使う電力量。"
  },
  {
    category: "交流",
    title: "周期と周波数",
    formula: "f = [[1/T]]",
    role: "1秒間に何回くり返すかを表す。周期とは逆数の関係。",
    mnemonic: "振（f）り返れば、上（1）に下（T）。"
  },
  {
    category: "交流",
    title: "角周波数",
    formula: "ω = 2πf",
    role: "交流の速さを角度で表す。コイルやコンデンサの計算で使う。",
    mnemonic: "オメガ（ω）は、ニパイ（2π）エフ（f）。"
  },
  {
    category: "交流",
    title: "正弦波の実効値",
    formula: "実効値 = [[最大値/√2]]",
    role: "交流を直流と同じ効き目で表す値。電圧・電流の標準表示。",
    mnemonic: "じっこう（実効）は、ルートに（√2）割られる最大（最大値）。"
  },
  {
    category: "交流",
    title: "誘導性リアクタンス",
    formula: "X_L = ωL",
    role: "コイルが交流を妨げる大きさ。周波数が高いほど大きくなる。",
    mnemonic: "コイルのXLは、オメガ（ω）エル（L）。"
  },
  {
    category: "交流",
    title: "容量性リアクタンス",
    formula: "X_C = [[1/ωC]]",
    role: "コンデンサが交流を妨げる大きさ。周波数が高いほど小さくなる。",
    mnemonic: "コンデンサXCは、上に1、下がオメガ（ω）シー（C）。"
  },
  {
    category: "交流",
    title: "交流電力",
    formula: "S = VI | P = VI cosθ | Q = VI sinθ",
    role: "皮相電力S、有効電力P、無効電力Qを区別する。力率問題の中心。",
    mnemonic: "見かけ（S）はブイアイ。働くピー（P）コス、遊ぶキュー（Q）サイン。"
  },
  {
    category: "交流",
    title: "交流電力の関係",
    formula: "S = √[[P^2 + Q^2]]",
    role: "有効電力Pと無効電力Qから皮相電力Sを求める。",
    mnemonic: "見かけ（S）のルートは、ピカ（P^2）足すキュカ（Q^2）。"
  },
  {
    category: "交流",
    title: "力率",
    formula: "cosθ = [[P/S]]",
    role: "見かけの電力Sのうち、実際に仕事をした割合を表す。",
    mnemonic: "コス（cosθ）は、上がピー（P）で下がエス（S）。"
  },
  {
    category: "過渡",
    title: "RL回路の時定数",
    formula: "τ = [[L/R]]",
    role: "コイル電流の立ち上がり・減衰の速さを決める。",
    mnemonic: "RLの時間は、上がエル（L）で下がアール（R）。"
  },
  {
    category: "過渡",
    title: "RC回路の時定数",
    formula: "τ = RC",
    role: "コンデンサの充放電の速さを決める。",
    mnemonic: "RCの時間は、そのままアールシー（RC）。"
  },
  {
    category: "三相",
    title: "Y-Y結線",
    formula: "I_l = I_p | V_l = √3V_p",
    role: "Y結線の線間電圧・線電流の関係を整理する。",
    mnemonic: "ワイ（Y）は電流同じ、電圧にルートさん（√3）。"
  },
  {
    category: "三相",
    title: "Δ-Δ結線",
    formula: "I_l = √3I_p | V_l = V_p",
    role: "Δ結線の線間電圧・線電流の関係を整理する。",
    mnemonic: "デルタ（Δ）は電圧同じ、電流にルートさん（√3）。"
  },
  {
    category: "三相",
    title: "負荷の互換",
    formula: "Δ → Y = [[1/3]]倍 | Y → Δ = 3倍",
    role: "三相負荷をY・Δ変換するときのインピーダンス換算。",
    mnemonic: "デル（Δ）ワイ（Y）は3分の1、ワイ（Y）デル（Δ）は3倍。"
  },
  {
    category: "三相",
    title: "三相電力",
    formula: "P = √3VI cosθ",
    role: "三相交流の有効電力を線間電圧V・線電流Iから求める。",
    mnemonic: "三相パワーは、ルートさん（√3）ブイ（V）アイ（I）コス（cosθ）。"
  },
  {
    category: "静電",
    title: "クーロンの法則",
    formula: "F = 9×10^9 × [[Q_1Q_2/r^2]]",
    role: "2つの電荷にはたらく力。距離の2乗に反比例する。",
    mnemonic: "クーロン力（F）は、旧（9）電（10^9）の上でキュッキュ（Q_1Q_2）とアール二乗（r^2）で割る。"
  },
  {
    category: "静電",
    title: "誘電率",
    formula: "ε = ε_0ε_r",
    role: "電気の通しやすさを表す。真空の誘電率と比誘電率の積。",
    mnemonic: "イプシロン（ε）は、ゼロ（ε_0）にアール（ε_r）をかけるだけ。"
  },
  {
    category: "静電",
    title: "電界の強さ",
    formula: "E = 9×10^9 × [[Q/r^2]]",
    role: "点電荷の周囲で、単位電荷が受ける力の強さを表す。",
    mnemonic: "電界（E）は、旧（9）電（10^9）の上でクイ（Q）っとアール二乗（r^2）で割る。"
  },
  {
    category: "静電",
    title: "電気力線本数",
    formula: "N = [[Q/ε]]",
    role: "電荷Qから出る電気力線の本数を表す。",
    mnemonic: "力線（N）は、上がキュー（Q）で下がイプシロン（ε）。"
  },
  {
    category: "静電",
    title: "電束密度",
    formula: "D = [[Q/4πr^2]]",
    role: "電荷から出る電束を球の表面積で割った密度。",
    mnemonic: "密度（D）は、上がキュー（Q）、下は丸ごとヨンパイアール二乗（4πr^2）。"
  },
  {
    category: "静電",
    title: "電位",
    formula: "V = 9×10^9 × [[Q/r]]",
    role: "点電荷から距離rの位置にある電位。電界と違って距離は1乗。",
    mnemonic: "電位（V）は、旧（9）電（10^9）の上でキュー（Q）をアール（r）だけで割る。"
  },
  {
    category: "静電",
    title: "静電容量",
    formula: "C = ε[[S/d]]",
    role: "平行板コンデンサの容量。面積と誘電率で増え、距離で減る。",
    mnemonic: "容量（C）は、イプシロン（ε）の上（S）下（d）。"
  },
  {
    category: "静電",
    title: "蓄えられる電荷",
    formula: "Q = CV",
    role: "コンデンサの容量Cと電圧Vから蓄えた電荷Qを求める。",
    mnemonic: "電荷（Q）は、シーブイ（CV）。"
  },
  {
    category: "静電",
    title: "エネルギー",
    formula: "W = [[1/2]]CV^2",
    role: "コンデンサに蓄えられるエネルギー。",
    mnemonic: "コンデンサのWは、半分（1/2）のシーブイ二乗（CV^2）。"
  },
  {
    category: "磁気",
    title: "透磁率",
    formula: "μ = μ_0μ_r",
    role: "磁束の通しやすさ。真空の透磁率と比透磁率の積。",
    mnemonic: "ミュー（μ）は、ゼロ（μ_0）にアール（μ_r）をかけるだけ。"
  },
  {
    category: "磁気",
    title: "磁界の強さ",
    formula: "H = [[m/4πμ_0r^2]]",
    role: "磁極mから距離rの位置にできる磁界の強さ。",
    mnemonic: "磁界（H）は、上がエム（m）、下はヨンパイミューゼロアール二乗（4πμ_0r^2）。"
  },
  {
    category: "磁気",
    title: "磁力線の本数",
    formula: "N = [[Φ/μ_0]]",
    role: "磁束Φを真空の透磁率で割って磁力線の本数を表す。",
    mnemonic: "磁力線（N）は、上がファイ（Φ）で下がミューゼロ（μ_0）。"
  },
  {
    category: "磁気",
    title: "磁束密度",
    formula: "B = μH",
    role: "磁界Hによって生じる磁束の密度。",
    mnemonic: "B（ビー）は、ミューエイチ（μH）。"
  },
  {
    category: "磁気",
    title: "磁束",
    formula: "Φ = BS",
    role: "面Sを通る磁束の総量。磁束密度に面積をかける。",
    mnemonic: "ファイ（Φ）は、ビーエス（BS）。"
  },
  {
    category: "磁気",
    title: "無限長導体の磁界",
    formula: "H = [[I/2πr]]",
    role: "長い直線導体の周囲にできる磁界の強さ。",
    mnemonic: "無限長（H）は、上がアイ（I）、下がニパイアール（2πr）。"
  },
  {
    category: "磁気",
    title: "円形コイルの中心磁界",
    formula: "H = [[NI/2a]]",
    role: "N回巻き円形コイルの中心にできる磁界の強さ。",
    mnemonic: "円形（H）は、上がエヌアイ（NI）、下がニア（2a）。"
  },
  {
    category: "磁気",
    title: "ソレノイド内部磁界",
    formula: "H = [[NI/l]]",
    role: "ソレノイド内部の磁界。巻数と電流で強く、長さで弱くなる。",
    mnemonic: "ソレノイド（H）は、上がエヌアイ（NI）、下がエル（l）。"
  },
  {
    category: "磁気",
    title: "コイルの起電力",
    formula: "e = -N[[ΔΦ/Δt]]",
    role: "磁束変化によって生じる誘導起電力。マイナスは変化を妨げる向き。",
    mnemonic: "起電力（e）は、マイナスエヌ（-N）の、デルタファ割るデルタティ（ΔΦ/Δt）。"
  },
  {
    category: "磁気",
    title: "動体による起電力",
    formula: "e = Blv sinθ",
    role: "磁界中で導体を動かしたときに生じる起電力。",
    mnemonic: "動かす（e）のは、ビルブ（Blv）のサイン（sinθ）。"
  },
  {
    category: "磁気",
    title: "電磁力",
    formula: "F = BIl sinθ",
    role: "磁界中の導体に電流が流れたときの力。",
    mnemonic: "力（F）は、ビル（BIl）のサイン（sinθ）。"
  },
  {
    category: "磁気",
    title: "磁気抵抗",
    formula: "R_m = [[l/μS]]",
    role: "磁気回路で磁束の通りにくさを表す。",
    mnemonic: "磁気抵抗（Rm）は、上がエル（l）、下がミューエス（μS）。"
  },
  {
    category: "磁気",
    title: "磁気回路のオーム",
    formula: "R_m = [[NI/Φ]]",
    role: "磁気回路で起磁力NI、磁束Φ、磁気抵抗Rmの関係を表す。",
    mnemonic: "Rmは、上がエヌアイ（NI）、下がファイ（Φ）。"
  },
  {
    category: "磁気",
    title: "自己誘導起電力",
    formula: "e = -L[[ΔI/Δt]]",
    role: "電流変化によってコイル自身に生じる起電力。",
    mnemonic: "自己（e）は、マイナスエル（-L）の、デルタアイ割るデルタティ（ΔI/Δt）。"
  },
  {
    category: "磁気",
    title: "環状コイルのL",
    formula: "L = [[μSN^2/l]]",
    role: "環状コイルの自己インダクタンスを求める。",
    mnemonic: "インダクタンス（L）は、上がミューエスエヌ二乗（μSN^2）、下がエル（l）。"
  },
  {
    category: "磁気",
    title: "磁気エネルギー",
    formula: "W = [[1/2]]LI^2",
    role: "コイルに蓄えられる磁気エネルギー。",
    mnemonic: "コイルのWは、半分（1/2）のエルアイ二乗（LI^2）。"
  },
  {
    category: "電子",
    title: "電子の運動エネルギー",
    formula: "eV = [[1/2]]mv^2",
    role: "電圧で加速された電子のエネルギーと運動エネルギーの関係。",
    mnemonic: "イーヴィー（eV）は、半分のエムブイ二乗（1/2mv^2）。"
  }
];

const ALL = "すべて";
const categories = [ALL, ...new Set(formulas.map((item) => item.category))];
const state = {
  category: ALL,
  query: "",
  mode: "cards",
  checked: new Set(JSON.parse(localStorage.getItem("denken-checked") || "[]")),
  mastered: new Set(JSON.parse(localStorage.getItem("denken-mastered") || "[]")),
  quizIndex: 0,
  memorizeIndex: 0,
  memorizeRevealed: false
};

const cardsView = document.querySelector("#cardsView");
const listView = document.querySelector("#listView");
const quizView = document.querySelector("#quizView");
const memorizeView = document.querySelector("#memorizeView");
const tabs = document.querySelector("#categoryTabs");
const searchInput = document.querySelector("#searchInput");
const masteredCount = document.querySelector("#masteredCount");
const quizTitle = document.querySelector("#quizTitle");
const quizCategory = document.querySelector("#quizCategory");
const quizAnswer = document.querySelector("#quizAnswer");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatFormula(raw) {
  return raw
    .split(" | ")
    .map((part) => renderMath(part.trim()))
    .join("");
}

function renderMath(text) {
  const withFractions = text.replace(/\[\[([^/]+)\/([^\]]+)\]\]/g, (_, num, den) => {
    return `<span class="frac"><span class="num">${renderInline(num)}</span><span class="den">${renderInline(den)}</span></span>`;
  });
  return `<div>${renderInline(withFractions)}</div>`;
}

function renderInline(text) {
  return text
    .replace(/√\[\[([^\]]+)\]\]/g, '<span>√<span class="sqrt">$1</span></span>')
    .replace(/√([0-9A-Za-zθπμ_{}]+)/g, '<span>√<span class="sqrt">$1</span></span>')
    .replace(/\^([0-9]+)/g, "<sup>$1</sup>")
    .replace(/_([0-9A-Za-z]+)/g, "<sub>$1</sub>");
}

function getFilteredFormulas({ excludeMastered = false } = {}) {
  const query = state.query.trim().toLowerCase();
  return formulas.filter((item) => {
    const inCategory = state.category === ALL || item.category === state.category;
    const notMastered = !excludeMastered || !state.mastered.has(item.title);
    const text = `${item.title} ${item.category} ${item.role} ${item.mnemonic} ${item.formula}`.toLowerCase();
    return inCategory && notMastered && (!query || text.includes(query));
  });
}

function saveProgress() {
  localStorage.setItem("denken-checked", JSON.stringify([...state.checked]));
  localStorage.setItem("denken-mastered", JSON.stringify([...state.mastered]));
}

function renderTabs() {
  tabs.innerHTML = categories.map((category) => {
    const active = category === state.category ? " active" : "";
    return `<button class="tab${active}" type="button" data-category="${category}" role="tab">${category}</button>`;
  }).join("");
}

function formulaClass(item) {
  const lines = item.formula.split(" | ").length;
  return `formula${lines > 1 ? " multi" : ""}`;
}

function renderFormulaCard(item, index) {
  const checked = state.checked.has(item.title);
  const mastered = state.mastered.has(item.title);
  return `
    <article class="formula-card${index === 0 ? " featured" : ""}${mastered ? " mastered" : ""}">
      <div class="card-top">
        <div>
          <div class="category">${item.category}</div>
          <h2 class="title">${item.title}</h2>
        </div>
        <button class="mark${checked ? " done" : ""}" type="button" data-checked="${escapeHtml(item.title)}" aria-label="確認した印">${checked ? "済" : "未"}</button>
      </div>
      <div class="${formulaClass(item)}">${formatFormula(item.formula)}</div>
      <div class="note-block">
        <p class="note"><strong>役割：</strong>${item.role}</p>
        <div class="mnemonic">${item.mnemonic}</div>
        <button class="master-button${mastered ? " mastered" : ""}" type="button" data-mastered="${escapeHtml(item.title)}">
          ${mastered ? "完全暗記を解除" : "完全に覚えた"}
        </button>
      </div>
    </article>
  `;
}

function renderCards() {
  const items = getFilteredFormulas();
  cardsView.innerHTML = items.length
    ? items.map(renderFormulaCard).join("")
    : `<div class="empty">該当する公式がありません。</div>`;
}

function renderList() {
  const items = getFilteredFormulas();
  listView.innerHTML = items.length ? items.map((item) => `
    <article class="formula-row${state.mastered.has(item.title) ? " mastered" : ""}">
      <div class="row-title">${item.title}</div>
      <div class="row-formula ${item.formula.includes(" | ") ? "formula multi" : ""}">${formatFormula(item.formula)}</div>
    </article>
  `).join("") : `<div class="empty">該当する公式がありません。</div>`;
}

function clampIndex(index, length) {
  if (!length) return 0;
  return (index + length) % length;
}

function renderQuiz() {
  const items = getFilteredFormulas();
  if (!items.length) {
    quizTitle.textContent = "出題できる公式がありません";
    quizCategory.textContent = "検索条件を変更してください";
    quizAnswer.innerHTML = "";
    return;
  }
  state.quizIndex = clampIndex(state.quizIndex, items.length);
  const item = items[state.quizIndex];
  quizCategory.textContent = `${item.category} / ${state.quizIndex + 1}枚目`;
  quizTitle.textContent = item.title;
  quizAnswer.classList.add("hidden");
  quizAnswer.innerHTML = `
    <div class="${formulaClass(item)}">${formatFormula(item.formula)}</div>
    <div class="note-block">
      <p class="note"><strong>役割：</strong>${item.role}</p>
      <div class="mnemonic">${item.mnemonic}</div>
    </div>
  `;
}

function renderMemorize() {
  const items = getFilteredFormulas({ excludeMastered: true });
  if (!items.length) {
    memorizeView.innerHTML = `
      <div class="quiz-panel complete-panel">
        <p class="quiz-kicker">暗記モード</p>
        <h2>この条件の公式はすべて完全暗記済みです</h2>
        <p class="note">カテゴリや検索条件を変えるか、カード画面で完全暗記を解除できます。</p>
      </div>
    `;
    return;
  }

  state.memorizeIndex = clampIndex(state.memorizeIndex, items.length);
  const item = items[state.memorizeIndex];
  memorizeView.innerHTML = `
    <article class="formula-card memorize-card">
      <div class="card-top">
        <div>
          <div class="category">暗記モード / ${state.memorizeIndex + 1}枚目</div>
          <h2 class="title">${item.title}</h2>
        </div>
      </div>
      <div class="${formulaClass(item)} ${state.memorizeRevealed ? "" : "masked"}">
        ${state.memorizeRevealed ? formatFormula(item.formula) : "<span>?</span>"}
      </div>
      <div class="note-block">
        ${state.memorizeRevealed ? `
          <p class="note"><strong>役割：</strong>${item.role}</p>
          <div class="mnemonic">${item.mnemonic}</div>
        ` : `<p class="note"><strong>思い出す：</strong>公式を頭の中で言ってから答えを開く。</p>`}
        <div class="memorize-actions">
          <button type="button" data-memorize="prev">ひとつ前</button>
          <button type="button" data-memorize="reveal">${state.memorizeRevealed ? "隠す" : "答えを見る"}</button>
          <button type="button" data-memorize="next">まだ不安</button>
          <button class="master-button" type="button" data-memorize="master">完全に覚えた</button>
        </div>
      </div>
    </article>
  `;
}

function updateMasteredCount() {
  masteredCount.textContent = state.mastered.size;
}

function render() {
  renderTabs();
  renderCards();
  renderList();
  renderQuiz();
  renderMemorize();
  updateMasteredCount();
}

function rerenderCurrentViews() {
  renderCards();
  renderList();
  renderQuiz();
  renderMemorize();
  updateMasteredCount();
}

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  state.quizIndex = 0;
  state.memorizeIndex = 0;
  state.memorizeRevealed = false;
  render();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.quizIndex = 0;
  state.memorizeIndex = 0;
  state.memorizeRevealed = false;
  rerenderCurrentViews();
});

document.querySelector(".mode-switch").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.mode = button.dataset.mode;
  document.querySelectorAll(".mode-button").forEach((item) => item.classList.toggle("active", item === button));
  cardsView.classList.toggle("hidden", state.mode !== "cards");
  quizView.classList.toggle("hidden", state.mode !== "quiz");
  memorizeView.classList.toggle("hidden", state.mode !== "memorize");
  listView.classList.toggle("hidden", state.mode !== "list");
});

cardsView.addEventListener("click", (event) => {
  const checkedButton = event.target.closest("[data-checked]");
  const masteredButton = event.target.closest("[data-mastered]");

  if (checkedButton) {
    const title = checkedButton.dataset.checked;
    state.checked.has(title) ? state.checked.delete(title) : state.checked.add(title);
    saveProgress();
    rerenderCurrentViews();
  }

  if (masteredButton) {
    const title = masteredButton.dataset.mastered;
    state.mastered.has(title) ? state.mastered.delete(title) : state.mastered.add(title);
    saveProgress();
    rerenderCurrentViews();
  }
});

document.querySelector("#showAnswer").addEventListener("click", () => {
  quizAnswer.classList.remove("hidden");
});

document.querySelector("#nextQuestion").addEventListener("click", () => {
  state.quizIndex += 1;
  renderQuiz();
});

document.querySelector("#prevQuestion").addEventListener("click", () => {
  state.quizIndex -= 1;
  renderQuiz();
});

memorizeView.addEventListener("click", (event) => {
  const button = event.target.closest("[data-memorize]");
  if (!button) return;
  const items = getFilteredFormulas({ excludeMastered: true });
  if (!items.length) return;

  if (button.dataset.memorize === "reveal") {
    state.memorizeRevealed = !state.memorizeRevealed;
  }

  if (button.dataset.memorize === "next") {
    state.memorizeIndex += 1;
    state.memorizeRevealed = false;
  }

  if (button.dataset.memorize === "prev") {
    state.memorizeIndex -= 1;
    state.memorizeRevealed = false;
  }

  if (button.dataset.memorize === "master") {
    const item = items[state.memorizeIndex];
    state.mastered.add(item.title);
    saveProgress();
    state.memorizeRevealed = false;
  }

  renderMemorize();
  renderCards();
  renderList();
  updateMasteredCount();
});

render();
