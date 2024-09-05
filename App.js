import { View, Text, Image, FlatList } from "react-native";
import TypeIcon from "./components/TypeIcon";

import { getAllPokemon, getPokemonInfo } from "./api/pokemon.api";
import { useEffect, useState } from "react";

export default function App() {
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

  return (
    <View className="flex-1">
      <FlatList
        data={pokemonData}
        renderItem={({ item }) => (
          <View className="flex-row">
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
              }}
              source={{
                uri: item.sprite || "https://via.placeholder.com/100",
              }}
            />
            <View className="flex-1 flex-col justify-center">
              <Text className="capitalize">{item.name}</Text>

              <TypeIcon typeList={item.typeList} />
            </View>
            <View />
          </View>
        )}
      />
    </View>
  );
}
