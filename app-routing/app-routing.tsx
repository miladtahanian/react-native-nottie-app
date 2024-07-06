import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { Platform, useWindowDimensions } from "react-native";
import { enableFreeze } from "react-native-screens";
import { Home } from "../screens/home";
import { Inbox } from "../screens/inbox";
import { NotePage } from "../screens/note/note-page";
import { note_options } from "./route-options";
import { useTheme } from "../hooks/use-theme";
enableFreeze(true);
const Stack = createStackNavigator();
export function AppRouting() {
  const { width, height } = useWindowDimensions();
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          detachPreviousScreen: true,
          cardOverlayEnabled: true,
        }}
        initialRouteName="home"
      >
        <Stack.Screen component={Home} name="home" />

        <Stack.Screen
          options={note_options(width, height, theme)}
          component={NotePage}
          name="note"
        />
        <Stack.Screen
          component={Inbox}
          options={{
            headerShown: true,
            title: "گزارش اعلان ها",
            headerTitleAlign: "center",
            headerMode: "screen",
            detachPreviousScreen: false,
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: theme.background,
              borderWidth: 0,
            },
            headerTintColor: theme.onBackground,
            headerShadowVisible: false,

            gestureEnabled: Platform.OS === "ios",
            gestureDirection: "vertical",
            cardStyleInterpolator:
              Platform.OS === "ios"
                ? CardStyleInterpolators.forModalPresentationIOS
                : CardStyleInterpolators.forBottomSheetAndroid,
          }}
          name="inbox"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
