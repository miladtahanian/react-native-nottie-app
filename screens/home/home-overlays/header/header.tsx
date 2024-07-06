import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { InboxIcon, MenuIcon, SearchIcon } from "../../../../components/assets";
import {
  debounce,
  moderateFontScale,
  moderateScale,
  verticalScale,
} from "../../../../utils";
import { HeaderProps } from "./types";
import { IconButtonContainer } from "../../../../components/icon-button-container";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { receivedNotifications } from "../../../note";
import { addNotificationReceivedListener } from "expo-notifications";
import { removeReceivedReminder } from "../../../inbox/upcoming-reminders";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useTheme } from "../../../../hooks/use-theme";
export const Header = memo(
  ({ searchValue, onSearch, scrollY, onShowOptions }: HeaderProps) => {
    const [badge, setBadge] = useState(false);
    const nav = useNavigation<StackNavigationHelpers>();
    const [notifications, setNotifications] = useRecoilState(
      receivedNotifications
    );

    useEffect(() => {
      const listen = addNotificationReceivedListener(async (e) => {
        try {
          setNotifications((prev) => [...prev, +e.request.identifier]);
          if (!badge) {
            setBadge(true);
            setTimeout(() => setBadge(false), 120000);
          }
          await removeReceivedReminder(+e.request.identifier);
        } catch (error) {}
      });

      return () => listen.remove();
    }, []);
    useEffect(() => {
      if (notifications.length === 0 && badge) {
        setBadge(false);
      }
    }, [notifications]);
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, []);
    const theme = useTheme();
    const { top } = useSafeAreaInsets();
    const inputRef = useRef<TextInput>(null);

    return (
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          flexDirection: "column",
          height: verticalScale(70) + top,
          backgroundColor: theme.background,
          top: 0,
          paddingTop: top,
          opacity,
          transform: [
            {
              translateY: Animated.diffClamp(scrollY, 0, 160).interpolate({
                inputRange: [0, 160],
                outputRange: [0, -160],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Animated.View
          style={{
            width: "100%",
            height: verticalScale(70),
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            opacity: Animated.diffClamp(scrollY, 0, 160).interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
          }}
        >
                      <InboxIcon
              onPress={() => {
                if (badge) {
                  setBadge(false);
                }
                if (nav.isFocused()) {
                  nav.navigate("inbox");
                }
              }}
              active={badge}
            />
          <SearchIcon
            style={{ position: "absolute", zIndex: 1, marginHorizontal: 60 }}
          />
          {searchValue.length > 0 && (
            <IconButtonContainer
              onPress={() => {
                onSearch("");
                inputRef.current?.clear();
                inputRef.current?.blur();
              }}
              style={{
                width: moderateScale(15),
                height: verticalScale(15),
                position: "absolute",
                right: "25%",
                zIndex: 1,
              }}
            >
              <AntDesign name="closecircle" color={theme.onPrimary} size={12} />
            </IconButtonContainer>
          )}
          <TextInput
            ref={inputRef}
            defaultValue={searchValue}
            style={{
              width: "80%",
              height: verticalScale(50),
              backgroundColor: theme.backgroundSearch,
              justifyContent: "flex-start",
              fontSize: moderateFontScale(14),
              borderRadius: moderateScale(15),
              color: theme.onBackgroundSearch,
              paddingLeft: moderateScale(50),
              paddingRight: moderateScale(28),
            }}
            placeholder="جستجو میان یادداشت ها"
            onChangeText={debounce((e: string) => onSearch(e), 200)}
            clearButtonMode="while-editing"
            placeholderTextColor={theme.onBackgroundSearch}
            keyboardType="default"
            textContentType="none"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            smartInsertDelete={false}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(12),
            }}
          >
            <MenuIcon onPress={onShowOptions} />
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
);
