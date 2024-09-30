import { View, Text, FlatList } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";
import { Pokemon } from "../../api/borrius-types";
import TypeIcon from "../UI/TypeIcon";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

const BASE_URI = "../../assets/";

export default function MovesBlock({
  selectedPokemon,
}: {
  selectedPokemon: Pokemon;
}) {
  const columnHeader = [
    { field: "name", suppressMovable: true },
    { field: "type", suppressMovable: true },
    { field: "power", headerName: "Power/Acc", suppressMovable: true },
    {
      field: "learn_method",
      headerName: "Learned",
      suppressMovable: true,
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

  return (
    <View
      className="flex-col items-center border-slate-200 rounded"
      style={{ borderWidth: 1 }}
    >
      {selectedPokemon.moves.length > 0 && (
        <View
          // className="ag-theme-quartz"
          className="ag-theme-quartz"
          style={{ height: "25vh", minWidth: "95vw" }}
        >
          <AgGridReact
            alwaysShowHorizontalScroll={true}
            suppressDragLeaveHidesColumns={true}
            rowData={rowData}
            columnDefs={columnHeader.map((column) => {
              if (column.field === "type") {
                return {
                  ...column,
                  cellRenderer: (params) => (
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
                  ),
                };
              }
              if (column.field === "power") {
                return {
                  ...column,
                  cellRenderer: (params) => (
                    <>
                      <Text>{params.data.power}</Text>
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={{
                          uri: BASE_URI + "Physical.png",
                        }}
                      />
                      <Text>
                        {params.data.accuracy ? params.data.accuracy + "%" : ""}
                      </Text>
                    </>
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
