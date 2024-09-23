import { Evolutions, Pokemon } from "./borrius-types";
import pokedexData from "./borrius_pokedex_data.json";

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
            return null;
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


async function traverseEvolutionChain(chain) {
    const evolutions = [];
    let stages = 1;

    evolutions.push({
        name: chain.species.name,
        is_baby: chain.is_baby,
        trigger: null,
        triggerItem: "Base",
        min_level: 0,
        stage_sprite: await getPokemonEvolutionSprite(chain.species.name),
        stage: stages
    });

    async function traverse(node) {
        if (node.evolution_details.length != 0) {
            evolutions.push({
                name: node.species.name,
                is_baby: node.is_baby,
                trigger: node.evolution_details[0]?.trigger?.name || null,
                triggerItem: node.evolution_details[0]?.item
                    || node.evolution_details[0].held_item
                    || node.evolution_details[0].known_move
                    || node.evolution_details[0].known_move_type
                    || node.evolution_details[0].location
                    || node.evolution_details[0].party_type
                    || node.evolution_details[0].trade_species
                    || node.evolution_details[0].party_species
                    || node.evolution_details[0].time_of_day
                    || node.evolution_details[0].relative_physical_stats
                    || node.evolution_details[0].min_affection
                    || node.evolution_details[0].min_happiness
                    || node.evolution_details[0].min_level
                    || node.evolution_details[0].needs_overworld_rain
                    || node.evolution_details[0].turn_upside_down || null,
                min_level: node.evolution_details[0]?.min_level || null,
                stage_sprite: await getPokemonEvolutionSprite(node.species.name),
                stage: stages
            });
        }
        for (const evolution of node.evolves_to) {
            traverse(evolution);
            stages++;
        }
    }

    traverse(chain);
    return evolutions;
}


export const getAllBorriusPokemon = async () => {
    const allPokemon: Pokemon[] = [];
    const pokemonSection = pokedexData[0].pokemon;

    try {
        for (const pokemon of pokemonSection) {
            const pokeEvo = await traverseEvolutionChain(pokemon.evolution_chain);
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

