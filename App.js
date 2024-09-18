import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "@rneui/themed";
import { PokedexListView } from "./components/PokedexListView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
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
