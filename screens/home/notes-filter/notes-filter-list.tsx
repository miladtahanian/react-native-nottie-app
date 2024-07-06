import { FlatList, View, useWindowDimensions } from "react-native";
import {
  FilterButton,
  FilterFavoritesButton,
  ResetButton,
} from "./notes-filter-btn";
import { HomeOverlaysProps } from "../home-overlays/types";
import { removeArrayKeyDuplicates, toggleArrayElement } from "../../../utils";
import { memo, useMemo } from "react";

export const NotesFilterList = memo(
  ({
    searchFilter,
    selected,
    setSelected,
    favorite,
    setFavorite,
    data,
    hidden,
  }: HomeOverlaysProps) => {
    const notesWithoutCopies = useMemo(() => {
      return removeArrayKeyDuplicates(searchFilter, "title");
    }, [searchFilter, selected]);
    const { width } = useWindowDimensions();
    return (
      <FlatList
        bounces={false}
        style={{
          width: "100%",
          flexGrow: 0,
          transform: [{ translateX: hidden ? width : 0 }],
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingTop: 12,
          justifyContent:'flex-start',
          width:'100%',
          columnGap: 12,
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
        horizontal
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              columnGap: 12,
              alignItems: "center",
            }}
          >
            <ResetButton
              onSelected={() => setSelected([])}
              selected={selected.length === 0}
            />
            {data.filter((e) => e.isFavorite === true).length > 0 && (
              <FilterFavoritesButton
                selected={favorite}
                onSelected={() => setFavorite((prev) => !prev)}
              />
            )}
          </View>
        }
        data={notesWithoutCopies}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <FilterButton
            key={item}
            onSelected={() =>
              setSelected((prev) => toggleArrayElement(prev, item))
            }
            selected={selected.includes(item)}
            label={item}
          />
        )}
      />
    );
  }
);
