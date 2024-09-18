import pokedexData from "./borrius_pokedex_data.json";

export type Stats = {
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
}

export type Move = {
    name: string
    type: string
    damage_class: string
    power: number | null
    accuracy: number | null
    learn_method: string
    level_learned: number | null
}

export type Pokemon = {
    id: number,
    nationalId: number,
    name: string,
    height: number,
    weight: number,
    capture_rate: number,
    sprites: {
        official: string | null,
        game_sprite: string | null
    },
    typeList: string[],
    stats: Stats,
    abilities: string[]
}

export const getAllBorriusPokemon = async () => {
    const allPokemon: Pokemon[] = [];
    const pokemonSection = pokedexData[0].pokemon;

    try {
        for (const pokemon of pokemonSection) {
            const pokeObj: Pokemon = {
                id: pokemon.game_indices[0].game_index,
                nationalId: pokemon.game_indices[1].game_index,
                name: pokemon.name,
                abilities: pokemon.abilities.map((ability) => ability.ability.name),
                typeList: pokemon.types,
                sprites: {
                    official: pokemon.sprites.other?.home.front_default,
                    game_sprite: pokemon.sprites.front_default
                },
                stats: {
                    hp: pokemon.stats.hp.base_stat,
                    attack: pokemon.stats.attack.base_stat,
                    defense: pokemon.stats.defense.base_stat,
                    specialAttack: pokemon.stats.specialAttack.base_stat,
                    specialDefense: pokemon.stats.specialDefense.base_stat,
                    speed: pokemon.stats.speed
                },

                height: pokemon.height,
                weight: 0,
                capture_rate: pokemon.capture_rate,
            };
            allPokemon.push(pokeObj);
        }

        return allPokemon;
    } catch (error) {
        console.error(`Error fetching all Borrius pokemon: `, error);
        return allPokemon;
    }

};



