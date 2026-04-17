# UFC Fighter Catalog

## Summary

A UFC fighter catalog that uses data extracted from kaggle to display, compare, and explore the talented fighters of UFC

## Planned Features

### MVP

[] Card display for fighters
[] Favorite fighters
[] Add/Update/Delete roster management
[] Fighter Sorting
    [] Name
    [] Weight
    [] Wins
    [] Age
[] Alternative list display

### Stretch

[] Carousel style card selection
[] Compare 2 fighters with theoretical fight outcome

### Progress

- Extracted csv from Kaggle -> translated into JSON using <https://csvjson.com/csv2json> -> made into global var to avoid fetch API

- Realized kaggle didnt provide photo links so hard coded own data set of 15 fighters from OneChampionship website
