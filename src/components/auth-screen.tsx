import { images } from "@/constants/images";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VerifyCodeModal } from "./verify-code-modal";

type AuthScreenProps = {
  title: string;
  subtitle: string;
  primaryLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: "/sign-in" | "/sign-up";
  showPassword?: boolean;
};

/** Shared email + social auth layout used by sign-up and sign-in. */
export function AuthScreen({
  title,
  subtitle,
  primaryLabel,
  footerText,
  footerLinkLabel,
  footerHref,
  showPassword = false,
}: AuthScreenProps) {
  const [email, setEmail] = useState("alex@gmail.com");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verifying, setVerifying] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pb-6 pt-2">
          <TouchableOpacity
            className="h-10 w-10 items-start justify-center"
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
          >
            <Text className="text-[28px] leading-[28px] text-ink">‹</Text>
          </TouchableOpacity>

          <Text className="type--h2 mt-4 text-ink">{title}</Text>
          <Text className="type--body-large mt-2 text-muted">{subtitle} ✨</Text>

          <Image
            source={images.mascotSignup}
            className="mt-4 h-44 w-full"
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />

          <View className="-mt-3 rounded-2xl border border-border bg-background px-5 py-3">
            <Text className="type--body-medium text-muted">Email</Text>
            <TextInput
              className="mt-1 font-poppins-medium text-[17px] leading-[24px] text-ink"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {showPassword ? (
            <View className="mt-3 rounded-2xl border border-border bg-background px-5 py-3">
              <Text className="type--body-medium text-muted">Password</Text>
              <View className="flex-row items-center">
                <TextInput
                  className="mt-1 flex-1 font-poppins-medium text-[17px] leading-[24px] text-ink"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
                  onPress={() => setPasswordVisible((v) => !v)}
                >
                  <Text className="font-poppins-semibold text-[14px] text-lingua-purple">
                    {passwordVisible ? "Hide" : "Show"}
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            className="mt-4 items-center justify-center rounded-2xl bg-lingua-purple py-4"
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={primaryLabel}
            onPress={() => setVerifying(true)}
          >
            <Text className="font-poppins-semibold text-[17px] leading-[24px] text-white">
              {primaryLabel}
            </Text>
          </TouchableOpacity>

          <View className="mt-5 flex-row items-center gap-3">
            <View className="h-px flex-1 bg-border" />
            <Text className="type--body-medium text-muted">or continue with</Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="mt-4 gap-3">
            <SocialButton label="Continue with Google" icon={<Text className="text-[22px] font-bold text-[#4285F4]">G</Text>} />
            <SocialButton label="Continue with Facebook" icon={<Text className="text-[22px] font-bold text-[#1877F2]">f</Text>} />
            <SocialButton label="Continue with Apple" icon={<Text className="text-[22px] text-ink"></Text>} />
          </View>

          <View className="flex-1" />

          <View className="mt-8 flex-row items-center justify-center">
            <Text className="type--body-medium text-muted">{footerText} </Text>
            <Pressable onPress={() => router.replace(footerHref)}>
              <Text className="font-poppins-semibold text-[14px] text-lingua-purple">
                {footerLinkLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <VerifyCodeModal
        visible={verifying}
        email={email}
        onClose={() => setVerifying(false)}
        onVerified={() => {
          setVerifying(false);
          router.replace("/");
        }}
      />
    </SafeAreaView>
  );
}

function SocialButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-center gap-3 rounded-2xl border border-border bg-background py-3.5"
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => {}}
    >
      {icon}
      <Text className="font-poppins-medium text-[16px] text-ink">{label}</Text>
    </TouchableOpacity>
  );
}
