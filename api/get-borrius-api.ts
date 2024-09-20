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
    category: string
    power: number | null
    accuracy: number | null
    learn_method: string
    level_learned: number | null
}

export type Evolutions = {
    gender: string | null,
    held_item: string | null,
    item: string | null,
    known_move: string | null,
    known_move_type: string | null,
    location: string | null,
    min_level: number | null,
    min_happiness: number | null,
    min_affection: number | null,
    needs_overworld_rain: boolean | null,
    party_species: string | null,
    party_type: string | null,
    relative_physical_stats: number | null,
    time_of_day: string | null,
    trade_species: string | null,
    turn_upside_down: boolean | null
    trigger: {
        name: string,
    },
    evolutionChain: []
}

export type Location = {
    location: string,
    encounterMethod: string,
    timeOfDay: string,
    isSpecialEncounter: boolean
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
    evolutions: Evolutions,
    abilities: string[]
    locations: Location[],
    moves: Move[]
}

export const getPokemonEvolutionSprite = async (nextStageName: string) => {
    try {
        if (nextStageName === "minior") {
            nextStageName = "minior-red-meteor";
        }
        if (nextStageName === "oricorio") {
            nextStageName = "oricorio-baile";
        }
        if (nextStageName === "pumpkaboo") {
            nextStageName = "pumpkaboo-average";
        }
        if (nextStageName === "gourgeist") {
            nextStageName = "gourgeist-average";
        }
        if (nextStageName === "wormadam") {
            nextStageName = "wormadam-plant";
        }
        if (nextStageName === "meowstic") {
            nextStageName = "meowstic-male";
        }
        if (nextStageName === "wishiwashi") {
            nextStageName = "wishiwashi-solo";
        }
        if (nextStageName === "lycanroc") {
            nextStageName = "lycanroc-midday";
        }
        if (nextStageName === "basculin" || nextStageName === "basculegion") {
            nextStageName = "basculin-red-striped";
        }
        if (nextStageName === "darmanitan") {
            nextStageName = "darmanitan-standard";
        }
        if (nextStageName === "deoxys") {
            nextStageName = "deoxys-normal";
        }
        if (nextStageName === "shaymin") {
            nextStageName = "shaymin-land";
        }
        if (nextStageName === "keldeo") {
            nextStageName = "keldeo-ordinary";
        }



        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextStageName}`);
        const data = await response.json();

        return {
            official: data.sprites.other?.["official-artwork"]?.front_default,
            game_sprite: data.sprites.front_default
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

async function parseEvolutionDetails(evolutionDetails: any) {
    const evoSprites = await getPokemonEvolutionSprite(evolutionDetails.species.name);

    return {
        evolutionDetails: evolutionDetails.evolution_details.map((evolutionDetail: any) => ({
            gender: evolutionDetail.gender || null,
            held_item: evolutionDetail.held_item || null,
            item: evolutionDetail.item || null,
            known_move: evolutionDetail.known_move || null,
            known_move_type: evolutionDetail.known_move_type || null,
            location: evolutionDetail.location || null,
            min_level: evolutionDetail.min_level || null,
            min_happiness: evolutionDetail.min_happiness || null,
            min_affection: evolutionDetail.min_affection || null,
            needs_overworld_rain: evolutionDetail.needs_overworld_rain || null,
            party_species: evolutionDetail.party_species || null,
            party_type: evolutionDetail.party_type || null,
            relative_physical_stats: evolutionDetail.relative_physical_stats || null,
            time_of_day: evolutionDetail.time_of_day || null,
            trade_species: evolutionDetail.trade_species || null,
            trigger: {
                name: evolutionDetail.trigger.name,
                url: evolutionDetail.trigger.url
            },
            turn_upside_down: evolutionDetail.turn_upside_down || null
        })),
        evolves_to: evolutionDetails.evolves_to ? evolutionDetails.evolves_to.map((evolvesTo: any) => parseEvolutionDetails(evolvesTo)) : [],
        is_baby: evolutionDetails.is_baby,
        species: {
            name: evolutionDetails.species.name,
            url: evolutionDetails.species.url
        },
        evolutionSprites: {
            official: evoSprites.official,
            game_sprite: evoSprites.game_sprite
        }
    }
}

const compileMoves = (moveList) => {
    let ml = [];
    const move = moveList.map((item) => {
        item.map((moves) => (
            ml.push({
                name: moves.move.name,
                type: moves.move.type,
                category: moves.move.category,
                power: moves.move.power,
                accuracy: moves.move.accuracy,
                learn_method: moves.version_group_details[0].move_learn_method.name,
                level_learned: moves.version_group_details[0].level_learned_at
            })
        ))
    })
    return ml
};

export const getAllBorriusPokemon = async () => {
    const allPokemon: Pokemon[] = [];
    const pokemonSection = pokedexData[0].pokemon;


    try {
        for (const pokemon of pokemonSection) {

            const pokeEvo = await parseEvolutionDetails(pokemon.evolution_chain);

            const evo = {
                evolutionDetails: pokeEvo.evolutionDetails,
                evolves_to: pokeEvo.evolves_to,
                is_baby: pokeEvo.is_baby,
                species: pokeEvo.species,
                evolutionSprites: pokeEvo.evolutionSprites
            }

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
                    speed: pokemon.stats.speed.base_stat
                },
                evolutions: null,
                height: pokemon.height,
                weight: pokemon.weight,
                capture_rate: parseInt(pokemon.capture_rate.percentage),
                locations: pokemon.locations,
                moves: []
            };
            allPokemon.push(pokeObj);
        }

        return allPokemon;
    } catch (error) {
        console.error(`Error fetching all Borrius pokemon: `, error);
        return [];
    }

};

