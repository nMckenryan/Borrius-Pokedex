import "../global.css";

import React from "react";
import { View } from "react-native";
import TypeIcon from "./UI/TypeIcon";
import { Pokemon } from "../api/pokemon.api";
import { ListItem } from "@rneui/themed";
import { Skeleton } from "@rneui/base";
import SpriteAvatar from "./UI/SpriteAvatar";

export function PokedexListItem({
  pokemonItem,
  isPokemonSelected,
}: {
  pokemonItem: Pokemon;
  isPokemonSelected: boolean;
}) {
  return (
    <View className="flex-row items-center">
      {!pokemonItem.name ||
        !pokemonItem.sprite ||
        (!pokemonItem.typeList && (
          <View className="flex-row items-center">
            <Skeleton circle animation="pulse" width={50} height={50} />
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
        key={pokemonItem.name}
        className="w-full"
        onPress={() => {
          isPokemonSelected = true;
        }}
      >
        <SpriteAvatar size={"large"} spriteUrl={pokemonItem.sprite} />
        <ListItem.Content>
          <ListItem.Title className="capitalize">
            {pokemonItem.name}
          </ListItem.Title>
          <ListItem.Subtitle>
            <TypeIcon typeList={pokemonItem.typeList} />
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}
