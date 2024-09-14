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
            </>
          ))}

          <Text>Catch Rate: {selectedPokemon?.stats.catchRate}</Text>
        </View>
      )}
    </>
  );
}
