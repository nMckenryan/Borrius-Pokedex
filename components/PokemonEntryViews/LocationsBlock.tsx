import { View, Text, FlatList } from "react-native";
import React from "react";
import { Pokemon } from "../../api/borrius-types";

export default function LocationsBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <View
      id="locationsBlockView"
      className="flex-col mx-1  items-center justify-center max-w-sm"
    >
      <Text className="text-xs md:text-small font-bold">Locations</Text>

      <FlatList
        data={selectedPokemon.locations}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item) => item.location}
        contentContainerClassName="h-50"
        renderItem={({ item: locationData, index }) => (
          <View className="flex-row justify-between" key={index}>
            <Text className="text-xs md:text-small">
              {locationData.location}
              {locationData.encounterMethod != "Grass/Cave" &&
                " - " + locationData.encounterMethod}
            </Text>
            <Text className="text-xs md:text-small">
              {locationData.isSpecialEncounter ? " (Special encounter)" : ""}
              {locationData.timeOfDay != "All Day" && locationData.timeOfDay}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
