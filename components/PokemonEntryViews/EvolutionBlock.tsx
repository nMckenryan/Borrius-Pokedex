import { Icon } from "@rneui/base";
import { View, Text } from "react-native";
import { Pokemon } from "../../api/pokemon.api";
import SpriteAvatar from "../UI/SpriteAvatar";

export function EvolutionBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <View className="flex-col items-center justify-center">
      <Text className="text-md font-bold mb-2">Evolutions</Text>
      <View className="flex-row items-center justify-center">
        {selectedPokemon.evolutionDetails.map((stageDetails, index) => {
          return (
            <View key={index} className="flex-row items-center justify-center">
              {/* ARROW */}
              {stageDetails.method.trigger != "Base" && (
                <Icon name="arrow-right" color="black" />
              )}
              {/* EVO BLOCK */}
              <View className="flex-col items-center justify-center">
                <View className="flex-col  items-center justify-center">
                  <SpriteAvatar
                    size={"large"}
                    spriteUrl={stageDetails.spriteUrl}
                  />
                  <Text className="text-md capitalize">
                    {stageDetails.name}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-sm capitalize">
                      {stageDetails.method.trigger}
                    </Text>
                    {stageDetails.method.level && (
                      <Text className="text-sm">
                        {" "}
                        {stageDetails.method.level}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
