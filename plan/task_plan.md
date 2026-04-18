# Task plan — Snap Academy Assessment (One Fighters catalog)

## Goal

Ship a polished static catalog site for One Championship fighters: display imported data, sort and filter it, and meet SEA Stage 2 requirements (`INSTRUCTIONS.md`).

### README goals (`README.md` — author checklist)

The project README still titles itself **“UFC Fighter Catalog”** and describes Kaggle/UFC copy; the **live data and UI** are One Championship–themed. Table below mirrors README; **code may be ahead of README text** (update README in Phase 3).

**Summary (README):** Catalog from Kaggle-derived workflow; display, compare, and explore fighters (wording still UFC-oriented in README).

**MVP (README)**

| Item | README status | Code note (plan sync) |
|------|----------------|------------------------|
| Card display for fighters | [x] | OK |
| Fighter sorting — Name | [x] | OK |
| Fighter sorting — Weight | [x] | README line; `<select>` = name / age / wins only |
| Fighter sorting — Wins | [x] | OK |
| Fighter sorting — Age | [x] | OK |
| Fighter filtering — Weight class | [x] | README still says **BUGGED**; `refreshDisplay` → `showCards(applyFilters())` |
| Fighter filtering — Record | [ ] | **Implemented** in `applyFilters` (`winning`, `undefeated`, `all`) — tick README when you edit file |
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
| Page shell + controls | `index.html` | Title, horizontal card strip, `details` dropdown for sort/filter, hidden card template |
| Styling | `style.css` | Dark theme, card layout, controls panel |
| Logic | `scripts.js` | `FIGHTERS_DATA`, `refreshDisplay` → `showCards(applyFilters())`, `sortCards`, `applyFilters`, `updateFilters` |
| Data | `data/one_champion_fighters.js` | Global `one_champion_fighters` array (no fetch) |
| Requirements | `INSTRUCTIONS.md` | Official rubric |
| Product notes | `README.md` | Feature checklist (UFC wording; may lag code) |
| AI scope | `.cursor/rules/snap-academy-genai-limits.mdc` | HTML/CSS assistance only |

## Phases

### Phase 1 — Stabilize core behavior — `complete`

- [x] **`sortedFighters` + sort helpers** — `let sortedFighters`; helpers `return fighters_data.sort(...)`; initial `sortedFighters = sortCardsByNameAsc()`. _(human JS)_
- [x] Age / wins comparators. _(human JS)_
- [x] **Display uses filtered list** — `refreshDisplay()` calls `showCards(applyFilters())`; `sortCards` / `updateFilters` call `refreshDisplay()`. _(human JS)_
- [x] **`applyFilters`** — Weight class via `weight_class_filters` + `toLowerCase()`; record via `record_filter` + `switch` (`winning` → `wins > losses`, `undefeated` → `losses === 0`, `all` no-op). Returns list for `showCards`. _(human JS)_
- [x] **`updateFilters`** — Record radios set `record_filter` when checked; weight checkboxes use `addFilter` / `removeFilter` only for `weight-class` (no stray `record_filters`). _(human JS)_
- [ ] Optional **HTML:** **Lightweight** checkbox (`findings.md`). _(human HTML)_

### Phase 2 — Filtering UX and correctness — `pending`

- [ ] Manual QA: weight multi-select + record radios + sort order on full dataset.
- [ ] Optional: reset or document behavior if `fighters_data` vs `sortedFighters` refs ever diverge (currently same array ref + in-place `.sort()`).

### Phase 3 — Polish and rubric — `pending`

- [ ] README: One branding; tick **Record** (and fix weight-class “BUGGED” line if behavior confirmed).
- [ ] Remove or fix dead code (`removeLastCard` / `titles`).
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
