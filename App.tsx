import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { AppRouting } from "./app-routing";
import { AppStorageContext } from "./contexts";
import { LoadingDialog } from "./contexts/loading-dialog";
import { ThemeProvider } from "./hooks";
import { StatusBarController } from "./utils";
import { ToastProvider } from "./contexts/toast-context";
SplashScreen.preventAutoHideAsync();
export default function App() {
  async function registerNotifications() {
    let { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  }

  useEffect(() => {
    setTimeout(() => SplashScreen.hideAsync(), 100);
    registerNotifications();
  }, []);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    }),
  });
  return (
    <RecoilRoot>
      <ThemeProvider>
        <SafeAreaProvider>
          <ToastProvider>
            <LoadingDialog>
              <AppStorageContext>
                <StatusBarController />
                <AppRouting />
              </AppStorageContext>
            </LoadingDialog>
          </ToastProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
