# ADR-0002: Semua imej berpusat dalam `constants/images.ts`

Tarikh: 2026-09-10 · Status: diterima

## Konteks

Skrin perlu guna banyak imej (logo, maskot, ilustrasi). Pilihan: import
terus dalam setiap skrin, atau daftar sekali di satu tempat.

## Keputusan

Semua imej diimport dan dieksport dari `src/constants/images.ts` sebagai
objek `images`. Skrin hanya guna `source={images.namaSesuatu}`. Fail PNG
duduk dalam `assets/assets/images/`.

## Sebab

1. Tukar gambar = tukar satu baris `source` (bukti: logo kekal
   `mascotLogo`, ilustrasi ditukar `mascotWelcome` → `mascotOnboarding`
   tanpa sentuh logik lain).
2. Nama salah eja dikesan oleh TypeScript di satu tempat, bukan
   bersepah dalam skrin.
3. Senang audit: satu fail tunjuk semua aset visual app.

## Akibat

- Imej baru MESTI didaftar di sini sebelum skrin boleh guna.
- AMARAN: `assets/assets/images/moscot-logo.png` dieja salah dari asal.
  Jangan betulkan ejaan fail — `images.ts` bergantung kepadanya. Kalau
  mahu eja betul, tukar fail DAN import serentak.
