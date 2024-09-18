import { View, Text } from "react-native";
import React from "react";
import { Pokemon } from "../../api/get-borrius-api";

export default function MovesBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <View className="flex-col items-center">
      <Text>Moves:</Text>
    </View>
  );
}
