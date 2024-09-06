import "./global.css";
import { SafeAreaView } from "react-native";

import { PokedexView } from "./components/PokedexView";

export default function App() {
  return (
    <SafeAreaView>
      <PokedexView />
    </SafeAreaView>
  );
}
