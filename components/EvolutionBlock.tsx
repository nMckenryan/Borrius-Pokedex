import { Avatar, Card, Icon, Skeleton } from "@rneui/base";
import { View, Text } from "react-native";
import { EvolutionDetails, evoMethod, Pokemon } from "../api/pokemon.api";

function EvolutionMethod({ evoMethod }: { evoMethod: evoMethod }) {
  const methodTrigger = evoMethod.method.trigger;
  const methodLevel = evoMethod.method.level;

  return (
    <View className="flex-row items-center">
      <Text className="text-sm capitalize">{methodTrigger}</Text>
      {methodLevel && <Text className="text-sm"> {methodLevel}</Text>}
    </View>
  );
}

export function EvolutionBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    selectedPokemon &&
    selectedPokemon.evolutionDetails.stage1.name && (
      <>
        {/* Evolutions */}
        <View className="flex-col items-center">
          <Text>Evolutions</Text>

          {/* BASE FORM */}
          <View className="flex-row justify-center content-center">
            <View className="flex-col">
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: selectedPokemon.evolutionDetails.base.spriteUrl,
                }}
                containerStyle={{ backgroundColor: "lightgray" }}
              />
              <Text className="text-md capitalize">
                {selectedPokemon.evolutionDetails.base.name}
              </Text>
              <Text>Base</Text>
            </View>

            {/* EVOLUTION 1 */}
            {selectedPokemon.evolutionDetails.stage1.name && (
              <>
                <View className="flex-col items-center justify-center">
                  <Icon name="arrow-right" color="black" />
                </View>
                <View className="flex-col">
                  <Avatar
                    size="medium"
                    rounded
                    source={{
                      uri: selectedPokemon.evolutionDetails.stage1.spriteUrl,
                    }}
                    containerStyle={{ backgroundColor: "lightgray" }}
                  />
                  <Text className="text-md capitalize">
                    {selectedPokemon.evolutionDetails.stage1.name}
                  </Text>
                  <EvolutionMethod
                    evoMethod={selectedPokemon.evolutionDetails.stage1}
                  />
                </View>
              </>
            )}

            {/* EVOLUTION 2 */}
            {selectedPokemon.evolutionDetails.stage2.name && (
              <>
                <View className="flex-col items-center justify-center">
                  <Icon name="arrow-right" color="black" />
                </View>
                <View className="flex-col items-center justify-center items-center">
                  <Avatar
                    size="medium"
                    rounded
                    source={{
                      uri: selectedPokemon.evolutionDetails.stage2.spriteUrl,
                    }}
                    containerStyle={{ backgroundColor: "lightgray" }}
                  />
                  <Text className="text-md capitalize">
                    {selectedPokemon.evolutionDetails.stage2.name}
                  </Text>
                  <EvolutionMethod
                    evoMethod={selectedPokemon.evolutionDetails.stage2}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </>
    )
  );
}
