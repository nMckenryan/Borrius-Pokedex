import axios from "axios";

export const getPokemonInfo = async (pokemonName) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = response.data;
        return pokemonData;
    } catch (error) {
        console.error(error);
    }
};

export const getAllPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon";
    const allPokemon = [];

    let response = await axios.get(url);
    allPokemon.push(...response.data.results);

    while (response.data.next) {
        response = await axios.get(response.data.next);
        allPokemon.push(...response.data.results);
    }

    return allPokemon;
};
