import { View, Text, FlatList } from "react-native";
import React from "react";
import { Pokemon } from "../../api/borrius-types";

export default function LocationsBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  function getCatchRateDifficulty(catchRate: number) {
    if (catchRate <= 5) return "Extremely Hard";
    if (catchRate <= 50) return "Very Hard";
    if (catchRate <= 100) return "Hard";
    if (catchRate <= 150) return "Medium";
    if (catchRate <= 200) return "Easy";
    return "Very Easy";
  }

  return (
    <View className="flex-col">
      {selectedPokemon.capture_rate && (
        <View className="flex-col">
          <Text className="font-bold">
            Catch Rate: {selectedPokemon.capture_rate}
          </Text>
          <Text>({getCatchRateDifficulty(selectedPokemon.capture_rate)})</Text>
        </View>
      )}
      <br />
      <Text className="text-md font-bold">Locations</Text>

      <FlatList
        data={selectedPokemon.locations}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item) => item.location}
        contentContainerClassName="h-50"
        renderItem={({ item, index }) => (
          <View className="flex-row justify-between" key={index}>
            <Text>
              {item.location}
              {item.encounterMethod != "Grass/Cave" &&
                " - " + item.encounterMethod}
            </Text>
            <Text>
              {item.isSpecialEncounter ? " (Special encounter)" : ""}
              {item.timeOfDay != "All Day" && item.timeOfDay}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
