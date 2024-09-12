import "../global.css";
import { Text, View } from "react-native";
import { typeColors } from "../api/pokemon.api";

export default function TypeIcon({
  typeList,
}: {
  typeList: string | string[];
}) {
  if (Array.isArray(typeList)) {
    return (
      <View className="flex-row">
        {typeList.map((typeItem) => (
          <TypeIconButton key={typeItem} type={typeItem} />
        ))}
      </View>
    );
  } else {
    return <TypeIconButton type={typeList} />;
  }
}

function TypeIconButton({ type }: { type: string }) {
  const colors = {
    normal: "bg-normal",
    fire: "bg-fire",
    water: "bg-water",
    electric: "bg-electric",
    grass: "bg-grass",
    ice: "bg-ice",
    fighting: "bg-fighting",
    poison: "bg-poison",
    ground: "bg-ground",
    flying: "bg-flying",
    psychic: "bg-psychic",
    bug: "bg-bug",
    rock: "bg-rock",
    ghost: "bg-ghost",
    dragon: "bg-dragon",
    dark: "bg-dark",
    steel: "bg-steel",
    fairy: "bg-fairy",
  };

  const color = colors[type.toLowerCase()] || "bg-gray-500";

  return (
    <Text
      className={`mr-1 text-xs uppercase ${color} text-white px-2 py-1 rounded-full font-bold`}
    >
      {type}
    </Text>
  );
}
