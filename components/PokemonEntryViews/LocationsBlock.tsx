import { View, Text } from "react-native";
import React, { useEffect, useState, version } from "react";
import { Pokemon } from "../../api/pokemon.api";
import getPokemonLocations, { LocationInfo } from "../../api/location.api";

export default function LocationsBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  const [locationData, setLocationData] = useState<LocationInfo[] | null>(null);

  function getCatchRateDifficulty(catchRate: number) {
    if (catchRate <= 5) return "Extremely Hard";
    if (catchRate <= 50) return "Very Hard";
    if (catchRate <= 100) return "Hard";
    if (catchRate <= 150) return "Medium";
    if (catchRate <= 200) return "Easy";
    return "Very Easy";
  }

  useEffect(() => {
    if (selectedPokemon) {
      getPokemonLocations(selectedPokemon.name, 1).then((data) => {
        setLocationData(data);
      });
    }
  }, [selectedPokemon]);

  return (
    <>
      {locationData && (
        <View className="flex-col items-center">
          <Text>Locations</Text>

          {locationData.map((location, index) => (
            <>
              <Text key={index}>{location.locationName}</Text>
            </>
          ))}

          <Text>
            Catch Rate: {selectedPokemon?.stats.catchRate} (
            {getCatchRateDifficulty(selectedPokemon?.stats.catchRate)})
          </Text>
        </View>
      )}
    </>
  );
}
