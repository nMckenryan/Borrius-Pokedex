import { Icon } from "@rneui/base";
import { View, Text } from "react-native";

import SpriteAvatar from "../UI/SpriteAvatar";
import { Evolutions, Pokemon } from "../../api/borrius-types";

function EvolutionStage({ stageDetails }: { stageDetails: Evolutions }) {
  let trigger: string;

  switch (stageDetails.trigger) {
    case "level-up":
      trigger = stageDetails.min_level
        ? `Level ${stageDetails.min_level}`
        : "Level Up";
      break;
    case "trade":
      trigger = "Link Stone";
      break;
    case "use-item":
      trigger = stageDetails.triggerItem.name.replace(/-/g, " ");
      break;
    case "gender":
      trigger = stageDetails.gender + " Level: " + stageDetails.min_level;
      break;
    case "min-happiness":
      trigger =
        "Happiness: " +
        stageDetails.min_happiness +
        " Level: " +
        stageDetails.min_level;
  }

  return (
    <View className="flex-row items-center justify-center">
      {/* ARROW */}
      {stageDetails.stage != 1 && <Icon name="arrow-right" color="black" />}
      {/* EVO BLOCK */}
      <View className="flex-col items-center justify-center">
        <SpriteAvatar
          size={"large"}
          spriteUrl={stageDetails.stage_sprite.game_sprite}
        />
        <Text className="text-md capitalize">{stageDetails.name}</Text>

        <View className="flex-row items-center">
          <Text className="text-sm capitalize">{trigger}</Text>
        </View>
      </View>
    </View>
  );
}

export function EvolutionBlock({ evolutions }: { evolutions: Evolutions }) {
  return (
    <View className="flex-col items-center justify-center">
      <Text className="text-md font-bold mb-2">Evolutions</Text>
      <View className="flex-row">
        {evolutions.map((item, index) => {
          return <EvolutionStage stageDetails={item} key={index} />;
        })}
      </View>
    </View>
  );
}
