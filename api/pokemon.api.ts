import axios, { AxiosResponse } from "axios";

export type EvolutionDetails = {
    base: {
        name: string;
        url: string;
    },
    stage1: {
        name: string;
        url: string;
    },
    stage2: {
        name: string;
        url: string;
    }
};

export type Pokemon = {
    id: number;
    name: string;
    sprite: string;
    typeList: string[];
    evolutionDetails: EvolutionDetails;
};

export type PokedexItem = {
    id: number;
    name: string;
    sprite: string;
    typeList: string[];
};

export const getPokemonSprite = async (pokemonName: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
        const response = await (await axios.get(url)).data.sprites.front_default;
        return response;
    } catch (error) {
        console.error(`Error fetching sprite for pokemon #${pokemonName}:`, error);
        return null;
    }

}


export const getPokemonDetails = async (pokemonName: string) => {

    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;

    const spriteURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`



    try {
        // const response = await axios.get<Pokemon>(url);
        const response = await axios.get(url);
        const imageResponse = (await axios.get(spriteURL)).data;


        const evolutionURL = response.data.evolution_chain.url;
        const evoResponse = (await axios.get(evolutionURL)).data;

        console.log(evoResponse);

        const base = evoResponse.chain.species.name;
        const stage1 = evoResponse.chain.evolves_to[0].species.name;
        const stage2 = evoResponse.chain.evolves_to[0].evolves_to[0].species.name;

        const evoDetails: EvolutionDetails = {
            base: {
                name: base || null,
                url: await getPokemonSprite(base) || null
            },
            stage1: {
                name: stage1 || null,
                url: await getPokemonSprite(stage1) || null
            },
            stage2: {
                name: stage2 || null,
                url: await getPokemonSprite(stage2) || null
            }
        }

        const pokemonObject = {
            id: response.data.id,
            name: response.data.name,
            sprite: imageResponse.sprites.other.home.front_default,
            typeList: imageResponse.types.map((item) => item.type.name),
            evolutionDetails: evoDetails,
        };

        return pokemonObject;

    } catch (error) {
        console.error(`Error fetching pokemon #${pokemonName}:`, error);
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