import { Icon } from "@rneui/base";
import { View, Text } from "react-native";
import { evoMethod, Pokemon } from "../../api/pokemon.api";
import SpriteAvatar from "../UI/SpriteAvatar";

function EvolutionStage({ evoStage }: { evoStage: evoMethod }) {
  const methodTrigger = evoStage.method.trigger;
  const methodLevel = evoStage.method.level;
  return (
    <>
      <View className="flex-col  items-center justify-center">
        <SpriteAvatar size={"large"} spriteUrl={evoStage.spriteUrl} />
        <Text className="text-md capitalize">{evoStage.name}</Text>
        <View className="flex-row items-center">
          <Text className="text-sm capitalize">{methodTrigger}</Text>
          {methodLevel && <Text className="text-sm"> {methodLevel}</Text>}
        </View>
      </View>
    </>
  );
}

export function EvolutionBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  const stageDetails = selectedPokemon.evolutionDetails;

  return (
    stageDetails.base.name &&
    stageDetails.stage1.name && (
      <>
        {/* Evolutions */}
        <View className="flex-col items-center">
          <Text className="text-md font-bold mb-2">Evolutions</Text>

          {/* BASE FORM */}
          <View className="flex-row items-center justify-center">
            <View className="flex-col items-center justify-center">
              <EvolutionStage evoStage={stageDetails.base} />
            </View>

            {/* EVOLUTION 1 */}
            {stageDetails.stage1.name && (
              <>
                <View className="flex-col items-center justify-center">
                  <Icon name="arrow-right" color="black" />
                </View>
                <EvolutionStage evoStage={stageDetails.stage1} />
              </>
            )}

            {/* EVOLUTION 2 */}
            {stageDetails.stage2.name && (
              <>
                <View className="flex-col items-center justify-center">
                  <Icon name="arrow-right" color="black" />
                </View>
                <EvolutionStage evoStage={stageDetails.stage2} />
              </>
            )}
          </View>
        </View>
      </>
    )
  );
}
