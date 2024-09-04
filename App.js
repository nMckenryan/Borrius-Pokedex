import { StyleSheet, View } from "react-native";
import { PokedexListItem } from "./components/PokedexListItem";
import { Text } from "@rneui/themed";
import { getPokemonInfo } from "./api/pokemon.api";
import { useState, useEffect } from "react";

export default function App() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonInfo("pikachu");
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
    <View style={styles.container}>
      <Text>{pokemonData.name}</Text>
      <PokedexListItem
        name={pokemonData.name}
        types={pokemonData.types.map((type) => type.type.name).join(", ")}
        spriteURL={pokemonData.sprites.front_default}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
