import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="type--h1 text-center text-lingua-purple">Lingua</Text>
      <Text className="type--body-medium mt-2 text-center text-muted">
        
      </Text>
      <Link
        href="/onboarding"
        className="font-poppins-semibold mt-6 text-[16px] text-lingua-purple"
      >
        Open onboarding
      </Link>
    </View>
  );
}
