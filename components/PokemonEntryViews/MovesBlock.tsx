import { View, Text, ScrollView } from "react-native";
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
      <View className="flex-row">
        <Text className="font-bold">Abilities: </Text>
        <Text>{selectedPokemon.abilities.join(", ")} </Text>
      </View>

      <>
        {selectedPokemon.moves.length > 0 && (
          <>
            <Text>Moves:</Text>
            <View className="flex-col">
              <ScrollView className="h-50">
                <View className="flex-row">
                  <Text>Move</Text>
                  <Text>Accuracy</Text>
                  <Text>Category</Text>
                  <Text>Power</Text>
                  <Text>Type</Text>
                  <Text>Method</Text>
                </View>

                {selectedPokemon.moves.map((m) => {
                  return (
                    <View className="flex-row">
                      <Text>{m.name}</Text>
                      <Text>{m.accuracy}</Text>
                      <Text>{m.category}</Text>
                      <Text>{m.power}</Text>
                      <TypeIcon typeList={[m.type]} />
                      <Text>
                        {m.learn_method} + {m.level_learned}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
      </>
    </View>
  );
}
