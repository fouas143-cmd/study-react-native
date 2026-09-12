import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerifyCodeModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  /** Submits the code to Clerk. Resolves to an error message, or null on success. */
  onSubmitCode: (code: string) => Promise<string | null>;
  /** Resends the code. Resolves to an error message, or null on success. */
  onResend: () => Promise<string | null>;
};

/** 6-digit email code sheet. Number pad, stays above keyboard, submits on last digit. */
export function VerifyCodeModal({
  visible,
  email,
  onClose,
  onSubmitCode,
  onResend,
}: VerifyCodeModalProps) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  function focusBox(index: number) {
    inputs.current[index]?.focus();
  }

  function clearAndFocusFirst() {
    setCode(Array(CODE_LENGTH).fill(""));
    focusBox(0);
  }

  async function submitCode(fullCode: string) {
    setSubmitting(true);
    const error = await onSubmitCode(fullCode);
    setSubmitting(false);
    if (error) {
      setErrorMsg(error);
      clearAndFocusFirst();
    }
    // On success the parent closes the modal and navigates.
  }

  function handleChange(text: string, index: number) {
    if (submitting) return;
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    if (!digit) return;
    const next = [...code];
    next[index] = digit;
    setCode(next);
    setErrorMsg(null);
    if (index < CODE_LENGTH - 1) {
      focusBox(index + 1);
    } else {
      void submitCode(next.join(""));
    }
  }

  function handleKeyPress(key: string, index: number) {
    if (key === "Backspace" && !code[index] && index > 0) {
      const next = [...code];
      next[index - 1] = "";
      setCode(next);
      focusBox(index - 1);
    }
  }

  async function handleResend() {
    if (resending || submitting) return;
    setResending(true);
    const error = await onResend();
    setResending(false);
    if (error) {
      setErrorMsg(error);
    } else {
      setErrorMsg(null);
      clearAndFocusFirst();
    }
  }

  function handleClose() {
    if (submitting) return;
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable
          className="flex-1 items-center justify-end bg-ink/40 px-6 pb-10"
          onPress={handleClose}
        >
          <Pressable
            className="w-full rounded-3xl bg-background p-6"
            onPress={(event) => event.stopPropagation()}
          >
            <Text className="type--h3 text-center text-ink">Check your email</Text>
            <Text className="type--body-medium mt-2 text-center text-muted">
              We sent a 6-digit code to{"\n"}
              <Text className="font-poppins-semibold text-ink">{email || "your email"}</Text>
            </Text>

            <View className="mt-5 flex-row justify-between gap-2">
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  className="h-12 w-12 rounded-xl border border-border bg-surface font-poppins-semibold text-[20px] text-ink"
                  // textAlign via style: text-center in className crashes
                  // react-native-css 3.0.7 (TextInput mapping ships
                  // nativeStyleMapping { textAlign: true }, but its
                  // nativeStyleMapping() calls path.split(".") on it).
                  style={{ textAlign: "center" }}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={index === 0}
                  editable={!submitting}
                />
              ))}
            </View>

            {errorMsg ? (
              <Text className="mt-3 text-center font-poppins-medium text-[14px] text-error">
                {errorMsg}
              </Text>
            ) : null}

            <View className="mt-5 flex-row items-center justify-center gap-6">
              <Pressable onPress={handleClose}>
                <Text className="font-poppins-semibold text-[15px] text-muted">Cancel</Text>
              </Pressable>
              <Pressable onPress={() => void handleResend()} disabled={resending || submitting}>
                <Text className="font-poppins-semibold text-[15px] text-lingua-purple">
                  {resending ? "Sending…" : "Resend code"}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
