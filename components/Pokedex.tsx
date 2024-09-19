import "../global.css";

import React, { useMemo, useState } from "react";
import {
  BottomSheet,
  Card,
  Header,
  ListItem,
  SearchBar,
  Text,
} from "@rneui/themed";
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
        ? pokemonData.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.typeList.some((type) =>
                type.toLowerCase().includes(searchTerm.toLowerCase())
              ) ||
              item.id.toString().includes(searchTerm)
          )
        : [],
    [pokemonData, searchTerm]
  );

  return (
    <>
      <Header
        backgroundColor="#641e8c"
        style={{
          borderBottomColor: "#641e8c",
          shadowColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        rightComponent={
          <SearchBar
            lightTheme
            onChangeText={setSearchTerm}
            placeholder="Type query here..."
            placeholderTextColor="#888"
            value={searchTerm}
            containerStyle={{
              backgroundColor: "#641e8c",
              borderTopColor: "#641e8c",
              borderBottomColor: "#641e8c",
            }}
          />
        }
      />

      <View className="bg-slate-300 h-full">
        {error && (
          <View className="flex-row items-center p-1 justify-center w-full h-full">
            Error: {error.message}
          </View>
        )}

        {!filterData && (
          <View className="flex-row items-center p-1 justify-center w-full h-full">
            <Text>No Pokemon found</Text>
          </View>
        )}

        {isLoading ? (
          <View className="flex-row items-center p-1 justify-center w-full h-full">
            <ActivityIndicator size="large" color="#641e8c" />
          </View>
        ) : window.innerWidth < 768 ? (
          // MOBILE
          <FlatList
            data={filterData}
            scrollEnabled={true}
            initialNumToRender={15}
            renderItem={({ item }) => (
              <View className="flex-row items-center">
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
                      #{item.id} - {item.name}
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

          <FlatList
            data={filterData}
            className="h-full w-full flex-col flex-wrap "
            showsVerticalScrollIndicator={true}
            keyExtractor={(item) => item.name}
            initialNumToRender={45}
            contentContainerClassName="flex-row flex-wrap justify-center"
            renderItem={({ item }) => (
              <Card
                containerStyle={{
                  height: 150,
                  width: 175,
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  elevation: 10,
                  borderRadius: 5,
                  margin: 10,
                }}
                wrapperStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <View style={{ position: "absolute", top: 0, left: 0 }}>
                  <Text style={{ fontSize: 12 }}>#{item.id}</Text>
                </View>
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
            )}
          />
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
