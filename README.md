# One Fighters

## Summary

Catalog for One Championship fighters. Data sits in a global JS array (no fetch). Sort/filter cards, switch metric vs imperial on height & weight, open fighter pages in a new tab. The page includes **HTML/CSS** for a four-fighter roster strip and a mini bracket layout; **you** wire the roster and probabilistic tournament in `scripts.js` (per course / genAI policy).

## Initial Features (From Sample)

removeLastCard()
quoteAlert()
editCardContent()
showCards()

## Planned Features

### MVP

[x] Card display for fighters
[x] Fighter Sorting
    [x] Name
    [x] Weight
    [x] Wins
    [x] Age
[x] Fighter Filtering
    [x] Weight class
    [x] Record (all / winning record / undefeated)
[] Four-fighter tournament roster + stat-based bracket simulation *(UI scaffold in HTML/CSS; JS = your implementation)*
[] Favorite fighters (optional separate from roster)
[] Add/Update/Delete full roster management beyond tournament picks
[] Alternative list display

### Stretch

[] Carousel style card selection
[] Compare 4 fighters in a small elimination bracket (probabilistic outcomes) *(planned — same as above)*
[] Make pretty

## Resources Used

- https://www.geeksforgeeks.org/
- https://www.xjavascript.com/

## Progress

- Extracted csv from Kaggle -> JSON using https://csvjson.com/csv2json -> global var to avoid fetch API.
- Realized Kaggle didnt give photo links — hard-coded a dataset of 15 fighters from the One Championship website.
- Updated HTML/CSS for One-themed layout; `editCardContent()` uses fighter objects and `setCardField()` to stay DRY on stats.
- UI styling references https://www.onefc.com/.
- Sorting: `<select>` + `switch` in `sortCards()`; asc/desc for name, age, wins, weight (`sortCardsByWeightAsc` / `sortCardsByWeightDesc`, options in `index.html`).
- Wired `refreshDisplay()` so `showCards` always gets `applyFilters()` output -> weight class + record filters actually change the list.
- Hold `FIGHTERS_DATA` const + `fighters_data` ref so sorted order and filters share the same array behavior.
- Metric toggle in the controls (`toggleMetricUnits()`, `formatHeight`, `formatWeight`).
- Planned: implement tournament roster + bracket simulation in author-written JS (e.g. array + `Set` for roster, tree-shaped bracket, stat-based `Math.random()` bouts). HTML/CSS hooks: `#roster-slots`, `#btn-run-tournament`, `#bracket-sf1-a` … `#bracket-champion`.
- Not done yet: separate “favorites” list, full CRUD roster, alternate list view. `removeLastCard()` still hits `titles` from the starter — leave it or fix later.
