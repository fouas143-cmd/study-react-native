import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="type--h1 text-center text-lingua-purple">Lingua</Text>
      <Text className="type--body-medium mt-2 text-center text-muted">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
      </Text>
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
    </View>
  );
}
