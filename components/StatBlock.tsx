import { Skeleton } from "@rneui/base";
import { View, Text } from "react-native";
import { Pokemon } from "../api/pokemon.api";

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
        className={`w-5 h-5 rounded-full flex justify-center items-center ${gradeColors[index]} text-xs uppercase font-bold`}
      >
        {gradeLetters[index]}
      </View>
    );
  };

  return selectedPokemon ? (
    <>
      <View className="flex-row justify-around items-center">
        <View className="flex-col mr-1">
          <Text className="font-bold my-1">HP:</Text>
          <Text className="font-bold my-1">Attack:</Text>
          <Text className="font-bold my-1">Defense:</Text>
          <Text className="font-bold my-1">Sp Attack:</Text>
          <Text className="font-bold my-1">Sp Defense:</Text>
          <Text className="font-bold my-1">Speed:</Text>
        </View>
        <View className="flex-col mr-1">
          <Text className="my-1">{selectedPokemon.stats.hp}</Text>
          <Text className="my-1">{selectedPokemon.stats.attack}</Text>
          <Text className="my-1">{selectedPokemon.stats.defense}</Text>
          <Text className="my-1">{selectedPokemon.stats.specialAttack}</Text>
          <Text className="my-1">{selectedPokemon.stats.specialDefense}</Text>
          <Text className="my-1">{selectedPokemon.stats.speed}</Text>
        </View>

        <View className="flex-col p-1">
          <Text className="my-1">{gradeStat(selectedPokemon.stats.hp)}</Text>
          <Text className="my-1">
            {gradeStat(selectedPokemon.stats.attack)}
          </Text>
          <Text className="my-1">
            {gradeStat(selectedPokemon.stats.defense)}
          </Text>
          <Text className="my-1">
            {gradeStat(selectedPokemon.stats.specialAttack)}
          </Text>
          <Text className="my-1">
            {gradeStat(selectedPokemon.stats.specialDefense)}
          </Text>
          <Text className="my-1">{gradeStat(selectedPokemon.stats.speed)}</Text>
        </View>
      </View>
    </>
  ) : (
    <Skeleton animation="pulse" width={100} height={100} />
  );
}
