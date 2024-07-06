import { Animated } from "react-native";

export interface HeaderProps {
  onSearch: (e: string) => void;
  searchValue: string;
  scrollY: Animated.Value;
  onShowOptions: () => void;
}
