import axios from 'axios';

interface PokemonData {
    id: number;
}

interface VersionDetails {
    maxChance: number;
    generations: [];
    encounterDetails: {
        chance: number;
        minLevel: number;
        maxLevel: number;
        conditions: string[];
        method: string;
    }[]
}


export interface LocationInfo {
    locationName: string;
    generation: number;
    versionDetails: VersionDetails[];

}

function getGeneration(generation: string): number {
    switch (generation) {
        case "red":
        case "blue":
        case "yellow":
        case "firered":
        case "leafgreen":
            return 1;

        case "gold":
        case "silver":
        case "crystal":
        case "heartgold":
        case "soulsilver":
            return 2

        case "ruby":
        case "sapphire":
        case "emerald":
        case "omega-ruby":
        case "alpha-sapphire":
            return 3

        case "diamond":
        case "pearl":
        case "platinum":
            return 4

        case "black":
        case "white":
        case "black-2":
        case "white-2":
            return 5

        case "x":
        case "y":
            return 6

        case "sun":
        case "moon":
            return 7

        case "sword":
        case "shield":
            return 8
        case "scarlet":
        case "violet":
            return 9
        default: 0
    }
}


export default async function getPokemonLocations(pokemonName: string, selectedGen: number): Promise<LocationInfo[]> {

    // Step 2: Get the location area encounters
    const encountersUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`;
    const encountersResponse = await axios.get(encountersUrl);
    const encountersData = encountersResponse.data;
    const generationArray = [];


    encountersData.forEach((encounter) => {
        encounter.version_details.forEach((versionDetails) => {
            generationArray.push(versionDetails.version.name)
        })
    });


    const locationArray: LocationInfo[] = encountersData.map(encounter => {
        const gen = getGeneration(encounter.version_details[0].version.name);
        return {
            generation: gen,
            locationName: encounter.location_area.name.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }),
            versionDetails: encounter.version_details.map(versionDetails => ({
                maxChance: versionDetails.max_chance,
                encounterDetails: versionDetails.encounter_details.map(encounterDetails => ({
                    chance: encounterDetails.chance,
                    minLevel: encounterDetails.min_level,
                    maxLevel: encounterDetails.max_level,
                    conditions: encounterDetails.condition_values.map(condition => condition.name),
                    method: encounterDetails.method.name
                }))
            })),

        };
    });

    return locationArray.filter(location => location.generation === selectedGen);


}

