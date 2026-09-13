# HANDOFF — papan putih semasa

> Papan putih: ditulis semula selepas SETIAP unit kerja siap (bukan hujung
> sesi). Sejarah kekal dalam Git (`git log -- HANDOFF.md`). Arkib sesi:
> `docs/handoff/`. Keputusan kekal: `docs/adr/`. Jangan simpan rahsia di sini.
> Pemilik TIDAK akan suruh tulis handoff — peraturan ini jalan sendiri.

## Keadaan semasa (dikemas kini: 2026-09-13, Clerk auth)

- Clerk JS custom flow siap: `expo-auth-session` dipasang (SSO pelayar, Expo Go
  OK); butang Google/Facebook/Apple di `auth-screen.tsx` guna `useSSO()` +
  `setActive`, batal senyap, UI tak berubah; `/` gate (`Redirect` ke
  `/onboarding` bila signed-out, home ringkas + sign-out bila signed-in);
  skrin auth `Redirect "/"` bila sudah signed-in; sign-in MFA/second-factor
  guna `signIn.mfa.*` (bukan `emailCode`).
- Verify: `npx tsc --noEmit` bersih, `npm run lint` bersih; komit
  `feat(auth): Clerk JS browser SSO social buttons plus route gating`.
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
