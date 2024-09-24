import { View, Text, FlatList } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import { Pokemon } from "../../api/borrius-types";
import TypeIcon, { MoveTypeIcon } from "../UI/TypeIcon";

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
        <View className="flex-col h-[125px] md:h-[250px] w-[350px]">
          {/* HEADER */}
          <View className="flex-row justify-between py-1 bg-slate-200">
            <Text className="font-bold text-xs md:text-sm text-center">
              Move
            </Text>
            <Text className="font-bold text-xs md:text-sm text-center">
              Type
            </Text>
            <Text className="font-bold text-xs md:text-sm text-center">
              Accuracy
            </Text>
            <Text className="font-bold text-xs md:text-sm text-center">
              Category
            </Text>
            <Text className="font-bold text-xs md:text-sm text-center">
              Power
            </Text>
            <Text className="font-bold text-xs md:text-sm text-center">
              Learned via
            </Text>
            <View></View>
          </View>
          <FlatList
            data={selectedPokemon.moves}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => item.name + index}
            contentContainerClassName="h-50"
            renderItem={({ item: move }) => (
              <View className="grid flex-nowrap grid-cols-[repeat(6,minmax(35px,1fr))]">
                <Text className="px-1 text-nowrap text-xs md:text-sm max-w-[100px] overflow-hidden text-ellipsis">
                  {move.name}
                </Text>

                <MoveTypeIcon type={move.type} />

                <Text className="px-1 text-xs md:text-sm">
                  {move.accuracy !== "-" ? `${move.accuracy}%` : "-"}
                </Text>

                <Image
                  source={{ uri: BASE_URI + move.category + ".png" }}
                  containerStyle={{ width: 30, height: 20, borderRadius: 25 }}
                />

                <Text className="px-1 text-xs md:text-sm">{move.power}</Text>

                {move.learn_method == "level-up" ? (
                  <Text className="px-1 text-xs md:text-sm">
                    Level {move.level_learned}
                  </Text>
                ) : (
                  <Text className="px-1 text-xs md:text-sm">TM/HM</Text>
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
