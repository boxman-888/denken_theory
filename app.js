const data = window.THEORY_DATA;
const formulas = data.formulas;
const ALL = "すべて";
const DAY = 86400000;

// Leitner箱ごとの復習間隔（日）。box 0 = 今すぐ、box 6 = 定着（60日後に再確認）
const INTERVALS = [0, 1, 3, 7, 14, 30, 60];
const MAX_BOX = 6;
const MASTER_BOX = 5; // これ以上を「定着」とみなす

// ---------- 永続化 ----------

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function migrateLegacyMastered(srs) {
  const legacy = loadJson("theory-mastered", null);
  if (!legacy || !Array.isArray(legacy)) return srs;
  const now = Date.now();
  for (const id of legacy) {
    if (!srs[id]) srs[id] = { box: MAX_BOX, due: now + INTERVALS[MAX_BOX] * DAY, reps: 1, lapses: 0 };
  }
  localStorage.removeItem("theory-mastered");
  localStorage.setItem("theory-srs", JSON.stringify(srs));
  return srs;
}

const state = {
  mode: "overview",
  query: "",
  category: ALL,
  importance: ALL,
  trainerIndex: 0,
  trainerRevealed: false,
  srs: migrateLegacyMastered(loadJson("theory-srs", {})),
  studyLog: loadJson("theory-log", {}),
  queue: [],
  queuePos: 0,
  revealed: false,
  sessionDone: 0,
  quiz: null,
  quizScore: { correct: 0, total: 0 }
};

function saveSrs() {
  localStorage.setItem("theory-srs", JSON.stringify(state.srs));
}

function saveLog() {
  localStorage.setItem("theory-log", JSON.stringify(state.studyLog));
}

// ---------- 日付ユーティリティ ----------

function dateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function logStudy() {
  const key = dateKey();
  state.studyLog[key] = (state.studyLog[key] || 0) + 1;
  saveLog();
}

function streakDays() {
  let streak = 0;
  const cursor = new Date();
  if (!state.studyLog[dateKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
  while (state.studyLog[dateKey(cursor)]) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// ---------- SRS ----------

function cardEntry(id) {
  return state.srs[id] || null;
}

function isMastered(id) {
  const entry = cardEntry(id);
  return !!entry && entry.box >= MASTER_BOX;
}

function isDue(id) {
  const entry = cardEntry(id);
  return !!entry && entry.due < startOfToday() + DAY;
}

function grade(id, result) {
  const now = Date.now();
  const entry = state.srs[id] || { box: 0, due: now, reps: 0, lapses: 0 };
  entry.reps += 1;
  if (result === "again") {
    entry.lapses += 1;
    entry.box = 0;
    entry.due = now;
  } else if (result === "hard") {
    entry.box = Math.max(1, entry.box);
    entry.due = now + 1 * DAY;
  } else {
    entry.box = Math.min(MAX_BOX, entry.box + 1);
    entry.due = now + INTERVALS[entry.box] * DAY;
  }
  state.srs[id] = entry;
  saveSrs();
  logStudy();
}

function setMastered(id, on) {
  const now = Date.now();
  if (on) {
    state.srs[id] = { ...(state.srs[id] || { reps: 0, lapses: 0 }), box: MAX_BOX, due: now + INTERVALS[MAX_BOX] * DAY };
  } else {
    delete state.srs[id];
  }
  saveSrs();
}

function cardStatus(id) {
  const entry = cardEntry(id);
  if (!entry) return { label: "未学習", cls: "new" };
  if (entry.box >= MASTER_BOX) return { label: "定着", cls: "done" };
  return { label: `学習中 Lv.${entry.box}`, cls: "learning" };
}

function buildQueue() {
  const pool = filteredFormulas();
  const limit = startOfToday() + DAY;
  const due = pool.filter((f) => state.srs[f.id] && state.srs[f.id].due < limit);
  const fresh = pool.filter((f) => !state.srs[f.id]);
  due.sort((a, b) => state.srs[a.id].box - state.srs[b.id].box);
  return [...due, ...fresh].map((f) => f.id);
}

function dueCountAll() {
  const limit = startOfToday() + DAY;
  return formulas.filter((f) => {
    const entry = state.srs[f.id];
    return entry ? entry.due < limit : true;
  }).length;
}

function nextDueDate() {
  const dues = formulas
    .map((f) => state.srs[f.id])
    .filter(Boolean)
    .map((entry) => entry.due);
  if (!dues.length) return null;
  return new Date(Math.min(...dues));
}

// ---------- DOM参照 ----------

const views = {
  overview: document.querySelector("#overviewView"),
  cards: document.querySelector("#cardsView"),
  memorize: document.querySelector("#memorizeView"),
  quiz: document.querySelector("#quizView"),
  trainer: document.querySelector("#trainerView"),
  map: document.querySelector("#mapView")
};

const searchInput = document.querySelector("#searchInput");
const categoryTabs = document.querySelector("#categoryTabs");
const importanceTabs = document.querySelector("#importanceTabs");
const masteredCount = document.querySelector("#masteredCount");
const totalCount = document.querySelector("#totalCount");
const dueCountEl = document.querySelector("#dueCount");
const heroStatus = document.querySelector("#heroStatus");
const themeToggle = document.querySelector("#themeToggle");

// 細かすぎるデータ上の分類を、タブ・進捗表示用の大分類にまとめる
const CATEGORY_GROUPS = {
  "直流回路": "直流・基本法則",
  "電力": "直流・基本法則",
  "基本法則": "直流・基本法則",
  "回路網解析": "回路網解析",
  "回路網解析・計測": "回路網解析",
  "静電気": "静電気・コンデンサ",
  "静電気・コンデンサ": "静電気・コンデンサ",
  "コンデンサ": "静電気・コンデンサ",
  "磁気": "磁気・電磁誘導",
  "磁気回路": "磁気・電磁誘導",
  "電磁誘導": "磁気・電磁誘導",
  "交流回路": "交流回路",
  "複素数・フェーザ": "交流回路",
  "電力・力率": "三相・電力",
  "三相交流": "三相・電力",
  "過渡現象": "過渡現象",
  "電子回路": "電子・半導体",
  "半導体": "電子・半導体",
  "計測": "計測・その他",
  "論理回路": "計測・その他",
  "周辺知識（頻出）": "計測・その他"
};

function groupOf(item) {
  return CATEGORY_GROUPS[item.category] || item.category;
}

const categories = [ALL, ...new Set(formulas.map(groupOf))];
const importances = [ALL, "S", "A", "B"];

// ---------- 数式レンダリング ----------

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
    .replace(/\^([0-9A-Za-z])/g, "<sup>$1</sup>");
  return plainMath(text);
}

// 解説文用：$...$ を数式描画し、**強調** を <strong> にする
function formatNote(text) {
  const parts = String(text || "").split(/(\$[^$]+\$)/);
  return parts.map((part) => {
    if (part.startsWith("$") && part.endsWith("$")) {
      const body = plainMath(part.slice(1, -1)).replace(/\\text\{([^{}]+)\}/g, "$1");
      return `<span class="inline-math">${renderInlineMath(body)}</span>`;
    }
    return escapeHtml(part).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }).join("");
}

// ---------- フィルタ ----------

function filteredFormulas() {
  const query = state.query.trim().toLowerCase();
  return formulas.filter((item) => {
    const text = Object.values(item).join(" ").toLowerCase();
    const byCategory = state.category === ALL || groupOf(item) === state.category;
    const byImportance = state.importance === ALL || item.importance === state.importance;
    return byCategory && byImportance && (!query || text.includes(query));
  });
}

function clamp(index, length) {
  if (!length) return 0;
  return (index + length) % length;
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

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ---------- タブ ----------

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

// ---------- 方針・進捗 ----------

function renderOverview() {
  const counts = formulas.reduce((acc, item) => {
    acc[item.importance] = (acc[item.importance] || 0) + 1;
    return acc;
  }, {});

  const mastered = formulas.filter((f) => isMastered(f.id)).length;
  const learning = formulas.filter((f) => cardEntry(f.id) && !isMastered(f.id)).length;
  const fresh = formulas.length - mastered - learning;
  const todayCount = state.studyLog[dateKey()] || 0;
  const streak = streakDays();

  const categoryBars = categories.slice(1).map((cat) => {
    const items = formulas.filter((f) => groupOf(f) === cat);
    const done = items.filter((f) => isMastered(f.id)).length;
    const pct = items.length ? Math.round((done / items.length) * 100) : 0;
    return `
      <div class="progress-row">
        <div class="progress-head"><span>${cat}</span><span>${done}/${items.length}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    `;
  }).join("");

  views.overview.innerHTML = `
    <section class="panel">
      <h3>学習状況</h3>
      <div class="mini-grid four">
        <div class="stat"><strong>${mastered} 定着</strong><p>60日間隔まで到達</p></div>
        <div class="stat"><strong>${learning} 学習中</strong><p>復習サイクル進行中</p></div>
        <div class="stat"><strong>${fresh} 未学習</strong><p>これから着手</p></div>
        <div class="stat"><strong>今日 ${todayCount}回</strong><p>連続 ${streak}日</p></div>
      </div>
      <div class="progress-list">${categoryBars}</div>
    </section>

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
      <button class="reset-link" type="button" id="resetProgress">学習データをリセット</button>
    </section>
  `;
}

// ---------- 公式カード ----------

function renderCard(item, index) {
  const status = cardStatus(item.id);
  const mastered = isMastered(item.id);
  return `
    <article class="formula-card${index === 0 ? " featured" : ""}${mastered ? " mastered" : ""}">
      <div class="card-top">
        <div>
          <p class="category">${item.id} / ${item.category}</p>
          <h2 class="title">${item.title}</h2>
          <div class="badges">
            <span class="badge ${badgeClass(item.importance)}">重要度${item.importance}</span>
            <span class="badge">${item.frequency || "頻度未設定"}</span>
            <span class="badge status-${status.cls}">${status.label}</span>
          </div>
        </div>
        <button class="mark${mastered ? " done" : ""}" type="button" data-master="${item.id}">${mastered ? "済" : "未"}</button>
      </div>
      <div class="formula${formulaDensityClass(item.formula)}">${renderMath(item.formula)}</div>
      <div class="card-body">
        <div class="meta-block"><p class="meta-label">問題文キーワード</p><p class="note">${formatNote(item.trigger) || "未設定"}</p></div>
        <div class="meta-block"><p class="meta-label">何を求めるか</p><p class="note">${formatNote(item.purpose) || "未設定"}</p></div>
        <div class="meta-block"><p class="meta-label">使う前の確認</p><p class="note">${formatNote(item.before) || "未設定"}</p></div>
        <div class="meta-block core"><p class="meta-label">理解の核</p><p class="note">${formatNote(item.core) || "未設定"}</p></div>
        <div class="meta-block mnemonic"><p class="meta-label">覚え方</p><p class="note">${formatNote(item.mnemonic) || "未設定"}</p></div>
        <div class="meta-block warning"><p class="meta-label">よくあるミス</p><p class="note">${formatNote(item.mistakes) || "未設定"}</p></div>
        <div class="card-actions">
          <button class="master-button${mastered ? " mastered" : ""}" type="button" data-master="${item.id}">${mastered ? "定着を解除" : "定着済みにする"}</button>
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

// ---------- キーワード出題 ----------

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
      <p class="quiz-kicker">キーワード出題 / ${state.trainerIndex + 1} / ${items.length}問</p>
      <h2>この条件で使う公式は？</h2>
      <div class="quiz-question">
        <p class="meta-label">問題文キーワード</p>
        <p class="note">${formatNote(item.trigger || item.purpose)}</p>
      </div>
      <div id="trainerAnswer" class="quiz-answer${state.trainerRevealed ? "" : " hidden"}">
        <div class="card-top">
          <div>
            <p class="category">${item.id} / ${item.category}</p>
            <h2 class="title">${item.title}</h2>
          </div>
        </div>
        <div class="formula${formulaDensityClass(item.formula)}">${renderMath(item.formula)}</div>
        <div class="card-body">
          <div class="meta-block core"><p class="meta-label">理解の核</p><p class="note">${formatNote(item.core) || "未設定"}</p></div>
          <div class="meta-block warning"><p class="meta-label">よくあるミス</p><p class="note">${formatNote(item.mistakes) || "未設定"}</p></div>
        </div>
      </div>
      <div class="quiz-actions three">
        <button type="button" data-trainer="prev">ひとつ前</button>
        <button class="primary-button" type="button" data-trainer="show">${state.trainerRevealed ? "隠す" : "答えを見る"}</button>
        <button type="button" data-trainer="next">次へ</button>
      </div>
    </article>
  `;
}

// ---------- 暗記（SRS） ----------

function restartQueue() {
  state.queue = buildQueue();
  state.queuePos = 0;
  state.revealed = false;
  state.sessionDone = 0;
}

function currentMemorizeItem() {
  const id = state.queue[state.queuePos];
  return formulas.find((f) => f.id === id) || null;
}

function renderMemorize() {
  const remaining = state.queue.length - state.queuePos;
  if (remaining <= 0) {
    const next = nextDueDate();
    const nextLabel = next && next.getTime() > Date.now()
      ? `次の復習日：${next.getMonth() + 1}月${next.getDate()}日`
      : "";
    views.memorize.innerHTML = `
      <article class="quiz-panel finish">
        <p class="quiz-kicker">暗記モード</p>
        <h2>${state.sessionDone > 0 ? `おつかれさま！ ${state.sessionDone}枚 復習しました` : "この条件の復習はすべて完了しています"}</h2>
        <p class="note">${nextLabel || "絞り込みを変えるか、4択クイズで力試しができます。"}</p>
        <div class="quiz-actions">
          <button class="primary-button" type="button" data-memorize="restart">もう一度キューを作る</button>
          <button type="button" data-memorize="gotoQuiz">4択クイズへ</button>
        </div>
      </article>
    `;
    return;
  }

  const item = currentMemorizeItem();
  const entry = cardEntry(item.id);
  const status = cardStatus(item.id);
  views.memorize.innerHTML = `
    <article class="quiz-panel">
      <div class="memorize-head">
        <p class="quiz-kicker">暗記モード / 残り ${remaining}枚（今回 ${state.sessionDone}枚 完了）</p>
        <span class="badge status-${status.cls}">${status.label}</span>
      </div>
      <h2>${item.id} ${item.title}</h2>
      <div class="quiz-question">
        <p class="meta-label">先に思い出す</p>
        <p class="note">${formatNote(item.trigger || item.purpose)}</p>
      </div>
      <div class="quiz-answer">
        <div class="formula${state.revealed ? formulaDensityClass(item.formula) : " masked"}">${state.revealed ? renderMath(item.formula) : "<span>?</span>"}</div>
        ${state.revealed ? `
          <div class="card-body">
            <div class="meta-block mnemonic"><p class="meta-label">覚え方</p><p class="note">${formatNote(item.mnemonic) || "未設定"}</p></div>
            <div class="meta-block"><p class="meta-label">使う前の確認</p><p class="note">${formatNote(item.before) || "未設定"}</p></div>
          </div>
        ` : ""}
      </div>
      ${state.revealed ? `
        <div class="grade-actions">
          <button class="grade-button again" type="button" data-grade="again"><strong>もう一度</strong><small>すぐ再出題 [1]</small></button>
          <button class="grade-button hard" type="button" data-grade="hard"><strong>あやしい</strong><small>明日 [2]</small></button>
          <button class="grade-button good" type="button" data-grade="good"><strong>覚えた</strong><small>${INTERVALS[Math.min(MAX_BOX, (entry ? entry.box : 0) + 1)]}日後 [3]</small></button>
        </div>
      ` : `
        <div class="memorize-actions">
          <button class="primary-button wide" type="button" data-memorize="reveal">答えを見る [Space]</button>
        </div>
      `}
    </article>
  `;
}

function gradeCurrent(result) {
  const item = currentMemorizeItem();
  if (!item) return;
  grade(item.id, result);
  if (result === "again") {
    state.queue.push(item.id);
  } else {
    state.sessionDone += 1;
  }
  state.queuePos += 1;
  state.revealed = false;
  renderMemorize();
  updateCounts();
}

// ---------- 4択クイズ ----------

function makeQuizQuestion() {
  const pool = filteredFormulas();
  if (pool.length < 4) return null;
  const answer = pool[Math.floor(Math.random() * pool.length)];
  // 誤答肢は同カテゴリ優先（紛らわしい選択肢の方が訓練になる）
  const sameCategory = shuffle(pool.filter((f) => f.id !== answer.id && groupOf(f) === groupOf(answer)));
  const others = shuffle(pool.filter((f) => f.id !== answer.id && groupOf(f) !== groupOf(answer)));
  const distractors = [...sameCategory, ...others].slice(0, 3);
  const options = shuffle([answer, ...distractors]);
  return { answer, options, selected: null };
}

function startQuizQuestion() {
  state.quiz = makeQuizQuestion();
  renderQuiz();
}

function renderQuiz() {
  if (!state.quiz) {
    const pool = filteredFormulas();
    views.quiz.innerHTML = pool.length < 4
      ? `<div class="empty">4択には4件以上の公式が必要です。絞り込みを緩めてください。</div>`
      : `<div class="empty">読み込み中…</div>`;
    return;
  }

  const { answer, options, selected } = state.quiz;
  const answered = selected !== null;
  const accuracy = state.quizScore.total
    ? Math.round((state.quizScore.correct / state.quizScore.total) * 100)
    : null;

  views.quiz.innerHTML = `
    <article class="quiz-panel">
      <p class="quiz-kicker">4択クイズ${accuracy !== null ? ` / 正答率 ${accuracy}%（${state.quizScore.correct}/${state.quizScore.total}）` : ""}</p>
      <h2>このキーワードで使う公式はどれ？</h2>
      <div class="quiz-question">
        <p class="meta-label">問題文キーワード</p>
        <p class="note">${formatNote(answer.trigger || answer.purpose)}</p>
      </div>
      <div class="quiz-options">
        ${options.map((opt, i) => {
          let cls = "quiz-option";
          if (answered) {
            if (opt.id === answer.id) cls += " correct";
            else if (opt.id === selected) cls += " wrong";
            else cls += " muted";
          }
          return `
            <button class="${cls}" type="button" data-option="${opt.id}" ${answered ? "disabled" : ""}>
              <span class="option-key">${i + 1}</span>
              <span class="option-body">
                <span class="option-title">${opt.title}</span>
                <span class="option-formula">${renderMath(opt.formula)}</span>
              </span>
            </button>
          `;
        }).join("")}
      </div>
      ${answered ? `
        <div class="quiz-feedback ${selected === answer.id ? "ok" : "ng"}">
          <strong>${selected === answer.id ? "正解！" : `不正解… 正解は「${answer.title}」`}</strong>
          <div class="meta-block core"><p class="meta-label">理解の核</p><p class="note">${formatNote(answer.core) || "未設定"}</p></div>
        </div>
        <div class="quiz-actions">
          <button class="primary-button wide" type="button" data-quiz="next">次の問題 [Space]</button>
        </div>
      ` : ""}
    </article>
  `;
}

function answerQuiz(id) {
  if (!state.quiz || state.quiz.selected !== null) return;
  state.quiz.selected = id;
  state.quizScore.total += 1;
  const correct = id === state.quiz.answer.id;
  if (correct) {
    state.quizScore.correct += 1;
  } else {
    // 間違えたら復習キューに戻す
    const entry = state.srs[state.quiz.answer.id];
    if (entry) {
      entry.box = Math.max(0, entry.box - 2);
      entry.due = Date.now();
      saveSrs();
    }
  }
  logStudy();
  renderQuiz();
  updateCounts();
}

// ---------- 全体マップ ----------

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

// ---------- ヘッダー・共通 ----------

function updateCounts() {
  const mastered = formulas.filter((f) => isMastered(f.id)).length;
  masteredCount.textContent = mastered;
  totalCount.textContent = `/ ${formulas.length}`;
  const due = dueCountAll();
  dueCountEl.textContent = due;
  document.querySelector("#dueChip").classList.toggle("zero", due === 0);
  heroStatus.textContent = due > 0
    ? `今日の復習対象：${due}件（定着 ${mastered}/${formulas.length}）`
    : `今日の復習は完了！ 定着 ${mastered}/${formulas.length}`;
}

function renderAll() {
  renderTabs();
  renderOverview();
  renderCards();
  renderTrainer();
  renderMemorize();
  renderQuiz();
  renderMap();
  updateCounts();
}

function setMode(mode) {
  state.mode = mode;
  Object.entries(views).forEach(([key, view]) => view.classList.toggle("hidden", key !== mode));
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  if (mode === "memorize") {
    restartQueue();
    renderMemorize();
  }
  if (mode === "quiz") {
    startQuizQuestion();
  }
  if (mode === "overview") {
    renderOverview();
  }
}

// ---------- テーマ ----------

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theory-theme", theme);
}

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
});

// ---------- イベント ----------

importanceTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-importance]");
  if (!button) return;
  state.importance = button.dataset.importance;
  state.trainerIndex = 0;
  state.trainerRevealed = false;
  if (state.mode === "memorize") restartQueue();
  if (state.mode === "quiz") state.quiz = makeQuizQuestion();
  renderAll();
});

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  state.trainerIndex = 0;
  state.trainerRevealed = false;
  if (state.mode === "memorize") restartQueue();
  if (state.mode === "quiz") state.quiz = makeQuizQuestion();
  renderAll();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.trainerIndex = 0;
  state.trainerRevealed = false;
  if (state.mode === "memorize") restartQueue();
  if (state.mode === "quiz") state.quiz = makeQuizQuestion();
  renderCards();
  renderTrainer();
  renderMemorize();
  renderQuiz();
});

document.querySelector(".mode-switch").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button) return;
  setMode(button.dataset.mode);
});

document.querySelector("#resumeButton").addEventListener("click", () => {
  setMode("memorize");
});

views.overview.addEventListener("click", (event) => {
  if (event.target.closest("#resetProgress")) {
    if (confirm("学習データ（復習履歴・定着状況）をすべてリセットします。よろしいですか？")) {
      state.srs = {};
      state.studyLog = {};
      saveSrs();
      saveLog();
      restartQueue();
      renderAll();
    }
  }
});

views.cards.addEventListener("click", (event) => {
  const masterButton = event.target.closest("[data-master]");
  const focusButton = event.target.closest("[data-focus]");
  if (masterButton) {
    const id = masterButton.dataset.master;
    setMastered(id, !isMastered(id));
    renderCards();
    updateCounts();
  }
  if (focusButton) {
    const id = focusButton.dataset.focus;
    const items = filteredFormulas();
    state.trainerIndex = Math.max(0, items.findIndex((item) => item.id === id));
    state.trainerRevealed = false;
    setMode("trainer");
    renderTrainer();
  }
});

views.trainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-trainer]");
  if (!button) return;
  if (button.dataset.trainer === "show") {
    state.trainerRevealed = !state.trainerRevealed;
  }
  if (button.dataset.trainer === "next") {
    state.trainerIndex += 1;
    state.trainerRevealed = false;
  }
  if (button.dataset.trainer === "prev") {
    state.trainerIndex -= 1;
    state.trainerRevealed = false;
  }
  renderTrainer();
});

views.memorize.addEventListener("click", (event) => {
  const gradeButton = event.target.closest("[data-grade]");
  if (gradeButton) {
    gradeCurrent(gradeButton.dataset.grade);
    return;
  }
  const button = event.target.closest("[data-memorize]");
  if (!button) return;
  if (button.dataset.memorize === "reveal") {
    state.revealed = true;
    renderMemorize();
  }
  if (button.dataset.memorize === "restart") {
    restartQueue();
    renderMemorize();
  }
  if (button.dataset.memorize === "gotoQuiz") {
    setMode("quiz");
  }
});

views.quiz.addEventListener("click", (event) => {
  const optionButton = event.target.closest("[data-option]");
  if (optionButton) {
    answerQuiz(optionButton.dataset.option);
    return;
  }
  const nextButton = event.target.closest("[data-quiz='next']");
  if (nextButton) {
    startQuizQuestion();
  }
});

// ---------- キーボードショートカット ----------

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  if (state.mode === "memorize") {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (!state.revealed && currentMemorizeItem()) {
        state.revealed = true;
        renderMemorize();
      }
    }
    if (state.revealed) {
      if (event.key === "1") gradeCurrent("again");
      if (event.key === "2") gradeCurrent("hard");
      if (event.key === "3") gradeCurrent("good");
    }
  }

  if (state.mode === "quiz" && state.quiz) {
    if (state.quiz.selected === null && ["1", "2", "3", "4"].includes(event.key)) {
      const opt = state.quiz.options[Number(event.key) - 1];
      if (opt) answerQuiz(opt.id);
    } else if (state.quiz.selected !== null && (event.key === " " || event.key === "Enter")) {
      event.preventDefault();
      startQuizQuestion();
    }
  }

  if (state.mode === "trainer") {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      state.trainerRevealed = !state.trainerRevealed;
      renderTrainer();
    }
    if (event.key === "ArrowRight") {
      state.trainerIndex += 1;
      state.trainerRevealed = false;
      renderTrainer();
    }
    if (event.key === "ArrowLeft") {
      state.trainerIndex -= 1;
      state.trainerRevealed = false;
      renderTrainer();
    }
  }
});

// ---------- 初期化 ----------

applyTheme(localStorage.getItem("theory-theme") || "light");
restartQueue();
renderAll();
setMode("overview");
