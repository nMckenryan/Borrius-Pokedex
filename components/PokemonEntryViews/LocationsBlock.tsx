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
    <View className="flex-col mx-1">
      {selectedPokemon.capture_rate && (
        <View className="flex-col">
          <Text className="text-xs md:text-small">
            <b>Catch Rate:</b> {selectedPokemon.capture_rate}
          </Text>
          <Text className="text-xs md:text-small">
            ({getCatchRateDifficulty(selectedPokemon.capture_rate)})
          </Text>
        </View>
      )}
      <br />
      <Text className="text-xs md:text-small font-bold">Locations</Text>

      <FlatList
        data={selectedPokemon.locations}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item) => item.location}
        contentContainerClassName="h-50"
        renderItem={({ item, index }) => (
          <View className="flex-row justify-between" key={index}>
            <Text className="text-xs md:text-small">
              {item.location}
              {item.encounterMethod != "Grass/Cave" &&
                " - " + item.encounterMethod}
            </Text>
            <Text className="text-xs md:text-small">
              {item.isSpecialEncounter ? " (Special encounter)" : ""}
              {item.timeOfDay != "All Day" && item.timeOfDay}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
