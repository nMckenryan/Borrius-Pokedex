import { Icon } from "@rneui/base";
import { View, Text } from "react-native";
import { Pokemon } from "../../api/get-borrius-api";
import SpriteAvatar from "../UI/SpriteAvatar";

function EvolutionStage({ stageDetails }: { stageDetails: any }) {
  return (
    <View className="flex-row items-center justify-center">
      {/* ARROW */}
      {stageDetails.trigger.name != "Base" && (
        <Icon name="arrow-right" color="black" />
      )}
      {/* EVO BLOCK */}
      <View className="flex-col items-center justify-center">
        <View className="flex-col  items-center justify-center">
          {/* <SpriteAvatar size={"large"} spriteUrl={stageDetails.} /> */}
          <Text className="text-md capitalize">
            {stageDetails.trigger.name}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-sm capitalize">
              {stageDetails.trigger.name}
            </Text>
            {stageDetails.trigger.name == "level-up" &&
              stageDetails.min_level != 0 && (
                <Text className="text-sm">
                  {" "}
                  {stageDetails.min_level.toString()}
                </Text>
              )}
          </View>
        </View>
      </View>
    </View>
  );
}

export function EvolutionBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  const evos = selectedPokemon.evolutions;

  return (
    <View className="flex-col items-center justify-center">
      <Text className="text-md font-bold mb-2">Evolutions</Text>
      {evos.evolutionChain.map((stageDetails, index) => (
        <EvolutionStage
          key={`${selectedPokemon.name}-${index}`}
          stageDetails={stageDetails}
        />
      ))}
    </View>
  );
}
