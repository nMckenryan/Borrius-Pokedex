import { Skeleton } from "@rneui/base";
import { View, Text } from "react-native";
import { Pokemon } from "../../api/get-borrius-api";

export function StatBlock({ selectedPokemon }: { selectedPokemon: Pokemon }) {
  const gradeStat = (stat: number) => {
    const gradeColors = [
      "bg-red-500",
      "bg-red-300",
      "bg-orange-400",
      "bg-orange-500",
      "bg-yellow-400",
      "bg-yellow-500",
      "bg-green-400  text-white",
      "bg-green-500  text-white",
      "bg-blue-400  text-white",
      "bg-blue-500  text-white",
      "bg-indigo-400  text-white",
      "bg-indigo-500 text-white",
      "bg-violet-500 text-white",
      "bg-violet-600  text-white",
      "bg-violet-700  text-white",
      "bg-violet-800  text-white",
    ] as const;

    const gradeLetters = [
      "F ",
      "D-",
      "D",
      "D+",
      "C-",
      "C ",
      "C+",
      "B-",
      "B",
      "B+",
      "A-",
      "A ",
      "A+",
      "S-",
      "S",
      "S+",
    ] as const;

    const index = Math.min(Math.floor(stat / 10), gradeColors.length - 1);

    return (
      <View
        className={`w-5 h-5 rounded-full flex justify-center items-center ${gradeColors[index]} my-1`}
      >
        <Text className="text-xs uppercase font-bold">
          {gradeLetters[index]}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-row justify-around items-center">
      <View className="flex-col mr-1">
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24">
            HP: {JSON.stringify(selectedPokemon.stats.attack)}
          </Text>
          {gradeStat(selectedPokemon.stats.hp)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24">
            Attack: {JSON.stringify(selectedPokemon.stats.attack)}
          </Text>
          {gradeStat(selectedPokemon.stats.attack)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24">
            Defense: {JSON.stringify(selectedPokemon.stats.defense)}
          </Text>
          {gradeStat(selectedPokemon.stats.defense)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24">
            Sp. Atk: {JSON.stringify(selectedPokemon.stats.specialAttack)}
          </Text>
          {gradeStat(selectedPokemon.stats.specialAttack)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24">
            Sp. Def: {JSON.stringify(selectedPokemon.stats.specialDefense)}
          </Text>
          {gradeStat(selectedPokemon.stats.specialDefense)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24">
            Speed: {JSON.stringify(selectedPokemon.stats.speed)}
          </Text>
          {gradeStat(selectedPokemon.stats.speed)}
        </View>
      </View>
    </View>
  );
}
