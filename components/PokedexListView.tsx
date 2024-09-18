import "../global.css";

import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import TypeIcon from "./UI/TypeIcon";
import { BottomSheet, ListItem } from "@rneui/themed";
import { Skeleton } from "@rneui/base";
import { PokemonEntry } from "./PokemonEntryViews/PokemonEntry";
import { getAllBorriusPokemon, Pokemon } from "../api/get-borrius-api";
import SpriteAvatar from "./UI/SpriteAvatar";
import { useQuery } from "@tanstack/react-query";

export function PokedexListView() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const { data: pokemonData, isLoading } = useQuery({
    queryKey: ["allPokemon"],
    queryFn: getAllBorriusPokemon,
  });
  {
    {
      return (
        <View className="flex-1">
          <FlatList
            data={pokemonData}
            initialNumToRender={15}
            renderItem={({ item }) => (
              <View className="flex-row items-center">
                {isLoading ? (
                  <View className="flex-row items-center">
                    {item.sprites.game_sprite && (
                      <Skeleton
                        circle
                        animation="pulse"
                        width={50}
                        height={50}
                      />
                    )}
                    <ListItem.Content className="ml-2">
                      {item.name && (
                        <ListItem.Title>
                          <Skeleton animation="pulse" width={100} height={20} />
                        </ListItem.Title>
                      )}
                      {item.typeList && (
                        <ListItem.Subtitle>
                          <Skeleton animation="pulse" width={100} height={20} />
                        </ListItem.Subtitle>
                      )}
                    </ListItem.Content>
                  </View>
                ) : (
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
                      size={"small"}
                      spriteUrl={item.sprites.official}
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
                )}
              </View>
            )}
          />
          <BottomSheet
            isVisible={isBottomSheetVisible}
            onBackdropPress={() => setIsBottomSheetVisible(false)}
          >
            <PokemonEntry selectedPokemon={selectedPokemon} />
          </BottomSheet>
        </View>
      );
    }
  }
}
