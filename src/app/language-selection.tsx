import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useLanguageStore } from "@/store/language";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Lets the learner search for, choose, and persist a course language. */
export default function LanguageSelection() {
  const [query, setQuery] = useState("");
  const storedId = useLanguageStore((state) => state.selectedLanguageId);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const [selectedId, setSelectedId] = useState(
    storedId ?? languages[0]?.id ?? "",
  );

  const visible = languages.filter((language) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      language.name.toLowerCase().includes(q) ||
      language.nativeName.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />
      <View className="flex-1 bg-background px-6 pb-2 pt-4">
        <View className="relative flex-row items-center justify-center">
          <TouchableOpacity
            className="absolute left-0 p-2"
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
          >
            <Text className="text-[28px] leading-[28px] text-ink">‹</Text>
          </TouchableOpacity>
          <Text className="type--h3 text-ink">Choose a language</Text>
        </View>

        <View className="mt-5 flex-row items-center gap-2 rounded-full bg-surface px-5 py-4">
          <Text className="text-[20px] leading-[20px] text-muted">⌕</Text>
          <TextInput
            className="flex-1 font-poppins text-[16px] text-ink"
            placeholder="Search languages"
            placeholderTextColor="#6B7280"
            value={query}
            onChangeText={setQuery}
            accessibilityLabel="Search languages"
          />
        </View>

        <Text className="mb-3 mt-6 font-poppins-semibold text-[18px] leading-[24px] text-ink">
          Popular
        </Text>

        <View className="gap-3">
          {visible.map((language) => {
            const selected = language.id === selectedId;
            return (
              <TouchableOpacity
                key={language.id}
                className={
                  selected
                    ? "flex-row items-center gap-4 rounded-2xl border-2 border-lingua-purple bg-[#F3F0FF] px-4 py-4"
                    : "flex-row items-center gap-4 rounded-2xl border-2 border-border bg-background px-4 py-4"
                }
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Select ${language.name}`}
                accessibilityState={{ selected }}
                onPress={() => setSelectedId(language.id)}
              >
                <View className="h-12 w-12 items-center justify-center rounded-full bg-surface">
                  <Text className="text-[24px]">{language.flag}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-poppins-semibold text-[17px] leading-[22px] text-ink">
                    {language.name}
                  </Text>
                  <Text className="type--body-small mt-0.5 text-muted">
                    {language.tagline}
                  </Text>
                </View>
                {selected ? (
                  <View className="h-8 w-8 items-center justify-center rounded-full bg-lingua-purple">
                    <Text className="text-[16px] font-bold text-white">✓</Text>
                  </View>
                ) : (
                  <Text className="pr-1 text-[24px] leading-[24px] text-muted">
                    ›
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {visible.length === 0 ? (
          <Text className="type--body-medium mt-6 text-center text-muted">
            No languages found. Try another search.
          </Text>
        ) : null}

        <TouchableOpacity
          className="btn btn--primary mt-5"
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Confirm language selection"
          onPress={() => {
            setLanguage(selectedId);
            router.replace("/");
          }}
        >
          <Text className="font-poppins-semibold text-[17px] leading-[24px] text-white">
            Continue
          </Text>
        </TouchableOpacity>

        <View className="flex-1" />

        <Image
          source={images.earth}
          className="w-full"
          style={{ height: 180 }}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
      </View>
    </SafeAreaView>
  );
}
