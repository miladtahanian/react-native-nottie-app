import { useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { memo, useState } from "react";
import { CreateIcon } from "../../../components";
import { Header } from "./header";
import { NoteOptions } from "./note-options";
import { OptionsOverlay } from "./options-overlay";
import { HomeOverlaysProps } from "./types";

export const HomeOverlays = memo(
  ({
    optionsSelection,
    setOptionsSelection,
    data,
    onDeleteNotes,
    scrollY,
    searchQuery,
    setSearchQuery,
  }: HomeOverlaysProps) => {
    const navigation = useNavigation<StackNavigationHelpers>();
    const [optionsOverlay, setOptionsOverlay] = useState(false);

    if (optionsSelection.length === 0) {
      return (
        <>
          <OptionsOverlay
            onClose={() => setOptionsOverlay(false)}
            open={optionsOverlay}
          />
          <Header
            onShowOptions={() => {
              if (navigation.isFocused()) {
                setOptionsOverlay(true);
                scrollY.setValue(0);
              }
            }}
            scrollY={scrollY}
            searchValue={searchQuery}
            onSearch={setSearchQuery}
          />

          <CreateIcon
            onPress={({
              nativeEvent: { pageX, pageY, locationX, locationY },
            }) => {
              if (navigation.isFocused()) {
                navigation.navigate("note", {
                  id: new Date().getTime(),
                  relativeX: pageX - locationX,
                  relativeY: pageY - locationY,
                  isCreating: true,
                });
              }
            }}
          />
        </>
      );
    }
    return (
      <NoteOptions
        selectedNotes={optionsSelection}
        totalSelected={optionsSelection.length === data.length}
        onTotalSelect={() => {
          if (optionsSelection.length === data.length) {
            setOptionsSelection([]);
          } else {
            setOptionsSelection(data.map((e) => e.id).sort());
          }
        }}
        onDelete={onDeleteNotes}
        onClose={() => {
          setOptionsSelection([]);
          scrollY.setValue(0);
        }}
      />
    );
  }
);
