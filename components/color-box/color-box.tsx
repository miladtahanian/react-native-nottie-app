import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { moderateScale } from "../../utils";
import { ColorBoxProps } from "./types";

export function ColorBox({
  bgColor,
  checked,
  svgProps,
  onPress,
  checkedColor = "#000",
}: ColorBoxProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: moderateScale(40),
        height: moderateScale(40),
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
      }}
    >
      {checked && (
        <Svg
          fill={checkedColor}
          width={"80%"}
          height={"80%"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          {...svgProps}
        >
          <Path d="M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z" />
        </Svg>
      )}
    </Pressable>
  );
}
