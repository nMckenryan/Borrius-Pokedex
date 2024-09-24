import { Chip } from "@rneui/themed";
import "../../global.css";
import { View } from "react-native";

const colors = {
  normal: "rgb(159, 161, 159)",
  grass: "rgb(63, 161, 41)",
  fire: "rgb(230, 40, 41)",
  water: "rgb(41, 128, 239)",
  electric: "rgb(250, 192, 0)",
  ice: "rgb(61, 206, 243)",
  fighting: "rgb(255, 128, 0)",
  poison: "rgb(145, 65, 203)",
  ground: "rgb(145, 81, 33)",
  flying: "rgb(129, 185, 239)",
  psychic: "rgb(239, 65, 121)",
  bug: "rgb(145, 161, 25)",
  rock: "rgb(175, 169, 129)",
  ghost: "rgb(112, 65, 112)",
  steel: "rgb(96, 161, 184)",
  dragon: "rgb(80, 96, 225)",
  dark: "rgb(98, 77, 78)",
  fairy: "rgb(239, 112, 239)",
  pokeDexRed: "#DE1537",
  pokeDexBlack: "#fffff",
  pokeDexWhite: "#F5F5F5",
  pokeDexBlue: "##27A4F3",
  unboundPurple: "#641e8c",
};

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
  const color = colors[type.toLowerCase()] || "bg-gray-500";
  return (
    <Chip
      title={type}
      buttonStyle={{
        backgroundColor: color,
        padding: 1,
      }}
      titleStyle={{
        textTransform: "uppercase",
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
        textShadowColor: "rgb(0,0,0)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
      }}
    />
  );
}
