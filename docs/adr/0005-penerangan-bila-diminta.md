# ADR-0005: Penerangan panjang hanya bila diminta

Tarikh: 2026-09-10 · Status: diterima (menggantikan sebahagian ADR-0004)

## Konteks

ADR-0004 menetapkan format storytelling penuh untuk penerangan
pasca-kerja + soalan kod secara automatik. Pemilik maklum balas:
penjelasan automatik itu terlalu banyak — beliau mahu ringkasan pendek
sahaja melainkan beliau meminta detail.

## Keputusan

Format penuh `docs/explain-style.md` digunakan HANYA bila pemilik secara
eksplisit meminta ("jelaskan", "explain", "terangkan", atau seumpamanya).
Lalai untuk semua kes lain: ringkasan pendek (siap apa, fail disentuh,
cara verify) dalam bahasa mudah.

## Sebab

1. Kehendak eksplisit pemilik — keselesaan pembaca mengatasi kelengkapan.
2. Sesi pendek (tweak kecil) tidak berbaloi dengan karangan panjang;
   nisbah isyarat-hingar jatuh.
3. Format penuh kekal tersedia atas permintaan — tiada ilmu hilang,
   cuma tidak disuakan.

## Akibat

- `AGENTS.md` (blok gaya) dan `docs/explain-style.md` (skop) dikemas kini
  mencerminkan peraturan baru.
- Harness mesti menahan diri: walaupun format penuh "lebih bagus",
  jangan sukarela tanpa diminta.
