# HANDOFF — papan putih semasa

> Papan putih: ditulis semula selepas SETIAP unit kerja siap (bukan hujung
> sesi). Sejarah kekal dalam Git (`git log -- HANDOFF.md`). Arkib sesi:
> `docs/handoff/`. Keputusan kekal: `docs/adr/`. Jangan simpan rahsia di sini.
> Pemilik TIDAK akan suruh tulis handoff — peraturan ini jalan sendiri.

## Keadaan semasa (dikemas kini: 2026-09-10, selepas commit `9987057`)

- Route hidup: `/`, `/onboarding`, `/sign-up` + `/sign-in` (baru, kongsi
  `src/components/auth-screen.tsx`; email sahaja, tiada password).
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
2. Butang sosial (Google/Facebook/Apple) masih `onPress={() => {}}` —
   sambung ke Clerk bila auth sebenar dipasang.
3. Kod verifikasi kini demo sahaja (apa-apa 6 digit diterima) — ganti
   dengan pengesahan Clerk bila backend sedia.

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
