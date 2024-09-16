import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Pokemon } from "../../api/pokemon.api";
import getPokemonLocations, { LocationInfo } from "../../api/location.api";

export default function LocationsBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon | null;
}) {
  const [locationData, setLocationData] = useState<LocationInfo[] | null>(null);

  function getCatchRateDifficulty(catchRate: number) {
    switch (true) {
      case catchRate <= 255:
        return "Very Easy";
      case catchRate <= 200:
        return "Easy";
      case catchRate <= 150:
        return "Medium";
      case catchRate <= 100:
        return "Hard";
      case catchRate <= 50:
        return "Very Hard";
      case catchRate <= 5:
        return "Extremely Hard";
    }
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

          {locationData.map((location) => (
            <>
              <Text>{location.locationName}</Text>
              {location.versionDetails.map((i) =>
                i.encounterDetails.map((j) => (
                  <>
                    <Text>
                      Chance: {j.chance} - {i.maxChance}
                    </Text>
                    <Text>
                      Level: {j.minLevel} - {j.maxLevel}
                    </Text>
                    <Text> Method: {j.method}</Text>
                    <Text> Conditions: {j.conditions.join(", ")}</Text>
                  </>
                ))
              )}
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
