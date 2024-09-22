
export type Stats = {
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number
}

export type Move = {
    name: string
    type: string
    category: string
    power: number | null
    accuracy: number | null
    learn_method: string
    level_learned: number | null
}

export type Evolutions = {
    gender: string | null,
    held_item: string | null,
    item: string | null,
    known_move: string | null,
    known_move_type: string | null,
    location: string | null,
    min_level: number | null,
    min_happiness: number | null,
    min_affection: number | null,
    needs_overworld_rain: boolean | null,
    party_species: string | null,
    party_type: string | null,
    relative_physical_stats: number | null,
    time_of_day: string | null,
    trade_species: string | null,
    turn_upside_down: boolean | null
    trigger: {
        name: string,
    },
    evolutionChain: [],
    evolves_to: Evolutions[],
    is_baby: boolean,
    species: {
        name: string,
        url: string
        evolutionSprites: {
            official: string | null,
            game_sprite: string | null
        }
    }
}

export type Location = {
    location: string,
    encounterMethod: string,
    timeOfDay: string,
    isSpecialEncounter: boolean
}

export type Pokemon = {
    id: number,
    nationalId: number,
    name: string,
    height: number,
    weight: number,
    capture_rate: number,
    sprites: {
        official: string | null,
        game_sprite: string | null
    },
    typeList: string[],
    stats: Stats,
    evolutions: Evolutions,
    abilities: string[]
    locations: Location[],
    moves: Move[]
}
