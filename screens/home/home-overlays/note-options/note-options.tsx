import Checkbox from "expo-checkbox";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-fast-text";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { CloseIcon, DeleteIcon } from "../../../../components/assets";
import {
  moderateFontScale,
  moderateScale,
  verticalScale,
} from "../../../../utils";
import { notesData } from "../../../note";
import { useTheme } from "../../../../hooks/use-theme";
interface NoteOptionsProps {
  onDelete: () => void;
  onClose: () => void;
  onTotalSelect: () => void;
  totalSelected: boolean;
  selectedNotes: number[];
  onChangeText?: (e: string) => void;
  textValue?: string;
}

export const NoteOptions = memo(
  ({
    onDelete,
    onClose,
    onTotalSelect,
    totalSelected,
    selectedNotes,
  }: NoteOptionsProps) => {
    const theme = useTheme();
    const { top } = useSafeAreaInsets();
    const { data } = useRecoilValue(notesData);

    return (
      <Animated.View
        entering={FadeIn.springify(1000)}
        style={{
          width: "100%",
          justifyContent: "space-between",
          position: "absolute",
          backgroundColor: theme.background,
          alignItems: "center",
          flexDirection: "row-reverse",
          paddingHorizontal: moderateScale(20),
          padding: 10,
          top: 0,
          paddingTop: top,
          height: verticalScale(70) + top,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <CloseIcon onPress={onClose} />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(5),
            }}
            onPress={onTotalSelect}
            activeOpacity={0.6}
          >
            <Checkbox
              onValueChange={onTotalSelect}
              style={{ borderRadius: 100 }}
              value={totalSelected}
            />
            <Text
              numberOfLines={2}
              style={{
                color: theme.onPrimary,
              }}
            >
              انتخاب همه
            </Text>
          </TouchableOpacity>
          <Text
            style={{ color: theme.onPrimary, fontSize: moderateFontScale(18) }}
          >
            {selectedNotes.length}/{data.length}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 15 }}
        >
          <DeleteIcon onPress={onDelete} />
        </View>
      </Animated.View>
    );
  }
);
