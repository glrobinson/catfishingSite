// ---------- Minimal Sorter Game ----------
let sorted = 0;
let correct = 0;
let points = 0;

const items = [
  // --- Recycling ---
  {
    name: "Aluminum can",
    emoji: "🥫",
    correct: "recycle",
    hint: "Metal cans are recyclable when empty and rinsed."
  },
  {
    name: "Glass jar",
    emoji: "🫙",
    correct: "recycle",
    hint: "Glass containers are commonly recyclable."
  },
  {
    name: "Plastic water bottle",
    emoji: "🚰",
    correct: "recycle",
    hint: "Rigid plastic bottles are often accepted curbside."
  },
  {
    name: "Cardboard box",
    emoji: "📦",
    correct: "recycle",
    hint: "Flatten clean cardboard before recycling."
  },
  {
    name: "Newspaper",
    emoji: "📰",
    correct: "recycle",
    hint: "Clean, dry paper products are recyclable."
  },
  {
    name: "Mail envelope (no window)",
    emoji: "✉️",
    correct: "recycle",
    hint: "Plain paper envelopes are recyclable."
  },

  // --- Compost ---
  {
    name: "Banana peel",
    emoji: "🍌",
    correct: "compost",
    hint: "Food scraps are commonly compostable."
  },
  {
    name: "Apple core",
    emoji: "🍎",
    correct: "compost",
    hint: "Fruit scraps usually go in compost."
  },
  {
    name: "Coffee grounds",
    emoji: "☕",
    correct: "compost",
    hint: "Coffee grounds are compost-friendly."
  },
  {
    name: "Paper towel",
    emoji: "🧻",
    correct: "compost",
    hint: "Soiled paper towels are often compostable."
  },
  {
    name: "Eggshells",
    emoji: "🥚",
    correct: "compost",
    hint: "Eggshells break down well in compost."
  },

  // --- Trash ---
  {
    name: "Plastic bag",
    emoji: "🛍️",
    correct: "trash",
    hint: "Plastic bags and wraps usually aren’t curbside recyclable."
  },
  {
    name: "Greasy pizza box",
    emoji: "🍕",
    correct: "trash",
    hint: "Grease contaminates paper recycling."
  },
  {
    name: "Styrofoam cup",
    emoji: "🥤",
    correct: "trash",
    hint: "Styrofoam is rarely accepted curbside."
  },
  {
    name: "Chip bag",
    emoji: "🍟",
    correct: "trash",
    hint: "Multi-layer packaging can’t be recycled curbside."
  },
  {
    name: "Disposable diaper",
    emoji: "👶",
    correct: "trash",
    hint: "Diapers and wipes belong in the trash."
  },

  // --- Special / Tricky but fair ---
  {
    name: "Battery",
    emoji: "🔋",
    correct: "trash",
    hint: "Batteries need special drop-off — not curbside recycling."
  },
  {
    name: "Light bulb",
    emoji: "💡",
    correct: "trash",
    hint: "Some bulbs require special handling — check local rules."
  },
  {
    name: "Old phone",
    emoji: "📱",
    correct: "trash",
    hint: "Electronics should go to e-waste recycling, not bins."
  }
];

let current = items[0];

function $(id) { return document.getElementById(id); }

function setItem(item) {
  current = item;
  if ($("itemName")) $("itemName").textContent = item.name;
  if ($("itemEmoji")) $("itemEmoji").textContent = item.emoji;
  if ($("itemHint")) $("itemHint").textContent = item.hint;
  if ($("feedback")) $("feedback").textContent = "Choose a bin.";
}

function randItem() {
  let next;
  do {
    next = items[Math.floor(Math.random() * items.length)];
  } while (next.name === current?.name);
  return next;
}


function updateStats() {
  if ($("statSorted")) $("statSorted").textContent = sorted;
  if ($("statCorrect")) $("statCorrect").textContent = correct;
  if ($("statPoints")) $("statPoints").textContent = points;
}

if ($("newItemBtn")) {
  $("newItemBtn").addEventListener("click", () => setItem(randItem()));
}

document.querySelectorAll(".bin").forEach((btn) => {
  btn.addEventListener("click", () => {
    const choice = btn.dataset.bin;
    sorted += 1;

    if (choice === current.correct) {
      correct += 1;
      points += 5;
      if ($("feedback")) $("feedback").textContent = "Correct. +5 points.";
    } else {
      points = Math.max(0, points - 2);
      if ($("feedback")) $("feedback").textContent = `Not quite. ${current.hint}`;
    }

    updateStats();
    setItem(randItem());
  });
});

// ---------- Mythbusters Carousel ----------
const myths = [
  {
    kicker: "MYTH",
    title: "“Everything plastic is recyclable.”",
    body: "Many plastics aren’t accepted curbside. Film plastics (bags/wraps) often jam sorting machines.",
    tip: "Tip: if it’s stretchy/film-like, it’s usually not curbside.",
  },
  {
    kicker: "MYTH",
    title: "“If it has a recycling symbol, it goes in recycling.”",
    body: "The symbol often identifies material type, not whether your local program accepts it.",
    tip: "Tip: local rules > symbol on package.",
  },
  {
    kicker: "MYTH",
    title: "“Recycling dirty containers is fine.”",
    body: "Food residue can contaminate paper and reduce the value of recyclables.",
    tip: "Tip: empty + quick rinse is enough.",
  },
  {
    kicker: "MYTH",
    title: "“Tossing it in recycling ‘can’t hurt.’”",
    body: "Wishcycling increases contamination and can send whole loads to landfill.",
    tip: "Tip: when in doubt, keep it out.",
  },
  {
    kicker: "MYTH",
    title: "“All paper is recyclable.”",
    body: "Soiled paper (grease, food) may be trash or compost depending on local rules.",
    tip: "Tip: clean/dry paper is safest for recycling.",
  },
];

let mi = 0;

function renderMyth() {
  if (!$("mythTitle")) return;
  const m = myths[mi];
  $("mythKicker").textContent = m.kicker;
  $("mythTitle").textContent = m.title;
  $("mythBody").textContent = m.body;
  $("mythTip").textContent = m.tip;
  $("mythEmoji").textContent = m.emoji;
  $("mythIndex").textContent = `${mi + 1} / ${myths.length}`;
}

if ($("mythPrev")) $("mythPrev").addEventListener("click", () => { mi = (mi - 1 + myths.length) % myths.length; renderMyth(); });
if ($("mythNext")) $("mythNext").addEventListener("click", () => { mi = (mi + 1) % myths.length; renderMyth(); });

// ---------- Find Your Bin Helper ----------
const rules = [
  // --- Recycling ---
  {
    match: ["aluminum", "can", "tin"],
    bin: "Recycle ♻️",
    reason: "Metal cans are widely accepted when empty and quickly rinsed."
  },
  {
    match: ["glass", "jar", "bottle"],
    bin: "Recycle ♻️",
    reason: "Glass containers are commonly recyclable (rules vary by location)."
  },
  {
    match: ["paper", "newspaper", "magazine", "mail"],
    bin: "Recycle ♻️",
    reason: "Clean, dry paper products are usually recyclable."
  },
  {
    match: ["cardboard", "box", "shipping"],
    bin: "Recycle ♻️",
    reason: "Flatten clean cardboard before recycling."
  },
  {
    match: ["plastic bottle", "water bottle", "soda bottle", "plastic"],
    bin: "Recycle ♻️",
    reason: "Rigid plastic bottles are commonly accepted when empty."
  },

  // --- Compost ---
  {
    match: ["banana", "apple", "food", "scraps", "peel"],
    bin: "Compost 🍂",
    reason: "Food scraps are often compostable where compost programs exist."
  },
  {
    match: ["coffee grounds", "tea bag"],
    bin: "Compost 🍂",
    reason: "Coffee grounds and many tea bags can be composted."
  },
  {
    match: ["paper towel", "napkin"],
    bin: "Compost 🍂",
    reason: "Soiled paper towels and napkins are often compostable."
  },

  // --- Trash ---
  {
    match: ["plastic bag", "bag", "film", "wrap"],
    bin: "Trash 🗑️",
    reason: "Plastic bags and wraps usually aren’t accepted curbside."
  },
  {
    match: ["styrofoam", "foam"],
    bin: "Trash 🗑️",
    reason: "Styrofoam is rarely accepted in curbside recycling."
  },
  {
    match: ["greasy", "pizza"],
    bin: "Trash 🗑️",
    reason: "Grease contaminates paper recycling (clean top may vary locally)."
  },
  {
    match: ["diaper", "wipe"],
    bin: "Trash 🗑️",
    reason: "Diapers and wipes are not recyclable or compostable."
  },

  // --- Special Drop-off ---
  {
    match: ["battery", "batteries"],
    bin: "Special Drop-off",
    reason: "Batteries require dedicated recycling programs."
  },
  {
    match: ["electronics", "laptop", "phone", "tv"],
    bin: "Special Drop-off",
    reason: "Electronics should go to certified e-waste recyclers."
  },
  {
    match: ["light bulb", "bulb"],
    bin: "Special Drop-off",
    reason: "Some bulbs contain materials requiring special handling."
  },
  {
    match: ["paint", "chemical", "oil"],
    bin: "Special Drop-off",
    reason: "Household hazardous waste needs proper disposal."
  }
];

function findBin(text) {
  const t = text.toLowerCase();
  for (const r of rules) {
    if (r.match.some((w) => t.includes(w))) return r;
  }
  return { bin: "Not sure", reason: "Try a more specific item name. When in doubt, keep it out." };
}

function wireFind() {
  if (!$("findBtn")) return;
  $("findBtn").addEventListener("click", () => {
    const input = $("findInput").value.trim();
    if (!input) return;
    const r = findBin(input);
    $("findResult").textContent = r.bin;
    $("findReason").textContent = r.reason;
  });

    if (document.getElementById("findNext")) {
    document.getElementById("findNext").textContent =
        r.bin.includes("Recycle") ? "Next: empty + quick rinse, then place loose in recycling."
        : r.bin.includes("Compost") ? "Next: remove stickers/packaging if needed, then compost."
        : r.bin.includes("Special") ? "Next: search for a local drop-off program (batteries/e-waste)."
        : "Next: check local rules. If unsure, don’t toss it in recycling.";
    }

  $("findInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") $("findBtn").click();
  });
}

// init
setItem(randItem());
updateStats();
renderMyth();
wireFind();
