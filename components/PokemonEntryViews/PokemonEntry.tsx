import TypeIcon from "../UI/TypeIcon";
import { Card, Image, Skeleton } from "@rneui/themed";
import { getPokemonDetails, Pokemon } from "../../api/pokemon.api";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StatBlock } from "./StatBlock";
import { EvolutionBlock } from "./EvolutionBlock";
import LocationsBlock from "./LocationsBlock";
import MovesBlock from "./MovesBlock";
import { useQuery } from "@tanstack/react-query";

export function PokemonEntry({ pokemonName }: { pokemonName: string }) {
  const {
    isPending,
    error,
    data: selectedPokemon,
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: () =>
      fetch(
        "https://pokeapi.co/api/v2/pokemon-species/" + pokemonName + "/"
      ).then((res) => res.json()),
  });

  const { isPending: spriteIsPending, data: pokemonDetails } = useQuery({
    queryKey: ["pokemonSprite"],
    queryFn: () =>
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName + "/").then(
        (res) => res.json()
      ),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Card containerStyle={{ borderRadius: 10 }}>
      <View className="flex-row justify-between items-center">
        {isPending || selectedPokemon ? (
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
        {isPending || selectedPokemon ? (
          <>
            {spriteIsPending ? (
              <Skeleton circle width={100} height={100} />
            ) : (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: "center",
                }}
                source={{
                  uri: pokemonDetails.sprites.front_default,
                }}
                PlaceholderContent={<Skeleton circle animation="pulse" />}
                containerStyle={{
                  borderRadius: 15,
                  backgroundColor: "lightgray",
                }}
              />
            )}
            <StatBlock selectedPokemon={pokemonDetails} />
            {/* <EvolutionBlock selectedPokemon={selectedPokemon} /> */}
            <LocationsBlock selectedPokemon={pokemonDetails} />
            <MovesBlock selectedPokemon={selectedPokemon} />
          </>
        ) : (
          <>
            <Skeleton circle width={100} height={100} />
            <Skeleton width={"90%"} height={100} />
          </>
        )}
      </View>
    </Card>
  );
}
