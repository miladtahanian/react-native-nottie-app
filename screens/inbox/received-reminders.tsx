import { useMemo } from "react";
import { FlatList, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-fast-text";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, NoteCard } from "../../components";
import { useTheme } from "../../hooks/use-theme";
import { dateTime, moderateFontScale, verticalScale } from "../../utils";
import { notesData, receivedNotifications } from "../note";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

export function ReceivedReminders() {
  const theme = useTheme();
  const nav = useNavigation<StackNavigationHelpers>();
  const { width } = useWindowDimensions();
  const [received, setReceived] = useRecoilState(receivedNotifications);
  const { data } = useRecoilValue(notesData);
  const receivedRemindersNotes = useMemo(() => {
    return data.filter(({ id }) => received.includes(id));
  }, [received]);
  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: 16,
        rowGap: 8,
        paddingBottom: 30,
      }}
      style={{
        backgroundColor: theme.primary,
        flex: 1,
      }}
      ListHeaderComponent={
        <>
          <Text
            style={{
              color: theme.onPrimary,
              fontSize: moderateFontScale(17),
            }}
          >
            اعلان های گذشته
          </Text>
          {received.length > 0 && (
            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <Button onPress={() => setReceived([])}>پاکسازی همه</Button>
            </View>
          )}
        </>
      }
      data={receivedRemindersNotes}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <>
          <NoteCard
            onPress={() => {
              if (nav.isFocused()) {
                nav.navigate("note", {
                  id: item.id,
                  animationEnabled: false,
                  relativeX: 0,
                  relativeY: 0,
                  background: item.background,
                  isCreating: false,
                });
              }
            }}
            containerStyle={{
              width: width - 32,
              height: item.background.includes("/")
                ? verticalScale(150)
                : "auto",
              marginVertical: 12,
            }}
            item={{
              ...item,
              text: `${item.text}...`,
              title: item.title.length > 0 && `${item.title}...`,
            }}
          />
          <Text
            style={{
              alignSelf: "flex-end",
              fontSize: moderateFontScale(16),
              color: theme.onPrimary,
            }}
          >
            {dateTime(new Date())}
          </Text>
        </>
      )}
    />
  );
}
