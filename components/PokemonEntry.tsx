import TypeIcon from "./TypeIcon";
import { Avatar, Card, Text, Image } from "@rneui/themed";
import { getPokemonDetails, Pokemon } from "../api/pokemon.api";
import { useEffect, useState } from "react";
import { View } from "react-native";
export function PokemonEntry({ pokemonName }: { pokemonName: string }) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({
    number: 0,
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
        const data = await getPokemonDetails(pokemonName);

        setSelectedPokemon(data as unknown as Pokemon);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
      <View className="flex-row justify-between">
        <Text>{`#1`}</Text>
        <Text>Bulbasaur</Text>
        <TypeIcon typeList={["grass", "poison"]} />
      </View>

      <View className="flex-col justify-center">
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
          }}
        />
      </View>

      <Card.Divider />

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
      <Card.Divider />

      <View className="flex-col">
        <Text>Evolutions</Text>
        <View className="flex-row justify-between">
          <View className="flex-col">
            <Avatar
              size="medium"
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
              }}
            />
            <Text>Lvl 16</Text>
          </View>
          <View className="flex-col">
            <Avatar
              size="medium"
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
              }}
            />
            <Text>Lvl 36</Text>
          </View>
        </View>

        <View className="flex-col">
          <Text>Locations</Text>
          <Text>1</Text>
        </View>
      </View>
    </Card>
  );
}
