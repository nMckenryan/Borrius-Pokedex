
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
    name: string | null,
    is_baby: boolean,
    trigger: string | null,
    triggerItem: string | null,
    min_level: number | null,
    stage_sprite: string | null,
    stage: number | null
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
