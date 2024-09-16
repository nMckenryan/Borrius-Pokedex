import { Icon } from "@rneui/base";
import { View, Text, ActivityIndicator } from "react-native";
import {
  getEvolutionDetails,
  getPokemonSprite,
  Pokemon,
} from "../../api/pokemon.api";
import SpriteAvatar from "../UI/SpriteAvatar";
import React, { useState, useEffect } from "react";

export function EvolutionBlock({ pokemonId }: { pokemonId: number }) {
  const [evolutionData, setEvolutionData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    fetchEvolutionChain();
  }, [pokemonId]);

  const fetchEvolutionChain = async () => {
    try {
      setLoading(true);
      const data = await getEvolutionDetails(pokemonId);
      setEvolutionData(data.chain);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const renderEvolutionStage = (stage) => {
    return (
      <View className="flex-row items-center justify-center">
        <View className="flex-col  items-center justify-center">
          <SpriteAvatar
            size="small"
            spriteUrl={getPokemonSprite(stage.species.name)}
          />
          <Text className="text-md capitalize">{stage.species.name}</Text>
        </View>

        {stage.evolution_details.length > 0 ? (
          <Text>
            Evolves at level: {stage.evolution_details[0].min_level || "N/A"}
          </Text>
        ) : (
          <Text>Base</Text>
        )}
        {stage.evolves_to.map((nextStage, index) => (
          <View key={index}>
            <Icon name="arrow-right" color="black" />
            {renderEvolutionStage(nextStage)}
          </View>
        ))}
      </View>
    );
  };

  return evolutionData ? (
    <View>
      <Text>Evolution Chain</Text>
      {renderEvolutionStage(evolutionData)}
    </View>
  ) : null;
}
