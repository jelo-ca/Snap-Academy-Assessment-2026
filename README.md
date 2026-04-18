# One Fighters

## Summary

A static catalog for One Championship fighters. Data lives in a global JS array (no fetch). Sort and filter cards, toggle metric vs imperial units for height and weight, and open fighter pages in a new tab.

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
    [] Weight (not in UI yet; sort options are name, age, wins)
    [x] Wins
    [x] Age
[x] Fighter Filtering
    [x] Weight class
    [x] Record (all / winning record / undefeated)
[] Favorite fighters
[] Add/Update/Delete roster management
[] Alternative list display

### Stretch

[] Carousel style card selection
[] Compare 2 fighters with theoretical fight outcome
[] Make pretty

## Resources Used

- https://www.geeksforgeeks.org/
- https://www.xjavascript.com/

## Progress

- Extracted CSV from Kaggle → translated into JSON (https://csvjson.com/csv2json) → global var to avoid fetch API.
- Built a curated dataset of 15 fighters from the One Championship site (Kaggle had no photo URLs).
- Updated HTML/CSS for One-themed layout; `editCardContent()` uses fighter objects and `setCardField()` for DRY stat rows.
- UI styling references https://www.onefc.com/.
- Sorting: `<select>` with a `switch` in `sortCards()`; ascending/descending for name, age, and wins.
- Filtering: `refreshDisplay()` → `showCards(applyFilters())` so weight-class checkboxes and record radios narrow the list correctly.
- `FIGHTERS_DATA` / `fighters_data` / `sortedFighters` share consistent array behavior for sort + filter.
- Metric/imperial toggle for height and weight in the controls panel (`toggleMetricUnits()`, `formatHeight`, `formatWeight`).
- Outstanding MVP gaps: sort by weight, favorites, roster CRUD, alternate list view; starter `removeLastCard()` still references removed sample data.
