import { StatusBar } from "expo-status-bar";
import { useTheme } from "../hooks/use-theme";

export function StatusBarController() {
  const theme = useTheme();
  return <StatusBar backgroundColor={theme.background} style="auto" animated />;
}
