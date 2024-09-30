import { Icon } from "@rneui/themed";
import { View, Text, FlatList, Pressable } from "react-native";

import SpriteAvatar from "../UI/SpriteAvatar";
import { Evolutions } from "../../api/borrius-types";
import { useContext } from "react";
import { PokedexContext } from "../Pokedex";

function Eeveelutions({ eevee }: { eevee: Evolutions[] }) {
  //places eevee in middle of array
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
  const context = useContext(PokedexContext);
  return (
    <Pressable
      onPress={() => {
        if (stageDetails != null) {
          context.selectNewPokemon(stageDetails.name);
        }
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
        <Eeveelutions eevee={evolutions} />
      ) : (
        <View className="flex-row flex-wrap space-between gap-1">
          {evolutions.map((evolution, index) => {
            return (
              <View
                key={evolution.name}
                className="flex-row items-center justify-center"
              >
                {index > 0 && (
                  <Icon name="arrow-right" type="feather" size={16} />
                )}
                <EvolutionStage stageDetails={evolution} />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
