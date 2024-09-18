import { Icon } from "@rneui/base";
import { View, Text } from "react-native";
import { EvoMethod, Pokemon } from "../../api/pokemon.api";
import SpriteAvatar from "../UI/SpriteAvatar";

export function EvolutionBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  const stageDetails = selectedPokemon.evolutionDetails;

  return (
    stageDetails.length > 0 && (
      <View className="flex-col items-center justify-center">
        <Text className="text-md font-bold mb-2">Evolutions</Text>
        <View className="flex-row items-center justify-center">
          {stageDetails.map((sd) => {
            return (
              <>
                {/* ARROW */}
                {sd.method.trigger != "Base" && (
                  <Icon name="arrow-right" color="black" />
                )}
                {/* EVO BLOCK */}
                <View className="flex-col items-center justify-center">
                  <View className="flex-col  items-center justify-center">
                    <SpriteAvatar size={"large"} spriteUrl={sd.spriteUrl} />
                    <Text className="text-md capitalize">{sd.name}</Text>
                    <View className="flex-row items-center">
                      <Text className="text-sm capitalize">
                        {sd.method.trigger}
                      </Text>
                      {sd.method.level && (
                        <Text className="text-sm"> {sd.method.level}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </>
            );
          })}
        </View>
      </View>
    )
  );
}
