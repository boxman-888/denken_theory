const formulas = [
  {
    category: "直流",
    title: "オームの法則",
    formula: "V = IR",
    role: "電圧・電流・抵抗の基本関係。回路計算の最初に使う土台。",
    mnemonic: "Vは「行ける？」、Iが「Rあるよ」。電圧Vは、電流Iと抵抗Rのかけ算。"
  },
  {
    category: "直流",
    title: "抵抗",
    formula: "R = ρ [[l/S]]",
    role: "導体の長さ・断面積・材質から抵抗を求める。長いほど大きく、太いほど小さい。",
    mnemonic: "細いストローは飲みにくい。長い道lは抵抗アップ、広い断面Sはスイスイ。"
  },
  {
    category: "直流",
    title: "電力",
    formula: "P = VI = I^2R = [[V^2/R]]",
    role: "電気がどれだけの速さで仕事や熱になるかを表す。",
    mnemonic: "パワーPはブイアイ。電流メインならI2R、電圧メインならV2割るR。"
  },
  {
    category: "直流",
    title: "電力量",
    formula: "W = Pt",
    role: "電力を時間分だけ積み上げた量。kWhの計算で使う。",
    mnemonic: "ワットPを時間tだけ使ったら、電力量Wがたまる。スマホ充電のイメージ。"
  },
  {
    category: "交流",
    title: "周期と周波数",
    formula: "f = [[1/T]]",
    role: "1秒間に何回くり返すかを表す。周期とは逆数の関係。",
    mnemonic: "ゆっくり1周Tが長いほど、回数fは少ない。のんびり回転は低周波。"
  },
  {
    category: "交流",
    title: "角周波数",
    formula: "ω = 2πf",
    role: "交流の速さを角度で表す。コイルやコンデンサの計算で使う。",
    mnemonic: "1周は2π。f回まわるから、オメガは2πf。観覧車を思い出す。"
  },
  {
    category: "交流",
    title: "正弦波交流の実効値",
    formula: "実効値 = [[最大値/√2]]",
    role: "交流を直流と同じ効き目で表す値。電圧・電流の標準表示。",
    mnemonic: "最大値はちょっと盛りすぎ。実際に使う値はルート2で割って落ち着く。"
  },
  {
    category: "交流",
    title: "誘導性リアクタンス",
    formula: "X_L = ωL",
    role: "コイルが交流を妨げる大きさ。周波数が高いほど大きくなる。",
    mnemonic: "コイルLは変化が苦手。速いωほどイヤがって、XLが大きくなる。"
  },
  {
    category: "交流",
    title: "容量性リアクタンス",
    formula: "X_C = [[1/ωC]]",
    role: "コンデンサが交流を妨げる大きさ。周波数が高いほど小さくなる。",
    mnemonic: "コンデンサCは速い変化が得意。ωCが下にあるから、速いほどXCは小さい。"
  },
  {
    category: "交流",
    title: "交流電力",
    formula: "S = VI | P = VI cosθ | Q = VI sinθ",
    role: "皮相電力S、有効電力P、無効電力Qを区別する。力率問題の中心。",
    mnemonic: "仕事するPはコスプレのコス。遊んで戻るQはサインでゆらゆら。Sは見かけ。"
  },
  {
    category: "交流",
    title: "交流電力の関係",
    formula: "S = √[[P^2 + Q^2]]",
    role: "有効電力Pと無効電力Qから皮相電力Sを求める。",
    mnemonic: "PとQは直角三角形。最後は三平方でSに集合。"
  },
  {
    category: "交流",
    title: "力率",
    formula: "cosθ = [[P/S]]",
    role: "見かけの電力Sのうち、実際に仕事をした割合を表す。",
    mnemonic: "コスパを見るなら、働いたPを見かけSで割る。力率は電気のコスパ。"
  },
  {
    category: "過渡現象",
    title: "RL直列回路の時定数",
    formula: "T = [[L/R]]",
    role: "コイル電流の立ち上がり・減衰の速さを決める。",
    mnemonic: "コイルLはのんびり屋、抵抗Rはブレーキ。Lが上、Rが下で時間T。"
  },
  {
    category: "過渡現象",
    title: "RC直列回路の時定数",
    formula: "T = RC",
    role: "コンデンサの充放電の速さを決める。",
    mnemonic: "充電時間はRとCのペア。スマホ充電ケーブルとバッテリーでRC。"
  },
  {
    category: "三相交流",
    title: "Y-Y結線",
    formula: "線電流 = 相電流 | 線間電圧 = √3 × 相電圧",
    role: "Y結線の線間電圧・線電流の関係を整理する。",
    mnemonic: "Yは電流そのまま。電圧だけ3本の道で広がってルート3倍。"
  },
  {
    category: "三相交流",
    title: "Δ-Δ結線",
    formula: "線電流 = √3 × 相電流 | 線間電圧 = 相電圧",
    role: "Δ結線の線間電圧・線電流の関係を整理する。",
    mnemonic: "デルタは電圧そのまま。電流だけ三角を回ってルート3倍。"
  },
  {
    category: "三相交流",
    title: "平衡三相交流回路の負荷",
    formula: "Δ → Y はインピーダンス [[1/3]]倍 | Y → Δ はインピーダンス 3倍",
    role: "三相負荷をY・Δ変換するときのインピーダンス換算。",
    mnemonic: "デルタからワイへ行くと荷物は3分の1。ワイからデルタへ戻ると3倍。"
  },
  {
    category: "三相交流",
    title: "三相電力",
    formula: "P = √3VI cosθ",
    role: "三相交流の有効電力を線間電圧V・線電流Iから求める。",
    mnemonic: "三相はまずルート3。そこにV・I・コスで仕事量P。"
  },
  {
    category: "静電気",
    title: "クーロンの法則",
    formula: "F = [[Q_1Q_2/4πε_0r^2]] = 9×10^9 × [[Q_1Q_2/r^2]]",
    role: "2つの電荷にはたらく力。距離の2乗に反比例する。",
    mnemonic: "電荷Qどうしは近いと強烈。距離rは2乗で効くので、離れると一気に弱い。"
  },
  {
    category: "静電気",
    title: "誘電率",
    formula: "ε = ε_0ε_r",
    role: "電気の通しやすさを表す。真空の誘電率と比誘電率の積。",
    mnemonic: "イプシロンは基本ε0に、材料の性格εrをかける。"
  },
  {
    category: "静電気",
    title: "電界の強さ",
    formula: "E = [[Q/4πε_0r^2]] = 9×10^9 × [[Q/r^2]]",
    role: "点電荷の周囲で、単位電荷が受ける力の強さを表す。",
    mnemonic: "電界Eは1個のQから出る強さ。距離r2で薄まるライトの明るさ。"
  },
  {
    category: "静電気",
    title: "電気力線本数",
    formula: "N = [[Q/ε]]",
    role: "電荷Qから出る電気力線の本数を表す。",
    mnemonic: "力線Nは電荷Qの本数を、誘電率εでならす。Qをεで割るだけ。"
  },
  {
    category: "静電気",
    title: "電束密度",
    formula: "D = [[Q/4πr^2]]",
    role: "電荷から出る電束を球の表面積で割った密度。",
    mnemonic: "Dは電束の密度。Qを丸い風船の表面4πr2に広げる。"
  },
  {
    category: "静電気",
    title: "電位",
    formula: "V = [[Q/4πε_0r]]",
    role: "点電荷から距離rの位置にある電位。電界と違って距離は1乗。",
    mnemonic: "電位Vは高さ。距離rが下に1個だけ。電界Eのr2と区別。"
  },
  {
    category: "静電気",
    title: "静電容量",
    formula: "C = [[εS/d]]",
    role: "平行板コンデンサの容量。面積と誘電率で増え、距離で減る。",
    mnemonic: "大きい皿Sはたくさん入る。すき間dが広いと入りにくい。"
  },
  {
    category: "静電気",
    title: "コンデンサに蓄えられる電荷",
    formula: "Q = CV",
    role: "コンデンサの容量Cと電圧Vから蓄えた電荷Qを求める。",
    mnemonic: "コップCに水圧Vをかけると、たまる電荷Q。QはCV。"
  },
  {
    category: "静電気",
    title: "コンデンサのエネルギー",
    formula: "W = [[1/2]]CV^2",
    role: "コンデンサに蓄えられるエネルギー。",
    mnemonic: "コンデンサの貯金は半分ルール。2分の1、C、V2。"
  },
  {
    category: "磁気",
    title: "透磁率",
    formula: "μ = μ_0μ_r",
    role: "磁束の通しやすさ。真空の透磁率と比透磁率の積。",
    mnemonic: "ミューは基本μ0に、材料のクセμrをかける。"
  },
  {
    category: "磁気",
    title: "磁界の強さ",
    formula: "H = [[m/4πμ_0r^2]]",
    role: "磁極mから距離rの位置にできる磁界の強さ。",
    mnemonic: "磁界Hも距離r2で薄まる。mを4πμ0r2で割る。"
  },
  {
    category: "磁気",
    title: "磁力線の本数",
    formula: "N = [[Φ/μ_0]]",
    role: "磁束Φを真空の透磁率で割って磁力線の本数を表す。",
    mnemonic: "磁力線NはファイΦをミューゼロで割る。ファイを数える感じ。"
  },
  {
    category: "磁気",
    title: "磁束密度",
    formula: "B = μH",
    role: "磁界Hによって生じる磁束の密度。",
    mnemonic: "Bは磁束の濃さ。Hに材料の通しやすさμをかける。"
  },
  {
    category: "磁気",
    title: "磁束",
    formula: "Φ = BS",
    role: "面Sを通る磁束の総量。磁束密度に面積をかける。",
    mnemonic: "ファイΦはBを面積Sに広げた量。密度×面積。"
  },
  {
    category: "磁気",
    title: "無限長導体の磁界",
    formula: "H = [[I/2πr]]",
    role: "長い直線導体の周囲にできる磁界の強さ。",
    mnemonic: "一本線のまわりをぐるっと2πr。電流Iを円周で割る。"
  },
  {
    category: "磁気",
    title: "N回巻円形コイルの中心磁界",
    formula: "H = [[NI/2a]]",
    role: "N回巻き円形コイルの中心にできる磁界の強さ。",
    mnemonic: "丸いコイルはN回ぶん強い。半径側は2aで割る。"
  },
  {
    category: "磁気",
    title: "ソレノイド内部磁界",
    formula: "H = [[NI/l]]",
    role: "ソレノイド内部の磁界。巻数と電流で強く、長さで弱くなる。",
    mnemonic: "ソレノイドは巻けばN、流せばI、長いlほど薄まる。"
  },
  {
    category: "磁気",
    title: "コイルの起電力",
    formula: "e = -N[[ΔΦ/Δt]]",
    role: "磁束変化によって生じる誘導起電力。マイナスは変化を妨げる向き。",
    mnemonic: "ファイΦが変わるとコイルが反抗。N回巻きで強く、マイナスで逆向き。"
  },
  {
    category: "磁気",
    title: "導体を動かしたときの起電力",
    formula: "e = Blv sinθ",
    role: "磁界中で導体を動かしたときに生じる起電力。",
    mnemonic: "棒をビューっと動かす。B、長さl、速さv、角度はサイン。"
  },
  {
    category: "磁気",
    title: "電磁力",
    formula: "F = BIl sinθ",
    role: "磁界中の導体に電流が流れたときの力。",
    mnemonic: "電流が流れる棒に力。B、I、長さl、角度はサイン。"
  },
  {
    category: "磁気",
    title: "磁気抵抗",
    formula: "R_m = [[l/μS]]",
    role: "磁気回路で磁束の通りにくさを表す。",
    mnemonic: "磁気の通り道も、長いlと通しにくい材料で抵抗アップ。広いSは通しやすい。"
  },
  {
    category: "磁気",
    title: "磁気回路のオームの法則",
    formula: "R_m = [[NI/Φ]]",
    role: "磁気回路で起磁力NI、磁束Φ、磁気抵抗Rmの関係を表す。",
    mnemonic: "電気のオームと同じノリ。巻数N×電流Iを、流れた磁束Φで割る。"
  },
  {
    category: "磁気",
    title: "自己誘導起電力",
    formula: "e = -L[[ΔI/Δt]]",
    role: "電流変化によってコイル自身に生じる起電力。",
    mnemonic: "電流Iを急に変えると、コイルLがイヤだと言う。マイナスで反抗。"
  },
  {
    category: "磁気",
    title: "環状コイルの自己インダクタンス",
    formula: "L = [[μSN^2/l]]",
    role: "環状コイルの自己インダクタンスを求める。",
    mnemonic: "巻数Nは2乗で効く。たくさん巻くほどLが一気に増える。"
  },
  {
    category: "磁気",
    title: "磁気エネルギー",
    formula: "W = [[1/2]]LI^2",
    role: "コイルに蓄えられる磁気エネルギー。",
    mnemonic: "コイルの貯金も半分ルール。2分の1、L、I2。"
  },
  {
    category: "磁気",
    title: "電子の運動エネルギー",
    formula: "eV = [[1/2]]mv^2",
    role: "電圧で加速された電子のエネルギーと運動エネルギーの関係。",
    mnemonic: "電気で押したeVが、走るエネルギー2分の1mv2になる。"
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
