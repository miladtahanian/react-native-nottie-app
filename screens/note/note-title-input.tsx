import React, { Dispatch, SetStateAction } from "react";
import { TextInput } from "react-native";
import { darkCardColors } from "../../constants/colors";
import { useTheme } from "../../hooks/use-theme";
import { debounce, moderateFontScale } from "../../utils";
import { Note } from "./types";
type NoteTitleProps = {
  editNote: Note;
  setEditNote: Dispatch<SetStateAction<Note>>;
};

export const NoteTitleInput = ({ editNote, setEditNote }: NoteTitleProps) => {
  const theme = useTheme();
  return (
    <TextInput
      maxLength={400}
      scrollEnabled={false}
      placeholderTextColor={theme.placeholder}
      onChangeText={debounce(
        (editedTitle: string) =>
          setEditNote((prev) => ({
            ...prev,
            title: editedTitle,
          })),
        0
      )}
      underlineColorAndroid="transparent"
      cursorColor={"#FFCB09"}
      placeholder={"تیتر"}
      keyboardType="ascii-capable"
      autoComplete="off"
      multiline
      secureTextEntry={false}
      smartInsertDelete={false}
      autoCorrect={false}
      autoCapitalize="none"
      defaultValue={editNote.title}
      style={{
        color:
          darkCardColors.includes(editNote.background) ||
          editNote.imageOpacity > 0.4
            ? "#ffffff"
            : "#000000",
        fontSize: moderateFontScale(30),
        fontWeight: "bold",
        marginHorizontal: 8,
      }}
    />
  );
};
