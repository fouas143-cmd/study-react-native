import { useLanguageStore } from "@/store/language";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

/** Routes visitors according to authentication and language selection state. */
export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId,
  );
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
