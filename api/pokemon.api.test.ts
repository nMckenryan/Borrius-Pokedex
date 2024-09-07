import axios from 'axios';
import { getPokemonSprite } from './pokemon.api';
jest.mock('axios');

//GETTING SPRITES

describe('getPokemonSprite', () => {
    it('returns sprite URL for valid Pokémon name', async () => {
        const pokemonName = 'pikachu';
        const expectedSpriteUrl = 'https://example.com/pikachu-sprite.png';
        axios.get.mockResolvedValue({ data: { sprites: { front_default: expectedSpriteUrl } } });
        const result = await getPokemonSprite(pokemonName);
        expect(result).toBe(expectedSpriteUrl);
    });
    it('returns null for invalid Pokémon name', async () => {
        const pokemonName = ' invalid-pokemon';
        axios.get.mockRejectedValue(new Error('Not Found'));
        const result = await getPokemonSprite(pokemonName);
        expect(result).toBeNull();
    });
    it('returns null for API request failure', async () => {
        const pokemonName = 'pikachu';
        axios.get.mockRejectedValue(new Error('Network Error'));
        const result = await getPokemonSprite(pokemonName);
        expect(result).toBeNull();
    });
});