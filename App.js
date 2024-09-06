import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Header } from "@rneui/themed";

import { PokedexView } from "./components/PokedexView";

export default function App() {
  return (
    <SafeAreaProvider>
      <Header
        leftComponent={{
          icon: "menu",
          color: "#ffffff",
        }}
        centerComponent={{ text: "CuraDex", style: { color: "#ffffff" } }}
      />
      <PokedexView />
    </SafeAreaProvider>
  );
}
