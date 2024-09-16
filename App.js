import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Header } from "@rneui/themed";

import { PokedexListView } from "./components/PokedexListView";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Header
          centerComponent={{ text: "CuraDex", style: { color: "#ffffff" } }}
        />
        <PokedexListView />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
