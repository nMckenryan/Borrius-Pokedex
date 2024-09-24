import { ListItem, Card, Text } from "@rneui/base";
import { FlatList, View, TouchableOpacity } from "react-native";
import SpriteAvatar from "./UI/SpriteAvatar";
import TypeIcon from "./UI/TypeIcon";

export function PokedexList({
  filterData,
  setSelectedPokemon,
  setIsBottomSheetVisible,
}) {
  return (
    <>
      {window.innerWidth < 768 ? (
        <PokemonListMobile
          filterData={filterData}
          setSelectedPokemon={setSelectedPokemon}
          setIsBottomSheetVisible={setIsBottomSheetVisible}
        />
      ) : (
        <PokemonListDesktop
          filterData={filterData}
          setSelectedPokemon={setSelectedPokemon}
          setIsBottomSheetVisible={setIsBottomSheetVisible}
        />
      )}
    </>
  );
}

function PokemonListMobile({
  filterData,
  setSelectedPokemon,
  setIsBottomSheetVisible,
}) {
  return (
    <FlatList
      data={filterData}
      scrollEnabled={true}
      initialNumToRender={15}
      renderItem={({ item: mobilePokemon }) => (
        <View className="flex-row items-center">
          <ListItem
            bottomDivider
            className="w-full"
            onPress={() => {
              setSelectedPokemon(mobilePokemon);
              setIsBottomSheetVisible(true);
            }}
          >
            <SpriteAvatar
              size={"medium"}
              spriteUrl={mobilePokemon.sprites.game_sprite}
            />
            <ListItem.Content>
              <ListItem.Title className="capitalize">
                #{mobilePokemon.id} - {mobilePokemon.name}
              </ListItem.Title>
              <ListItem.Subtitle>
                <TypeIcon typeList={mobilePokemon.typeList} />
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      )}
    />
  );
}

function PokemonListDesktop({
  filterData,
  setSelectedPokemon,
  setIsBottomSheetVisible,
}) {
  return (
    <FlatList
      data={filterData}
      className="h-full w-full flex-col flex-wrap p-0 mb-50"
      showsVerticalScrollIndicator={true}
      keyExtractor={(item) => item.name}
      initialNumToRender={105}
      contentContainerClassName="flex-row flex-wrap justify-center"
      renderItem={({ item: desktopPokemon }) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedPokemon(desktopPokemon);
            setIsBottomSheetVisible(true);
          }}
        >
          <Card
            containerStyle={{
              width: 150,
              shadowColor: "black",
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 10,
              borderRadius: 5,
              margin: 10,
              padding: 0,
              overflow: "hidden",
            }}
            wrapperStyle={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: 0,
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Text style={{ fontSize: 8, color: "gray" }}>
                #{desktopPokemon.id}
              </Text>
            </View>
            <View className="flex-col items-center justify-center">
              <Card.Title className="mt-1" style={{ margin: 0 }}>
                {desktopPokemon.name}
              </Card.Title>
              <View style={{ overflow: "hidden" }}>
                <SpriteAvatar
                  size={"medium"}
                  spriteUrl={desktopPokemon.sprites.game_sprite}
                />
              </View>
              <View className="p-2" style={{ overflow: "hidden" }}>
                <TypeIcon typeList={desktopPokemon.typeList} />
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
