import React from "react";
import { Text, View, Image, FlatList } from "react-native";
import { PokedexEntry } from "../api/pokemon.api";

export function PokedexView(pokemonData) {
  return (
    <View>
      <Text>{pokemonData[0].name}</Text>
      <FlatList
        data={pokemonData}
        renderItem={({ item }) => (
          <>
            <Text key={item.name}>{item.name}</Text>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
              }}
              source={{
                uri: item.spriteURL,
              }}
            />
          </>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}
