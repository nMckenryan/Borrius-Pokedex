import TypeIcon from "./TypeIcon";
import { Avatar, Card, Text, Image } from "@rneui/themed";
import { getPokemonDetails, Pokemon } from "../api/pokemon.api";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Icon } from "@rneui/themed";

export function PokemonEntry({ pokemonName }: { pokemonName: string }) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({
    id: 0,
    name: "Unknown",
    sprite: "../assets/questionMark.png",
    typeList: ["Unknown"],
  });

  const gradeStat = (stat: number): string => {
    if (stat < 40) return "F";
    if (stat < 65) return "D";
    if (stat < 80) return "C";
    if (stat < 90) return "B";
    if (stat < 110) return "A";
    if (stat < 130) return "S";
    return "-";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const get = (await getPokemonDetails(pokemonName)).data;
        setSelectedPokemon({
          id: get.id,
          name: get.name,
          sprite: get.sprite.front_default,
          typeList: get.typeList,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pokemonName]);
  return (
    // <Card containerStyle={{ borderRadius: 10 }}>
    //   <Card.Title className="justify-between">
    //     <Text>{`#${selectedPokemon.number}`}</Text>
    //     <Text>{selectedPokemon.name}</Text>
    //     <TypeIcon typeList={selectedPokemon.typeList} />
    //   </Card.Title>
    //   <Avatar
    //     source={{
    //       uri: selectedPokemon.sprite,
    //     }}
    //   />
    //   <Text></Text>
    // </Card>

    <Card containerStyle={{ borderRadius: 10 }}>
      <View className="flex-row justify-between items-center">
        <Text>{`#${selectedPokemon.id}`}</Text>
        <Text>{selectedPokemon.name}</Text>
        <TypeIcon typeList={selectedPokemon.typeList} />
      </View>

      <Card.Divider />

      <View className="flex-row justify-between items-center">
        <Image
          style={{ width: 50, height: 50, alignSelf: "center" }}
          source={{
            uri: selectedPokemon.sprite,
          }}
        />
        <View className="flex-col">
          <View className="flex-row">
            <Text>Base Stat</Text>
            <Text>45</Text>
            <Text>{gradeStat(45)}</Text>
          </View>
          <View className="flex-row">
            <Text>Attack</Text>
            <Text>49</Text>
          </View>
          <View className="flex-row">
            <Text>Defense</Text>
            <Text>49</Text>
          </View>
          <View className="flex-row">
            <Text>Special Attack</Text>
            <Text>65</Text>
          </View>
          <View className="flex-row">
            <Text> Special Defense </Text>
            <Text>65</Text>
          </View>
          <View className="flex-row">
            <Text> Speed </Text>
            <Text>45</Text>
          </View>
        </View>
      </View>
      <Card.Divider />

      <View className="flex-col items-center">
        <Text>Evolutions</Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-col">
            <Avatar
              size="medium"
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
              }}
            />
            <Text>Lvl 16</Text>
          </View>
          <View className="flex-col items-center justify-center">
            <Icon name="arrow-right" color="black" />
          </View>
          <View className="flex-col items-center justify-center">
            <Avatar
              size="medium"
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
              }}
            />
            <Text>Lvl 36</Text>
          </View>
        </View>

        <Card.Divider />
        <View className="flex-col items-center">
          <Text>Locations</Text>
          <Text>1</Text>
        </View>
      </View>
    </Card>
  );
}
