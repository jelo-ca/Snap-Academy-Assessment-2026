# Task plan — Snap Academy Assessment (One Fighters catalog)

## Goal

Ship a polished static catalog site for One Championship fighters: display imported data, sort and filter it, and meet SEA Stage 2 requirements (`INSTRUCTIONS.md`). **Planned (README):** a **four-fighter mini tournament** — roster selection + stat-based elimination bracket (UI scaffold in HTML/CSS; simulation logic is author-written JS per course policy).

### README goals (`README.md` — author checklist)

README title, summary, and feature list are **One Championship**-aligned and kept in sync with the app below.

**Summary (README):** Static catalog; global fighter array; sort, filter, units toggle; fighter pages in a new tab; **HTML/CSS** for a four-fighter roster strip and mini bracket layout; **you** wire roster + probabilistic tournament in `scripts.js`.

**MVP (README)**

| Item | README status | Code note |
|------|--------------|-----------|
| Card display for fighters | [x] | OK |
| Fighter sorting — Name | [x] | OK |
| Fighter sorting — Weight | [x] | `sortCardsByWeightAsc` / `Desc`; `weight-asc` / `weight-desc` in `sortCards` and `<select>` |
| Fighter sorting — Wins | [x] | OK |
| Fighter sorting — Age | [x] | OK |
| Fighter filtering — Weight class | [x] | `weight_class_filters` + `refreshDisplay` |
| Fighter filtering — Record | [x] | `record_filter`: all / winning / undefeated |
| **Four-fighter tournament roster + stat-based bracket simulation** | [x] | **Done (JS):** `Set` roster (`ROSTER_MAX` 4), add/remove, `refreshRosterDisplay`, `BracketNode` tree, `populateBracket`, `playNextMatch`, `simulateTournament`, and bracket DOM/meta updates. |
| Favorite fighters *(optional; README strike-through — separate from roster)* | — | Deferred / not required for current MVP checklist. |
| Add / Update / Delete roster *(full management **beyond** tournament picks)* | [ ] | Not started |
| Alternative list display | [x] | Marked complete in README. |

**Stretch (README)**

| Item | README status | Note |
|------|--------------|------|
| Carousel-style card selection | [ ] | |
| Compare **4** fighters — small elimination bracket *(probabilistic outcomes)* | [x] | Covered by MVP tournament implementation. |
| Make pretty | [ ] | |

**README "Initial Features (From Sample)"** (starter hooks): `removeLastCard()`, `quoteAlert()`, `editCardContent()`, `showCards()`.

## Constraint (project rule)

- **Generative AI in repo:** HTML + CSS only (see `.cursor/rules/snap-academy-genai-limits.mdc`).
- **JavaScript:** You implement `scripts.js` / data logic yourself; planning items below that touch JS are **your** work, not AI-applied patches.

## Current codebase snapshot

| Area | Location | Role |
|------|----------|------|
| Page shell + controls | `index.html` | Title, card strip, `details` for sort/filter/units (incl. weight sort options), hidden card template |
| **Mini tournament (UI)** | `index.html` + `style.css` | **Roster strip** `#roster-slots` (4 slots), bracket footer buttons (`#btn-footer-full-bracket`, `#btn-footer-shuffle`, `#btn-footer-next-match`), **bracket graph** `#bracket-graph` + semifinal/final node IDs. Semantics: roster order → seeds (1v2, 3v4). |
| Styling | `style.css` | Dark theme, card layout, controls panel, `.roster-section` / `.tournament-section` / `.bracket-graph` |
| Logic | `scripts.js` | Catalog + filters + units; roster (`Set`, `refreshRosterDisplay`, add/remove); `BracketNode` tree + layered traversal; bracket controls (`populateBracket`, `playNextMatch`, `simulateTournament`); stat model (`calculateFighterStrength`, `getMatchupProbability`). |
| Data | `data/one_champion_fighters.js` | Global `one_champion_fighters` array (no fetch) |
| Requirements | `INSTRUCTIONS.md` | Official rubric |
| Product notes | `README.md` | Feature checklist + progress *(incl. tournament plan + Progress bullets)* |
| AI scope | `.cursor/rules/snap-academy-genai-limits.mdc` | HTML/CSS assistance only |
| Diagrams *(optional)* | `plan/*.mmd` | Bracket / roster dictionary sketches — reference only |

## Phases

### Phase 1 — Stabilize core behavior — `complete`

- [x] **`sortedFighters` + sort helpers** — `let sortedFighters`; helpers `return fighters_data.sort(...)`; initial `sortedFighters = sortCardsByNameAsc()`. _(human JS)_
- [x] Age / wins / **weight** comparators (`sortCardsByWeightAsc` / `Desc`). _(human JS)_
- [x] **Display uses filtered list** — `refreshDisplay()` calls `showCards(applyFilters())`; `sortCards` / `updateFilters` call `refreshDisplay()`. _(human JS)_
- [x] **`applyFilters`** — Weight class via `weight_class_filters` + `toLowerCase()`; record via `record_filter` + `switch` (`winning`, `undefeated`, `all`). Returns list for `showCards`. _(human JS)_
- [x] **`updateFilters`** — Record radios set `record_filter` when checked; weight checkboxes use `addFilter` / `removeFilter` for `weight-class` only. _(human JS)_
- [x] **Units** — Metric/imperial toggle refreshes cards with `formatHeight` / `formatWeight`. _(human JS + HTML/CSS for switch)_
- [ ] Optional **HTML:** **Lightweight** weight-class checkbox (`findings.md`). _(human HTML)_

### Phase 2 — Filtering UX and correctness — `in progress`

- [x] Manual QA: weight multi-select + record radios + sort order on full dataset. _(2026-04-18 — local smoke test passed.)_
- [ ] Optional: reset or document behavior if `fighters_data` vs `sortedFighters` refs ever diverge (currently same array ref + in-place `.sort()`).

### Phase 3 — Polish and rubric — `in progress`

- [x] README: One branding; MVP table and progress aligned with code (ongoing).
- [x] **`index.html`:** `<option>`s for `weight-asc` / `weight-desc` match `sortCards`.
- [ ] Remove or fix dead code (`removeLastCard` / `titles` sample).
- [ ] Optional: GitHub Pages deploy and smoke-test published URL.

### Phase 4 — Mini tournament (README MVP) — `in progress`

**Author-written** `scripts.js` + existing HTML/CSS (see snapshot table).

- [x] **Roster:** Up to 4 picks (`Set`, insertion order = seeds); `#roster-count`, `#roster-slots` filled/empty UI, **Add** / **Added** / **Full** on cards (`btn-add--added` CSS class), remove on strip, `clearRoster` available.
- [x] **Button gating:** `refreshRosterDisplay` disables `btn-footer-full-bracket`, `btn-footer-shuffle`, `btn-footer-next-match` until roster has 4 fighters.
- [x] **Stat model:** `calculateFighterStrength` (Laplace win-index `(w+3)/(w+l+6)` × experience `0.9 + 0.1*(total/20)`); `getMatchupProbability(fighterA, fighterB)` returns `[probA, probB]`.
- [x] **`BracketNode` tree + layers:** nodes are created from `.bracket-match` and linked semifinal -> final via layer grouping.
- [x] **`populateBracket()`:** seeds semifinal node slots from current roster order and renders bracket seeds.
- [x] **Run bracket controls:** footer hooks call `playNextMatch(getBracketRootNode())` and `simulateTournament(getBracketRootNode())`; each bout resolves with `getMatchupProbability` + `Math.random()` in `simulateFight`.
- [x] **DOM updates:** `renderTournament()` writes seed/finalist slots, winner/champion nodes, and `*-meta` labels.
- [x] **README / Stretch:** tournament rows synchronized to completed implementation.
- [ ] **Cleanup:** replace implicit global `n` in bracket-node setup (`const n = ...`) and align `Shuffle fighters` button label with its current non-random behavior (or implement true random shuffle).

## Decisions log

| Decision | Rationale |
|----------|-----------|
| Planning files live under `plan/` | Matches requested folder layout; same content as planning-with-files pattern. |
| JS fixes = author | Snap / user rule: genAI does not write project JavaScript. |
| Mini tournament = README MVP | Scaffold first (HTML/CSS); roster + bracket simulation implemented only in human JS; Stretch "compare 4" duplicates same feature in README. |

## Errors encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| Implicit global in bracket setup (`n = new BracketNode(...)`) | 1 open | Cleanup pending: use `const n` (or inline push) to avoid global leak risk. |

---

_Update this file after each phase: status, checkboxes, and errors._
