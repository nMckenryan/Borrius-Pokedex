// import "../global.css";

// import React, { useState } from "react";
// import { View, FlatList, ActivityIndicator } from "react-native";
// import TypeIcon from "./UI/TypeIcon";
// import { BottomSheet, ListItem, Skeleton } from "@rneui/themed";
// import { PokemonEntry } from "./PokemonEntryViews/PokemonEntry";
// import { getAllBorriusPokemon, Pokemon } from "../api/get-borrius-api";
// import SpriteAvatar from "./UI/SpriteAvatar";
// import { useQuery } from "@tanstack/react-query";

// export function PokedexListViewMobile(pokemonData: any) {
//   const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

//   const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

//   {
//     return (
//       <View className="flex-1">
//         <FlatList
//           data={pokemonData}
//           initialNumToRender={15}
//           renderItem={({ item }) => (
//             <View className="flex-row items-center">
//               <ListItem
//                 bottomDivider
//                 key={item.name}
//                 className="w-full"
//                 onPress={() => {
//                   setSelectedPokemon(item);
//                   setIsBottomSheetVisible(true);
//                 }}
//               >
//                 <SpriteAvatar
//                   size={"medium"}
//                   spriteUrl={item.sprites.game_sprite}
//                 />
//                 <ListItem.Content>
//                   <ListItem.Title className="capitalize">
//                     {item.name}
//                   </ListItem.Title>
//                   <ListItem.Subtitle>
//                     <TypeIcon typeList={item.typeList} />
//                   </ListItem.Subtitle>
//                 </ListItem.Content>
//               </ListItem>
//             </View>
//           )}
//         />

//         <BottomSheet
//           isVisible={isBottomSheetVisible}
//           onBackdropPress={() => setIsBottomSheetVisible(false)}
//         >
//           <PokemonEntry selectedPokemon={selectedPokemon} />
//         </BottomSheet>
//       </View>
//     );
//   }
// }
