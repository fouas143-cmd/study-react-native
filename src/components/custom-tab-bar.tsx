import { colors } from "@/theme/colors";
import { useSegments } from "expo-router";
import type { TabTrigger } from "expo-router/ui";
import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import type { LayoutChangeEvent, PressableProps, ViewProps } from "react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabIcon = ComponentProps<typeof SymbolView>["name"];
type TabHref = ComponentProps<typeof TabTrigger>["href"];

export type TabMeta = {
  name: string;
  label: string;
  href: TabHref;
  icon: TabIcon;
};

export const TABS: TabMeta[] = [
  {
    name: "home",
    label: "Home",
    href: "/(tabs)/home",
    icon: { ios: "house.fill", android: "home", web: "home" },
  },
  {
    name: "learn",
    label: "Learn",
    href: "/(tabs)/learn",
    icon: { ios: "book.fill", android: "menu_book", web: "menu_book" },
  },
  {
    name: "ai-teacher",
    label: "AI Teacher",
    href: "/(tabs)/ai-teacher",
    icon: { ios: "graduationcap.fill", android: "school", web: "school" },
  },
  {
    name: "chat",
    label: "Chat",
    href: "/(tabs)/chat",
    icon: { ios: "message.fill", android: "chat_bubble", web: "chat_bubble" },
  },
  {
    name: "profile",
    label: "Profile",
    href: "/(tabs)/profile",
    icon: { ios: "person.fill", android: "person", web: "person" },
  },
];

const CIRCLE_SIZE = 52;
const BAR_HEIGHT = 64;

export function CustomTabBar({ children, style }: ViewProps) {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const [barWidth, setBarWidth] = useState(0);

  const activeName = segments[segments.length - 1] ?? "home";
  const foundIndex = TABS.findIndex((tab) => tab.name === activeName);
  const activeIndex = foundIndex >= 0 ? foundIndex : 0;
  const tabWidth = barWidth / TABS.length;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(activeIndex, { damping: 26, stiffness: 320 });
  }, [activeIndex, progress]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * tabWidth }],
    opacity: tabWidth > 0 ? 1 : 0,
  }));

  function handleLayout(event: LayoutChangeEvent) {
    setBarWidth(event.nativeEvent.layout.width);
  }

  return (
    <View
      onLayout={handleLayout}
      style={[styles.bar, { paddingBottom: insets.bottom }, style]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.circle,
          { left: (tabWidth - CIRCLE_SIZE) / 2, top: (BAR_HEIGHT - CIRCLE_SIZE) / 2 },
          circleStyle,
        ]}
      />
      <View style={{ height: BAR_HEIGHT }} className="flex-row">
        {children}
      </View>
    </View>
  );
}

type TabButtonProps = Pick<PressableProps, "onPress" | "onLongPress"> & {
  label: string;
  icon: TabIcon;
  isFocused?: boolean;
};

export function TabButton({ label, icon, isFocused, onPress, onLongPress }: TabButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isFocused ?? false }}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center"
    >
      <SymbolView
        name={icon}
        size={24}
        tintColor={isFocused ? "#FFFFFF" : colors.neutral.textSecondary}
      />
      {isFocused ? null : (
        <Text className="type--caption mt-1 text-muted">{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.neutral.background,
    borderTopColor: colors.neutral.border,
    borderTopWidth: 1,
  },
  circle: {
    backgroundColor: colors.brand.purple,
    borderRadius: CIRCLE_SIZE / 2,
    elevation: 6,
    height: CIRCLE_SIZE,
    position: "absolute",
    shadowColor: colors.brand.purple,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    width: CIRCLE_SIZE,
  },
});
