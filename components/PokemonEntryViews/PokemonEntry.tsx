import TypeIcon from "../UI/TypeIcon";
import { Card, Image, Skeleton } from "@rneui/themed";
import React from "react";
import { View, Text } from "react-native";
import { StatBlock } from "./StatBlock";
import { EvolutionBlock } from "./EvolutionBlock";
import LocationsBlock from "./LocationsBlock";
import { Pokemon } from "../../api/get-borrius-api";

export function PokemonEntry({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  return (
    <Card containerStyle={{ borderRadius: 10 }}>
      <View className="flex-row justify-between items-center">
        {selectedPokemon ? (
          <>
            <Text className="text-lg font-bold">{`#${selectedPokemon.id}`}</Text>
            <Text className="text-lg  font-bold capitalize">
              {selectedPokemon.name}
            </Text>
            <TypeIcon typeList={selectedPokemon.typeList} />
          </>
        ) : (
          <>
            <Skeleton animation="pulse" width="100%" height={20} />
          </>
        )}
      </View>

      <Card.Divider />

      <View className="flex-row justify-between items-center">
        {/* MAIN SPRITE */}
        {selectedPokemon ? (
          <>
            <Image
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
              }}
              source={{
                uri: selectedPokemon.sprites.game_sprite,
              }}
              PlaceholderContent={<Skeleton circle animation="pulse" />}
              containerStyle={{
                borderRadius: 15,
                backgroundColor: "lightgray",
              }}
            />
            <StatBlock selectedPokemon={selectedPokemon} />

            {/*{selectedPokemon.evolutionDetails.length > 1 && (
              <EvolutionBlock selectedPokemon={selectedPokemon} />
            )}
             <LocationsBlock selectedPokemon={selectedPokemon} />
             <MovesBlock selectedPokemon={selectedPokemon} /> */}
          </>
        ) : (
          <>
            <Skeleton circle width={100} height={100} />
            <Skeleton
              width={"87.5%"}
              height={100}
              style={{ marginHorizontal: 10 }}
            />
          </>
        )}
      </View>
    </Card>
  );
}
