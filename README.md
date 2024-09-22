# Borrius Pokedex - A Pokedex for the popular Romhack Pokemon Unbound

## An filtered pokedex with pertinent information

- Get useful data about pokemon without scrolling thru tonnes of information
- Filter Dex depending on what is available in which generation

## Built with:

- React Native
- React Query
- React Native Elements
- NativeWind
- Pokemon data via PokeApi/Pokemon Borrius Pokedex Website/Pokemon Borrius Location Spreadsheet
- Borrius Web Scraper/API (build by meeee)

### MVP

- [x] Set up boilerplate UI
- [x] Import Pokemon data from PokeAPI
  - [x] Import All Pokemon Data from PokeAPI
  - [x] Search for pokemon by name/type/number
- [x] Implement Pokedex list with pokemon icon sprite
- [x] Implement pokemon page (via Bottomsheet? like google maps)

- [x] Pokemon Evolution methods/levels

  - [x] Handle No Evo
  - [x] Handle 2 stage evolutions
  - [x] Handle 3 stage evolutions
  - [ ] Handle split evolutions e.g poliwag
  - [ ] Handle Eevee
  - [ ] Handle clicking evolution forms to go to other pokemon

- EVO TRIGGERS

  - [ ] gender (vespiqueen)
  - [x] held_item
  - [x] item
  - [ ] known_move (primeape)
  - [ ] known_move_type
  - [ ] location
  - [ ] min_affection (togepi?)
  - [ ] min_beauty (milotic)
  - [ ] min_happiness (togepi)
  - [x] min_level
  - [ ] needs_overworld_rain
  - [ ] party_species
  - [ ] party_type
  - [ ] relative_physical_stats (tyrogue)
  - [ ] time_of_day (rockruff)
  - [ ] turn_upside_down (that squid thing)
  - [ ] Trade species (escavalier)

- [x] Pokemon Base Stats (look for bar graph, )
- [x] Pokemon Role/Pokemon Stat Ratings (https://marriland.com/glossary/base-stats/#:~:text=Excellent%20(130%20or%20Higher),indicative%20of%20the%20top%20tier.)
- [x] Pokemon Catch rate
- [x] Get Pokemon location for Borrius (Scan thru PDF?)
- [x] Movelist
- [x] Create App Icon

## TODO:

- [x] Table of Moves
- [x] Cache images?
- [ ] Make sure it works on iOS
- [ ] publish to store
- [x] Sort desktop UI

## BUGS

- [x] Pokemon down the list take a while to load in their individual entries
- [x] Pokemon load in at random order at the start
- [x] Weirdness re: single/duo evos
- [ ] Beldum has not move data
- [ ] Handle long pokemon names (e.g. Nidoran female)

## Future Work

- [ ] Pokesprite items for evo
- [ ] Unit test API calls
- [ ] Customise FOnts
