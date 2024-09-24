import { Icon } from "@rneui/themed";
import { View, Text, FlatList } from "react-native";

import SpriteAvatar from "../UI/SpriteAvatar";
import { Evolutions } from "../../api/borrius-types";

function Eeveelutions({ eevee }: { eevee: Evolutions[] }) {
  return (
    <FlatList
      data={eevee}
      numColumns={3}
      renderItem={({ item }) => {
        return <EvolutionStage stageDetails={item} />;
      }}
    />
  );
}
function EvolutionStage({ stageDetails }: { stageDetails: Evolutions }) {
  return (
    <View className="flex-col items-center justify-center">
      <SpriteAvatar
        size={"large"}
        spriteUrl={stageDetails.stage_sprite?.game_sprite || null}
      />
      <View className="flex-col items-center">
        <Text className="text-xs md:text-small capitalize ">
          {stageDetails.name}
        </Text>

        <Text className="text-xs md:text-small capitalize">
          {stageDetails.triggerItem}
        </Text>
      </View>
    </View>
  );
}

export function EvolutionBlock({ evolutions }: { evolutions: Evolutions[] }) {
  return (
    <View className="flex-col items-center justify-center m-1">
      {evolutions.length === 9 ? (
        <View className="flex-row flex-wrap space-between gap-1">
          <Eeveelutions eevee={evolutions} />
        </View>
      ) : (
        <View className="flex-row flex-wrap space-between gap-1">
          <View className="flex-row items-center justify-center">
            <EvolutionStage stageDetails={evolutions[0]} />
          </View>
          <View className="flex-row items-center justify-center">
            <Icon name="arrow-right" type="feather" size={16} />
            <EvolutionStage stageDetails={evolutions[1]} />
          </View>

          {evolutions.length == 3 && (
            <View className="flex-row items-center justify-center">
              <Icon name="arrow-right" type="feather" size={16} />
              <EvolutionStage stageDetails={evolutions[2]} />
            </View>
          )}

          {evolutions.length > 3 && (
            <>
              <View className="flex-col items-center justify-center">
                <Icon
                  name="arrow-up-right"
                  type="feather"
                  size={16}
                  className="mb-2"
                />
                <Icon
                  name="arrow-down-right"
                  type="feather"
                  size={16}
                  className="mt-2"
                />
              </View>
              <View className="flex-col items-center justify-center">
                <EvolutionStage stageDetails={evolutions[2]} />
                <EvolutionStage stageDetails={evolutions[3]} />
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
}
