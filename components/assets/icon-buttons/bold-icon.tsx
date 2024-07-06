import { Octicons } from "@expo/vector-icons";
import * as React from "react";
import { IconButtonBase } from "./types";
import { useTheme } from "../../../hooks/use-theme";

export function BoldIcon({ active }: IconButtonBase) {
  const theme = useTheme();
  return (
    <Octicons
      name="bold"
      color={active ? theme.primary : theme.textUnselected}
      size={24}
    />
  );
}
