import type { LanguageId } from "@/types/learning";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LanguageState {
  selectedLanguageId: LanguageId | null;
  hasHydrated: boolean;
  setLanguage: (id: LanguageId) => void;
  clearLanguage: () => void;
  setHasHydrated: (value: boolean) => void;
}

/**
 * Selected language, persisted with AsyncStorage.
 * Teachable minimal shape: id + setter + clearer.
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      hasHydrated: false,
      setLanguage: (id) => set({ selectedLanguageId: id }),
      clearLanguage: () => set({ selectedLanguageId: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ selectedLanguageId: state.selectedLanguageId }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
