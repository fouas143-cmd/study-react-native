import { images } from "@/constants/images";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const mascotHeight = isLandscape ? height * 0.55 : 700;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />
      <View className="flex-1 bg-background px-6 pb-6 pt-4">
        <View className="flex-row items-center justify-center gap-2">
          <Image
            source={images.mascotLogo}
            className="h-10 w-10"
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
          <Text className="font-poppins-bold text-[28px] leading-[34px] text-ink">
            duolinggo
          </Text>
        </View>

        <Text className="type--h1 mt-8 text-ink">Pilih kursus anda.</Text>
        <Text className="type--body-large mt-3 text-muted">
          Mari kita mulakan dengan pelajaran baru.
        </Text>

        <View className="flex-1 items-center justify-center pt-6">
          <Image
            source={images.mascotOnboarding}
            className="w-full"
            style={{ height: mascotHeight }}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 rounded-2xl bg-lingua-purple px-6 py-4"
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Mulakan sekarang"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="font-poppins-semibold text-[17px] leading-[24px] text-white">
            Mulakan Sekarang
          </Text>
          <Text className="text-[22px] leading-[24px] text-white">›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
