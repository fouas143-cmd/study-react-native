import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants/images";

export default function Onboarding() {
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

        <View className="items-center justify-center py-8">
          <Image
            source={images.mascotOnboarding}
            className="h-[280px] w-[280px]"
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        </View>

        <View className="flex-1" />

        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 rounded-2xl bg-lingua-purple px-6 py-4"
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Mulakan Pelajaran"
          onPress={() => {}}
        >
          <Text className="font-poppins-semibold text-[17px] leading-[24px] text-white">
            Mulakan Pelajaran
          </Text>
          <Text className="text-[22px] leading-[24px] text-white">›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
