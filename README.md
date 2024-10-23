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
  - [x] Handle Eevee

- [x] EVO TRIGGERS

  - [x] min_level
  - [x] gender (vespiqueen)
  - [x] held_item (Politoed)
  - [x] item (firestone etc)
  - [x] known_move (Tangela)
  - [x] known_move_type (eevee - sylveon)
  - [x] min_affection (azuril)
  - [x] min_happiness (riolu)
  - [x] needs_overworld_rain
  - [x] party_species (mantyke)
  - [x] party_type (pancham)
  - [x] Trade (link stone)
  - [x] time_of_day (rockruff)

- ~~ [x] min_beauty (milotic)~~
- ~~ [x] location (irrelevant)~~
- ~~ [x] turn_upside_down (Malamar)~~
- ~~ [x] relative_physical_stats (tyrogue)~~
- ~~ [x] Trade species (escavalier)~~

- [x] Pokemon Base Stats (look for bar graph, )
- [x] [Pokemon Stat Ratings](<https://marriland.com/glossary/base-stats/#:~:text=Excellent%20(130%20or%20Higher),indicative%20of%20the%20top%20tier>)
- [x] Pokemon Catch rate
- [x] Get Pokemon location for Borrius (Scan thru PDF?)
- [x] Movelist
- [x] Create App Icon

## TODO:

- [x] Table of Moves
- [x] Cache images?
- [x] Sort desktop UI
- [ ] Handle Rockruff evolutions (3 split)
- [ ] Implement fonts
- [x] Fix up android responsiveness
- [x] Handle tables for location and Moves
- [/] Combine Moves that are learned via level up and TM

- DEPLOY:
  [] - Web (Vercel)
  [] - Android (Expo)
  [] - iOS (Expo)

## BUGS

- [x] Pokemon down the list take a while to load in their individual entries
- [x] Pokemon load in at random order at the start
- [x] Weirdness re: single/duo evos
- [ ] Beldum has no move data
- [x] Handle long pokemon names (e.g. Nidoran female)
- [ ] Handle clicking evolution forms to go to other pokemon
- [ ] Remove Anachronicistic pokemon (e.g. Annihilape)
- [ ] Set Regional pokemon

## Future Work

- [ ] Pokesprite items for evo
- [ ] Unit test API calls
- [ ] Customise FOnts
