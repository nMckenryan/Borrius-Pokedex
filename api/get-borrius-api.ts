import { Pokemon } from "./borrius-types";
import pokedexData from "./borrius_pokedex_data.json";

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

async function parseEvolutionDetails(evolutionDetails: any): Promise<Evolutions> {
    const evoSprites = await getPokemonEvolutionSprite(evolutionDetails.species.name);

    return {
        gender: evolutionDetails.gender || null,
        held_item: evolutionDetails.held_item || null,
        item: evolutionDetails.item || null,
        known_move: evolutionDetails.known_move || null,
        known_move_type: evolutionDetails.known_move_type || null,
        location: evolutionDetails.location || null,
        min_level: evolutionDetails.min_level || null,
        min_happiness: evolutionDetails.min_happiness || null,
        min_affection: evolutionDetails.min_affection || null,
        needs_overworld_rain: evolutionDetails.needs_overworld_rain || null,
        party_species: evolutionDetails.party_species || null,
        party_type: evolutionDetails.party_type || null,
        relative_physical_stats: evolutionDetails.relative_physical_stats || null,
        time_of_day: evolutionDetails.time_of_day || null,
        trade_species: evolutionDetails.trade_species || null,
        trigger: {
            name: evolutionDetails.trigger.name
        },
        turn_upside_down: evolutionDetails.turn_upside_down || null,
        evolves_to: evolutionDetails.evolves_to ? await Promise.all(evolutionDetails.evolves_to.map((evolvesTo: any) => parseEvolutionDetails(evolvesTo))) : [],
        is_baby: evolutionDetails.is_baby || false,
        species: {
            name: evolutionDetails.species.name,
            url: evolutionDetails.species.url,
            evolutionSprites: {
                official: evoSprites.official,
                game_sprite: evoSprites.game_sprite
            }
        }
    };
}

const compileMoves = (moveList) => {
    if (moveList.length === 0) {
        return [];
    }

    let ml = [];
    moveList.map((item) => {
        ml.push({
            name: item.move.name,
            type: item.move.type,
            category: item.move.category,
            power: item.move.power,
            accuracy: item.move.accuracy,
            learn_method: item.version_group_details[0].move_learn_method.name,
            level_learned: item.version_group_details[0].level_learned_at
        })
    })
    return ml
};

export const getAllBorriusPokemon = async () => {
    const allPokemon: Pokemon[] = [];
    const pokemonSection = pokedexData[0].pokemon;

    try {
        for (const pokemon of pokemonSection) {

            const pokeEvo = await parseEvolutionDetails(pokemon.evolution_chain);
            const movesList = compileMoves(pokemon.moves);

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
                evolutions: pokeEvo,
                height: pokemon.height,
                weight: pokemon.weight,
                capture_rate: parseInt(pokemon.capture_rate.percentage),
                locations: pokemon.locations,
                moves: movesList
            };
            allPokemon.push(pokeObj);
        }

        return allPokemon;
    } catch (error) {
        console.error(`Error fetching all Borrius pokemon: `, error);
        return [];
    }

};

