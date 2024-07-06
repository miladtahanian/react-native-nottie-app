import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { IconButtonContainer } from "../../icon-button-container";
import { IconButtonBase } from "./types";
import { useTheme } from "../../../hooks/use-theme";

export function BackgroundIcon({ btnProps, onPress }: IconButtonBase) {
  const theme = useTheme();
  return (
    <IconButtonContainer onPress={onPress} {...btnProps}>
      <MaterialIcons color={theme.textUnselected} name="image" size={24} />
    </IconButtonContainer>
  );
}
