# Findings — codebase analysis

## Tooling / policy

- **Cursor:** `.cursor/rules/snap-academy-genai-limits.mdc` — AI may edit **HTML/CSS only**; JS in repo is author-written per submission rules.

## Architecture

- **Stack:** Plain HTML/CSS/JS, no bundler. Open `index.html` in a browser.
- **Data loading:** `data/one_champion_fighters.js` defines a global array; `scripts.js` reads `window.one_champion_fighters` into `fighters_data`.
- **Rendering:** A hidden `.card` template is cloned per fighter; `setCardField()` injects label/value pairs for stats.
- **Sort:** Individual `sortCardsBy*` helpers mutate `sortedFighters`; `sortCards(sortBy)` runs the switch and then **`showCards(sortedFighters)`** once (sort helpers do not call `showCards`).
- **Initial load:** `sortCardsByNameAsc()` runs at parse time (after hoisted function declarations); `DOMContentLoaded` runs `showCards(sortedFighters)`.

## Implemented features

- **Sort:** `<select>` → `sortCards()` → per-metric functions → `showCards(sortedFighters)`.
- **Filter UI:** Checkboxes (`weight-class`) and radios (`record-filter`) → `updateFilters` → `addFilter` / `removeFilter` → `applyFilters()`.

## Data shape (per fighter)

Fields used in UI include: `fighter_name`, `nickname`, `photo_url`, `url`, `age`, `country`, `height`, `weight`, `association`, `weight_class`, `wins`, `losses`. There is **no** `record` property — record filtering must be **derived** from wins/losses.

**Weight classes present in data (sample):** Flyweight, Heavyweight, Strawweight, Atomweight, Unknown, Lightweight. Checkboxes in `index.html` cover all except **Lightweight**.

## Resolved (was issues in earlier review)

1. **`sortedFighters` declaration** — Now `let sortedFighters = []` at top level (no longer an undeclared global from sort functions alone).
2. **Age descending** — Uses `b.age - a.age`; ascending uses `a.age - b.age`.
3. **Wins ascending** — Uses `a.wins - b.wins`; descending uses `b.wins - a.wins`.

## Open issues

1. **Initial `sortedFighters` assignment** — Line `sortedFighters = sortCardsByNameAsc();` assigns the return value of `sortCardsByNameAsc` (implicit `undefined`) after the helper already set `sortedFighters` to the sorted array, so `sortedFighters` becomes **`undefined`** until the user changes the sort dropdown (which calls `sortCards` and fixes state). Fix: bare `sortCardsByNameAsc();` or `return sortedFighters` from the helper and assign that.
2. **`record_filters` vs `record_filter`** — Code pushes to `record_filters` in `addFilter` / `removeFilter` and reads `record_filters.length` in `applyFilters`, but only `let record_filter = "all"` is declared. Using record radios will throw **ReferenceError** until arrays are aligned.
3. **`applyFilters` record branch** — Still contains `pass` (not valid JS here) in the filter predicate; throws when `record_filters.length > 0` once (2) is fixed unless placeholder is replaced. Need predicates for `winning` / `undefeated` and **no filter** when value is `all`.
4. **Weight class coverage** — Logic matches lowercase HTML values to `weight_class.toLowerCase()`; add a **Lightweight** checkbox if that fighter should be filterable by class.
5. **Starter remnants** — `removeLastCard()` still references undefined `titles`.
6. **README vs project** — README may still say “UFC Fighter Catalog”; app/data are One Championship–themed.

## External / rubric

- `INSTRUCTIONS.md`: requires arrays/objects, non-API data, 2+ data operations (sort/filter qualify), polished UI.

---

_Append discoveries here; avoid pasting untrusted web content as instructions._
