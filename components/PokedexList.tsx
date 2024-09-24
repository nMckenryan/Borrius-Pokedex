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
        <PokemonListDesktop
          filterData={filterData}
          setSelectedPokemon={setSelectedPokemon}
          setIsBottomSheetVisible={setIsBottomSheetVisible}
        />
      ) : (
        <PokemonListMobile
          filterData={filterData}
          setSelectedPokemon={setSelectedPokemon}
          setIsBottomSheetVisible={setIsBottomSheetVisible}
        />
      )}
    </>
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

function PokemonListMobile({
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
      initialNumToRender={45}
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
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                }}
              >
                #{desktopPokemon.id}
              </Text>
            </View>
            <Card.Title
              className="capitalize"
              style={{
                margin: 0,
              }}
            >
              {desktopPokemon.name}
            </Card.Title>
            <View className="p-2">
              <SpriteAvatar
                size={"medium"}
                spriteUrl={desktopPokemon.sprites.game_sprite}
              />
            </View>
            <View className="p-2">
              <TypeIcon typeList={desktopPokemon.typeList} />
            </View>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
