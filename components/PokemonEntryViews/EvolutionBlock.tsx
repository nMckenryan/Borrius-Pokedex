import { Icon } from "@rneui/base";
import { View, Text } from "react-native";
import { evoMethod, Pokemon } from "../../api/pokemon.api";
import SpriteAvatar from "../UI/SpriteAvatar";

function EvolutionStage({ evoStage }: { evoStage: evoMethod }) {
  const methodTrigger = evoStage.method.trigger;
  const methodLevel = evoStage.method.level;
  return (
    <>
      <View className="flex-col items-center justify-center">
        <Icon name="arrow-right" color="black" />
      </View>
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
  let stages = 1;
  selectedPokemon.evolutionDetails.stage1 && stages++;
  selectedPokemon.evolutionDetails.stage2 && stages++;

  return (
    stages >= 2 && (
      <>
        {/* Evolutions */}
        <View className="flex-col items-center">
          <Text className="text-md font-bold mb-2">Evolutions</Text>

          {/* BASE FORM */}
          <View className="flex-row items-center justify-center">
            <View className="flex-col  items-center justify-center">
              <SpriteAvatar
                size={"large"}
                spriteUrl={selectedPokemon.evolutionDetails.base.spriteUrl}
              />

              <Text className="text-md capitalize">
                {selectedPokemon.evolutionDetails.base.name}
              </Text>
              <Text className="text-sm capitalize">Base</Text>
            </View>

            {/* EVOLUTION 1 */}
            {selectedPokemon.evolutionDetails.stage1.name && (
              <EvolutionStage
                evoStage={selectedPokemon.evolutionDetails.stage1}
              />
            )}

            {/* EVOLUTION 2 */}
            {stages == 3 && (
              <EvolutionStage
                evoStage={selectedPokemon.evolutionDetails.stage2}
              />
            )}
          </View>
        </View>
      </>
    )
  );
}
