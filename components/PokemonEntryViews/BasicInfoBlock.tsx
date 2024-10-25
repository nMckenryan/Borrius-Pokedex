import TypeIcon from "../UI/TypeIcon";
import { Image, Skeleton } from "@rneui/themed";
import React from "react";
import { View, Text } from "react-native";
import { Pokemon } from "../../api/borrius-types";

function getCatchRateColor(catchRate: number) {
  if (catchRate <= 5) return "bg-red-800";
  if (catchRate <= 50) return "bg-red-600";
  if (catchRate <= 100) return "bg-orange-800";
  if (catchRate <= 150) return "bg-orange-600";
  if (catchRate <= 200) return "bg-green-300";
  return "bg-green-600";
}

function getCatchRateDifficulty(catchRate: number) {
  if (catchRate <= 5) return "Difficult";
  if (catchRate <= 50) return "Hard";
  if (catchRate <= 100) return "Challenging";
  if (catchRate <= 150) return "Average";
  if (catchRate <= 200) return "Easy";
  return "Trivial";
}

export function BasicInfoBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <View className="flex-col  items-center justify-center w-[150px] mx-1">
      <Text className="text-base md:text-lg lg:text-2xl items-center font-bold capitalize">
        {selectedPokemon.name}
      </Text>
      {/* MAIN SPRITE */}
      <Image
        style={{
          resizeMode: "contain",
          width: 100,
          height: 100,
          maxWidth: 100,
          maxHeight: 100,
          alignSelf: "center",
        }}
        source={{
          uri: selectedPokemon.sprites.official,
        }}
        PlaceholderContent={<Skeleton circle animation="pulse" />}
        containerStyle={{
          borderRadius: 15,
          backgroundColor: "#e7e5e4",
          margin: 5,
        }}
      />
      <View className="flex-col items-center">
        <TypeIcon typeList={selectedPokemon.typeList} />
        <View className="flex-row">
          <Text className="font-bold text-xs md:text-small lg:text-base">
            Abilities:
          </Text>
          <Text className="flex-wrap px-1 text-xs md:text-small lg:text-base">
            {selectedPokemon.abilities.map((ability) => ability + "\n")}
          </Text>
        </View>
        {selectedPokemon.capture_rate && (
          <Text className="flex-row text-xs md:text-small lg:text-base">
            <b>Catch Rate:</b>{" "}
            <View
              className={`w-5 h-5 rounded-full font-bold text-small flex-row justify-center items-center ${getCatchRateColor(
                selectedPokemon.capture_rate
              )} my-1`}
            >
              {selectedPokemon.capture_rate}
            </View>{" "}
            {getCatchRateDifficulty(selectedPokemon.capture_rate)}
          </Text>
        )}
      </View>
    </View>
  );
}
