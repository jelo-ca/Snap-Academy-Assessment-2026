# Progress log

## 2026-04-17 (README + plans sync — weight sort in UI)

- **`index.html`:** `<select>` includes **Weight (Low-High)** (`weight-asc`) and **Weight (High-Low)** (`weight-desc`).
- **`README.md`:** MVP weight line checked; Progress / outstanding gaps no longer list exposing weight sort.
- **`plan/task_plan.md`:** MVP table weight **[x]**; Phase 3 `index.html` weight options **[x]**; snapshot notes weight in sort dropdown.
- **`plan/findings.md`:** MVP weight **[x]**; implemented sort + resolved weight-sort note updated; open issues drop weight-dropdown gap.

## 2026-04-17 (README + plans sync — weight sort in JS)

- **`scripts.js`:** `sortCardsByWeightAsc` / `sortCardsByWeightDesc`; `sortCards` handles `weight-asc` / `weight-desc`.
- **`index.html`:** `<select>` unchanged — no weight options (users cannot trigger weight sort from UI until options are added).
- **`README.md`:** Weight MVP line notes JS vs HTML gap; Progress / outstanding gaps updated (expose weight in UI vs “sort by weight” missing entirely).
- **`plan/task_plan.md` & `plan/findings.md`:** MVP table and architecture reflect weight comparators + open UI step; resolved item for partial weight-sort rollout.

## 2026-04-17 (README + plans sync)

- **`README.md`:** One-themed summary; MVP checkboxes — Record done, Weight sort explicitly open; Progress bullets condensed (dataset, sort/filter wiring, units toggle, remaining gaps).
- **`plan/task_plan.md`:** README goal tables match code; snapshot includes `toggleMetricUnits` / formatters; Phase 1 complete + optional Lightweight; Phase 3 README item checked; removed stale UFC/BUGGED notes.
- **`plan/findings.md`:** Branding aligned; architecture documents units path; open issues trimmed to `removeLastCard`, optional Lightweight, MVP/stretch backlog.

## 2026-04-17 (plan sync — `refreshDisplay` / `applyFilters`)

- **`scripts.js`:** `FIGHTERS_DATA`; `refreshDisplay()` → `showCards(applyFilters())`; `applyFilters` returns filtered list + record `switch` filled; `updateFilters` sets `record_filter` for radios; removed broken `record_filters` usage in add/remove.
- **`plan/task_plan.md`:** Phase 1 marked **complete** (optional Lightweight remains); README MVP table notes code vs README; snapshot + errors updated.
- **`plan/findings.md`:** Architecture + README goals aligned with above; old “filter gap” / `record_filters` issues moved to **Resolved**; open = `removeLastCard`, README lag, optional Lightweight.

## 2026-04-17 (README goals in planning docs)

- Added **`README.md` goals** to **`plan/task_plan.md`** (under Goal: MVP/Stretch tables + sample-feature line) and **`plan/findings.md`** (dedicated section + notes on UFC vs One branding and sort UI vs README “Weight” line).
- No changes to `README.md` itself in this step.

## 2026-04-17 (plan update — `scripts.js` refactor)

- Re-synced **`plan/task_plan.md`**, **`plan/findings.md`**, **`plan/progress.md`** to latest `scripts.js`.
- **Code changes reflected:** Sort helpers now **`return`** `fighters_data.sort(...)` — initial `sortedFighters = sortCardsByNameAsc()` is valid; `applyFilters` uses `switch (record_filter)` with **empty** winning/undefeated arms; **`showCards` calls `applyFilters()`** but still iterates over **`data`** so filtered results are not applied to the card loop; **`pass` removed**; **`record_filters` still undeclared** in add/remove.
- **Plan focus:** Wire `filteredFighters` into display; finish record predicates; fix `record_filters` / `record_filter` consistency; optional Lightweight checkbox.

## 2026-04-17 (plan documents sync)

- Synced **`plan/task_plan.md`**, **`plan/findings.md`**, and **`plan/progress.md`** to current `scripts.js` / `index.html` / data.
- **Task plan:** Phase 1 checkboxes updated — sort comparators and weight-class casing marked complete; remaining items are initial-load `sortedFighters` assignment, `record_filters` wiring, record predicate, optional Lightweight checkbox; errors table filled from findings.
- **Findings:** Split into **resolved** (declared `sortedFighters`, age/wins comparators) vs **open** (load bug, `record_filters`, `pass` placeholder, Lightweight checkbox, `removeLastCard`, README); architecture notes updated (`sortCards` owns `showCards`).
- Prior Phase 1 review entry below retained for history.

## 2026-04-17 (Phase 1 review + `scripts.js` snapshot)

- **Review-only pass** (no AI-authored JS): walked Phase 1 against `scripts.js` / `index.html` / sample data.
- **Sort comparators:** age asc/desc and wins asc/desc are **correct** in current code (`a - b` vs `b - a` where appropriate).
- **`sortedFighters`:** now declared with `let`; initial load calls `sortCardsByNameAsc()` before `DOMContentLoaded`. **Watch:** `sortedFighters = sortCardsByNameAsc()` assigns the function’s **return value** (implicit `undefined`) after the helper already mutates `sortedFighters` — consider calling `sortCardsByNameAsc();` without assignment, or returning the sorted array from the helper.
- **Rendering path:** `showCards` is invoked from `sortCards()` after the switch; sort helpers no longer call `showCards` directly.
- **Record filtering:** `applyFilters` still has the `pass` placeholder in the record branch; **`record_filters` is referenced** in `addFilter` / `removeFilter` / `applyFilters` but only **`record_filter`** is declared — restore a `record_filters` array (or wire everything to `record_filter`) before exercising record radios.
- **Weight class:** lowercase checkbox values + `toLowerCase()` on fighter data align; dataset includes **Lightweight** with no matching checkbox in `index.html` yet.
- **Still open:** `removeLastCard` / `titles` starter code; record predicate implementation; optional `task_plan.md` / `findings.md` checkbox sync for completed sort items.

## 2026-04-17 (planning-with-files — restore)

- Re-read `plan/task_plan.md`, `plan/findings.md`, `plan/progress.md`.
- `session-catchup.py`: default path `~\.claude\skills\planning-with-files\scripts\` not present on this machine; ran successfully from `.claude/plugins/cache/planning-with-files/planning-with-files/2.23.0/skills/planning-with-files/scripts/session-catchup.py` (exit 0, no stdout).
- `git status`: branch **main**, **ahead of `origin/main` by 3**, working tree **clean**.

## 2026-04-17 (planning-with-files sync)

- Re-read `plan/task_plan.md`, `plan/findings.md`, `plan/progress.md`.
- Ran `session-catchup.py` (no extra report text in stdout).
- `git status`: branch **ahead of `origin/main` by 1**; `git diff` vs HEAD clean at check time.
- Updated `task_plan.md`: constraint section (HTML/CSS genAI only, human JS); decisions table; Phase 1 bullets tagged human vs HTML.
- Updated `findings.md`: Cursor rule path; clarified weight-class case matching.

## 2026-04-17 (later)

- Added `.cursor/rules/snap-academy-genai-limits.mdc`: genAI may only change HTML/CSS; JavaScript must remain human-written (no AI-generated JS in repo).

## 2026-04-17

- Created `plan/` and planning-with-files artifacts: `task_plan.md`, `findings.md`, `progress.md`.
- Analyzed repository: `index.html`, `style.css`, `scripts.js`, `data/one_champion_fighters.js`, `README.md`, `INSTRUCTIONS.md`.
- Ran `session-catchup.py` (planning-with-files v2.2.0 path); no prior `task_plan.md` in repo root to merge.
- No code changes in this session — planning scaffold only.

---

_Short entries after each work session: what changed, what was tested, blockers._
