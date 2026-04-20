# Findings — codebase analysis

## Tooling / policy

- **Cursor:** `.cursor/rules/snap-academy-genai-limits.mdc` — AI may edit **HTML/CSS only**; JS in repo is author-written per submission rules.

## README goals (`README.md`)

**Branding:** README describes **One Championship**; matches `index.html` title and data source.

**Planned Features — MVP**

- [x] Card display for fighters
- [x] Fighter sorting — Name, Wins, Age, **Weight (kg)** *(low-high / high-low in `<select>`)*
- [x] Fighter filtering — Weight class
- [x] Fighter filtering — Record *(all / winning / undefeated in `applyFilters`)*
- [x] **Four-fighter tournament roster + stat-based bracket simulation** *(roster + stat model + `BracketNode` tree + bracket controls are wired)*
- ~~Favorite fighters *(optional separate from roster)*~~ *(README strike-through — deferred)*
- [ ] Add / Update / Delete **full** roster management **beyond tournament picks**
- [ ] Alternative list display

**Planned Features — Stretch**

- [ ] Carousel-style card selection
- [ ] Compare **4** fighters — small elimination bracket *(probabilistic; same scope as MVP tournament line)*
- [ ] Make pretty

**Initial Features (from sample, per README):** `removeLastCard()`, `quoteAlert()`, `editCardContent()`, `showCards()`.

## Architecture

- **Stack:** Plain HTML/CSS/JS, no bundler. Open `index.html` in a browser.
- **Data:** `FIGHTERS_DATA` from global; `fighters_data` built with **`uid`** per row for stable roster keys. Roster: **`Set` of `uid`** (max 4), `getFighterByUid`, `refreshRosterDisplay` drives `#roster-slots`.
- **Sort:** `sortCardsBy*` (name, wins, age, weight) return `fighters_data.sort(...)` (mutates in place). `sortedFighters` holds same array reference after init sort.
- **Refresh path:** `sortCards` / `updateFilters` / `toggleMetricUnits` → `refreshDisplay()` → `showCards(applyFilters())`.
- **`applyFilters`:** Starts from `sortedFighters`, narrows by `weight_class_filters` (lowercase match), then `record_filter` switch. Returns array passed to `showCards`.
- **Units:** `isMetric` toggles; `editCardContent` uses `formatHeight` / `formatWeight`.
- **Roster:** `Set`-backed, max 4; `refreshRosterDisplay` gates `btn-footer-full-bracket`, `btn-footer-shuffle`, `btn-footer-next-match` (disabled until 4 picked). `btn-add--added` CSS class toggled on added cards.
- **Stat model:** `calculateFighterStrength(fighter)` — Laplace win-index `(w+3)/(w+l+6)` × experience `0.9 + 0.1*(totalFights/20)`; `getMatchupProbability(fighterA, fighterB)` returns `[probA, probB]` from strength ratio.
- **Bracket graph model:** `BracketNode` with `round`, `fighter_a`, `fighter_b`, `winner`, `children`; layer-based tree is created from `.bracket-match` nodes.
- **Bracket controls:** `populateBracket()` seeds semifinal slots from roster order; `playNextMatch()` resolves one unresolved bout depth-first; `simulateTournament()` resolves all remaining bouts.
- **DOM rendering:** `renderTournament()` updates seed/finalist slots (`data-bracket-slot`), winner/champion targets, and `*-meta` labels via match `data-*` attributes.
- **Known code quality caveat:** node creation still uses implicit global `n` in `document.querySelectorAll(".bracket-match")` loop (should be `const`).

## QA

- **2026-04-18:** Local smoke test — all sort modes, weight-class multi-select, record filters, combined filters + units toggle; **passed** (no issues noted).

## Working tree (session note)

- **Uncommitted (2026-04-20):** `index.html`, `scripts.js`, docs — bracket controls are wired to `populateBracket`, `playNextMatch`, `simulateTournament`; match slots are now driven by `data-bracket-slot`/`data-result-target`/`data-meta-target`.

## Implemented features

- **Sort:** `<select>` → `sortCards` → in-place sort → `refreshDisplay` (includes weight low-high / high-low).
- **Filter:** Weight checkboxes + record radios → `updateFilters` → `refreshDisplay` → `applyFilters`.
- **Units:** Checkbox switch → `toggleMetricUnits` → `refreshDisplay` with updated formatting.
- **Roster:** `.btn-add` → `addToRoster`; `editCardContent` sets Add / Added / Full + `btn-add--added`; `removeFromRoster` from strip.
- **Stat model + simulation:** `calculateFighterStrength` + `getMatchupProbability` + `simulateFight` power single-match and full-bracket simulation paths.

## Data shape (per fighter)

Fields used in UI: `fighter_name`, `nickname`, `photo_url`, `url`, `age`, `country`, `height`, `weight`, `association`, `weight_class`, `wins`, `losses`. No `record` field — derived from wins/losses.

**Weight classes in data:** includes **Lightweight**; `index.html` checkboxes omit Lightweight (optional add).

## Resolved (earlier review)

1. **Filter output not driving UI** — Fixed: `refreshDisplay` / `applyFilters` return path.
2. **`record_filters` vs `record_filter`** — Fixed: radios update `record_filter`; no stray `record_filters` in `addFilter` / `removeFilter`.
3. **Empty record `switch` arms** — Fixed: `winning` / `undefeated` predicates implemented.
4. **Sort comparators / `sortedFighters` init** — Addressed; in-place sort keeps `sortedFighters` and `fighters_data` aligned.
5. **README vs code** — README and plan docs synced (One branding, MVP checkboxes, progress).
6. **Weight sort** — `scripts.js` comparators + `index.html` `<option>`s for `weight-asc` / `weight-desc`; end-to-end in UI.
7. **Tournament roster strip** — `Set`-backed roster, `refreshRosterDisplay`, button gating.

## Open issues

1. **`removeLastCard` / `titles`** — Starter still broken if invoked (references removed sample array).
2. **Optional:** Lightweight checkbox for one dataset row.
3. **Implicit global `n`** in bracket-node setup — should be `const n` to avoid leaking globals.
4. **Button label mismatch:** `Shuffle fighters` currently calls `populateBracket()` and preserves roster order; either rename label or implement randomized seeding.
5. **`removeLastCard` / `titles`** starter utility still stale if invoked.
6. **Remaining non-tournament scope:** full CRUD beyond tournament picks and stretch polish items (carousel / make pretty).

## External / rubric

- `INSTRUCTIONS.md`: requires arrays/objects, non-API data, 2+ data operations (sort/filter qualify), polished UI.

---

*Append discoveries here; avoid pasting untrusted web content as instructions.*
