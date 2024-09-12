import axios from "axios";
import { PokemonStats, PokemonSpecies, Pokemon, PokedexItem } from "./pokemon.api";
import pokedexData from "./borrius_pokedex_data.json";
// export const getBorriusPokemonStats = async (pokemonId: number): Promise<PokemonStats> => {
//     const [pokemonResponse] = await Promise.all([
//         axios.get<Pokemon>(`https://borrius-pokemon-scraper-321133146790.australia-southeast1.run.app/borrius_pokemon/${pokemonId}`),
//     ]);

//     const stats: PokemonStats = {
//         hp: pokemonResponse.data.stats[0].base_stat,
//         attack: pokemonResponse.data.stats[1].base_stat,
//         defense: pokemonResponse.data.stats[2].base_stat,
//         specialAttack: pokemonResponse.data.stats[3].base_stat,
//         specialDefense: pokemonResponse.data.stats[4].base_stat,
//         speed: pokemonResponse.data.stats[5].base_stat,
//         // catchRate: pokemonResponse.data.capture_rate,
//         // growthRate: pokemonResponse.data.growth_rate.name,
//     };

//     return stats;
// }


export const getAllBorriusPokemon = async () => {



    const allPokemon = [];

    const pd = pokedexData[0].pokemon;

    const pokemonSection = pokedexData[0].pokemon;

    const numberMap = pokemonSection.map((pokemon) => pokemon);

    try {
        numberMap.map(async (pokemon) => {
            const pokeObj: PokedexItem = {
                id: pokemon.game_indices[0].game_index,
                name: pokemon.name,
                sprite: pokemon.sprites.front_default,
                typeList: pokemon.types
            };
            allPokemon.push(pokeObj);

        });
        return allPokemon;
    } catch (error) {
        console.error(`Error fetching all pokemon: `, error);
        return allPokemon;
    }

};
