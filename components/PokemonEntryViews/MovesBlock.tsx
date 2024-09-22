import { View, Text, FlatList } from "react-native";
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
            <View className="flex-col h-[200px]">
              <FlatList
                data={selectedPokemon.moves}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item) => item.name + selectedPokemon.name}
                contentContainerClassName="h-50"
                ListHeaderComponent={
                  <View className="flex-row">
                    <Text className="font-bold">Move</Text>
                    <Text className="font-bold">Type</Text>
                    <Text className="font-bold">Accuracy</Text>
                    <Text className="font-bold">Category</Text>
                    <Text className="font-bold">Power</Text>
                    <Text className="font-bold">Learned via</Text>
                  </View>
                }
                renderItem={({ item }) => (
                  <View className="flex-row">
                    <Text className="px-1">{item.name}</Text>
                    <TypeIcon typeList={[item.type]} />
                    <Text className="px-1">{item.accuracy}</Text>
                    <Text className="px-1">{item.category}</Text>
                    <Text className="px-1">{item.power}</Text>

                    {item.learn_method == "level-up" ? (
                      <Text>Level {item.level_learned}</Text>
                    ) : (
                      <Text>TM/HM</Text>
                    )}
                  </View>
                )}
              />
            </View>
          </>
        )}
      </>
    </View>
  );
}
