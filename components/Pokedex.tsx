import "../global.css";

import React, { useMemo, useState } from "react";
import { BottomSheet, Card, Header, ListItem, SearchBar } from "@rneui/themed";
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
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: pokemonData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allPokemon"],
    queryFn: getAllBorriusPokemon,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const filterData = useMemo(
    () =>
      pokemonData
        ? pokemonData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [],
    [pokemonData, searchTerm]
  );

  return (
    <>
      <Header
        backgroundColor="#641e8c"
        centerComponent={{
          text: "Pokedex Unbound",
          style: { color: "#ffffff", fontWeight: "bold" },
        }}
        rightComponent={
          <SearchBar
            lightTheme
            onChangeText={setSearchTerm}
            placeholder="Type query here..."
            placeholderTextColor="#888"
            value={searchTerm}
          />
        }
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
            data={filterData}
            initialNumToRender={15}
            renderItem={({ item }) => (
              <View className="flex-row items-center" key={item.name}>
                <ListItem
                  bottomDivider
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
              data={filterData}
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
                      width: 175,
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
                    <View className="p-2">
                      <TypeIcon typeList={item.typeList} />
                    </View>
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
