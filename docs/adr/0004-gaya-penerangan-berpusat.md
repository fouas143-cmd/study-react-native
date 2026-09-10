# ADR-0004: Gaya penerangan berpusat untuk semua harness

Tarikh: 2026-09-10 · Status: diterima

## Konteks

Pemilik belajar melalui vibe coding dan memerlukan penerangan Melayu
santai (analogi dunia nyata + dialog bagi setiap konsep kod) selepas
setiap perubahan kod dan untuk setiap soalan kod. Sebelum ini format ini
hanya hidup dalam chat — hilang tiap sesi baru — dan ia bercanggah
dengan peraturan `AGENTS.md` ("be concise").

## Keputusan

1. Format penuh disimpan sebagai sumber tunggal dalam
   `docs/explain-style.md` (persona, struktur 1-2-3-4, contoh rujukan).
2. `AGENTS.md` hanya simpan penunjuk pendek (blok "Explanation Style")
   — tidak menyalin keseluruhan prompt (jimat token, elak pendua).
3. Skop: format penuh HANYA untuk penerangan pasca-kerja + soalan kod;
   komunikasi lain kekal ringkas. Ini menyelesaikan percanggahan
   "be concise" tanpa memadamnya.

## Sebab

1. Satu sumber: semua harness (ikut `AGENTS.md` atau `CLAUDE.md` yang
   merujuknya) berkongsi gaya yang sama tanpa tampalan berulang.
2. Fail berasingan dibaca bila perlu sahaja — sesi yang tidak
   menerangkan tidak membayar cukai token prompt panjang.
3. Contoh rujukan yang tepat mengurangkan variasi kualiti antara harness.

## Akibat

- Ubah gaya = edit `docs/explain-style.md` sahaja; jangan salin ke
  `AGENTS.md` atau fail harness lain.
- Harness yang tidak membaca `AGENTS.md` (peraturan sendiri seperti
  `.cursorrules`) memerlukan penunjuk sebaris tambahan — buat bila perlu.
- Format ini menasihati, bukan mengunci: harness lemah mungkin patuh
  separa — masih lebih baik daripada tiada panduan.
