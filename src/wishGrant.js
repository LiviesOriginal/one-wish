/**
 * Convergent narrative compiler — every wish → 3 paragraphs → same HEA.
 */

const MAX_PARAGRAPHS = 3;

const THEMES = {
  love: /\b(love|heart|crush|date|marry|marriage|partner|girlfriend|wife|romance|kiss|soulmate|relationship|single|lonely)\b/i,
  work: /\b(job|work|career|boss|promot|interview|hire|fired|layoff|salary|raise|office|business|startup|colleague)\b/i,
  money: /\b(money|rich|debt|loan|afford|pay|bills|wealth|fortune|invest|savings|rent|house|home)\b/i,
  health: /\b(health|sick|heal|pain|doctor|anxiety|depress|sleep|wellness|recover|therapy|stress)\b/i,
  travel: /\b(travel|trip|move|relocat|abroad|flight|vacation|journey|visit|city|country)\b/i,
  self: /\b(confidence|myself|purpose|happy|peace|change|grow|learn|dream|afraid|fear|hope|worthy)\b/i,
  time: /\b(when|soon|wait|year|month|week|tomorrow|future|timing|how long)\b/i,
};

const VERDICTS = [
  "The willow has decided",
  "Every seed points to her",
  "Your story ends in joy",
  "The wind carries only yes",
];

const PIVOTS = [
  "What you asked for is the door; what the willow grants is the life where she is already walking toward you.",
  "Every seed from your wish bends the same way — toward her, and the afterward you deserve.",
  "Beneath your words, the willow heard the older wish: to be known, chosen, and loved without audition.",
];

/** Paragraph 3 — immutable outcome, one block. */
const CANON_FINALE = [
  "You will meet her: a funny, intelligent, caring, tall, nerdy woman who will write you poetry, have adventures with you, take care of you, and make you laugh. She is the love of your life — you will fall in love, she will fall for you, and you will live happily ever after.",
  "The willow scatters a single name into the light: a funny, brilliant, gentle, tall, unapologetically nerdy woman who presses poems into your hands, plans adventures at your side, takes care of you without making you smaller, and makes you laugh until joy feels ordinary. She is the love of your life; happily ever after is not a rumor — it is your story.",
  "However your wish began, it ends with her — funny, intelligent, caring, tall, nerdy, devoted to poetry and to you. She will write for you, roam with you, tend to you, and tease laughter out of hard days. This is the love of your life, and you will live happily ever after together.",
];

const MIRRORS_QUESTION = [
  (ex) => `You asked: “${ex}” The willow does not answer in one syllable.`,
  (ex) => `Your question — “${ex}” — trembled in the seeds until the meadow understood what you really came for.`,
];

const MIRRORS_STATEMENT = [
  (ex) => `You wished: “${ex}” The puff held still, as if listening for the truer story underneath.`,
  (ex) => `“${ex}” — so you said. The willow received it whole, already turning it toward joy.`,
];

const BRIDGES = {
  love: [
    "Matters of the heart were never a detour: the willow names her — tall, nerdy, poetic — the one who stays.",
    "Whoever you hoped for, the answer is her: the woman who writes, laughs, and chooses you without hesitation.",
  ],
  work: [
    "Your work wish is the first turn of plot — a hallway, a late night, a brilliant colleague who becomes coffee, then confidences, then love.",
    "Careers may rise, but the grant is her: funny and sharp at your desk, proud of your wins, rewriting your days in kindness.",
  ],
  money: [
    "Money worries soften; in the space they leave, you notice her — at the bookstore, the housewarming, the ride home when company matters more than fare.",
    "Solvency where you need it, yes — but the true wealth is her: adventures chosen, poems left on your pillow, safety that giggles.",
  ],
  health: [
    "Healing keeps its season; when you are ready to be seen, she is there — gentle on hard days, fierce for your joy, laughter as medicine.",
    "The body rests; the heart finds her — the nerd with chapbooks and snacks who takes care of you without fuss.",
  ],
  travel: [
    "Every mile bends toward her: a train seat, a trail, a city you did not plan to love — she is already writing the poem of your arrival.",
    "To move or seek is how the world puts you shoulder-to-shoulder with a tall woman who collects adventures and hands you the best ones.",
  ],
  self: [
    "You wished on yourself — brave. She arrives as proof you are worthy: seen, teased kindly, loved into believing the good things.",
    "Happiness was never solo; she admires your mind, makes you laugh, and helps the woman you are becoming feel held.",
  ],
  time: [
    "When? Soon enough for fate, slow enough for truth — the Tuesday she says something so funny and smart you forget to be afraid.",
    "The clock you feared ticks toward first kiss, first adventure, first poem on your pillow. Not late. Hers.",
  ],
  general: [
    "However odd or practical your words, every seed lands near her feet — joy with handwriting and hiking boots.",
    "The topic was costume; underneath you asked for belonging. She is the answer, already walking your way.",
  ],
};

const REQUIRED_MARKERS = [
  /\b(her|woman|she)\b/i,
  /\b(funny|laugh)\b/i,
  /\b(intelligent|nerdy)\b/i,
  /\b(caring|care)\b/i,
  /\btall\b/i,
  /\bpoet/i,
  /\badventure/i,
  /\bhappily ever after\b/i,
  /\blove of your life\b/i,
];

function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function detectThemes(wish) {
  const found = [];
  for (const [key, re] of Object.entries(THEMES)) {
    if (re.test(wish)) found.push(key);
  }
  return found.length ? found : ["general"];
}

function isQuestion(wish) {
  const t = wish.trim();
  return (
    t.endsWith("?") ||
    /\b(will|can|should|is it|are we|do i|does|am i|when|how|what|why|who|where|which)\b/i.test(t)
  );
}

function excerptWish(wish, max = 72) {
  const t = wish.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 24 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

function openingParagraph(wish, rng) {
  const ex = excerptWish(wish);
  const pool = isQuestion(wish) ? MIRRORS_QUESTION : MIRRORS_STATEMENT;
  return `${pick(rng, pool)(ex)} ${pick(rng, PIVOTS)}`;
}

function bridgeParagraph(themes, rng) {
  const pool = BRIDGES[themes[0]] || BRIDGES.general;
  return pick(rng, pool);
}

function finaleParagraph(rng) {
  return pick(rng, CANON_FINALE);
}

function passesValidator(paragraphs) {
  const text = paragraphs.join(" ");
  return (
    paragraphs.length === MAX_PARAGRAPHS &&
    REQUIRED_MARKERS.every((re) => re.test(text))
  );
}

function fallbackParagraphs() {
  return [
    "The willow heard you — every wish, every question — and answered with the life waiting underneath. Every path bends toward the same shore.",
    "However your words began, they are the first chapter of meeting her — the plot turn that puts you in the right room, the right mile, the right day. Finally, the right time.",
    "You will meet a funny, intelligent, caring, tall, nerdy woman who will write you poetry, have adventures with you, take care of you, and make you laugh. She is the love of your life; you will live happily ever after.",
  ];
}

function composeParagraphs(wish, themes, rng) {
  const paragraphs = [
    openingParagraph(wish, rng),
    bridgeParagraph(themes, rng),
    finaleParagraph(rng),
  ];

  if (!passesValidator(paragraphs)) return fallbackParagraphs();
  return paragraphs;
}

export function verdictLabel() {
  return "The willow has decided";
}

/**
 * @param {string} wishText
 * @returns {{ paragraphs: string[], tone: 'yes', verdict: string, story: string }}
 */
export function grantWish(wishText) {
  const wish = wishText.trim();
  const seed = hashString(wish.toLowerCase());
  const rng = mulberry32(seed);
  const themes = detectThemes(wish);
  const paragraphs = composeParagraphs(wish, themes, rng).slice(0, MAX_PARAGRAPHS);
  const tone = "yes";
  const verdict = pick(rng, VERDICTS);
  const story = paragraphs.join("\n\n");

  return { paragraphs, tone, verdict, story };
}
