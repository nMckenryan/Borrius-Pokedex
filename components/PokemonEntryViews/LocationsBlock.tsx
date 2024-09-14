import { View, Text } from "react-native";
import React from "react";
import { Pokemon } from "../../api/pokemon.api";

export default function LocationsBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <View className="flex-col items-center">
      <Text>Locations</Text>
      <Text>Catch Rate: {selectedPokemon?.stats.catchRate}</Text>
    </View>
  );
}
