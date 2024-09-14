import "../global.css";

import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { getAllPokemon } from "../api/pokemon.api";
import { Avatar, BottomSheet, ListItem, Skeleton } from "@rneui/themed";
import { PokemonEntry } from "./PokemonEntryViews/PokemonEntry";
import { PokedexListItem } from "./PokedexListItem";
import TypeIcon from "./UI/TypeIcon";
import SpriteAvatar from "./UI/SpriteAvatar";

export function PokedexListView() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [selectedPokemon, setSelectedPokemon] = useState("");

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

  function isPokemonSelected(pkmn) {
    setPokemonData(pkmn);
    setIsBottomSheetVisible(true);
  }

  if (!pokemonData) {
    return <Text>Loading...</Text>;
  }

  {
    {
      return (
        <View className="flex-1">
          <FlatList
            data={pokemonData}
            renderItem={({ item }) => (
              <View className="flex-row items-center">
                {!item.name ||
                  !item.sprite ||
                  (!item.typeList && (
                    <View className="flex-row items-center">
                      <Skeleton
                        circle
                        animation="pulse"
                        width={50}
                        height={50}
                      />
                      <ListItem.Content className="ml-2">
                        <ListItem.Title>
                          <Skeleton animation="pulse" width={100} height={20} />
                        </ListItem.Title>
                        <ListItem.Subtitle>
                          <Skeleton animation="pulse" width={100} height={20} />
                        </ListItem.Subtitle>
                      </ListItem.Content>
                    </View>
                  ))}

                <ListItem
                  bottomDivider
                  key={item.name}
                  className="w-full"
                  onPress={() => {
                    setSelectedPokemon(item.name);
                    setIsBottomSheetVisible(true);
                  }}
                >
                  <SpriteAvatar size={"small"} spriteUrl={item.sprite} />
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
          <BottomSheet
            isVisible={isBottomSheetVisible}
            onBackdropPress={() => setIsBottomSheetVisible(false)}
          >
            <PokemonEntry pokemonName={selectedPokemon} />
          </BottomSheet>
        </View>
      );
    }
  }
}
