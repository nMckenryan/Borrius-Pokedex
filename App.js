import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pokedex } from "./components/Pokedex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Pokedex />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
