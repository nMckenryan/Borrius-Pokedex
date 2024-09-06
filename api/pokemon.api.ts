import axios from "axios";


export const getPokemonInfo = async (pokemonName) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = response.data;
        return {
            name: "pokemonData.name",
            types: pokemonData.types,
            spriteURL: pokemonData.sprites.front_default,
        };
    } catch (error) {
        console.error(error);
    }
};

export const getAllPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=150";
    const allPokemon = [];

    let pkmn = await axios.get(url);

    pkmn.data.results.map(async (item) => {
        let index = 1;
        const sprite = await axios.get(item.url);

        const types = sprite.data.types.map((item) => item.type.name);

        const pokeObj = {
            number: index++,
            name: item.name,
            sprite: sprite.data.sprites.front_default,
            typeList: types,
        };

        allPokemon.push(pokeObj);


    });

    return allPokemon;
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