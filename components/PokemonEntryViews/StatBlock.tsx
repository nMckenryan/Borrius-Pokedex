import { View, Text } from "react-native";
import { Pokemon } from "../../api/borrius-types";

export const gradeColors = [
  "bg-red-500", //F
  "bg-gray-400", //D-
  "bg-gray-500", //D
  "bg-gray-600", //D+
  "bg-green-400", // C-
  "bg-green-500", // C
  "bg-green-600", // C+
  "bg-blue-400", //B-
  "bg-blue-500", //B
  "bg-blue-600", //B+
  "bg-purple-400", //A-
  "bg-purple-500", //A
  "bg-purple-600", //A+
  "bg-orange-300", //S-
  "bg-orange-400", //S
  "bg-orange-500", //S+
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

const gradeStat = (stat: number) => {
  let index: number = 0;

  if (stat < 40) {
    index = 0;
  } else if (stat < 50) {
    index = 1;
  } else if (stat < 55) {
    index = 2;
  } else if (stat < 60) {
    index = 3;
  } else if (stat < 65) {
    index = 4;
  } else if (stat < 70) {
    index = 5;
  } else if (stat < 75) {
    index = 6;
  } else if (stat < 80) {
    index = 7;
  } else if (stat < 85) {
    index = 8;
  } else if (stat < 90) {
    index = 9;
  } else if (stat < 95) {
    index = 10;
  } else if (stat < 100) {
    index = 11;
  } else if (stat < 105) {
    index = 12;
  } else if (stat < 110) {
    index = 13;
  } else if (stat < 130) {
    index = 14;
  } else if (stat < 140) {
    index = 15;
  } else {
    index = 16;
  }

  return (
    <View
      className={`w-5 h-5 rounded-full flex justify-center items-center ${gradeColors[index]} my-1`}
    >
      <Text className="text-xs uppercase font-bold text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
        {gradeLetters[index]}
      </Text>
    </View>
  );
};

// For testing purposes
// function testDisplayRanks() {
//   const statsToDisplay = [
//     1, 49, 54, 59, 64, 69, 74, 79, 84, 89, 94, 99, 104, 109, 114, 130, 141,
//   ];
//   return (
//     <View className="flex-row">
//       {statsToDisplay.map((number) => (
//         <>{gradeStat(number)}</>
//       ))}
//     </View>
//   );
// }

export function StatBlock({ selectedPokemon }: { selectedPokemon: Pokemon }) {
  return (
    <View className="flex-row justify-around items-center mx-1">
      <View className="flex-col mr-1">
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24 text-xs md:text-small">
            HP: {JSON.stringify(selectedPokemon.stats.hp)}
          </Text>
          {gradeStat(selectedPokemon.stats.hp)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24 text-xs md:text-small">
            Attack: {JSON.stringify(selectedPokemon.stats.attack)}
          </Text>
          {gradeStat(selectedPokemon.stats.attack)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24 text-xs md:text-small">
            Defense: {JSON.stringify(selectedPokemon.stats.defense)}
          </Text>
          {gradeStat(selectedPokemon.stats.defense)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24 text-xs md:text-small">
            Sp. Atk: {JSON.stringify(selectedPokemon.stats.specialAttack)}
          </Text>
          {gradeStat(selectedPokemon.stats.specialAttack)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24 text-xs md:text-small">
            Sp. Def: {JSON.stringify(selectedPokemon.stats.specialDefense)}
          </Text>
          {gradeStat(selectedPokemon.stats.specialDefense)}
        </View>
        <View className="flex-row my-1">
          <Text className="font-bold my-1 w-24 text-xs md:text-small">
            Speed: {JSON.stringify(selectedPokemon.stats.speed)}
          </Text>
          {gradeStat(selectedPokemon.stats.speed)}
        </View>
      </View>
    </View>
  );
}
