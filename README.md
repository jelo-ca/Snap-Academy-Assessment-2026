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
[x] Four-fighter tournament roster + stat-based bracket simulation
    [x] Roster: up to four picks (`Set` + insertion order = seeds); `#roster-count`; `#roster-slots` UI; Add / Added / Full on cards; remove from strip; `#btn-run-tournament` enabled when roster has 4
    [x] Run bracket: footer buttons now call `populateBracket()`, `playNextMatch(getBracketRootNode())`, and `simulateTournament(getBracketRootNode())`; semifinals feed final; stat-weighted `Math.random()` writes winners/champion and `*-meta`
~~[] Favorite fighters (optional separate from roster)~~
~~[] Add/Update/Delete full roster management beyond tournament picks~~
[x] Alternative list display

### Stretch

[] Carousel style card selection
[] ~~Make pretty~~ Make more pretty

## Resources Used

- https://www.geeksforgeeks.org/
- https://www.xjavascript.com/
- https://developer.mozilla.org/
- https://www.javaspring.net/blog/javascript-building-a-hierarchical-tree/

## Progress

- Extracted csv from Kaggle -> JSON using https://csvjson.com/csv2json -> global var to avoid fetch API.
- Realized Kaggle didnt give photo links — hard-coded a dataset of 15 fighters from the One Championship website.
- Updated HTML/CSS for One-themed layout; `editCardContent()` uses fighter objects and `setCardField()` to stay DRY on stats.
- UI styling references https://www.onefc.com/.
- Sorting: `<select>` + `switch` in `sortCards()`; asc/desc for name, age, wins, weight (`sortCardsByWeightAsc` / `sortCardsByWeightDesc`, options in `index.html`).
- Wired `refreshDisplay()` so `showCards` always gets `applyFilters()` output -> weight class + record filters actually change the list.
- Hold `FIGHTERS_DATA` const + `fighters_data` ref so sorted order and filters share the same array behavior.
- Metric toggle in the controls (`toggleMetricUnits()`, `formatHeight`, `formatWeight`).
- **Tournament (author JS):** roster flow + bracket simulation are wired — `BracketNode` tree, `populateBracket()`, `playNextMatch()`, and `simulateTournament()` now update bracket seed slots, winners, champion, and meta labels.
- Not done yet: separate “favorites” list; full CRUD roster beyond tournament picks; carousel polish/stretch styling. Known cleanup: implicit global `n` in bracket node setup and footer label mismatch (`Shuffle fighters` currently seeds roster order, does not randomize). **`removeLastCard()`** still references removed starter `titles` — remove footer hook or fix when polishing.
