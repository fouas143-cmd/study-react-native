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
  onVerified: () => void;
};

/** 6-digit email code sheet. Number pad, stays above keyboard, verifies on last digit. */
export function VerifyCodeModal({ visible, email, onClose, onVerified }: VerifyCodeModalProps) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  function focusBox(index: number) {
    inputs.current[index]?.focus();
  }

  function handleChange(text: string, index: number) {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    if (!digit) return;
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (index < CODE_LENGTH - 1) {
      focusBox(index + 1);
    } else {
      onVerified();
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

  function handleClose() {
    setCode(Array(CODE_LENGTH).fill(""));
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
                  className="h-12 w-12 rounded-xl border border-border bg-surface text-center font-poppins-semibold text-[20px] text-ink"
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <Pressable className="mt-5 items-center" onPress={handleClose}>
              <Text className="font-poppins-semibold text-[15px] text-lingua-purple">
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
