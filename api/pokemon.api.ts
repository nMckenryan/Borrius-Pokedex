import axios, { AxiosResponse } from "axios";

export type Pokemon = {
    id: number;
    name: string;
    sprite: string;
    typeList: string[];
};


export const getPokemonDetails = async (pokemonName: string) => {

    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;

    try {
        return await axios.get<Pokemon>(url);
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

            const pokeObj: Pokemon = {
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