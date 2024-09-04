import { Avatar, ListItem } from "@rneui/themed";

import React from "react";

type PokemonProp = {
  name: string;
  types: string[];
  spriteURL: string | undefined;
};

export function PokedexListItem(props: PokemonProp) {
  return (
    <ListItem bottomDivider>
      <Avatar rounded source={{ uri: props.spriteURL }} />
      <ListItem.Content>
        <ListItem.Title>{props.name}</ListItem.Title>
        <ListItem.Subtitle>{props.types}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
