import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pokedex } from "./components/Pokedex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Pokedex />
        </SafeAreaProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
