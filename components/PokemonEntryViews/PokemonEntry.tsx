import { Card, Skeleton, Text } from "@rneui/themed";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StatBlock } from "./StatBlock";
import LocationsBlock from "./LocationsBlock";
import { Pokemon } from "../../api/get-borrius-api";
import MovesBlock from "./MovesBlock";
import { BasicInfoBlock } from "./BasicInfoBlock";
import { EvolutionBlock } from "./EvolutionBlock";

export function PokemonEntry({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <Card containerStyle={{ borderRadius: 10 }}>
      {/* MOBILE */}
      {window.innerWidth < 768 ? (
        <>
          {selectedPokemon ? (
            <>
              {selectedPokemon.stats && (
                <Text style={{ position: "absolute", top: 0, left: 0 }}>
                  #{selectedPokemon.id}
                </Text>
              )}

              <View className="flex-col justify-between items-center">
                <View className="flex-row">
                  {selectedPokemon ? (
                    <BasicInfoBlock selectedPokemon={selectedPokemon} />
                  ) : (
                    <Skeleton
                      circle
                      animation="pulse"
                      width={100}
                      height={100}
                    />
                  )}

                  {selectedPokemon.stats ? (
                    <StatBlock selectedPokemon={selectedPokemon} />
                  ) : (
                    <Skeleton animation="pulse" width={200} height={100} />
                  )}
                </View>
              </View>

              <View className="flex-col justify-between items-center">
                <View className="flex-row">
                  {selectedPokemon.locations.length > 0 ? (
                    <LocationsBlock selectedPokemon={selectedPokemon} />
                  ) : (
                    <Skeleton animation="pulse" width={200} height={100} />
                  )}
                  {selectedPokemon.moves.length > 0 ? (
                    <MovesBlock selectedPokemon={selectedPokemon} />
                  ) : (
                    <Skeleton animation="pulse" width={200} height={100} />
                  )}
                </View>
              </View>
            </>
          ) : (
            <View className="flex-row items-center">
              <ActivityIndicator size="large" color="red" />
            </View>
          )}
        </>
      ) : (
        // DESKTOP
        <>
          {selectedPokemon ? (
            <>
              {selectedPokemon && (
                <Text style={{ position: "absolute", top: 0, left: 0 }}>
                  #{selectedPokemon.id}
                </Text>
              )}

              <View className="flex-row justify-evenly">
                {selectedPokemon.stats ? (
                  <BasicInfoBlock selectedPokemon={selectedPokemon} />
                ) : (
                  <Skeleton circle animation="pulse" width={100} height={100} />
                )}

                {selectedPokemon.stats ? (
                  <StatBlock selectedPokemon={selectedPokemon} />
                ) : (
                  <Skeleton animation="pulse" width={200} height={100} />
                )}

                {/* {!selectedPokemon.evolutions ? (
                  <EvolutionBlock selectedPokemon={selectedPokemon} />
                ) : (
                  <Skeleton animation="pulse" width={200} height={100} />
                )} */}
              </View>
              <View className="flex-row justify-evenly">
                {selectedPokemon.locations.length > 0 ? (
                  <LocationsBlock selectedPokemon={selectedPokemon} />
                ) : (
                  <Skeleton animation="pulse" width={200} height={100} />
                )}
                {selectedPokemon.moves.length > 0 ? (
                  <MovesBlock selectedPokemon={selectedPokemon} />
                ) : (
                  <Skeleton animation="pulse" width={200} height={100} />
                )}
              </View>
            </>
          ) : (
            <View className="flex-row items-center">
              <ActivityIndicator size="large" color="red" />
            </View>
          )}
        </>
      )}
    </Card>
  );
}
