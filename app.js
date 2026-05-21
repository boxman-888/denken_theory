const formulas = [
  {
    category: "直流",
    title: "オームの法則",
    formula: "V = IR",
    role: "電圧・電流・抵抗の基本関係。回路計算の入口になる最重要公式。",
    mnemonic: "ブイっと行くなら、アイは抵抗を連れてくる。VはIとRで進む。"
  },
  {
    category: "直流",
    title: "抵抗",
    formula: "R = ρ [[l/S]]",
    role: "導体の長さ・断面積・材質から抵抗を求める。長いほど大きく、太いほど小さい。",
    mnemonic: "抵抗はローっと長い道、細い席なら混み合う。ρ・l・S。"
  },
  {
    category: "直流",
    title: "電力",
    formula: "P = VI = I^2R = [[V^2/R]]",
    role: "消費される電気エネルギーの速さ。抵抗回路の発熱や仕事率で使う。",
    mnemonic: "パワーはブイアイ、愛が2乗で抵抗、ブイも2乗で割り算。"
  },
  {
    category: "直流",
    title: "電力量",
    formula: "W = Pt",
    role: "電力を時間だけ積み上げた量。kWh計算の土台。",
    mnemonic: "ワットを時間でワッと貯める。WはPとt。"
  },
  {
    category: "交流",
    title: "周期と周波数",
    formula: "f = [[1/T]]",
    role: "1秒間に何回くり返すかを表す。周期とは逆数の関係。",
    mnemonic: "周期Tが長いと、ふるえる回数fは少ない。"
  },
  {
    category: "交流",
    title: "角周波数",
    formula: "ω = 2πf",
    role: "回転角で表した交流の速さ。リアクタンス計算で頻出。",
    mnemonic: "オメガは2πで一周、f回まわる。"
  },
  {
    category: "交流",
    title: "正弦波交流の実効値",
    formula: "実効値 = [[最大値/√2]]",
    role: "交流を直流相当の効き目で表す値。電圧・電流の標準表記。",
    mnemonic: "最大はルート2で落ち着いて実効値。"
  },
  {
    category: "交流",
    title: "誘導性リアクタンス",
    formula: "X_L = ωL",
    role: "コイルが交流を妨げる大きさ。周波数が上がるほど大きくなる。",
    mnemonic: "エックスLは、オメガとLが腕を組む。"
  },
  {
    category: "交流",
    title: "容量性リアクタンス",
    formula: "X_C = [[1/ωC]]",
    role: "コンデンサが交流を妨げる大きさ。周波数が上がるほど小さくなる。",
    mnemonic: "コンデンサは下にωC。速くなるほど通しやすい。"
  },
  {
    category: "交流",
    title: "交流電力",
    formula: "S = VI | P = VI cosθ | Q = VI sinθ",
    role: "皮相電力S、有効電力P、無効電力Qを区別する。力率問題の中心。",
    mnemonic: "有効はコスって仕事、無効はサインで揺れるだけ。"
  },
  {
    category: "交流",
    title: "力率",
    formula: "cosθ = [[P/S]]",
    role: "皮相電力のうち、実際に仕事をする割合を示す。",
    mnemonic: "力になるのはP、見かけのSで割ってコスパを見る。"
  },
  {
    category: "過渡現象",
    title: "RL直列回路の時定数",
    formula: "T = [[L/R]]",
    role: "コイル電流の立ち上がり・減衰の速さを決める。",
    mnemonic: "エルは粘る、アールで急ぐ。だからL割るR。"
  },
  {
    category: "過渡現象",
    title: "RC直列回路の時定数",
    formula: "T = RC",
    role: "コンデンサの充放電の速さを決める。",
    mnemonic: "充電タイムはRとCが手を組む。"
  },
  {
    category: "三相交流",
    title: "Y-Y結線",
    formula: "線電流 = 相電流 | 線間電圧 = √3 × 相電圧",
    role: "Y結線の線間電圧・線電流の関係を整理する。",
    mnemonic: "Yは電流そのまま、電圧だけルート3で広がる。"
  },
  {
    category: "三相交流",
    title: "Δ-Δ結線",
    formula: "線電流 = √3 × 相電流 | 線間電圧 = 相電圧",
    role: "Δ結線の線間電圧・線電流の関係を整理する。",
    mnemonic: "デルタは電圧そのまま、電流だけルート3で増える。"
  },
  {
    category: "三相交流",
    title: "三相電力",
    formula: "P = √3VI cosθ",
    role: "三相交流の有効電力を線間電圧V・線電流Iから求める。",
    mnemonic: "三相はルート3、ブイアイ、コスで仕事完了。"
  },
  {
    category: "静電気",
    title: "クーロンの法則",
    formula: "F = [[Q_1Q_2/4πε_0r^2]] = 9×10^9 × [[Q_1Q_2/r^2]]",
    role: "2つの電荷にはたらく力。距離の2乗に反比例する。",
    mnemonic: "電荷は近いほど強い。距離rは2乗でブレーキ。"
  },
  {
    category: "静電気",
    title: "電界の強さ",
    formula: "E = [[Q/4πε_0r^2]]",
    role: "点電荷の周囲で、単位電荷が受ける力の強さを表す。",
    mnemonic: "電界Eは、Qを4πεと距離2乗で包む。"
  },
  {
    category: "静電気",
    title: "電束密度",
    formula: "D = [[Q/4πr^2]]",
    role: "電荷から出る電束を面積で割った密度。",
    mnemonic: "Dは電荷Qを丸い面積4πr2で広げる。"
  },
  {
    category: "静電気",
    title: "電位",
    formula: "V = [[Q/4πε_0r]]",
    role: "点電荷から距離rの位置にある電位。電界との違いはrが1乗。",
    mnemonic: "電位Vは距離rだけで下がる、電界Eはr2で下がる。"
  },
  {
    category: "静電気",
    title: "静電容量",
    formula: "C = [[εS/d]]",
    role: "平行板コンデンサの容量。面積と誘電率で増え、距離で減る。",
    mnemonic: "容量Cは広い席Sと誘電率ε、距離dは邪魔をする。"
  },
  {
    category: "静電気",
    title: "コンデンサのエネルギー",
    formula: "W = [[1/2]]CV^2",
    role: "コンデンサに蓄えられるエネルギー。",
    mnemonic: "コンデンサの仕事は半分、CとV2で蓄える。"
  },
  {
    category: "磁気",
    title: "透磁率",
    formula: "μ = μ_0μ_r",
    role: "磁束の通しやすさ。真空の透磁率と比透磁率の積。",
    mnemonic: "ミューはゼロとアールで材料の通しやすさ。"
  },
  {
    category: "磁気",
    title: "磁束密度",
    formula: "B = μH",
    role: "磁界Hによって生じる磁束の密度。",
    mnemonic: "BはミューっとHを濃くする。"
  },
  {
    category: "磁気",
    title: "磁束",
    formula: "Φ = BS",
    role: "面Sを通る磁束の総量。磁束密度に面積をかける。",
    mnemonic: "ファイはBを面Sに広げた量。"
  },
  {
    category: "磁気",
    title: "無限長導体の磁界",
    formula: "H = [[I/2πr]]",
    role: "長い直線導体の周囲にできる磁界の強さ。",
    mnemonic: "一本線のまわりは、電流Iを2πrでぐるっと割る。"
  },
  {
    category: "磁気",
    title: "ソレノイド内部磁界",
    formula: "H = [[NI/l]]",
    role: "ソレノイド内部の磁界。巻数と電流で強く、長さで弱くなる。",
    mnemonic: "長いソレノイドは、巻数Nと電流Iを長さlでならす。"
  },
  {
    category: "磁気",
    title: "電磁力",
    formula: "F = BIl sinθ",
    role: "磁界中の導体に電流が流れたときの力。",
    mnemonic: "力はB・I・長さl、角度はサインで効き目を見る。"
  },
  {
    category: "磁気",
    title: "コイルの起電力",
    formula: "e = -N[[ΔΦ/Δt]]",
    role: "磁束変化によって生じる誘導起電力。マイナスは変化を妨げる向き。",
    mnemonic: "変わるファイにN回巻き、マイナスで逆らう。"
  },
  {
    category: "磁気",
    title: "自己誘導起電力",
    formula: "e = -L[[ΔI/Δt]]",
    role: "電流変化によってコイル自身に生じる起電力。",
    mnemonic: "電流Iの変化に、Lが待ったをかける。"
  },
  {
    category: "磁気",
    title: "磁気エネルギー",
    formula: "W = [[1/2]]LI^2",
    role: "コイルに蓄えられる磁気エネルギー。",
    mnemonic: "コイルの仕事も半分、LとI2で蓄える。"
  }
];

const categories = ["すべて", ...new Set(formulas.map((item) => item.category))];
const state = {
  category: "すべて",
  query: "",
  mode: "cards",
  learned: new Set(JSON.parse(localStorage.getItem("denken-learned") || "[]")),
  quizIndex: 0
};

const cardsView = document.querySelector("#cardsView");
const listView = document.querySelector("#listView");
const quizView = document.querySelector("#quizView");
const tabs = document.querySelector("#categoryTabs");
const searchInput = document.querySelector("#searchInput");
const learnedCount = document.querySelector("#learnedCount");
const quizTitle = document.querySelector("#quizTitle");
const quizCategory = document.querySelector("#quizCategory");
const quizAnswer = document.querySelector("#quizAnswer");

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
    .replace(/√([0-9A-Za-zθπμ_{}]+)/g, '<span>√<span class="sqrt">$1</span></span>')
    .replace(/\^([0-9]+)/g, "<sup>$1</sup>")
    .replace(/_([0-9A-Za-z]+)/g, "<sub>$1</sub>");
}

function filteredFormulas() {
  const query = state.query.trim().toLowerCase();
  return formulas.filter((item) => {
    const inCategory = state.category === "すべて" || item.category === state.category;
    const text = `${item.title} ${item.category} ${item.role} ${item.mnemonic} ${item.formula}`.toLowerCase();
    return inCategory && (!query || text.includes(query));
  });
}

function renderTabs() {
  tabs.innerHTML = categories.map((category) => {
    const active = category === state.category ? " active" : "";
    return `<button class="tab${active}" type="button" data-category="${category}" role="tab">${category}</button>`;
  }).join("");
}

function formulaClass(item, index) {
  const lines = item.formula.split(" | ").length;
  return `formula${lines > 1 ? " multi" : ""}`;
}

function renderCards() {
  const items = filteredFormulas();
  cardsView.innerHTML = items.length ? items.map((item, index) => {
    const done = state.learned.has(item.title);
    return `
      <article class="formula-card${index === 0 ? " featured" : ""}">
        <div class="card-top">
          <div>
            <div class="category">${item.category}</div>
            <h2 class="title">${item.title}</h2>
          </div>
          <button class="mark${done ? " done" : ""}" type="button" data-learned="${item.title}" aria-label="覚えた印">${done ? "済" : "未"}</button>
        </div>
        <div class="${formulaClass(item, index)}">${formatFormula(item.formula)}</div>
        <div class="note-block">
          <p class="note"><strong>役割：</strong>${item.role}</p>
          <div class="mnemonic">${item.mnemonic}</div>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty">該当する公式がありません。</div>`;
}

function renderList() {
  const items = filteredFormulas();
  listView.innerHTML = items.length ? items.map((item) => `
    <article class="formula-row">
      <div class="row-title">${item.title}</div>
      <div class="row-formula ${item.formula.includes(" | ") ? "formula multi" : ""}">${formatFormula(item.formula)}</div>
    </article>
  `).join("") : `<div class="empty">該当する公式がありません。</div>`;
}

function renderQuiz() {
  const items = filteredFormulas();
  if (!items.length) {
    quizTitle.textContent = "出題できる公式がありません";
    quizCategory.textContent = "検索条件を変更してください";
    quizAnswer.innerHTML = "";
    return;
  }
  state.quizIndex %= items.length;
  const item = items[state.quizIndex];
  quizCategory.textContent = item.category;
  quizTitle.textContent = item.title;
  quizAnswer.classList.add("hidden");
  quizAnswer.innerHTML = `
    <div class="${formulaClass(item, state.quizIndex)}">${formatFormula(item.formula)}</div>
    <div class="note-block">
      <p class="note"><strong>役割：</strong>${item.role}</p>
      <div class="mnemonic">${item.mnemonic}</div>
    </div>
  `;
}

function updateLearnedCount() {
  learnedCount.textContent = state.learned.size;
}

function render() {
  renderTabs();
  renderCards();
  renderList();
  renderQuiz();
  updateLearnedCount();
}

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  state.quizIndex = 0;
  render();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.quizIndex = 0;
  renderCards();
  renderList();
  renderQuiz();
});

document.querySelector(".mode-switch").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  state.mode = button.dataset.mode;
  document.querySelectorAll(".mode-button").forEach((item) => item.classList.toggle("active", item === button));
  cardsView.classList.toggle("hidden", state.mode !== "cards");
  quizView.classList.toggle("hidden", state.mode !== "quiz");
  listView.classList.toggle("hidden", state.mode !== "list");
});

cardsView.addEventListener("click", (event) => {
  const button = event.target.closest("[data-learned]");
  if (!button) return;
  const title = button.dataset.learned;
  if (state.learned.has(title)) {
    state.learned.delete(title);
  } else {
    state.learned.add(title);
  }
  localStorage.setItem("denken-learned", JSON.stringify([...state.learned]));
  renderCards();
  updateLearnedCount();
});

document.querySelector("#showAnswer").addEventListener("click", () => {
  quizAnswer.classList.remove("hidden");
});

document.querySelector("#nextQuestion").addEventListener("click", () => {
  state.quizIndex += 1;
  renderQuiz();
});

render();
