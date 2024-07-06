import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../hooks/use-theme";
import { moderateScale, verticalScale } from "../../../utils";
import { IconButtonBase } from "./types";

export function UndoIcon({ svgProps, onPress, btnProps }: IconButtonBase) {
  const theme = useTheme();
  return (
    <Svg
      width={moderateScale(27)}
      height={verticalScale(27)}
      viewBox="0 0 24 24"
      {...svgProps}
    >
      <Path
        fill={theme.primary}
        d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
      />
    </Svg>
  );
}
