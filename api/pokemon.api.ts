import axios, { AxiosResponse } from "axios";

export type Pokemon = {
    number: number;
    name: string;
    sprite: string;
    typeList: string[];
};


export const getPokemonDetails = async (
    pokemonId: string
): Promise<AxiosResponse<Pokemon>> => {
    const url = `https://pokeapi.co/api/v2/pokemon-form/${pokemonId}`;

    try {
        return await axios.get<Pokemon>(url);
    } catch (error) {
        console.error(`Error fetching pokemon #${pokemonId}:`, error);
        return {
            data: {
                number: 0,
                name: "Unknown",
                sprite: "../assets/question-mark.png",
                typeList: ["Unknown"],
            },
        } as AxiosResponse<Pokemon>;
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
                number: req.data.id || 0,
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