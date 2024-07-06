import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import React from "react";
import { Platform, View } from "react-native";
import { Text } from "react-native-fast-text";
import { useTheme } from "../../hooks/use-theme";
import { shadows } from "../../ui-config";
import { dateTime, moderateFontScale } from "../../utils";
import { Dialog } from "../dialog";
import { IconButtonContainer } from "../icon-button-container";
import { DateTimePickerProps } from "./types";

export function DateTimePickerDialog({
  action,
  show,
  onCancel,
  onChangeDate,
  onChangeTime,
  onChangeDateAndroid,
  date,
  time,
}: DateTimePickerProps) {
  const theme = useTheme();
  return (
    <Dialog
      styles={{ width: "90%" }}
      backgroundBlur={Platform.OS === "ios"}
      animation="fade"
      buttons={[{ title: "تنظیم", onPress: action }]}
      title="برای یادداشت خود زمان یادآوری تنظیم کنید"
      onCancel={onCancel}
      visible={show}
    >
      {Platform.OS === "ios" && (
        <View style={{ rowGap: 0, height: "100%", padding: 26 }}>
          <DateTimePicker
            minimumDate={new Date()}
            style={{ height: "50%" }}
            mode="date"
            value={date}
            display="spinner"
            onChange={onChangeDate}
          />
          <DateTimePicker
            is24Hour
            style={{ height: "50%" }}
            mode="time"
            value={time}
            display="spinner"
            onChange={onChangeTime}
          />
        </View>
      )}
      {Platform.OS === "android" && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingVertical: 26,
          }}
        >
          <Text
            style={{
              fontSize: moderateFontScale(20),
              fontWeight: "bold",
              color: theme.onPrimary,
            }}
          >{`تاریخ: ${dateTime(date).split(" ")[0]}`}</Text>
          <Text
            style={{
              fontSize: moderateFontScale(20),
              fontWeight: "bold",
              color: theme.onPrimary,
            }}
          >{`ساعت: ${dateTime(time).split(" ")[1]}`}</Text>
          <IconButtonContainer
            style={{
              flexDirection: "row",
              backgroundColor: theme.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              marginTop: 6,
              ...shadows(theme),
              borderRadius: 100,
              gap: 6,
            }}
            onPress={() => {
              DateTimePickerAndroid.open({
                minimumDate: new Date(),
                mode: "date",
                value: date,
                display: "spinner",
                onChange: onChangeDateAndroid,
                positiveButton: { label: "Next" },
              });
            }}
          >
            <Text style={{ color: theme.onPrimary }}>تغییر تاریخ و ساعت</Text>
            <MaterialIcons size={18} color={theme.onPrimary} name="update" />
          </IconButtonContainer>
        </View>
      )}
    </Dialog>
  );
}
