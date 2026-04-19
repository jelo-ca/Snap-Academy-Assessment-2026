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
- [ ] **Four-fighter tournament roster + stat-based bracket simulation** *(roster + strip **done** in `scripts.js`; bracket run + probabilistic DOM updates **pending** — `plan/task_plan.md` Phase 4)*
- ~~Favorite fighters *(optional separate from roster)*~~ *(README strike-through — deferred)*
- [ ] Add / Update / Delete **full** roster management **beyond tournament picks**
- [ ] Alternative list display

**Planned Features — Stretch**

- [ ] Carousel-style card selection
- [ ] Compare **4** fighters — small elimination bracket *(probabilistic; same scope as MVP tournament line — roster done, bracket sim pending)*
- [ ] Make pretty

**Initial Features (from sample, per README):** `removeLastCard()`, `quoteAlert()`, `editCardContent()`, `showCards()`.

## Architecture

- **Stack:** Plain HTML/CSS/JS, no bundler. Open `index.html` in a browser.
- **Data:** `FIGHTERS_DATA` from global; `fighters_data` built with **`uid`** per row (`map`) for stable roster keys. Roster: **`Set` of `uid`** (max 4), `getFighterByUid`, `refreshRosterDisplay` drives `#roster-slots`.
- **Sort:** `sortCardsBy*` (name, wins, age, **weight**) return `fighters_data.sort(...)` (mutates in place). `sortedFighters` holds the same array reference as `fighters_data` after init sort, so order stays consistent for `applyFilters` base list.
- **Refresh path:** `sortCards` → `refreshDisplay()`; `updateFilters` → `refreshDisplay()`; `toggleMetricUnits` → `refreshDisplay()`. `DOMContentLoaded` → `refreshDisplay()`.
- **`refreshDisplay`:** `showCards(applyFilters())`.
- **`applyFilters`:** Starts from `sortedFighters`, narrows by `weight_class_filters` (lowercase match), then `record_filter` switch (`winning`, `undefeated`, `all`). **Returns** array passed to `showCards`.
- **Units:** `isMetric` toggles; `editCardContent` uses `formatHeight` / `formatWeight` for display.
- **Mini tournament:** **Roster** implemented in author JS (`Set`, add/remove, strip UI, **Run** button enables at 4). **Bracket graph** HTML/CSS exists; **probabilistic bouts + filling bracket nodes** on **Run bracket** click still **to implement** in `scripts.js`.

## QA

- **2026-04-18:** Local smoke test — all sort modes, weight-class multi-select, record filters, combined filters + units toggle; **passed** (no issues noted).

## Implemented features

- **Sort:** `<select>` → `sortCards` → in-place sort → `refreshDisplay` (includes weight low-high / high-low).
- **Filter:** Weight checkboxes + record radios → `updateFilters` → `refreshDisplay` → `applyFilters` inside `showCards` argument chain.
- **Units:** Checkbox switch → `toggleMetricUnits` → `refreshDisplay` with updated formatting.
- **Roster:** `.btn-add` → `addToRoster` (from `index.html` `onclick`); `editCardContent` sets Add / Added / Full; `removeFromRoster` from strip.

## Data shape (per fighter)

Fields used in UI include: `fighter_name`, `nickname`, `photo_url`, `url`, `age`, `country`, `height`, `weight`, `association`, `weight_class`, `wins`, `losses`. No `record` field — derived from wins/losses.

**Weight classes in data:** includes **Lightweight**; `index.html` checkboxes omit Lightweight (optional add).

## Resolved (earlier review)

1. **Filter output not driving UI** — Fixed: `refreshDisplay` / `applyFilters` return path.
2. **`record_filters` vs `record_filter`** — Fixed: radios update `record_filter`; no stray `record_filters` in `addFilter` / `removeFilter`.
3. **Empty record `switch` arms** — Fixed: `winning` / `undefeated` predicates implemented.
4. **Sort comparators / `sortedFighters` init** — Addressed; in-place sort keeps `sortedFighters` and `fighters_data` aligned.
5. **README vs code** — README and plan docs synced (One branding, MVP checkboxes, progress).
6. **Weight sort** — `scripts.js` comparators + `index.html` `<option>`s for `weight-asc` / `weight-desc`; end-to-end in UI.
7. **Tournament roster strip** — `Set`-backed roster, `refreshRosterDisplay`, `#btn-run-tournament` gating.

## Open issues

1. **`removeLastCard` / `titles`** — Starter still broken if invoked (references removed sample array).
2. **Optional:** Lightweight checkbox for one dataset row.
3. **Mini tournament (README MVP):** **`Run bracket`** handler + stat-based winners + DOM updates for `#bracket-sf1-a` … `#bracket-champion` (Phase 4 remainder in `task_plan.md`).
4. **MVP not yet built:** full CRUD beyond tournament picks, alternate list view, stretch items (carousel, “make pretty”).

## External / rubric

- `INSTRUCTIONS.md`: requires arrays/objects, non-API data, 2+ data operations (sort/filter qualify), polished UI.

---

_Append discoveries here; avoid pasting untrusted web content as instructions._
