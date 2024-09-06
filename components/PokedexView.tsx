import "../global.css";

import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList } from "react-native";
import TypeIcon from "./TypeIcon";
import { getAllPokemon } from "../api/pokemon.api";

export function PokedexView() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPokemon();
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!pokemonData) {
    return <Text>Loading...</Text>;
  }
  {
    {
      return (
        <FlatList
          data={pokemonData}
          renderItem={({ item }) => (
            <View className="flex-row bg-pokeDexRed" key={item.name}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 60,
                }}
                source={{
                  uri: item.sprite || "https://via.placeholder.com/100",
                }}
              />
              <View className="flex-1 flex-col justify-center">
                <Text>{item.name}</Text>

                <TypeIcon typeList={item.typeList} />
              </View>
              <View />
            </View>
          )}
        />
      );
    }
  }
}
