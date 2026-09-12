import { images } from "@/constants/images";
import { useSignIn, useSignUp } from "@clerk/expo";
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
  mode: "sign-in" | "sign-up";
  title: string;
  subtitle: string;
  primaryLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: "/sign-in" | "/sign-up";
  showPassword?: boolean;
};

type ClerkFlowError = {
  longMessage?: string;
  message?: string;
} | null;

function firstErrorMessage(error: ClerkFlowError): string {
  return error?.longMessage ?? error?.message ?? "Something went wrong. Try again.";
}

/** Shared email + social auth layout used by sign-up and sign-in. */
export function AuthScreen({
  mode,
  title,
  subtitle,
  primaryLabel,
  footerText,
  footerLinkLabel,
  footerHref,
  showPassword = false,
}: AuthScreenProps) {
  const isSignUp = mode === "sign-up";
  const { signUp, fetchStatus: signUpStatus } = useSignUp();
  const { signIn, fetchStatus: signInStatus } = useSignIn();

  const [email, setEmail] = useState("alex@gmail.com");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyAttempt, setVerifyAttempt] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const busy = (isSignUp ? signUpStatus : signInStatus) === "fetching";

  function openVerifier() {
    setVerifyAttempt((attempt) => attempt + 1);
    setVerifying(true);
  }

  async function handlePrimary() {
    if (busy) return;
    setErrorMsg(null);
    const emailAddress = email.trim();
    if (!emailAddress) {
      setErrorMsg("Enter your email address.");
      return;
    }

    if (isSignUp) {
      if (!password) {
        setErrorMsg("Enter a password.");
        return;
      }
      const { error } = await signUp.password({ emailAddress, password });
      if (error) {
        setErrorMsg(firstErrorMessage(error));
        return;
      }
      if (signUp.status === "complete") {
        await signUp.finalize();
        router.replace("/");
        return;
      }
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        setErrorMsg(firstErrorMessage(sendError));
        return;
      }
      openVerifier();
    } else {
      const { error } = await signIn.emailCode.sendCode({ emailAddress });
      if (error) {
        setErrorMsg(firstErrorMessage(error));
        return;
      }
      openVerifier();
    }
  }

  async function handleSubmitCode(code: string): Promise<string | null> {
    if (isSignUp) {
      const { error } = await signUp.verifications.verifyEmailCode({ code });
      if (error) return firstErrorMessage(error);
      if (signUp.status !== "complete") return "Verification incomplete. Try again.";
      await signUp.finalize();
    } else {
      const { error } = await signIn.emailCode.verifyCode({ code });
      if (error) return firstErrorMessage(error);
      if (signIn.status !== "complete") return "Additional verification needed. Try again.";
      await signIn.finalize();
    }
    setVerifying(false);
    router.replace("/");
    return null;
  }

  async function handleResend(): Promise<string | null> {
    if (isSignUp) {
      const { error } = await signUp.verifications.sendEmailCode();
      return error ? firstErrorMessage(error) : null;
    }
    const { error } = await signIn.emailCode.sendCode();
    return error ? firstErrorMessage(error) : null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />
      {/* Bot-protection mount point required by Clerk on sign-up screens. */}
      {isSignUp ? <View nativeID="clerk-captcha" /> : null}
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
            className={`mt-4 items-center justify-center rounded-2xl bg-lingua-purple py-4 ${busy ? "opacity-60" : ""}`}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={primaryLabel}
            onPress={() => void handlePrimary()}
            disabled={busy}
          >
            <Text className="font-poppins-semibold text-[17px] leading-[24px] text-white">
              {busy ? "Please wait…" : primaryLabel}
            </Text>
          </TouchableOpacity>

          {errorMsg ? (
            <Text className="mt-3 text-center font-poppins-medium text-[14px] text-error">
              {errorMsg}
            </Text>
          ) : null}

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
        key={verifyAttempt}
        visible={verifying}
        email={email.trim()}
        onClose={() => setVerifying(false)}
        onSubmitCode={handleSubmitCode}
        onResend={handleResend}
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
