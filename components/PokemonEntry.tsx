import TypeIcon from "./TypeIcon";
import { Avatar, Card, Image, Skeleton } from "@rneui/themed";
import { getPokemonDetails, Pokemon } from "../api/pokemon.api";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Icon } from "@rneui/themed";

export function PokemonEntry({ pokemonName }: { pokemonName: string }) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({
    id: 0,
    name: "Unknown",
    sprite: "../assets/questionMark.png",
    typeList: ["Unknown"],
    evolutionDetails: {
      base: { name: "", spriteUrl: "" },
      stage1: { name: "", spriteUrl: "" },
      stage2: { name: "", spriteUrl: "" },
    },
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      catchRate: 0,
      growthRate: "-",
    },
  });

  const gradeStat = (stat: number): string => {
    if (stat < 40) return "text-red-500";
    if (stat < 65) return "text-orange-500";
    if (stat < 80) return "text-yellow-500";
    if (stat < 90) return "text-green-500";
    if (stat < 110) return "text-blue-500";
    if (stat < 130) return "text-indigo-500";
    return "-";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const get = await getPokemonDetails(pokemonName);

        setSelectedPokemon({
          id: get.id,
          name: get.name,
          sprite: get.sprite,
          typeList: get.typeList,
          evolutionDetails: get.evolutionDetails,
          stats: get.stats,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pokemonName]);

  return (
    <Card containerStyle={{ borderRadius: 10 }}>
      <View className="flex-row justify-between items-center">
        {selectedPokemon.id ||
        selectedPokemon.name ||
        selectedPokemon.typeList ? (
          <>
            <Text className="text-lg">{`#${selectedPokemon.id}`}</Text>
            <Text className="text-lg capitalize">{selectedPokemon.name}</Text>
            <TypeIcon typeList={selectedPokemon.typeList} />
          </>
        ) : (
          <>
            <Skeleton animation="pulse" width={100} height={20} />
            <Skeleton animation="pulse" width={100} height={20} />
            <Skeleton animation="pulse" width={100} height={20} />
          </>
        )}
      </View>

      <Card.Divider />

      <View className="flex-row justify-between items-center">
        {/* MAIN SPRITE */}
        <Image
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
          }}
          source={{
            uri: selectedPokemon.sprite,
          }}
          PlaceholderContent={<Skeleton animation="pulse" />}
          containerStyle={{
            borderRadius: 15,
            backgroundColor: "lightgray",
          }}
        />

        <View className="flex-col">
          {/* STATS */}
          <View className="flex-row">
            <Text>Base Stat</Text>
          </View>
          <View className="flex-row">
            <Text className={gradeStat(selectedPokemon.stats.hp)}>
              HP: {selectedPokemon.stats.hp}
            </Text>
          </View>
          <View className="flex-row">
            <Text className={gradeStat(selectedPokemon.stats.attack)}>
              Attack: {selectedPokemon.stats.attack}
            </Text>
          </View>
          <View className="flex-row">
            <Text className={gradeStat(selectedPokemon.stats.defense)}>
              Defense: {selectedPokemon.stats.defense}
            </Text>
          </View>
          <View className="flex-row">
            <Text className={gradeStat(selectedPokemon.stats.specialAttack)}>
              Sp. Attack: {selectedPokemon.stats.specialAttack}
            </Text>
          </View>
          <View className="flex-row">
            <Text className={gradeStat(selectedPokemon.stats.specialDefense)}>
              Sp. Defense: {selectedPokemon.stats.specialDefense}
            </Text>
          </View>
          <View className="flex-row">
            <Text className={gradeStat(selectedPokemon.stats.speed)}>
              Speed: {selectedPokemon.stats.speed}
            </Text>
          </View>
          <View className="flex-row">
            <Text>Catch Rate: {selectedPokemon.stats.catchRate}</Text>
          </View>

          <View className="flex-row">
            <Text>Growth Rate: {selectedPokemon.stats.growthRate}</Text>
          </View>
        </View>
      </View>
      <Card.Divider />

      {(selectedPokemon.evolutionDetails.stage1.name ||
        selectedPokemon.evolutionDetails.stage2.name) && (
        <>
          {/* Evolutions */}
          <View className="flex-col items-center">
            <Text>Evolutions</Text>
            <View className="flex-row justify-between items-center">
              <View className="flex-col">
                <Avatar
                  size="medium"
                  rounded
                  source={{
                    uri: selectedPokemon.evolutionDetails.base.spriteUrl,
                  }}
                />
                <Text className="text-md capitalize">
                  {selectedPokemon.evolutionDetails.base.name}
                </Text>
                <Text>Base</Text>
              </View>

              {selectedPokemon.evolutionDetails.stage1.name && (
                <>
                  <View className="flex-col items-center justify-center">
                    <Icon name="arrow-right" color="black" />
                  </View>
                  <View className="flex-col">
                    <Avatar
                      size="medium"
                      rounded
                      source={{
                        uri: selectedPokemon.evolutionDetails.stage1.spriteUrl,
                      }}
                    />
                    <Text className="text-md capitalize">
                      {selectedPokemon.evolutionDetails.stage1.name}
                    </Text>
                    <Text>Lvl 16</Text>
                  </View>
                </>
              )}
              {selectedPokemon.evolutionDetails.stage2.name && (
                <>
                  <View className="flex-col items-center justify-center">
                    <Icon name="arrow-right" color="black" />
                  </View>
                  <View className="flex-col items-center justify-center">
                    <Avatar
                      size="medium"
                      rounded
                      source={{
                        uri: selectedPokemon.evolutionDetails.stage2.spriteUrl,
                      }}
                    />
                    <Text className="text-md capitalize">
                      {selectedPokemon.evolutionDetails.stage2.name}
                    </Text>
                    <Text>Lvl 36</Text>
                  </View>
                </>
              )}
            </View>

            <Card.Divider />
            <View className="flex-col items-center">
              <Text>Locations</Text>
              <Text>1</Text>
            </View>
          </View>
        </>
      )}
    </Card>
  );
}
