import * as React from "react";
import { moderateScale } from "../../utils";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "../../hooks/use-theme";

export function SearchIcon(props: any) {
  const theme = useTheme();

  return (
    <Feather
      {...props}
      name="search"
      size={moderateScale(24)}
      color={theme.onBackgroundSearch}
    />
  );
}
