import { useFonts } from "expo-font";
import { fontAssets } from "@/theme/fonts";

/** Load Poppins font files. Returns true when ready. */
export function useAppFonts(): boolean {
  const [loaded] = useFonts(fontAssets);
  return loaded;
}
