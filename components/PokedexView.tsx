import "../global.css";

import React, { PureComponent, useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import TypeIcon from "./TypeIcon";
import { getAllPokemon } from "../api/pokemon.api";
import { ListItem } from "@rneui/themed";
import { Avatar, Skeleton } from "@rneui/base";

export function PokedexView() {
  const [pokemonData, setPokemonData] = useState([]);

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

  if (!pokemonData) {
    return <Text>Loading...</Text>;
  }
  {
    {
      return (
        <View className="flex-1 w-screen">
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
                {/* <TouchableOpacity> */}
                <ListItem
                  bottomDivider
                  key={item.name}
                  className="px-2 sm:w-screen md:w-1/4"
                  onPress={() => {}}
                >
                  <Avatar
                    rounded
                    size="small"
                    source={{
                      uri: item.sprite || "https://via.placeholder.com/100",
                    }}
                    containerStyle={{ backgroundColor: "lightgray" }}
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
                {/* </TouchableOpacity> */}
              </View>
            )}
          />
        </View>
      );
    }
  }
}
