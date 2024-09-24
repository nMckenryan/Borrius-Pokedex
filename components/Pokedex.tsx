import "../global.css";

import React, { useMemo, useState } from "react";
import { BottomSheet } from "@rneui/themed";

import { useQuery } from "@tanstack/react-query";
import { getAllBorriusPokemon } from "../api/get-borrius-api";

import { View, ActivityIndicator } from "react-native";

import { PokemonEntry } from "./PokemonEntryViews/PokemonEntry";
import { Pokemon } from "../api/borrius-types";
import { SearchHeader } from "./SearchHeader";

import { PokedexList } from "./PokedexList";

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
      <SearchHeader setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <View className="bg-amber-200 h-full">
        {error && (
          <View className="flex-row items-center p-1 justify-center w-full h-full">
            Error: {error.message}
          </View>
        )}

        {isLoading ? (
          <View className="flex-row items-center p-1 justify-center w-full h-full">
            <ActivityIndicator size="large" color="#641e8c" />
          </View>
        ) : (
          <PokedexList
            filterData={filterData}
            setSelectedPokemon={setSelectedPokemon}
            setIsBottomSheetVisible={setIsBottomSheetVisible}
          />
        )}

        <View className="justify-center align-center">
          <BottomSheet
            isVisible={isBottomSheetVisible}
            onBackdropPress={() => setIsBottomSheetVisible(false)}
          >
            <PokemonEntry selectedPokemon={selectedPokemon} />
          </BottomSheet>
        </View>
      </View>
    </>
  );
}
