import { Linking } from "react-native";
import { ReminderProps, Note } from "../screens";
import { dateTime } from "../utils";
import * as Notifications from "expo-notifications";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "./use-toast";
export function useNoitication() {
  const toast = useToast();
  return async (
    title: string,
    body: string,
    id: number,
    reminderState: ReminderProps,
    onReminderSet: Dispatch<SetStateAction<Note>>
  ) => {
    try {
      const reminderSplit: Date = new Date(
        [
          reminderState.date.toJSON().slice(0, 10),

          reminderState.time.toJSON().slice(11),
        ].join("T")
      );

      let { status: newStatus } = await Notifications.getPermissionsAsync();
      if (newStatus !== "granted") {
        toast({
          duration: 2000,
          message: "دسترسی اعلان داده نشده است",
          button: {
            title: "بازکردن تنظیمات",
            onPress() {
              Linking.openSettings();
            },
          },
          textColor: "red",
        });

        return;
      }

      if (reminderSplit < new Date()) {
        await Notifications.scheduleNotificationAsync({
          identifier: id.toString(),
          content: {
            title,
            body,
            sound: true,
            data: {
              url: `nottie://note/${id}`,
            },
          },

          trigger: null,
        });
      }
      if (reminderSplit >= new Date()) {
        await Notifications.scheduleNotificationAsync({
          identifier: id.toString(),

          content: {
            title,
            body,
            sound: true,
            data: {
              url: `nottie://note/${id}`,
            },
          },
          trigger: {
            date: reminderSplit,
          },
        });
        onReminderSet((prev) => ({
          ...prev,
          reminder: reminderSplit.getTime(),
        }));
        toast({
          message: `اعلان برای ${dateTime(reminderSplit)} تنظیم شد`,
        });
      }
    } catch (error) {}
  };
}
