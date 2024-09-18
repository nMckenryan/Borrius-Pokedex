import axios, { AxiosResponse } from "axios";

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

export type EvoMethod = {
    name: string;
    spriteUrl: string;
    method: {
        trigger: string;
        level?: number;
    }
}

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
    evolutionDetails: EvoMethod[];
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
    nationalId: number;
    name: string;
    sprite: string;
    typeList: string[];
};

export const getPokemonSprite = async (pokemonId: number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    try {
        const { data } = await axios.get(url);
        return data.sprites.front_default;
    } catch (error) {
        console.error(`Error fetching sprite for pokemon #${pokemonId}:`, error);
        return null;
    }
}

export const getPokemonStats = async (pokemonId: number): Promise<PokemonStats> => {
    const [speciesResponse, pokemonResponse] = await Promise.all([
        axios.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`),
        axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
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

export const getEvolutionDetails = async (pokemonId: number): Promise<EvoMethod[]> => {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
    const speciesResponse = (await axios.get(speciesUrl)).data;

    const evolutionUrl = speciesResponse.evolution_chain.url;
    const evolutionResponse = (await axios.get(evolutionUrl)).data;

    const baseName = evolutionResponse.chain.species.name || null;

    const evolutionDetails: EvoMethod[] = [
        {
            name: baseName,
            spriteUrl: await getPokemonSprite(baseName),
            method: {
                trigger: "Base",
                level: null
            }
        },
    ];

    let currentEvolution = evolutionResponse.chain;
    while (currentEvolution.evolves_to.length > 0) {
        const nextEvolution = currentEvolution.evolves_to[0];
        const method = nextEvolution.evolution_details[0] || { trigger: null, min_level: null };
        evolutionDetails.push({
            name: nextEvolution.species.name,
            spriteUrl: await getPokemonSprite(nextEvolution.species.name),
            method: {
                trigger: method.trigger?.name || null,
                level: method.min_level || null,
            },
        });
        currentEvolution = nextEvolution;
    }

    return evolutionDetails;
}



export const getPokemonDetails = async (pokemonId: number): Promise<Pokemon | null> => {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`;
    const spriteUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    try {
        const speciesResponse = (await axios.get(speciesUrl)).data;
        const pokemonResponse = (await axios.get(spriteUrl)).data;

        const evolutionDetails = await getEvolutionDetails(pokemonId);

        const stats = await getPokemonStats(pokemonId);


        const pokemon: Pokemon = {
            id: speciesResponse.id,
            name: speciesResponse.name,
            sprite: pokemonResponse.sprites.other?.["official-artwork"].front_default || pokemonResponse.sprites.front_default || "../assets/question-mark.png",
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
                nationalId: req.data.id || 0,
                name: item.name || "No Name",
                sprite: req.data.sprites.front_default || "../assets/question-mark.png",
                typeList: types || ["Unknown"],
            };

            allPokemon.push(pokeObj);
        });

        return allPokemon.sort((a, b) => a.id - b.id);
    } catch (error) {
        console.error(`Error fetching all pokemon: `, error);
        return allPokemon;
    }

};


