import { Icon } from "@rneui/base";
import { View, Text } from "react-native";

import SpriteAvatar from "../UI/SpriteAvatar";
import { Evolutions, Pokemon } from "../../api/borrius-types";

function EvolutionStage({ stageDetails }: { stageDetails: Evolutions }) {
  return (
    <View className="flex-row items-center justify-center">
      {/* ARROW */}
      {stageDetails.stage != 1 && <Icon name="arrow-right" color="black" />}
      {/* EVO BLOCK */}
      <View className="flex-col items-center justify-center">
        <View className="flex-col  items-center justify-center">
          <SpriteAvatar
            size={"large"}
            spriteUrl={stageDetails.stage_sprite.game_sprite}
          />
          <Text className="text-md capitalize">{stageDetails.name}</Text>
          <View className="flex-row items-center">
            <Text className="text-sm capitalize">{stageDetails.trigger}</Text>
            {stageDetails.trigger == "level-up" &&
              stageDetails.triggerItem != null && (
                <Text className="text-sm">{stageDetails.triggerItem}</Text>
              )}
          </View>
        </View>
      </View>
    </View>
  );
}

export function EvolutionBlock({ evolutions }: { evolutions: Evolutions }) {
  return (
    <View className="flex-col items-center justify-center">
      <Text className="text-md font-bold mb-2">Evolutions</Text>
      <View className="flex row">
        {evolutions.map((item, index) => {
          return <EvolutionStage stageDetails={item} key={index} />;
        })}
      </View>
    </View>
  );
}
