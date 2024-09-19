import "../global.css";

import React, { useState } from "react";
import { BottomSheet, Card, Header, ListItem } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { getAllBorriusPokemon, Pokemon } from "../api/get-borrius-api";
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SpriteAvatar from "./UI/SpriteAvatar";
import TypeIcon from "./UI/TypeIcon";
import { PokemonEntry } from "./PokemonEntryViews/PokemonEntry";

export function Pokedex() {
  const {
    data: pokemonData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allPokemon"],
    queryFn: getAllBorriusPokemon,
  });

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  return (
    <>
      <Header
        backgroundColor="#C21807"
        centerComponent={{
          text: "Pokedex Unbound",
          style: { color: "#ffffff", fontWeight: "bold" },
        }}
      />

      <View className="bg-slate-100">
        {error && (
          <View className="flex-row items-center p-1 justify-center w-full h-full">
            Error: {error.message}
          </View>
        )}

        {isLoading ? (
          <View className="flex-row items-center p-1 justify-center w-full h-full">
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : window.innerWidth < 768 ? (
          // MOBILE
          <FlatList
            data={pokemonData}
            initialNumToRender={15}
            renderItem={({ item }) => (
              <View className="flex-row items-center">
                <ListItem
                  bottomDivider
                  key={item.name}
                  className="w-full"
                  onPress={() => {
                    setSelectedPokemon(item);
                    setIsBottomSheetVisible(true);
                  }}
                >
                  <SpriteAvatar
                    size={"medium"}
                    spriteUrl={item.sprites.game_sprite}
                  />
                  <ListItem.Content>
                    <ListItem.Title className="capitalize">
                      {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <TypeIcon typeList={item.typeList} />
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </View>
            )}
          />
        ) : (
          //  DESKTOP
          <View className="justify-center ">
            <FlatList
              data={pokemonData}
              keyExtractor={(item) => item.name}
              contentContainerClassName="flex-row flex-wrap justify-center "
              initialNumToRender={15}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedPokemon(item);
                    setIsBottomSheetVisible(true);
                  }}
                >
                  <Card
                    containerStyle={{
                      height: 150,
                      width: 150,
                    }}
                    wrapperStyle={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Card.Title className="capitalize" style={{ margin: 0 }}>
                      {item.name}
                    </Card.Title>
                    <View className="p-2">
                      <SpriteAvatar
                        size={"medium"}
                        spriteUrl={item.sprites.game_sprite}
                      />
                    </View>
                    <TypeIcon typeList={item.typeList} />
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <BottomSheet
          isVisible={isBottomSheetVisible}
          onBackdropPress={() => setIsBottomSheetVisible(false)}
        >
          <PokemonEntry selectedPokemon={selectedPokemon} />
        </BottomSheet>
      </View>
    </>
  );
}
