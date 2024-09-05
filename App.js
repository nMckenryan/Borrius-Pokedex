import { View, Text, Image, FlatList } from "react-native";
import { PokedexView } from "./components/PokedexView";
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
    <View className="flex-1 items-center justify-center bg-white">
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
            <View className="flex-col">
              <Text>{item.name}</Text>
              <Text>{item.types}</Text>
            </View>
            <View />
          </View>
        )}
      />
    </View>
  );
}
