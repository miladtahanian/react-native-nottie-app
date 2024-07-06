import { ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-fast-text";
import { useTheme } from "../../../../hooks/use-theme";
import { moderateFontScale } from "../../../../utils";
import { OptionProps } from "../../types";
export function FontOptions({ fonts }: OptionProps) {
  const theme = useTheme();

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      horizontal
      style={{ alignSelf: "flex-start" }}
      contentContainerStyle={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 16,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: theme.primary,
            fontSize: moderateFontScale(16),
          }}
        >
          {"Default"}
        </Text>
      </TouchableOpacity>
      {fonts.map((font, i) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            key={i}
          >
            <Text
              style={{
                color: theme.primary,
                fontFamily: font,
                fontSize: moderateFontScale(18),
              }}
            >
              {font}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
