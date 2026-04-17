# UFC Fighter Catalog

## Summary

A UFC fighter catalog that uses data extracted from kaggle to display, compare, and explore the talented fighters of UFC

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
    [x] Weightclass (BUGGED)
    [] Record
[] Favorite fighters
[] Add/Update/Delete roster management
[] Alternative list display

### Stretch

[] Carousel style card selection
[] Compare 2 fighters with theoretical fight outcome
[] Make pretty

### Progress

- Extracted csv from Kaggle -> translated into JSON using <https://csvjson.com/csv2json> -> made into global var to avoid fetch API

- Realized kaggle didnt provide photo links so hard coded own data set of 15 fighters from OneChampionship website

- Updated HTML to reflect object attributes
- Updated editCardContent() to use objects as parameters and value assignment

- Updated UI using https://www.onefc.com/ as style reference.

- Added helper function setCardField() to exercise DRY 

- Updated Card styling and added a sort/filter button to html/css using AI

- Implemeneted sorting by name
- Added ascending and descending sorting for all cases and utilized a switch statement to handle the "select" element

- utilized list to implement weightclass filtering.