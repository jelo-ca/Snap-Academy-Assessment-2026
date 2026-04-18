# Findings — codebase analysis

## Tooling / policy

- **Cursor:** `.cursor/rules/snap-academy-genai-limits.mdc` — AI may edit **HTML/CSS only**; JS in repo is author-written per submission rules.

## README goals (`README.md`)

**Branding:** README title/summary still say **UFC** / Kaggle; implementation uses **One Championship** data and styling.

**Planned Features — MVP**

- [x] Card display for fighters
- [x] Fighter sorting — Name, **Weight** (README line only), Wins, Age — *`<select>` has name, age, wins (no separate weight-stat sort)*
- [x] Fighter filtering — Weight class *(README still says **BUGGED**; code uses `applyFilters` + `refreshDisplay`)*
- [x] Fighter filtering — Record *(winning / undefeated / all — in `applyFilters`; README checkbox may still be `[ ]` until you edit README)*
- [ ] Favorite fighters
- [ ] Add / Update / Delete roster management
- [ ] Alternative list display

**Planned Features — Stretch**

- [ ] Carousel-style card selection
- [ ] Compare 2 fighters with theoretical fight outcome
- [ ] Make pretty

**Initial Features (from sample, per README):** `removeLastCard()`, `quoteAlert()`, `editCardContent()`, `showCards()`.

## Architecture

- **Stack:** Plain HTML/CSS/JS, no bundler. Open `index.html` in a browser.
- **Data:** `const FIGHTERS_DATA = window.one_champion_fighters`; `let fighters_data = FIGHTERS_DATA` (same reference; comment in code says “copies” but no structural clone — fine if you never reassign `fighters_data` to a new array).
- **Sort:** `sortCardsBy*` return `fighters_data.sort(...)` (mutates in place). `sortedFighters` holds initial return value — same array reference as `fighters_data`, so order stays consistent for `applyFilters` base list.
- **Refresh path:** `sortCards` → `refreshDisplay()`; `updateFilters` → `refreshDisplay()`. `DOMContentLoaded` → `refreshDisplay()`.
- **`refreshDisplay`:** `showCards(applyFilters())`.
- **`applyFilters`:** Starts from `sortedFighters`, narrows by `weight_class_filters` (lowercase match), then `record_filter` switch (`winning`, `undefeated`, `all`). **Returns** array passed to `showCards`.

## Implemented features

- **Sort:** `<select>` → `sortCards` → in-place sort → `refreshDisplay`.
- **Filter:** Weight checkboxes + record radios → `updateFilters` → `refreshDisplay` → `applyFilters` inside `showCards` argument chain.

## Data shape (per fighter)

Fields used in UI include: `fighter_name`, `nickname`, `photo_url`, `url`, `age`, `country`, `height`, `weight`, `association`, `weight_class`, `wins`, `losses`. No `record` field — derived from wins/losses.

**Weight classes in data:** includes **Lightweight**; `index.html` checkboxes omit Lightweight (optional add).

## Resolved (earlier review)

1. **Filter output not driving UI** — Fixed: `refreshDisplay` / `applyFilters` return path.
2. **`record_filters` vs `record_filter`** — Fixed: radios update `record_filter`; no undeclared `record_filters` in current `addFilter` / `removeFilter`.
3. **Empty record `switch` arms** — Fixed: `winning` / `undefeated` predicates implemented.
4. **Sort comparators / `sortedFighters` init** — Addressed earlier; still valid.

## Open issues

1. **`removeLastCard` / `titles`** — Still broken if invoked.
2. **README** — UFC wording; MVP checkboxes (especially Record, weight “BUGGED”) may lag code.
3. **Optional:** Lightweight checkbox for one dataset row.

## External / rubric

- `INSTRUCTIONS.md`: requires arrays/objects, non-API data, 2+ data operations (sort/filter qualify), polished UI.

---

_Append discoveries here; avoid pasting untrusted web content as instructions._
