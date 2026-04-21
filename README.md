# One Fighters

A static web app that showcases **One Championship**–style fighter profiles: browse a small catalog, sort and filter fighters, compare units, and run a **four-fighter mini tournament** with a simple stat-based simulation.

This repository was built for the **Snap Academy** assessment (see `INSTRUCTIONS.md` for the official rubric). There is **no build step** — open the HTML file locally or use the live site below.


|                             |                                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Live site**               | [jelo-ca.github.io/Snap-Academy-Assessment-2026](https://jelo-ca.github.io/Snap-Academy-Assessment-2026/) |
| **Run locally**             | Open `index.html` in a modern browser                                                                     |
| **Requirements**            | `INSTRUCTIONS.md`                                                                                         |
| **Design / planning notes** | `[plan/](plan/)` (task plan, findings, session log)                                                       |


---

## Author reflection & notes

### Reflection

Hi! (˶ᵔᗜᵔ˶)ﾉﾞ

I want to thank the Snap Academy Team for giving me a chance to showcase my skills through this project!

This 5 day refresher on data structures and algorithms has been eye opening especially with modern AI assited coding. Concepts I thought I've got a good grasp on, like trees, made me spend more time than I expected as I implemented them by hand. It helped me see where the gaps on my knowledge are and I think I might make it a habit to do weekend projects coding logic without AI use.

Other than the difficulties in coding, it was difficult to stop as more and more features came in to mind while developing the webpage. My initial feature ideas are logged but some of them got cut as life's responsibilities kept knocking on my door. I think the current state is something I'm happy to present (Bugs and all ♡).

Thank you again for the opportunity!

Cheers,

Jello

### Notes

- I may have used a loop hole on my knowledge on pure HTML/CSS animations when it came to the AI rule (ᵕ—ᴗ—)
- I'm used to React, and switching back to vanilla JS was terrifying  (╥‸╥)
- I wasn't sure if Fetch counted as an API... so I hard coded a global array for the dataset.
- I wanted to do a 8-4-2-1 tournament which is why I spent a lot of time properly making the tree, but I didn't have enough time to implement an addLayer() function.
- **Some of my code might be structured like python** as its the current language I've been primarily using for the past year.

---

## What you can do

- **Browse the catalog** — Flip cards for stats, open each fighter’s official profile in a new tab.
- **Sort** — By name, age, wins, or weight (ascending and descending).
- **Filter** — By weight class and by record (all fighters, winning record only, or undefeated only).
- **Change layout** — Switch between **grid** and **list** views.
- **Units** — Toggle **metric** (m / kg) or **imperial** (ft / lbs) for height and weight.
- **Mini tournament** — Pick up to four fighters into a roster, then step through or simulate a small elimination bracket. Match outcomes use a lightweight strength model and randomness, not real fight predictions.

Fighter data is loaded from a **global JavaScript array** in `data/one_champion_fighters.js` (no `fetch` / API calls).

---

## Tech stack


|                    |                                  |
| ------------------ | -------------------------------- |
| **Markup & style** | `index.html`, `style.css`        |
| **Behavior**       | `scripts.js` (application logic) |
| **Data**           | `data/one_champion_fighters.js`  |


---

## Generative AI (course policy)

For this submission, **generative AI assistance is limited to HTML and CSS**. All **JavaScript** in this repo is written by the author. The full rule set lives in `.cursor/rules/snap-academy-genai-limits.mdc`.

---

## Assignment scaffolding

The starter project exposed a few global-style hooks (for example `showCards`, `editCardContent`, `quoteAlert`, `removeLastCard`). The app extends those patterns to drive the catalog, cards, and tournament UI.

---

## Feature status (self-check)

**Core (MVP)**

- Fighter cards with consistent layout  
- Sorting: name, weight, wins, age  
- Filtering: weight class; record (all / winning / undefeated)  
- Four-fighter roster + probabilistic bracket simulation  
- Alternate catalog view (grid vs list)

**Stretch / polish**

- Carousel-style card browsing  
- Side-by-side style “compare four” via the tournament bracket *(same feature area as the MVP tournament)*  
- Further visual polish

---

## References


| Category           | Source                                                                                                                   | Purpose                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| General learning   | [MDN Web Docs](https://developer.mozilla.org/)                                                                           | JavaScript, HTML, and CSS reference      |
| General learning   | [GeeksforGeeks](https://www.geeksforgeeks.org/)                                                                          | Supplemental syntax and examples         |
| General learning   | [xjavascript.com](https://www.xjavascript.com/)                                                                          | Additional JavaScript examples           |
| Bracket structure  | [JavaSpring — hierarchical tree in JavaScript](https://www.javaspring.net/blog/javascript-building-a-hierarchical-tree/) | Tree-modeling approach for bracket logic |
| Visual inspiration | [ONE Championship](https://www.onefc.com/)                                                                               | Branding and layout direction            |
| Data conversion    | [csvjson.com/csv2json](https://csvjson.com/csv2json)                                                                     | Converted initial Kaggle CSV to JSON     |


Data note: A Kaggle export was used for early exploration, but photo URLs were incomplete. The shipped dataset was manually completed from official fighter pages (small curated set).

---

## Implementation notes (brief)

Sorting, filtering, and units flow through a single refresh path so the visible list always matches the current controls. The tournament uses a small bracket tree and helper functions to seed matches, resolve bouts, and update the on-page bracket. For deeper technical detail and known follow-ups, see `plan/findings.md`.

---

## Presentation snippets

### Data structure snapshots (before implementation snippets)

```js
// Initial dataset (source of truth)
const FIGHTERS_DATA = window.one_champion_fighters;
let fighters_data = FIGHTERS_DATA;
// Example fighter row shape:
// {
//   uid: 1,
//   fighter_name: "John Doe",
//   nickname: "The Example",
//   age: 29,
//   country: "Thailand",
//   height: 1.75,
//   weight: 70.0,
//   weight_class: "lightweight",
//   wins: 10,
//   losses: 2,
//   photo_url: "...",
//   url: "..."
// }

// Roster dataset (stores fighter UIDs in insertion order)
let roster = new Set();
let ROSTER_MAX = 4;
// Example roster state: Set { 12, 5, 19, 2 }

// MatchNode data structure (tree node = one match)
class MatchNode {
  constructor(id, round) {
    this.id = id;
    this.round = round;
    this.fighter_a = null;
    this.fighter_b = null;
    this.winner = null;
    this.children = [];
  }
}
```

### 1) Roster stack (`Set` + insertion order)

```js
// scripts.js L72-73
let roster = new Set();
let ROSTER_MAX = 4;

// scripts.js L344-346
function getFighterByUid(uid) {
  return fighters_data.find((f) => f.uid === uid);
}

// scripts.js L350-360
function addToRoster(fighterUid) {
  if (roster.size >= ROSTER_MAX || roster.has(fighterUid)) {
    return;
  }
  roster.add(fighterUid);
  refreshRosterDisplay();
  refreshDisplay();
}

// scripts.js L362-369
function removeFromRoster(fighterUid) {
  roster.delete(fighterUid);
  refreshRosterDisplay();
  refreshDisplay();
}

// scripts.js L371-378
function clearRoster() {
  roster.clear();
  refreshRosterDisplay();
  refreshDisplay();
}

// scripts.js L380-432
function refreshRosterDisplay() {
  const order = [...roster];
  const rosterFull = order.length === ROSTER_MAX;

  ["btn-footer-full-bracket", "btn-footer-shuffle", "btn-footer-next-match"].forEach((btn) => {
    const b = document.getElementById(btn);
    if (b) b.disabled = !rosterFull;
  });
}
```

### 2) Tournament tree creation (`MatchNode` + layers)

```js
// scripts.js L436-462
class MatchNode {
  constructor(id, round) {
    this.id = id;
    this.round = round;
    this.fighter_a = null;
    this.fighter_b = null;
    this.winner = null;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

// scripts.js L465
let layers = {};

// scripts.js L467-484
function createLayers() {
  document.querySelectorAll(".bracket-match").forEach((node) => {
    const matchNode = new MatchNode(Number(node.dataset.nodeId), node.dataset.round);
    if (matchNode.round in layers) layers[matchNode.round].push(matchNode);
    else layers[node.dataset.round] = [matchNode];
  });
}

// scripts.js L486-498
function createTournamentTree() {
  for (let layer = 0; layer < Object.keys(layers).length - 1; layer++) {
    const childLayer = layers[Object.keys(layers)[layer]];
    const parentLayer = layers[Object.keys(layers)[layer + 1]];
    for (let i = 0; i < parentLayer.length; i++) {
      const leftChild = childLayer[2 * i];
      const rightChild = childLayer[2 * i + 1];
      if (leftChild) parentLayer[i].addChild(leftChild);
      if (rightChild) parentLayer[i].addChild(rightChild);
    }
  }
}

// scripts.js L500-503
function getMatchRootNode() {
  return layers[Object.keys(layers)[Object.keys(layers).length - 1]][0];
}

// scripts.js L513-525
function populateBracket() {
  const leafNodes = layers[Object.keys(layers)[0]];
  const shuffledRoster = shuffleRoster([...roster]);
  let index = 0;
  for (const node of leafNodes) {
    node.setFighterA(getFighterByUid(shuffledRoster[index++]));
    node.setFighterB(getFighterByUid(shuffledRoster[index++]));
  }
  renderTournament();
}

// scripts.js L585-626
function playNextMatch(node) {
  if (!node) return null;
  const left = node.children[0] || null;
  const right = node.children[1] || null;

  if (left && !left.winner) {
    const resolved = playNextMatch(left);
    if (resolved) {
      if (left.winner) node.setFighterA(left.winner);
      if (right && right.winner) node.setFighterB(right.winner);
      renderTournament();
      return resolved;
    }
  }

  if (right && !right.winner) {
    const resolved = playNextMatch(right);
    if (resolved) {
      if (left && left.winner) node.setFighterA(left.winner);
      if (right.winner) node.setFighterB(right.winner);
      renderTournament();
      return resolved;
    }
  }

  if (left && left.winner) node.setFighterA(left.winner);
  if (right && right.winner) node.setFighterB(right.winner);

  if (node.fighter_a && node.fighter_b && !node.winner) {
    node.setWinner();
    renderTournament();
    return node;
  }

  renderTournament();
  return null;
}

// scripts.js L628-636
function simulateTournament(node) {
  if (!node) return null;
  while (!node.winner) {
    const playedNode = playNextMatch(node);
    if (!playedNode) break;
  }
  renderTournament();
  return node.winner ? node.winner : null;
}
```
