import TypeIcon from "./TypeIcon";
import { Avatar, Card, Image, Skeleton } from "@rneui/themed";
import { getPokemonDetails, Pokemon } from "../api/pokemon.api";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { StatBlock } from "./StatBlock";
import { EvolutionBlock } from "./EvolutionBlock";

export function PokemonEntry({ pokemonName }: { pokemonName: string }) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const get = await getPokemonDetails(pokemonName);

        setSelectedPokemon(get);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pokemonName]);

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
            <Skeleton animation="pulse" width={100} height={20} />
            <Skeleton animation="pulse" width={100} height={20} />
            <Skeleton animation="pulse" width={100} height={20} />
          </>
        )}
      </View>

      <Card.Divider />

      <View className="flex-row justify-between items-center">
        {/* MAIN SPRITE */}
        {selectedPokemon ? (
          <Image
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
            }}
            source={{
              uri: selectedPokemon.sprite,
            }}
            PlaceholderContent={<Skeleton animation="pulse" />}
            containerStyle={{
              borderRadius: 15,
              backgroundColor: "lightgray",
            }}
          />
        ) : (
          <Skeleton width={100} height={100} />
        )}
        {/* STATS */}
        <StatBlock selectedPokemon={selectedPokemon} />
        <EvolutionBlock selectedPokemon={selectedPokemon} />
      </View>
      <Card.Divider />
      <View className="flex-col items-center">
        <Text>Locations</Text>
        <Text>Catch Rate: {selectedPokemon?.stats.catchRate}</Text>
      </View>
    </Card>
  );
}
