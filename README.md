# UFC Fighter Catalog

## Summary

A UFC fighter catalog that uses data extracted from kaggle to display, compare, and explore the talented fighters of UFC

## Planned Features

### MVP

[x] Card display for fighters
[] Fighter Sorting
    [] Name
    [] Weight
    [] Wins
    [] Age
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