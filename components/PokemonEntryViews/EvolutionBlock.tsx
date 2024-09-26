import { Icon } from "@rneui/themed";
import { View, Text, FlatList, Pressable } from "react-native";

import SpriteAvatar from "../UI/SpriteAvatar";
import { Evolutions } from "../../api/borrius-types";

function Eeveelutions({ eevee }: { eevee: Evolutions[] }) {
  //places eveee in middle of array
  const newEevee = [...eevee];
  const firstElement = eevee[0];
  const middleIndex = Math.floor(newEevee.length / 2);
  newEevee.splice(0, 1);
  newEevee.splice(middleIndex, 0, firstElement);

  return (
    <FlatList
      data={newEevee}
      numColumns={3}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item }) => {
        return <EvolutionStage stageDetails={item} />;
      }}
    />
  );
}
function EvolutionStage({ stageDetails }: { stageDetails: Evolutions }) {
  return (
    <Pressable
      onPress={() => {
        console.log(stageDetails);
      }}
    >
      <View className="flex-col items-center justify-center">
        <SpriteAvatar
          size={"large"}
          spriteUrl={stageDetails.stage_sprite?.game_sprite || null}
        />
        <View className="flex-col items-center">
          <Text className="text-xs md:text-sm capitalize text-wrap">
            {stageDetails.name}
          </Text>

          <Text className="text-xs md:text-small capitalize">
            {stageDetails.triggerItem}
          </Text>
        </View>
      </View>
    </Pressable>
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
