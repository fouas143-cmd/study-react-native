# ADR-0003: Saiz maskot responsif ikut peratus, bukan nombor mati

Tarikh: 2026-09-10 · Status: diterima

## Konteks

Maskot onboarding terlalu besar bila telefon dipusing melintang —
menolak butang keluar skrin. Kehendak pemilik: menegak kekal saiz
semasa (`700`), melintang mengecut sederhana.

## Keputusan

```tsx
const { width, height } = useWindowDimensions();
const isLandscape = width > height;
const mascotHeight = isLandscape ? height * 0.35 : 700;
```

Tinggi disuap melalui prop `style` (bukan `className`), dan `app.json`
dibuka kepada `"orientation": "default"`.

## Sebab

1. Nombor mati (contoh `200`) muat di satu telefon tetapi boleh
   terhantuk di telefon yang lebih pendek — peratus adil untuk semua
   saiz skrin.
2. `className` NativeWind tidak memproses nilai berubah masa jalan;
   `style` ialah jalan yang disokong untuk gaya dinamik.
3. Kunci `portrait` dalam `app.json` menghalang landscape sepenuhnya —
   tanpa dibukanya, logik responsif tidak pernah berjalan.

## Akibat

- Angka boleh tala: `700` (menegak) dan `0.35` (melintang) dalam
  `src/app/onboarding.tsx` — ubah dua nombor itu sahaja.
- Ubah `app.json` memerlukan RESTART PENUH app, bukan refresh biasa.
- Corak ini (ukur → banding → pilih) jadi templat untuk sebarang elemen
  responsif akan datang.
