import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../hooks/use-theme";
import { moderateScale, verticalScale } from "../../../utils";
import Feather from "@expo/vector-icons/Feather";

export function ImportIcon() {
  const theme = useTheme();
  return (
    <Feather
      name="file-plus"
      size={moderateScale(24)}
      color={theme.onPrimary}
    />
  );
}
