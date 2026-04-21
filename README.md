# One Fighters

A static web app that showcases **One Championship**–style fighter profiles: browse a small catalog, sort and filter fighters, compare units, and run a **four-fighter mini tournament** with a simple stat-based simulation.

This repository was built for the **Snap Academy** assessment (see `INSTRUCTIONS.md` for the official rubric). There is **no build step** — open the HTML file locally or use the live site below.

| | |
|:---|:---|
| **Live site** | [jelo-ca.github.io/Snap-Academy-Assessment-2026](https://jelo-ca.github.io/Snap-Academy-Assessment-2026/) |
| **Run locally** | Open `index.html` in a modern browser |
| **Requirements** | `INSTRUCTIONS.md` |
| **Design / planning notes** | [`plan/`](plan/) (task plan, findings, session log) |

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

| | |
|:---|:---|
| **Markup & style** | `index.html`, `style.css` |
| **Behavior** | `scripts.js` (application logic) |
| **Data** | `data/one_champion_fighters.js` |

---

## Generative AI (course policy)

For this submission, **generative AI assistance is limited to HTML and CSS**. All **JavaScript** in this repo is written by the author. The full rule set lives in `.cursor/rules/snap-academy-genai-limits.mdc`.

---

## Assignment scaffolding

The starter project exposed a few global-style hooks (for example `showCards`, `editCardContent`, `quoteAlert`, `removeLastCard`). The app extends those patterns to drive the catalog, cards, and tournament UI.

---

## Feature status (self-check)

**Core (MVP)**

- [x] Fighter cards with consistent layout  
- [x] Sorting: name, weight, wins, age  
- [x] Filtering: weight class; record (all / winning / undefeated)  
- [x] Four-fighter roster + probabilistic bracket simulation  
- [x] Alternate catalog view (grid vs list)  

**Stretch / polish**

- [ ] Carousel-style card browsing  
- [x] Side-by-side style “compare four” via the tournament bracket *(same feature area as the MVP tournament)*  
- [x] Further visual polish  

---

## References

| Category | Source | Purpose |
|:--|:--|:--|
| General learning | [MDN Web Docs](https://developer.mozilla.org/) | JavaScript, HTML, and CSS reference |
| General learning | [GeeksforGeeks](https://www.geeksforgeeks.org/) | Supplemental syntax and examples |
| General learning | [xjavascript.com](https://www.xjavascript.com/) | Additional JavaScript examples |
| Bracket structure | [JavaSpring — hierarchical tree in JavaScript](https://www.javaspring.net/blog/javascript-building-a-hierarchical-tree/) | Tree-modeling approach for bracket logic |
| Visual inspiration | [ONE Championship](https://www.onefc.com/) | Branding and layout direction |
| Data conversion | [csvjson.com/csv2json](https://csvjson.com/csv2json) | Converted initial Kaggle CSV to JSON |

Data note: A Kaggle export was used for early exploration, but photo URLs were incomplete. The shipped dataset was manually completed from official fighter pages (small curated set).

---

## Implementation notes (brief)

Sorting, filtering, and units flow through a single refresh path so the visible list always matches the current controls. The tournament uses a small bracket tree and helper functions to seed matches, resolve bouts, and update the on-page bracket. For deeper technical detail and known follow-ups, see `plan/findings.md`.

