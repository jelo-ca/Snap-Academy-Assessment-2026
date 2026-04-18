# Task plan — Snap Academy Assessment (One Fighters catalog)

## Goal

Ship a polished static catalog site for One Championship fighters: display imported data, sort and filter it, and meet SEA Stage 2 requirements (`INSTRUCTIONS.md`).

### README goals (`README.md` — author checklist)

README title, summary, and feature list are **One Championship**–aligned and kept in sync with the app below.

**Summary (README):** Static catalog; global fighter array; sort, filter, units toggle; fighter pages in a new tab.

**MVP (README)**

| Item | README status | Code note |
|------|----------------|-----------|
| Card display for fighters | [x] | OK |
| Fighter sorting — Name | [x] | OK |
| Fighter sorting — Weight | [x] | `sortCardsByWeightAsc` / `Desc`; `weight-asc` / `weight-desc` in `sortCards` and `<select>` |
| Fighter sorting — Wins | [x] | OK |
| Fighter sorting — Age | [x] | OK |
| Fighter filtering — Weight class | [x] | `weight_class_filters` + `refreshDisplay` |
| Fighter filtering — Record | [x] | `record_filter`: all / winning / undefeated |
| Favorite fighters | [ ] | Not started |
| Add / Update / Delete roster management | [ ] | Not started |
| Alternative list display | [ ] | Not started |

**Stretch (README)**

| Item | README status |
|------|----------------|
| Carousel-style card selection | [ ] |
| Compare 2 fighters (theoretical fight outcome) | [ ] |
| Make pretty | [ ] |

**README “Initial Features (From Sample)”** (starter hooks): `removeLastCard()`, `quoteAlert()`, `editCardContent()`, `showCards()`.

## Constraint (project rule)

- **Generative AI in repo:** HTML + CSS only (see `.cursor/rules/snap-academy-genai-limits.mdc`).
- **JavaScript:** You implement `scripts.js` / data logic yourself; planning items below that touch JS are **your** work, not AI-applied patches.

## Current codebase snapshot

| Area | Location | Role |
|------|----------|------|
| Page shell + controls | `index.html` | Title, card strip, `details` for sort/filter/units (incl. weight sort options), hidden card template |
| Styling | `style.css` | Dark theme, card layout, controls panel |
| Logic | `scripts.js` | `FIGHTERS_DATA`, `refreshDisplay` → `showCards(applyFilters())`, `sortCards` (+ weight comparators), `applyFilters`, `updateFilters`, `toggleMetricUnits`, formatters |
| Data | `data/one_champion_fighters.js` | Global `one_champion_fighters` array (no fetch) |
| Requirements | `INSTRUCTIONS.md` | Official rubric |
| Product notes | `README.md` | Feature checklist + progress |
| AI scope | `.cursor/rules/snap-academy-genai-limits.mdc` | HTML/CSS assistance only |

## Phases

### Phase 1 — Stabilize core behavior — `complete`

- [x] **`sortedFighters` + sort helpers** — `let sortedFighters`; helpers `return fighters_data.sort(...)`; initial `sortedFighters = sortCardsByNameAsc()`. _(human JS)_
- [x] Age / wins / **weight** comparators (`sortCardsByWeightAsc` / `Desc`). _(human JS)_
- [x] **Display uses filtered list** — `refreshDisplay()` calls `showCards(applyFilters())`; `sortCards` / `updateFilters` call `refreshDisplay()`. _(human JS)_
- [x] **`applyFilters`** — Weight class via `weight_class_filters` + `toLowerCase()`; record via `record_filter` + `switch` (`winning` → `wins > losses`, `undefeated` → `losses === 0`, `all` no-op). Returns list for `showCards`. _(human JS)_
- [x] **`updateFilters`** — Record radios set `record_filter` when checked; weight checkboxes use `addFilter` / `removeFilter` for `weight-class` only. _(human JS)_
- [x] **Units** — Metric/imperial toggle refreshes cards with `formatHeight` / `formatWeight`. _(human JS + HTML/CSS for switch)_
- [ ] Optional **HTML:** **Lightweight** weight-class checkbox (`findings.md`). _(human HTML)_

### Phase 2 — Filtering UX and correctness — `in progress`

- [ ] Manual QA: weight multi-select + record radios + sort order on full dataset.
- [ ] Optional: reset or document behavior if `fighters_data` vs `sortedFighters` refs ever diverge (currently same array ref + in-place `.sort()`).

### Phase 3 — Polish and rubric — `in progress`

- [x] README: One branding; MVP table and progress aligned with code (ongoing).
- [x] **`index.html`:** `<option>`s for `weight-asc` / `weight-desc` match `sortCards`.
- [ ] Remove or fix dead code (`removeLastCard` / `titles` sample).
- [ ] Optional: GitHub Pages deploy and smoke-test published URL.

## Decisions log

| Decision | Rationale |
|----------|-----------|
| Planning files live under `plan/` | Matches requested folder layout; same content as planning-with-files pattern. |
| JS fixes = author | Snap / user rule: genAI does not write project JavaScript. |

## Errors encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| — | — | No open blockers from earlier plan list; filter/render path fixed in author JS. |

---

_Update this file after each phase: status, checkboxes, and errors._
