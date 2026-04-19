# Progress log

## 2026-04-18 (plan sync — BracketNode + stat model)

- Read `scripts.js` (526 lines) to verify current state.
- **New vs previous sync:** `BracketNode` class (`round`, `fighter_a`, `fighter_b`, `next_node`; `setFighterA` / `setFighterB` / `setNextNode`); `bracket_nodes = []` + DOM loop (bug: `n` not pushed, leaks as global); `populateBracket()` TODO stub; `calculateFighterStrength` (Laplace win-index, `/20` exp ref); `getMatchupProbability` returns `[probA, probB]`; `btn-add--added` class toggle on add button.
- **Not in file:** `populateBracketSeeds`, `shuffleFighters`, shuffle listener (mentioned in earlier progress entry — those were not committed or were removed).
- **Gating:** `refreshRosterDisplay` disables `btn-footer-full-bracket`, `btn-footer-shuffle`, `btn-footer-next-match` (3 buttons, not `btn-run-tournament`).
- Full rewrite of `plan/task_plan.md`, `plan/findings.md`, `plan/progress.md` to match current code.

## 2026-04-18 (`/planning-with-files` — restore, Phase 4 progress)

- Re-read all planning files; `session-catchup.py` exit 0.
- `git diff --stat HEAD`: `index.html`, `scripts.js`, `style.css` all modified (uncommitted).
- **New in `scripts.js` (author JS):** `btn-add--added` toggle; `calculateFighterStrength`; `getMatchupProbability`; `populateBracketSeeds`; `shuffleFighters` + `#btn-footer-shuffle` listener. Bracket Tree comment placeholder at end.
- **Remaining Phase 4:** `#btn-run-tournament` click handler → semis + final + DOM writes.
- Updated `plan/task_plan.md` Phase 4 checkboxes + `plan/findings.md` architecture/open issues.

## 2026-04-18 (`/planning-with-files` — restore + working tree)

- Re-read `plan/task_plan.md`, `plan/findings.md`, `plan/progress.md`.
- `session-catchup.py`: default path missing; re-ran from plugin cache — exit 0, no stdout.
- `git status`: `main` aligned with `origin/main`; uncommitted: `index.html`, `style.css`.
- `git diff` summary: card Add-tag SVG/CSS alignment; action buttons bottom-anchored; `.footer-bracket-btn` restyled (yellow primary `#ffd100`) replacing generic `.footer button` block.

## 2026-04-18 (docs sync — roster vs bracket)

- `README.md`: MVP tournament split into nested roster [x] vs bracket/simulation [ ]; Progress bullet updated.
- `plan/task_plan.md`: MVP/Stretch rows partial; Logic snapshot; Phase 4 in progress with roster + gating [x], run + simulation [ ].
- `plan/findings.md`: Data/roster architecture; mini tournament split; resolved #7 roster strip; open issue #3 narrowed to bracket handler + DOM.

## 2026-04-18 (plan sync — README mini tournament)

- `plan/task_plan.md`: Goal + README tables updated for four-fighter roster + stat-based bracket (MVP); Phase 4 added.
- `plan/findings.md`: README MVP/Stretch lists + architecture note on `#roster-slots` / bracket hooks; open issues include tournament wiring.

## 2026-04-18 (Phase 2 — manual smoke test)

- Manual QA (sort all modes, weight multi-select, record radios, combined filters, units toggle): **passed** locally; no regressions.
- `plan/task_plan.md`: Phase 2 manual QA checkbox marked complete.

## 2026-04-18 (`/planning-with-files` — restore)

- Re-read all planning files; `session-catchup.py` exit 0.
- `git status`: branch **main**, ahead of `origin/main` by 3, working tree clean.

## 2026-04-17 (README + plans sync — weight sort in UI)

- `index.html`: `<select>` includes Weight (Low-High) (`weight-asc`) and Weight (High-Low) (`weight-desc`).
- `README.md`: MVP weight line checked; outstanding gaps updated.
- `plan/task_plan.md` + `plan/findings.md`: weight sort end-to-end resolved.

## 2026-04-17 (README + plans sync — weight sort in JS)

- `scripts.js`: `sortCardsByWeightAsc` / `sortCardsByWeightDesc`; `sortCards` handles `weight-asc` / `weight-desc`.
- `README.md`: Weight MVP line notes JS vs HTML gap.
- `plan/task_plan.md` + `plan/findings.md`: weight comparators + open UI step documented.

## 2026-04-17 (README + plans sync)

- `README.md`: One-themed summary; MVP checkboxes — Record done, Weight sort open; Progress bullets condensed.
- `plan/task_plan.md`: README goal tables match code; Phase 1 complete + optional Lightweight; Phase 3 README item checked.
- `plan/findings.md`: Branding aligned; architecture documents units path; open issues trimmed.

## 2026-04-17 (plan sync — `refreshDisplay` / `applyFilters`)

- `scripts.js`: `refreshDisplay()` → `showCards(applyFilters())`; `applyFilters` returns filtered list + record `switch` filled; `updateFilters` fixed.
- `plan/task_plan.md`: Phase 1 marked complete; snapshot + errors updated.
- `plan/findings.md`: old filter gap / `record_filters` issues moved to Resolved.

## 2026-04-17 (README goals in planning docs)

- Added `README.md` goals to `plan/task_plan.md` and `plan/findings.md`.
- No changes to `README.md` itself in this step.

## 2026-04-17 (plan update — `scripts.js` refactor)

- Re-synced planning docs to latest `scripts.js`.
- Sort helpers return `fighters_data.sort(...)`; `applyFilters` switch with empty arms; `showCards` iterates `data` but filter not yet applied; `record_filters` still undeclared.

## 2026-04-17 (plan documents sync)

- Synced all three planning files to current `scripts.js` / `index.html` / data.
- Task plan: Phase 1 checkboxes updated; errors table filled.
- Findings: resolved vs open split; architecture notes updated.

## 2026-04-17 (Phase 1 review + `scripts.js` snapshot)

- Review-only pass (no AI-authored JS): sort comparators correct; `sortedFighters` init; `record_filters` undeclared; `pass` placeholder; Lightweight checkbox missing.

## 2026-04-17 (planning-with-files — restore)

- Re-read all planning files; `session-catchup.py` exit 0.
- `git status`: branch main, ahead of `origin/main` by 3, working tree clean.

## 2026-04-17 (planning-with-files sync)

- Re-read all planning files; `session-catchup.py` exit 0.
- Updated `task_plan.md`: constraint section; decisions table; Phase 1 bullets tagged human vs HTML.
- Updated `findings.md`: Cursor rule path; weight-class case matching.

## 2026-04-17 (later)

- Added `.cursor/rules/snap-academy-genai-limits.mdc`: genAI may only change HTML/CSS; JS must remain human-written.

## 2026-04-17

- Created `plan/` and planning-with-files artifacts: `task_plan.md`, `findings.md`, `progress.md`.
- Analyzed repository: `index.html`, `style.css`, `scripts.js`, `data/one_champion_fighters.js`, `README.md`, `INSTRUCTIONS.md`.
- No code changes in this session — planning scaffold only.

---

*Short entries after each work session: what changed, what was tested, blockers.*
