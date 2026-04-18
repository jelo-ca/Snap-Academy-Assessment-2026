# Task plan — Snap Academy Assessment (One Fighters catalog)

## Goal

Ship a polished static catalog site for One Championship fighters: display imported data, sort and filter it, and meet SEA Stage 2 requirements (`INSTRUCTIONS.md`).

## Constraint (project rule)

- **Generative AI in repo:** HTML + CSS only (see `.cursor/rules/snap-academy-genai-limits.mdc`).
- **JavaScript:** You implement `scripts.js` / data logic yourself; planning items below that touch JS are **your** work, not AI-applied patches.

## Current codebase snapshot

| Area | Location | Role |
|------|----------|------|
| Page shell + controls | `index.html` | Title, horizontal card strip, `details` dropdown for sort/filter, hidden card template |
| Styling | `style.css` | Dark theme, card layout, controls panel |
| Logic | `scripts.js` | `showCards`, `editCardContent`, `setCardField`, `sortCards` + filter wiring |
| Data | `data/one_champion_fighters.js` | Global `one_champion_fighters` array (no fetch) |
| Requirements | `INSTRUCTIONS.md` | Official rubric |
| Product notes | `README.md` | Feature checklist (some labels still say “UFC”) |
| AI scope | `.cursor/rules/snap-academy-genai-limits.mdc` | HTML/CSS assistance only |

## Phases

### Phase 1 — Stabilize core behavior — `in_progress`

- [x] Ensure `sortedFighters` is explicitly declared (`let sortedFighters`); sort helpers assign to it. _(human JS — done; see load caveat below)_
- [x] Age sort: ascending vs descending use opposite comparators (`a.age - b.age` vs `b.age - a.age`). _(human JS)_
- [x] Wins ascending vs descending (`a.wins - b.wins` vs `b.wins - a.wins`). _(human JS)_
- [ ] Fix initial load: `sortedFighters = sortCardsByNameAsc()` assigns the function’s return value (`undefined`), overwriting the sorted array set inside the helper — use `sortCardsByNameAsc();` alone or `return` the sorted array from the helper. _(human JS)_
- [ ] Declare or remove `record_filters`: `addFilter` / `removeFilter` / `applyFilters` reference `record_filters`, but only `record_filter` exists — will throw when record radios are used. _(human JS)_
- [ ] Complete `applyFilters()` record branch; remove `pass` placeholder (invalid JS). Treat `"all"` as no record predicate. _(human JS)_
- [x] Weight class: lowercase checkbox `value` in `index.html` + `fighter.weight_class.toLowerCase()` in filter — **aligned.** _(HTML + human JS)_
- [ ] Optional **HTML:** add a **Lightweight** checkbox (dataset includes one Lightweight fighter) or accept that class as filter-only-via-“no checkbox”. _(human HTML)_

### Phase 2 — Filtering UX and correctness — `pending`

- [ ] Implement record rules: “all” (no extra predicate), “winning” (`wins > losses`), “undefeated” (`losses === 0`) using `wins` / `losses` (no `fighter.record` in data).
- [ ] Align radio behavior with storage: either `record_filters` array (with `"all"` skipped in `applyFilters`) or a single `record_filter` updated on change (and remove `record_filters` references).
- [ ] Re-test weight-class multi-select against full dataset after record filter works.

### Phase 3 — Polish and rubric — `pending`

- [ ] README: align title with One Championship; mark completed items accurately.
- [ ] Remove or fix dead code (`removeLastCard` / `titles` if still from starter).
- [ ] Optional: GitHub Pages deploy and smoke-test published URL.

## Decisions log

| Decision | Rationale |
|----------|-----------|
| Planning files live under `plan/` | Matches requested folder layout; same content as planning-with-files pattern. |
| JS fixes = author | Snap / user rule: genAI does not write project JavaScript. |

## Errors encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| `sortedFighters` overwritten with `undefined` on load | — | Call `sortCardsByNameAsc();` without assignment, or return sorted array from helper (`plan/findings.md`). |
| `record_filters is not defined` when using record radios | — | Declare `let record_filters = []` or migrate fully to `record_filter`. |
| `pass` in filter callback | — | Replace with real predicates for winning / undefeated; skip when `"all"`. |

---

_Update this file after each phase: status, checkboxes, and errors._
