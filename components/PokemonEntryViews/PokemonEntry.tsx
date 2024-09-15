import TypeIcon from "../UI/TypeIcon";
import { Card, Image, Skeleton } from "@rneui/themed";
import { getPokemonDetails, Pokemon } from "../../api/pokemon.api";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StatBlock } from "./StatBlock";
import { EvolutionBlock } from "./EvolutionBlock";
import LocationsBlock from "./LocationsBlock";
import MovesBlock from "./MovesBlock";

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

    if (selectedPokemon === null) {
      console.error("selectedPokemon is null" + selectedPokemon);
    }

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
                uri: selectedPokemon.sprite,
              }}
              PlaceholderContent={<Skeleton circle animation="pulse" />}
              containerStyle={{
                borderRadius: 15,
                backgroundColor: "lightgray",
              }}
            />
            <StatBlock selectedPokemon={selectedPokemon} />
            <EvolutionBlock selectedPokemon={selectedPokemon} />
            <LocationsBlock selectedPokemon={selectedPokemon} />
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
