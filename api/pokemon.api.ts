import axios, { AxiosResponse } from "axios";

export type evoMethod = {
    name: string;
    spriteUrl: string;
    method: {
        trigger: string;
        level?: number;
    }
}

export interface EvolutionDetails {
    base: {
        name: string;
        spriteUrl: string;
    },
    stage1: evoMethod;
    stage2: evoMethod;
};

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    catchRate: number;
    growthRate: string;
}

export interface Pokemon {
    id: number;
    name: string;
    sprite: string;
    typeList: string[];
    evolutionDetails: EvolutionDetails;
    stats: PokemonStats
};

export interface PokemonSpecies {
    capture_rate: number;
    growth_rate: {
        name: string;
    };
}

export interface PokedexItem {
    id: number;
    name: string;
    sprite: string;
    typeList: string[];
};

export const getPokemonSprite = async (pokemonName: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
        const { data } = await axios.get(url);
        return data.sprites.front_default;
    } catch (error) {
        console.error(`Error fetching sprite for pokemon #${pokemonName}:`, error);
        return null;
    }
}

export const getPokemonStats = async (pokemonName: string): Promise<PokemonStats> => {
    const [speciesResponse, pokemonResponse] = await Promise.all([
        axios.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`),
        axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`),
    ]);

    const stats: PokemonStats = {
        hp: pokemonResponse.data.stats[0].base_stat,
        attack: pokemonResponse.data.stats[1].base_stat,
        defense: pokemonResponse.data.stats[2].base_stat,
        specialAttack: pokemonResponse.data.stats[3].base_stat,
        specialDefense: pokemonResponse.data.stats[4].base_stat,
        speed: pokemonResponse.data.stats[5].base_stat,
        catchRate: speciesResponse.data.capture_rate,
        growthRate: speciesResponse.data.growth_rate.name,
    };

    return stats;
}

export const getEvolutionDetails = async (pokemonName: string) => {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    const speciesResponse = (await axios.get(speciesUrl)).data;

    const evolutionUrl = speciesResponse.evolution_chain.url;
    const evolutionResponse = (await axios.get(evolutionUrl)).data;

    const baseName = evolutionResponse.chain.species.name || null;


    const stage1Name = evolutionResponse.chain.evolves_to[0].species.name || null;
    const stage2Name = evolutionResponse.chain.evolves_to[0].evolves_to[0].species.name || null;


    let stage1Trigger = evolutionResponse.chain.evolves_to[0]?.evolution_details[0]?.trigger.name;

    stage1Trigger = stage1Trigger == 'use-item' ?
        evolutionResponse.chain.evolves_to[0]?.evolution_details[0].item.name : stage1Trigger;

    stage1Trigger = stage1Trigger == 'level-up' && 'level';

    let stage2Trigger = evolutionResponse.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]?.trigger.name;

    stage2Trigger = stage2Trigger == 'use-item' ?
        evolutionResponse.chain.evolves_to[0].evolves_to[0].evolution_details[0].item.name : stage1Trigger;

    const evolutionDetails: EvolutionDetails = {
        base: {
            name: baseName,
            spriteUrl: await getPokemonSprite(baseName),
        },
        stage1: {
            name: stage1Name,
            spriteUrl: await getPokemonSprite(stage1Name),
            method: {
                trigger: stage1Trigger || null,
                level: evolutionResponse.chain.evolves_to[0]?.evolution_details[0]?.min_level || null,
            }
        },
        stage2: {
            name: stage2Name,
            spriteUrl: await getPokemonSprite(stage2Name),
            method: {
                trigger: stage2Trigger || null,
                level: evolutionResponse.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]?.min_level || null,
            }
        },
    };

    return evolutionDetails;
}


export const getPokemonDetails = async (pokemonName: string): Promise<Pokemon | null> => {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    const spriteUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const speciesResponse = (await axios.get(speciesUrl)).data;
        const pokemonResponse = (await axios.get(spriteUrl)).data;

        const evolutionDetails = await getEvolutionDetails(pokemonName);

        const stats = await getPokemonStats(pokemonName);


        const pokemon: Pokemon = {
            id: speciesResponse.id,
            name: speciesResponse.name,
            sprite: pokemonResponse.sprites.other.home.front_default || pokemonResponse.sprites.front_default || "../assets/question-mark.png",
            typeList: pokemonResponse.types.map((item) => item.type.name),
            evolutionDetails,
            stats,
        };

        return pokemon;

    } catch (error) {
        return null;
    }
};

export const getAllPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=150";
    const allPokemon = [];

    try {
        let pkmn = await axios.get(url);

        pkmn.data.results.map(async (item) => {
            const req = await axios.get(item.url);
            const types = req.data.types.map((item) => item.type.name);

            const pokeObj: PokedexItem = {
                id: req.data.id || 0,
                name: item.name || "No Name",
                sprite: req.data.sprites.front_default || "../assets/question-mark.png",
                typeList: types || ["Unknown"],
            };

            allPokemon.push(pokeObj);
        });

        return allPokemon;
    } catch (error) {
        console.error(`Error fetching all pokemon: `, error);
        return allPokemon;
    }

};


export const typeColors = {
    normal: "bg-normal",
    fire: "bg-fire",
    water: "bg-water",
    electric: "bg-electric",
    grass: "bg-grass",
    ice: "bg-ice",
    fighting: "bg-fighting",
    poison: "bg-poison",
    ground: "bg-ground",
    flying: "bg-flying",
    psychic: "bg-psychic",
    bug: "bg-bug",
    rock: "bg-rock",
    ghost: "bg-ghost",
    dragon: "bg-dragon",
    dark: "bg-dark",
    steel: "bg-steel",
    fairy: "bg-fairy",
};