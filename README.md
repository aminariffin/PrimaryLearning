# PrimaryLearning — Math Saga KSSR (Darjah 1 hingga Darjah 6)

Aplikasi permainan Matematik serius bergaya **Candy Crush Saga** mengikut silibus **KSSR (Semakan) Malaysia** untuk murid **Darjah 1 hingga Darjah 6** (termasuk persediaan UASA).

## Struktur Folder Projek
- `index.html` — Antaramuka utama aplikasi (Pendaftaran Profil, Peta Saga, Arena Soalan + Kertas Conteng, Laporan Ibu Bapa)
- `assets/`
  - `styles.css` — Reka bentuk responsif mesra Tab Android
  - `icon.svg` — Ikon aplikasi PWA
- `js/`
  - `curriculum.js` — Enjin penjana soalan dinamik Darjah 1–6 (30 stesen termasuk Ujian Boss setiap Darjah)
  - `app.js` — Logik permainan, nyawa (hati), bintang, boosters, kertas conteng & simpanan progres
- `.github/workflows/deploy.yml` — Automasi GitHub Pages

## Cara Guna di Tab Android Melalui GitHub Pages
1. Muat naik (*push*) repositori ini ke GitHub.
2. Di GitHub, pergi ke **Settings -> Pages**, dan di bawah **Build and deployment (Source)** pilih **GitHub Actions** (atau **Deploy from a branch -> `main` / `/ (root)`**).
3. Buka pautan `https://<username-anda>.github.io/PrimaryLearning/` di pelayar Chrome pada **Tab Android** anak.
4. Tekan menu **⋮ -> Add to Home screen / Install app** untuk memasangnya di skrin utama Tab Android!
