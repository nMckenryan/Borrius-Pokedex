// import "../global.css";

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import TypeIcon from "./UI/TypeIcon";
// import { BottomSheet, Card } from "@rneui/themed";
// import { PokemonEntry } from "./PokemonEntryViews/PokemonEntry";
// import { Pokemon } from "../api/get-borrius-api";
// import SpriteAvatar from "./UI/SpriteAvatar";

// export function PokedexListViewDesktop(pokemonData: Pokemon[]) {
//   const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
//   const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

//   return (
//     <View className="flex-1">
//       <FlatList
//         data={pokemonData}
//         keyExtractor={(item) => item.name}
//         initialNumToRender={15}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => {
//               setSelectedPokemon(item);
//               setIsBottomSheetVisible(true);
//             }}
//           >
//             <Card
//               containerStyle={{
//                 height: 150,
//                 width: 150,
//               }}
//               wrapperStyle={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//               }}
//             >
//               <Card.Title className="capitalize" style={{ margin: 0 }}>
//                 {item.name}
//               </Card.Title>
//               <View className="p-2">
//                 <SpriteAvatar
//                   size={"medium"}
//                   spriteUrl={item.sprites.game_sprite}
//                 />
//               </View>
//               <TypeIcon typeList={item.typeList} />
//             </Card>
//           </TouchableOpacity>
//         )}
//       />

//       <BottomSheet
//         isVisible={isBottomSheetVisible}
//         onBackdropPress={() => setIsBottomSheetVisible(false)}
//       >
//         <PokemonEntry selectedPokemon={selectedPokemon} />
//       </BottomSheet>
//     </View>
//   );
// }
