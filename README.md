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
  - [x] Handle split evolutions e.g politoed
  - [ ] Handle Eevee
  - [ ] Handle clicking evolution forms to go to other pokemon

- EVO TRIGGERS

  - [x] min_level
  - [x] gender (vespiqueen)
  - [x] held_item (Politoed)
  - [x] item (firestone etc)
  - [x] known_move (Tangela)
  - [ ] known_move_type (eevee - sylveon)
        ~~- [x] location (irrelevant)~~
  - [x] min_affection (azuril)
        ~~- [x] min_beauty (milotic)~~
  - [x] min_happiness (riolu)
  - [x] needs_overworld_rain
  - [x] party_species (mantyke)
  - [x] party_type (pancham)
        ~~- [ ] relative_physical_stats (tyrogue)~~
  - [x] time_of_day (rockruff)
  - [x] turn_upside_down (Malamar)
  - [x] Trade (link stone)
        ~~- [ ] Trade species (escavalier)~~

- [x] Pokemon Base Stats (look for bar graph, )
- [x] [Pokemon Stat Ratings](<https://marriland.com/glossary/base-stats/#:~:text=Excellent%20(130%20or%20Higher),indicative%20of%20the%20top%20tier>)
- [x] Pokemon Catch rate
- [x] Get Pokemon location for Borrius (Scan thru PDF?)
- [x] Movelist
- [x] Create App Icon
- Remove Anachronicistic pokemon (e.g. Annihilape)
- Set Regional pokemon

## TODO:

- [x] Table of Moves
- [x] Cache images?
- [ ] Make sure it works on iOS
- [ ] publish to store
- [x] Sort desktop UI
- [ ] Fix up android responsiveness
- [ ] Handle tables for location and Moves

## BUGS

- [x] Pokemon down the list take a while to load in their individual entries
- [x] Pokemon load in at random order at the start
- [x] Weirdness re: single/duo evos
- [ ] Beldum has no move data
- [ ] Handle long pokemon names (e.g. Nidoran female)
- [ ] Handle Rockruff evolutions

## Future Work

- [ ] Pokesprite items for evo
- [ ] Unit test API calls
- [ ] Customise FOnts
