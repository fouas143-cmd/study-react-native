import { useLanguageStore } from "@/store/language";
import { useAuth, useClerk, useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId,
  );
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const clearLanguage = useLanguageStore((state) => state.clearLanguage);

  async function handleClearStorage() {
    await AsyncStorage.clear();
    clearLanguage();
    router.replace("/language-selection");
  }

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="type--h1 text-center text-lingua-purple">Lingua</Text>
      <Text className="type--body-medium mt-2 text-center text-muted">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
      </Text>
      <Pressable
        className="btn btn--primary mt-6 w-full"
        accessibilityRole="button"
        accessibilityLabel="Choose a language"
        onPress={() => router.push("/language-selection")}
      >
        <Text className="font-poppins-semibold text-[16px] text-white">
          Choose a language
        </Text>
      </Pressable>
      <Pressable
        className="mt-6"
        accessibilityRole="button"
        accessibilityLabel="Sign out"
        onPress={() => void signOut()}
      >
        <Text className="font-poppins-semibold text-[16px] text-lingua-purple">
          Sign out
        </Text>
      </Pressable>
      <Pressable
        className="mt-4"
        accessibilityRole="button"
        accessibilityLabel="Clear saved language"
        onPress={() => void handleClearStorage()}
      >
        <Text className="font-poppins-semibold text-[14px] text-muted">
          Clear saved language (test)
        </Text>
      </Pressable>
    </View>
  );
}
