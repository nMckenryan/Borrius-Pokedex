import { Skeleton } from "@rneui/base";
import { View, Text } from "react-native";
import { Pokemon } from "../api/pokemon.api";

export function StatBlock({ selectedPokemon }: { selectedPokemon: Pokemon }) {
  const gradeStat = (stat: number) => {
    const gradeColors = [
      "bg-red-500",
      "bg-red-300",
      "bg-orange-300",
      "bg-orange-400",
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
      "F",
      "D-",
      "D",
      "D+",
      "C-",
      "C",
      "C+",
      "B-",
      "B",
      "B+",
      "A-",
      "A",
      "A+",
      "S-",
      "S",
      "S+",
    ] as const;

    const index = Math.min(Math.floor(stat / 10), gradeColors.length - 1);

    return (
      <Text
        className={`mr-1 text-xs uppercase font-bold ${gradeColors[index]}  px-2 py-1 rounded-full`}
      >
        {gradeLetters[index]}
      </Text>
    );
  };

  return selectedPokemon ? (
    <View className="flex-col">
      <Text className="font-bold">Base Stats</Text>

      <View className="flex-col">
        <View className="flex-row justify-between my-1">
          <Text className="font-bold">HP:</Text>
          <Text>{selectedPokemon.stats.hp}</Text>
          <Text>{gradeStat(selectedPokemon.stats.hp)}</Text>
        </View>
        <View className="flex-row justify-between my-1">
          <Text className="font-bold">Attack:</Text>
          <Text>{selectedPokemon.stats.attack}</Text>
          <Text>{gradeStat(selectedPokemon.stats.attack)}</Text>
        </View>
        <View className="flex-row justify-between my-1">
          <Text className="font-bold">Defense:</Text>
          <Text>{selectedPokemon.stats.defense}</Text>
          <Text>{gradeStat(selectedPokemon.stats.defense)}</Text>
        </View>
        <View className="flex-row justify-between my-1">
          <Text className="font-bold">Sp Attack:</Text>
          <Text>{selectedPokemon.stats.specialAttack}</Text>
          <Text>{gradeStat(selectedPokemon.stats.specialAttack)}</Text>
        </View>
        <View className="flex-row justify-between my-1">
          <Text className="font-bold">Sp Defense:</Text>
          <Text>{selectedPokemon.stats.specialDefense}</Text>
          <Text>{gradeStat(selectedPokemon.stats.specialDefense)}</Text>
        </View>
        <View className="flex-row justify-between my-1">
          <Text className="font-bold">Speed:</Text>
          <Text>{selectedPokemon.stats.speed}</Text>
          <Text>{gradeStat(selectedPokemon.stats.speed)}</Text>
        </View>
      </View>
    </View>
  ) : (
    <Skeleton animation="pulse" width={100} height={100} />
  );
}
