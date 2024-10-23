import { Card, Skeleton, Text } from "@rneui/themed";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StatBlock } from "./StatBlock";
import LocationsBlock from "./LocationsBlock";
import { Pokemon } from "../../api/borrius-types";
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
            <View className="flex-col">
              {/* NUMBER */}
              {selectedPokemon.stats && (
                <Text style={{ position: "absolute", top: 0, left: 0 }}>
                  #{selectedPokemon.id}
                </Text>
              )}
              {/* COLUMN 1 - BasicInfo & Stats*/}
              <View className="flex-col justify-evenly items-center">
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
              {/* COLUMN 2 - Evo & location*/}
              <View className="flex-col items-center">
                <View className="flex-row">
                  {selectedPokemon.evolutions.length > 1 && (
                    <EvolutionBlock evolutions={selectedPokemon.evolutions} />
                  )}
                </View>
              </View>

              {/* COLUMN 2 - Evo & location*/}
              <View className="flex-col items-center">
                {selectedPokemon.locations.length > 0 && (
                  <LocationsBlock selectedPokemon={selectedPokemon} />
                )}
              </View>
              {/* COLUMN 3 - Moves*/}
              <View className="flex-col justify-between items-center">
                <View className="flex-row">
                  {selectedPokemon.moves.length > 0 ? (
                    <MovesBlock selectedPokemon={selectedPokemon} />
                  ) : (
                    <Skeleton animation="pulse" width={200} height={100} />
                  )}
                </View>
              </View>
            </View>
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

              <View className="flex-row justify-between">
                {selectedPokemon.stats ? (
                  <BasicInfoBlock selectedPokemon={selectedPokemon} />
                ) : (
                  <Skeleton animation="pulse" width={300} height={200} />
                )}

                {selectedPokemon.stats ? (
                  <StatBlock selectedPokemon={selectedPokemon} />
                ) : (
                  <Skeleton animation="pulse" width={300} height={200} />
                )}

                <View className="flex-col justify-around">
                  {selectedPokemon.evolutions.length > 1 && (
                    <EvolutionBlock evolutions={selectedPokemon.evolutions} />
                  )}
                  {selectedPokemon.locations.length > 0 && (
                    <LocationsBlock selectedPokemon={selectedPokemon} />
                  )}
                </View>
                <View className="flex-col">
                  {selectedPokemon.moves.length > 0 ? (
                    <MovesBlock selectedPokemon={selectedPokemon} />
                  ) : (
                    <Skeleton animation="pulse" width={250} height={200} />
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
      )}
    </Card>
  );
}
