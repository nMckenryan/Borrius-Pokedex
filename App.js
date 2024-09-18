import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Header } from "@rneui/themed";

import { PokedexListView } from "./components/PokedexListView";

export default function App() {
  return (
    <SafeAreaProvider>
      <Header
        centerComponent={{ text: "CuraDex", style: { color: "#ffffff" } }}
      />
      <PokedexListView />
    </SafeAreaProvider>
  );
}
