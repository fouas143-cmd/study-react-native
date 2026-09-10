# HANDOFF — papan putih semasa

> Papan putih: ditulis semula selepas SETIAP unit kerja siap (bukan hujung
> sesi). Sejarah kekal dalam Git (`git log -- HANDOFF.md`). Arkib sesi:
> `docs/handoff/`. Keputusan kekal: `docs/adr/`. Jangan simpan rahsia di sini.
> Pemilik TIDAK akan suruh tulis handoff — peraturan ini jalan sendiri.

## Keadaan semasa (dikemas kini: 2026-09-10, selepas commit `7e1244a`)

- Route hidup: `/` (`src/app/index.tsx`, ada link "Open onboarding")
  dan `/onboarding` (`src/app/onboarding.tsx`).
- Skrin onboarding: logo parrot (fail `moscot-logo.png` diganti imej parrot
  baru oleh pemilik) + "duolinggo", tajuk "Pilih kursus
  anda.", sub "Mari kita mulakan dengan pelajaran baru.", ilustrasi
  `mascot-onboarding.png` (parrot bubbles, latar TELUS), butang ungu
  "Mulakan Sekarang". Tiada pagination dots (kehendak pemilik).
- Maskot responsif: portrait kekal `700`, landscape ikut `height * 0.55`
  (ditala pemilik dari `0.35` — prinsip peratus kekal, lihat ADR-0003).
  `app.json` orientation = `default` (boleh pusing).
- Verify terakhir: `npx tsc --noEmit` bersih, `npm run lint` bersih.
- Tiada test dalam repo (tiada infra test).
- Sistem continuity pilihan C HIDUP: peraturan rekod berterusan dalam
  `AGENTS.md`, gaya penerangan berpusat `docs/explain-style.md`
  (ADR-0004), ADR-0001–0003, nota `docs/handoff/2026-09-10.md`.

## TODO hidup

1. `onPress` butang onboarding masih kosong (`() => {}`) — sambung ke skrin
   kursus bila skrin itu wujud.
2. Kad kursus (Bahasa Sepanyol / Bahasa Jepun, design `117z2d`) belum
   diimplement — design penuh ada dalam Downloads pemilik.
3. Skrin sign-up (design `vzy24e`: Create your account) DITANGGUH atas
   arahan pemilik ("maskot saja") — jangan buat selagi tidak disuruh.

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
6. Peraturan kekal: auto-commit ON (tanpa minta izin), penerangan guna
   format storytelling Melayu penuh untuk post-change + soalan kod,
   ringkas untuk lain-lain.
