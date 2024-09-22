import { View, Text, FlatList } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import { Pokemon } from "../../api/get-borrius-api";
import TypeIcon from "../UI/TypeIcon";

const BASE_URI = "../../assets/";

export default function MovesBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <View
      className="flex-col items-center border-slate-200 rounded"
      style={{ borderWidth: 1 }}
    >
      {selectedPokemon.moves.length > 0 && (
        <View className="flex-col h-[250px]">
          {/* HEADER */}
          <View className="flex-row justify-between py-1 bg-slate-200">
            <Text className="font-bold text-center">Move</Text>
            <Text className="font-bold text-center">Type</Text>
            <Text className="font-bold text-center">Accuracy</Text>
            <Text className="font-bold text-center">Category</Text>
            <Text className="font-bold text-center">Power</Text>
            <Text className="font-bold text-center">Learned via</Text>
            <View></View>
          </View>
          <FlatList
            data={selectedPokemon.moves}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item) => item.name + selectedPokemon.name}
            contentContainerClassName="h-50"
            renderItem={({ item }) => (
              <View className="grid grid-cols-[repeat(6,minmax(20px,1fr))]">
                <View>
                  <Text className="px-1 text-sm">{item.name}</Text>
                </View>
                <View>
                  <TypeIcon typeList={[item.type]} />
                </View>
                <View>
                  <Text className="px-1 text-sm">{item.accuracy}</Text>
                </View>
                <View>
                  <Image
                    source={{ uri: BASE_URI + item.category + ".png" }}
                    containerStyle={{ width: 30, height: 20, borderRadius: 25 }}
                  />
                </View>
                <View>
                  <Text className="px-1 text-sm">{item.power}</Text>
                </View>

                {item.learn_method == "level-up" ? (
                  <View>
                    <Text className="px-1 text-sm">
                      Level {item.level_learned}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text className="px-1 text-sm">TM/HM</Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
