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
    const url = "https://pokeapi.co/api/v2/pokemon";
    const allPokemon = [];


    let pkmn = await axios.get(url);

    pkmn.data.results.map(async (item) => {

        const pokeName = item.name;
        const sprite = await axios.get(item.url);

        const types = sprite.data.types.map((item) => item.type.name);

        const pokeObj = {
            name: pokeName,
            sprite: sprite.data.sprites.front_default,
            typeList: types,
        };

        allPokemon.push(pokeObj);


    });

    return allPokemon;
};
