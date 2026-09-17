import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabPlaceholderProps = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

/** Renders consistent placeholder content for unfinished tab screens. */
export function TabPlaceholder({ title, subtitle, children }: TabPlaceholderProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="type--h2 text-ink">{title}</Text>
        <Text className="type--body-medium mt-2 text-center text-muted">
          {subtitle}
        </Text>
        {children}
      </View>
    </SafeAreaView>
  );
}
