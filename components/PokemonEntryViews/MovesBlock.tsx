import { View, Text } from "react-native";
import React from "react";
import { Pokemon } from "../../api/get-borrius-api";
import TypeIcon from "../UI/TypeIcon";

export default function MovesBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <View className="flex-col items-center">
      <Text>{selectedPokemon.abilities.join(", ")}</Text>
      <>
        {selectedPokemon.moves.length > 0 && (
          <>
            <Text>Moves:</Text>
            <text>{selectedPokemon.moves[0].accuracy}</text>
            <View className="flex-col">
              <>
                {selectedPokemon.moves.map((m) => {
                  <View className="flex-row">
                    <Text>{m.name}</Text>
                    <Text>{m.accuracy}</Text>
                    <Text>{m.category}</Text>
                    <Text>{m.power}</Text>
                    <TypeIcon typeList={[m.type]} />
                    <Text>
                      {m.learn_method} + {m.level_learned}
                    </Text>
                  </View>;
                })}
              </>
            </View>
          </>
        )}
      </>
    </View>
  );
}
