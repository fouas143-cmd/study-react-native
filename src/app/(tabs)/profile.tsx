import { TabPlaceholder } from "@/components/tab-placeholder";
import { useClerk } from "@clerk/expo";
import { Pressable, Text } from "react-native";

/** Renders the learner profile placeholder and sign-out action. */
export default function ProfileScreen() {
  const { signOut } = useClerk();

  return (
    <TabPlaceholder title="Profile" subtitle="Your stats live here soon.">
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
    </TabPlaceholder>
  );
}
