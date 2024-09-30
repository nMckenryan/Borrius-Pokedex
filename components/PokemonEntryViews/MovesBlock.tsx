import { View, Text, FlatList } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import { Pokemon } from "../../api/borrius-types";
import TypeIcon from "../UI/TypeIcon";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import { themeQuartz } from "@ag-grid-community/theming";

const BASE_URI = "../../assets/";

export const myTheme = themeQuartz.withParams({
  accentColor: "#FDE68A",
  backgroundColor: "#FFFFFF",
  borderColor: "#D7E2E6",
  borderRadius: 2,
  browserColorScheme: "light",
  cellHorizontalPaddingScale: 0.7,
  chromeBackgroundColor: {
    ref: "backgroundColor",
  },
  columnBorder: false,
  fontFamily: {
    googleFont: "Inter",
  },
  fontSize: 13,
  foregroundColor: "#555B62",
  headerBackgroundColor: "#FFFFFF",
  headerFontSize: "10px",
  headerFontWeight: 400,
  headerTextColor: "#000000",
  rowBorder: true,
  rowVerticalPaddingScale: 0.8,
  sidePanelBorder: true,
  spacing: "3px",
  wrapperBorder: false,
  wrapperBorderRadius: "3px",
});

export default function MovesBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  // TODO: Set this up for multipl screen sizes
  const columnHeaderMobile = [
    { field: "name", suppressMovable: true, maxWidth: 125 },
    { field: "type", suppressMovable: true, maxWidth: 60 },
    {
      field: "power",
      headerName: "Power/Acc",
      suppressMovable: true,
      maxWidth: 100,
    },
    {
      field: "learn_method",
      headerName: "Learned",
      suppressMovable: true,
      maxWidth: 75,
    },
  ];

  const columnDesktopHeader = [
    { field: "name" },
    { field: "type" },
    {
      field: "power",
      headerName: "Power/Acc",
    },
    {
      field: "learn_method",
      headerName: "Learned",
    },
  ];

  const rowData = selectedPokemon.moves.map((move) => {
    const learn_method =
      move.learn_method == "level-up" ? "Lvl " + move.level_learned : "TM/HM";

    return {
      name: move.name,
      type: move.type,
      power: move.power,
      accuracy: move.accuracy,
      category: move.category,
      learn_method: learn_method,
    };
  });

  let columnHeader =
    window.innerWidth < 1028 ? columnHeaderMobile : columnDesktopHeader;

  return (
    <View
      className="flex-col items-center border-slate-200 rounded"
      style={{ borderWidth: 1 }}
    >
      {selectedPokemon.moves.length > 0 && (
        <View style={{ height: "25vh", minWidth: "80vw" }}>
          <AgGridReact
            theme={myTheme}
            rowData={rowData}
            columnDefs={columnHeader.map((column) => {
              if (column.field === "type") {
                return {
                  ...column,
                  cellRenderer: (params) => (
                    <View className="flex-row  item-center justify-center">
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={{
                          uri:
                            BASE_URI +
                            "types/gen8/" +
                            params.data.type.toLowerCase() +
                            ".png",
                        }}
                      />
                    </View>
                  ),
                };
              }
              if (column.field === "power") {
                return {
                  ...column,
                  cellRenderer: (params) => (
                    <View className="flex-row item-center justify-center">
                      <Text>
                        {params.data.power != "-"
                          ? `${params.data.power} `
                          : ""}

                        <Image
                          style={{ width: 25, height: 20, borderRadius: 5 }}
                          source={{
                            uri: BASE_URI + params.data.category + ".png",
                          }}
                        />

                        {params.data.accuracy != "-"
                          ? ` ${params.data.accuracy}%`
                          : ""}
                      </Text>
                    </View>
                  ),
                };
              }

              return column;
            })}
          />
        </View>
      )}
    </View>
  );
}
