import { View, Text } from "react-native";
import React from "react";
import { Pokemon } from "../../api/get-borrius-api";

export default function MovesBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  const moves = selectedPokemon.moves;

  const movesTable = () => {
    return <View></View>;
  };

  return (
    <View className="flex-col items-center">
      <Text>{selectedPokemon.abilities.join(", ")}</Text>
      <Text>Moves:</Text>
    </View>
  );
}
