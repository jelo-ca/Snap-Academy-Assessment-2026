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
| Logic | `scripts.js` | `showCards`, `editCardContent`, `setCardField`, sort + filter wiring |
| Data | `data/one_champion_fighters.js` | Global `one_champion_fighters` array (no fetch) |
| Requirements | `INSTRUCTIONS.md` | Official rubric |
| Product notes | `README.md` | Feature checklist (some labels still say “UFC”) |
| AI scope | `.cursor/rules/snap-academy-genai-limits.mdc` | HTML/CSS assistance only |

## Phases

### Phase 1 — Stabilize core behavior — `in_progress`

- [ ] Ensure `sortedFighters` is explicitly initialized (avoid implicit globals). _(human JS)_
- [ ] Fix age sort: ascending vs descending should use opposite comparators. _(human JS)_
- [ ] Fix wins ascending: currently matches descending logic in code. _(human JS)_
- [ ] Complete `applyFilters()` record branch (see `findings.md`); remove placeholder that breaks runtime. _(human JS)_
- [ ] Weight class: either align checkbox `value` in `index.html` with data strings, or keep `toLowerCase()` on both sides — **HTML/CSS side** can adjust values; **comparison logic** in JS stays yours.

### Phase 2 — Filtering UX and correctness — `pending`

- [ ] Define record rules: “all”, “winning”, “undefeated” using `wins` / `losses` (no `fighter.record` field in data).
- [ ] Decide whether radio “all” should clear `record_filters` or use a dedicated code path.
- [ ] Re-test weight-class multi-select with real dataset values.

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
|-------|---------|--------------|
| — | — | — |

---

_Update this file after each phase: status, checkboxes, and errors._
