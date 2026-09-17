import { images } from "@/constants/images";
import { getLanguage, languages } from "@/data/languages";
import { getLessonsForLanguage } from "@/data/lessons";
import { getUnitsForLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/language";
import { colors } from "@/theme/colors";
import { useUser } from "@clerk/expo";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IconName = ComponentProps<typeof SymbolView>["name"];

const DAILY_XP_GOAL = 20;
// TODO: replace with a progress store (completed lessons + streak).
const XP_EARNED_TODAY = 15;
const STREAK_DAYS = 12;
const BEGINNER_LEVEL = "A1";

const GREETINGS: Record<string, string> = {
  es: "Hola",
  ja: "こんにちは",
};

export default function HomeScreen() {
  const { user } = useUser();
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId,
  );

  const language =
    getLanguage(selectedLanguageId ?? "") ?? languages[0] ?? getLanguage("es");
  const currentLessons = getLessonsForLanguage(language.id);
  const currentLesson = currentLessons[0];
  const currentUnit = getUnitsForLanguage(language.id)[0];

  const displayName = user?.firstName ?? user?.username ?? "Alex";
  const greeting = GREETINGS[language.id] ?? "Hola";
  const progress = Math.min(XP_EARNED_TODAY / DAILY_XP_GOAL, 1);

  const plan: {
    icon: IconName;
    iconBackground: string;
    title: string;
    subtitle: string;
    done: boolean;
  }[] = [
    {
      icon: { ios: "book.fill", android: "menu_book", web: "menu_book" },
      iconBackground: colors.brand.purple,
      title: "Lesson",
      subtitle: currentLesson?.title ?? "First lesson",
      done: true,
    },
    {
      icon: { ios: "headphones", android: "headphones", web: "headphones" },
      iconBackground: colors.brand.purple,
      title: "AI Conversation",
      subtitle: "Talk about your day",
      done: false,
    },
    {
      icon: { ios: "message.fill", android: "chat_bubble", web: "chat_bubble" },
      iconBackground: "#FF6B6B",
      title: "New words",
      subtitle: `${currentLesson?.vocabulary.length ?? 0} words`,
      done: false,
    },
  ];

  function goToLearn() {
    router.push("/(tabs)/learn");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: flag + greeting + streak + notifications */}
        <View className="flex-row items-center">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-surface">
            <Text className="text-[22px]">{language.flag}</Text>
          </View>
          <Text className="ml-3 flex-1 font-poppins-semibold text-[20px] leading-[26px] text-ink">
            {greeting}, {displayName}! 👋
          </Text>
          <Image
            source={images.streakFire}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
          <Text className="ml-1 font-poppins-semibold text-[16px] text-ink">
            {STREAK_DAYS}
          </Text>
          <SymbolView
            name={{ ios: "bell.fill", android: "notifications", web: "notifications" }}
            size={24}
            tintColor={colors.neutral.textPrimary}
          />
        </View>

        {/* Daily goal card */}
        <View className="mt-5 flex-row items-center rounded-3xl bg-[#FFF6E9] p-5">
          <View className="flex-1">
            <Text className="type--body-medium text-muted">Daily goal</Text>
            <Text className="mt-1 font-poppins-bold text-[32px] leading-[36px] text-ink">
              {XP_EARNED_TODAY}{" "}
              <Text className="font-poppins text-[16px] text-muted">
                / {DAILY_XP_GOAL} XP
              </Text>
            </Text>
            <View className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#F3E2C7]">
              <View
                style={{
                  width: `${progress * 100}%`,
                  backgroundColor: colors.semantic.streak,
                }}
                className="h-full rounded-full"
              />
            </View>
          </View>
          <Image
            source={images.treasure}
            style={{ width: 96, height: 96 }}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        </View>

        {/* Continue learning card */}
        <View className="mt-4 flex-row overflow-hidden rounded-3xl bg-lingua-purple p-5">
          <View className="flex-1">
            <Text className="text-[15px] text-white/80">Continue learning</Text>
            <Text className="mt-1 font-poppins-bold text-[32px] leading-[36px] text-white">
              {language.name}
            </Text>
            <Text className="mt-1 text-[16px] text-white/85">
              {BEGINNER_LEVEL} • Unit {currentUnit?.order ?? 1}
            </Text>
            <TouchableOpacity
              className="mt-4 self-start rounded-full bg-white px-6 py-2.5"
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={`Continue learning ${language.name}`}
              onPress={goToLearn}
            >
              <Text className="font-poppins-semibold text-[16px] text-lingua-purple">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={images.palace}
            style={{ width: 132, height: 158 }}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        </View>

        {/* Today's plan header */}
        <View className="mt-6 flex-row items-center justify-between">
          <Text className="font-poppins-semibold text-[18px] text-ink">
            Today&apos;s plan
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="View all lessons"
            onPress={goToLearn}
          >
            <Text className="font-poppins-semibold text-[15px] text-lingua-purple">
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's plan rows */}
        <View className="mt-1">
          {plan.map((item) => (
            <TouchableOpacity
              key={item.title}
              className="flex-row items-center gap-4 py-3"
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={item.title}
              onPress={goToLearn}
            >
              <View
                style={{ backgroundColor: item.iconBackground }}
                className="h-[52px] w-[52px] items-center justify-center rounded-2xl"
              >
                <SymbolView name={item.icon} size={24} tintColor="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="font-poppins-semibold text-[16px] leading-[22px] text-ink">
                  {item.title}
                </Text>
                <Text className="type--body-medium mt-0.5 text-muted">
                  {item.subtitle}
                </Text>
              </View>
              {item.done ? (
                <View className="h-7 w-7 items-center justify-center rounded-full bg-lingua-purple">
                  <Text className="text-[14px] font-bold text-white">✓</Text>
                </View>
              ) : (
                <View className="h-7 w-7 rounded-full border-2 border-border" />
              )}
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 112,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
