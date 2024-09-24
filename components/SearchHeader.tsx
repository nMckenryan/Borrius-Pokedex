import "../global.css";

import React from "react";
import { Header, SearchBar } from "@rneui/themed";

export function SearchHeader({ setSearchTerm, searchTerm }) {
  return (
    <Header
      backgroundColor="#641e8c"
      style={{
        borderBottomColor: "#641e8c",
        shadowColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      rightComponent={
        <SearchBar
          lightTheme
          onChangeText={setSearchTerm}
          placeholder="Type query here..."
          placeholderTextColor="#888"
          value={searchTerm}
          containerStyle={{
            backgroundColor: "#641e8c",
            borderTopColor: "#641e8c",
            borderBottomColor: "#641e8c",
          }}
        />
      }
    />
  );
}
