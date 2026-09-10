# ADR-0001: Guna NativeWind untuk styling, bukan StyleSheet

Tarikh: 2026-09-10 · Status: diterima

## Konteks

Perlu pilih cara gaya rupa (warna, saiz, jarak) untuk semua skrin app
ajar ini. Calon: NativeWind (kelas `className`) lawan React Native
`StyleSheet` biasa.

## Keputusan

Guna kelas NativeWind untuk semua gaya statik. `StyleSheet`/gaya inline
hanya untuk yang NativeWind tak mampu: `SafeAreaView`, nilai dinamik
masa jalan (lihat ADR-0003), dan kes platform khas. Senarai penuh dalam
`AGENTS.md` (Style Exception Rules).

## Sebab

1. Kod skrin kekal pendek dan boleh dibaca pelajar — gaya duduk sebaris
   dengan elemen, bukan fail berasingan.
2. Token design (`global.css` + `src/theme/`) jadi satu sumber kebenaran
   untuk warna dan tipografi.
3. Konsisten dengan peraturan projek sedia ada — elak dua dialek gaya.

## Akibat

- Kelas baharu yang kerap ulang (contoh `type--h1`, `btn--primary`) mesti
  ditambah sebagai utility dalam `global.css` ikut kaedah BEM.
- Penyumbang mesti semak versi NativeWind dalam `package.json`
  (v5 preview) — sintaks versi lain tidak semestinya jalan.
