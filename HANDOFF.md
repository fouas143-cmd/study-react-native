# HANDOFF — papan putih semasa

> Papan putih: ditulis semula selepas SETIAP unit kerja siap (bukan hujung
> sesi). Sejarah kekal dalam Git (`git log -- HANDOFF.md`). Arkib sesi:
> `docs/handoff/`. Keputusan kekal: `docs/adr/`. Jangan simpan rahsia di sini.
> Pemilik TIDAK akan suruh tulis handoff — peraturan ini jalan sendiri.

## Keadaan semasa (dikemas kini: 2026-09-15, home screen)

- Home siap: `src/app/(tabs)/home.tsx` ikut design `05-home-and-tab-navigation.png` (header flag + “Hola, {firstName}!” via `useUser` + streak `images.streakFire` + bell; kad Daily goal 15/20 + bar 75% + `images.treasure`; kad Continue ungu + `images.palace` + `A1 • Unit {order}`; Today’s plan 3 baris dari `data/*` (tajuk lesson + kira vocab) + kad Next up AI Video Call dengan avatar Unsplash placeholder); `tsc` + `lint` bersih.

- Tab nav siap: `src/app/(tabs)/` (headless `expo-router/ui` Tabs + TabSlot + TabList asChild; `unstable_settings.initialRouteName="home"`; layout gate signed-out → `/onboarding`); `CustomTabBar` (`src/components/custom-tab-bar.tsx`: bulatan ungu aktif spring Reanimated ikut `useSegments`, ikon SF/Android `expo-symbols`, label hanya pada tab tak aktif) + `TabPlaceholder` kongsi; `/` kini gate tulen → `/(tabs)/home` (sign-out pindah ke placeholder Profile); `tsc` + `lint` bersih, export iOS hijau; komit `0d8ee55` + fix layout bar (`TabList` asChild selit gaya row → bar paksa column, butang timbul semula; komit `c1cb772` + animasi linear (`withTiming` 250ms `Easing.linear`, ganti spring melantun; komit `a779e49`).
- TODO/faktor dashboard tidak berubah: Native API toggle + Email/Password/Email
- Bundling fix siap: `app.json` 7 laluan aset → `assets/assets/images/` (icon, ios.icon, adaptive 3, favicon, splash); cache Metro dibersih + server restart; iOS bundle hijau `50954ms (1832 modul)`, sifar "Unable to resolve"; `tsc` + `lint` bersih; komit `fix(config): point app.json assets...`.
- Language persistence siap: `src/store/language.ts` (Zustand + AsyncStorage `language-storage`, partialize id sahaja); `/` gate signed-in tanpa bahasa → `/language-selection`; Continue `setLanguage` + `replace("/")`; `/` ada butang "Clear saved language (test)" (`AsyncStorage.clear` + `replace`); UI sedia ada tak berubah; `tsc` + `lint` bersih; komit `feat(language): persist selection with zustand plus gate home route`.

- Language selection siap: `src/app/language-selection.tsx` (ikut design
  `04-language-selection-screen.png`: search + Popular + kad selectable +
  butang Continue ganti "See all languages" + `images.earth` bawah); data dari
  `src/data/languages.ts` (flag rosak `.png` berspasi dikembalikan ke emoji);
  `/` ada butang "Choose a language" → `/language-selection`; `tsc` + `lint`
  bersih; komit `feat(language): add language selection screen plus home link`.

- Learning content siap: `src/types/learning.ts` + `src/data/languages.ts`,
  `units.ts`, `lessons.ts` (sample beginner ES + JA: goals, XP, activities,
  vocab, phrases, aiTeacherPrompt voice-ready); `tsc` + `lint` bersih; komit
  `feat(learning): add typed hardcoded content system`.
- Clerk JS custom flow siap: `expo-auth-session` dipasang (SSO pelayar, Expo Go
  OK); butang Google/Facebook/Apple di `auth-screen.tsx` guna `useSSO()` +
  `setActive`, batal senyap, UI tak berubah; `/` gate (`Redirect` ke
  `/onboarding` bila signed-out, home ringkas + sign-out bila signed-in);
  skrin auth `Redirect "/"` bila sudah signed-in; sign-in MFA/second-factor
  guna `signIn.mfa.*` (bukan `emailCode`).
- Verify: `npx tsc --noEmit` bersih, `npm run lint` bersih; komit
  `feat(auth): Clerk JS browser SSO social buttons plus route gating`, diikuti
  `feat(auth): require minimum 8-character password` (guard kongsi di
  `auth-screen.tsx`, mesej "Password must be at least 8 characters").
- TODO/faktor dashboard tidak berubah: Native API toggle + Email/Password/Email
  code di Dashboard; hidupkan Google/Facebook/Apple di Social connections;
  lepas sign-in pertama, bunuh app dan buka semula untuk sahkan sesi kekal.

- Clerk hidup: `@clerk/expo` 4.6.6 + `expo-secure-store`, `ClerkProvider` +
  `tokenCache` dalam `src/app/_layout.tsx`, kunci dalam `.env.local`
  (gitignored). `clerk doctor` hijau.
- Sign-up guna `signUp.password()` + kod email sebenar; sign-in guna
  `signIn.password()` + fallback kod email (`signIn.emailCode` first-factor,
  `signIn.mfa.*` bila `needs_second_factor`/`needs_client_trust`); kedua-dua
  skrin tunjuk kotak password; modal Verify ada resend + mesej ralat. Sosial
  (Google/Facebook/Apple) guna `useSSO()` browser flow (`expo-auth-session`,
  Expo Go OK) — perlu provider dihidupkan di Dashboard.
- Modal verifikasi hidup semula: crash `text-center` pada `TextInput`
  (bug `react-native-css` 3.0.7, bukan kod kita) diatasi dengan
  `style={{ textAlign: "center" }}` — sila uji semula di simulator iOS.
- Route hidup: `/` (gate: signed-out → `/onboarding`, signed-in → home
  ringkas + sign-out), `/onboarding`, `/sign-up` + `/sign-in` (kongsi
  `src/components/auth-screen.tsx`; kedua-dua dengan password; `Redirect`
  ke `/` bila sudah signed-in).
- Maskot auth `mascot-signup.png` (crop parrot dari design `vzy24e`,
  latar putih sebati skrin) didaftar dalam `src/constants/images.ts`.
- Modal verifikasi `verify-code-modal.tsx`: 6 digit, number-pad, KAV kekal
  atas keyboard, auto `router.replace("/")` pada digit terakhir.
- Onboarding "Mulakan Sekarang" kini `router.push("/sign-up")` (TODO lama
  selesai); TODO skrin sign-up (item 3) selesai.
- Verify terakhir: `npx tsc --noEmit` bersih, `npm run lint` bersih.

## TODO hidup

1. Kad kursus (Bahasa Sepanyol / Bahasa Jepun, design `117z2d`) belum
   diimplement — design penuh ada dalam Downloads pemilik.
2. WAJIB sebelum uji auth di peranti: Dashboard → Native applications
   (toggle Native API) + User & authentication (faktor Email, Password,
   Email verification code + Social connections Google/Facebook/Apple);
   lepas sign-in pertama, bunuh app dan buka semula untuk sahkan sesi
   kekal (tokenCache).

## Perangkap (jangan pijak)

1. `assets/assets/images/moscot-logo.png` — ejaan `moscot` memang salah,
   JANGAN "betulkan". `src/constants/images.ts` import guna ejaan itu.
2. `accessibilityLabel` BUKAN teks visual — teks yang orang nampak datang
   dari anak `<Text>`. Ubah label tak ubah rupa (pemilik pernah keliru).
3. Ubah `app.json` (orientation) kena RESTART PENUH app (`npx expo start`
   semula) — refresh biasa tak jalan.
4. Saiz dinamik (ikut orientasi) WAJIB guna prop `style`, bukan `className`
   — NativeWind tak proses nilai berubah masa jalan.
5. `assets/.../mascot-onboarding.png` ialah PNG telus (key-out manual dari
   JPG). Kalau ganti fail, pastikan kekal RGBA telus.
6. Peraturan kekal: auto-commit ON (tanpa minta izin); penerangan
   RINGKAS selalu — format storytelling penuh hanya bila pemilik minta
   ("jelaskan"/"explain"/"terangkan").
7. Lepas `npx expo install <pakej native>` (cth. async-storage), WAJIB
   restart dev server dengan `npx expo start -c` — Metro yang sudah
   berjalan tak nampak pakej baru ("Unable to resolve", 2026-09-15).
