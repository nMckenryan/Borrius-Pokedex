import { Avatar, Card, Icon, Skeleton } from "@rneui/base";
import { View, Text } from "react-native";
import { Pokemon } from "../api/pokemon.api";

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
          <View className="flex-row justify-between items-center">
            <View className="flex-col">
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: selectedPokemon.evolutionDetails.base.url,
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
                      uri: selectedPokemon.evolutionDetails.stage1.url,
                    }}
                    containerStyle={{ backgroundColor: "lightgray" }}
                  />
                  <Text className="text-md capitalize">
                    {selectedPokemon.evolutionDetails.stage1.name}
                  </Text>
                  <Text>Lvl 16</Text>
                </View>
              </>
            )}

            {/* EVOLUTION 2 */}
            {selectedPokemon.evolutionDetails.stage2.name && (
              <>
                <View className="flex-col items-center justify-center">
                  <Icon name="arrow-right" color="black" />
                </View>
                <View className="flex-col items-center justify-center">
                  <Avatar
                    size="medium"
                    rounded
                    source={{
                      uri: selectedPokemon.evolutionDetails.stage2.url,
                    }}
                    containerStyle={{ backgroundColor: "lightgray" }}
                  />
                  <Text className="text-md capitalize">
                    {selectedPokemon.evolutionDetails.stage2.name}
                  </Text>
                  <Text>Lvl 36</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </>
    )
  );
}
