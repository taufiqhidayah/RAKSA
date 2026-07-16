# GelangSiaga — Spesifikasi Produk

## 1. Ringkasan Produk

**GelangSiaga** (juga disebut **RAKSA-TAG** dalam cakupan yang diperluas) adalah sistem identifikasi darurat yang dibangun di sekitar gelang NFC/QR. Produk ini melayani tiga skenario keselamatan yang saling terkait:

1. **Darurat medis dewasa** — Ketika seseorang tidak sadar, terluka, atau tidak mampu berkomunikasi, orang di sekitar dapat mengetuk, memindai, atau mencari gelang untuk melihat informasi medis kritis dan menghubungi kontak darurat atau layanan darurat.
2. **Anak hilang & reunifikasi dengan wali** — Ketika anak terpisah dari orang tua atau wali di tempat ramai (mal, bandara, taman hiburan, festival, atau transportasi umum), orang di sekitar atau staf dapat mengetuk atau memindai gelang anak untuk segera menghubungi orang tua atau wali — bahkan ketika anak terlalu kecil untuk mengingat nomor telepon atau menjelaskan di mana orang tuanya berada.
3. **Orang tua lanjut usia & keselamatan kognitif** — Ketika orang tua lanjut usia memakai gelang yang dikelola anak dewasa mereka, orang di sekitar dapat membantu seseorang yang bingung, tersesat dari rumah, mungkin pingsan di kerumunan, atau hidup dengan Alzheimer/demensia. Halaman publik menampilkan kontak keluarga dan konteks keselamatan — bukan hanya triase klinis.

Dalam semua kasus, akses bersifat publik (tanpa login) dan hanya menampilkan informasi minimum yang dibutuhkan untuk skenario tersebut. Untuk gelang dewasa yang dipakai sendiri, itu berarti konteks medis; untuk anak, pesan "anak hilang" yang jelas dan kontak wali langsung; untuk orang tua lanjut usia, perpaduan konteks medis, panduan disorientasi, dan reunifikasi keluarga.

**Satu akun, banyak tag.** Satu akun GelangSiaga dapat mengelola beberapa gelang untuk anggota keluarga yang berbeda — gelang sendiri, tag untuk balita atau anak, dan tag untuk orang tua lanjut usia yang Anda rawat. Setiap tag memiliki profil, kontak, dan halaman publik sendiri. Menambah tag baru semudah **Register New Tag** (Daftar Tag Baru) → masukkan Kode Aktivasi → selesaikan setup wizard untuk pemakai tersebut.

Akses pemilik pribadi sepenuhnya terpisah dari akses darurat publik. Pemegang akun mengklaim setiap gelang menggunakan Kode Aktivasi pribadi, mengelola semua tag dari dashboard keluarga terpadu, dan dapat menonaktifkan tag jika hilang atau disalahgunakan. Ketika tag dependen (anak atau orang tua lanjut usia) dipindai, pemegang akun menerima alert in-app — dan opsional lokasi dari orang yang memindai — sehingga mereka tahu bantuan dibutuhkan dan ke mana harus pergi.

GelangSiaga dirancang sebagai aplikasi web responsif untuk MVP, menargetkan prototipe kompetisi bidang keselamatan dengan pendekatan praktis dan sadar privasi untuk identifikasi darurat yang dibantu orang di sekitar dan keselamatan keluarga.

---

## 2. Pernyataan Masalah

Ketika seseorang pingsan, jatuh, atau terlibat kecelakaan, orang di sekitar sering kali tidak dapat mengidentifikasi orang tersebut atau mengakses informasi kesehatan kritis. Ponsel korban mungkin terkunci, rusak, kehabisan baterai, atau tidak tersedia. Detail penting — kontak darurat, alergi, dan kondisi medis kritis — tetap tidak dapat diakses pada saat yang paling dibutuhkan.

Masalah kedua yang sama umumnya memengaruhi keluarga: **anak yang terpisah dari orang tua atau walinya**. Ini sering terjadi di ruang publik yang ramai — mal, bandara, acara keagamaan, konser, taman hiburan, dan perjalanan liburan. Anak kecil mungkin ketakutan, menangis, dan tidak mampu mengomunikasikan nama mereka dengan jelas, nomor telepon orang tua, atau tempat pertemuan yang seharusnya. Ponsel orang tua mungkin tidak terjangkau, dalam mode senyap, atau orang tua mungkin belum tahu anaknya hilang. Orang di sekitar dan staf keamanan ingin membantu dengan cepat, tetapi tidak memiliki cara andal untuk menghubungi wali.

Masalah ketiga memengaruhi **keluarga yang merawat orang tua lanjut usia**: lansia yang **lupa jalan pulang**, menjadi **bingung di tempat ramai**, hidup dengan **Alzheimer atau demensia**, atau memiliki kondisi yang membuat **pingsan tiba-tiba** lebih mungkin terjadi. Anak dewasa mereka tidak bisa ada di mana-mana. Ponsel orang tua mungkin tertinggal, mati, atau terlalu membingungkan untuk digunakan. Gelang yang dikelola anak memberi orang asing jalur langsung untuk menelepon keluarga — tanpa mengharuskan lansia mengingat apa pun.

Solusi yang ada sangat bergantung pada korban yang sadar dan mampu membuka kunci perangkatnya, atau pada kartu fisik yang mungkin tidak selalu dibawa. Untuk anak, orang tua terkadang menulis nomor telepon di lengan anak atau tag kertas — tetapi itu luntur, terlihat tidak profesional, dan mengekspos nomor secara permanen kepada semua orang. Untuk orang tua lanjut usia, anggota keluarga terkadang menempelkan catatan dengan nomor telepon di tas — tetapi mudah terlewat dan tidak membantu dalam darurat medis. Tidak ada mekanisme sederhana, selalu terlihat, ketuk-atau-pindai yang bekerja ketika orang tidak dapat berbicara dan ponselnya tidak dapat membantu — baik orang dewasa yang tidak sadar, anak yang hilang, maupun orang tua lanjut usia yang bingung dan perlu pulang.

---

## 3. Solusi yang Diusulkan

GelangSiaga menyediakan gelang yang berisi tag NFC (NTAG213), cadangan kode QR, Emergency ID yang terlihat, dan teks instruksi yang jelas seperti **"TAP / SCAN IN EMERGENCY"** (Ketuk / Pindai dalam Darurat).

Orang di sekitar menggunakan salah satu dari tiga jalur akses publik:

1. **Ketuk NFC** — membuka URL darurat publik yang dienkode pada tag
2. **Pindai QR** — URL darurat publik yang sama dengan NFC
3. **Pencarian manual** — masukkan Emergency ID yang terlihat di halaman pencarian

Halaman darurat publik tidak memerlukan login dan hanya menampilkan informasi kritis minimum dengan tombol aksi besar yang mobile-first untuk menghubungi kontak darurat atau menelepon layanan darurat. Setiap akses dicatat agar pemilik mengetahuinya.

Pemegang akun mengelola semua tag secara pribadi: mereka mendaftar sekali, lalu mengklaim setiap gelang dengan Kode Aktivasi dari paket/manual, mengisi profil darurat pemakai tersebut, melihat pratinjau apa yang akan dilihat orang di sekitar, dan mengaktifkan tag. Dari dashboard keluarga mereka dapat **Register New Tag** (Daftar Tag Baru) kapan saja untuk menambah gelang — untuk diri sendiri, anak, atau orang tua lanjut usia. Setiap tag dikonfigurasi independen; pemegang akun dapat edit, nonaktifkan, atau tinjau riwayat pemindaian per tag.

Untuk **gelang anak**, orang tua atau wali memiliki akun dan mengelola profil anak. Halaman publik memprioritaskan kontak wali daripada detail medis — aksi **Call Parent / Guardian** (Telepon Orang Tua / Wali) yang besar adalah CTA utama, dengan informasi alergi opsional untuk keselamatan.

Untuk **gelang orang tua lanjut usia**, anak dewasa (atau pengasuh) memiliki akun dan mengelola profil orang tua. Halaman publik memadukan konteks medis dengan reunifikasi keluarga — aksi **Call Family** (Telepon Keluarga) yang menonjol plus catatan disorientasi opsional (mis., "Mungkin perlu bantuan menemukan jalan pulang", "Alzheimer — harap tetap bersamanya").

Ketika **tag dependen** (anak atau lansia) dipindai, pemegang akun menerima **notifikasi pemindaian** di dashboard/aplikasi mereka. Halaman publik juga menawarkan aksi yang direkomendasikan untuk orang di sekitar — **Kirim Lokasi ke Keluarga** — agar pembantu dapat secara sukarela mengirim koordinat GPS saat ini ke pemegang akun, memungkinkan reunifikasi lebih cepat tanpa pelacakan terus-menerus pemakai gelang.

---

## 4. Use Case & Mode Produk

GelangSiaga mendukung tiga mode produk pada platform dan perangkat keras yang sama. Mode dipilih saat setup dan menentukan tata letak halaman publik, field yang wajib diisi, dan teks instruksi default pada gelang. Semua mode berbagi **akun keluarga** yang sama — satu login dapat mengelola beberapa tag dalam kombinasi mode apa pun.

### Mode A: Darurat Dewasa (`adult_emergency`)

**Skenario:** Dewasa tidak sadar, terluka, atau tidak mampu berkomunikasi — biasanya **dikelola sendiri** (pemakai memiliki akun) atau dipakai dewasa yang mengelola tag sendiri.

**Prioritas halaman publik:**
1. Informasi medis kritis (alergi, kondisi, obat-obatan)
2. Hubungi kontak darurat
3. Telepon layanan darurat
4. Opsional: **Kirim Lokasi ke Keluarga** (jika kontak keluarga dikonfigurasi)

**Label gelang:** `TAP / SCAN IN EMERGENCY`

**Pemakai tipikal:** Dewasa, atlet, orang dengan kondisi kronis yang mengelola gelang sendiri.

---

### Mode B: Wali Anak (`child_guardian`)

**Skenario:** Anak terpisah dari orang tua/wali di tempat publik — **dikelola akun orang tua/wali**, bukan anak.

**Prioritas halaman publik:**
1. Pesan anak hilang yang jelas (mis., "Anak ini mungkin hilang — silakan hubungi walinya")
2. Nama depan atau panggilan anak + perkiraan usia
3. **Call Parent / Guardian** — tombol aksi utama (tel: / WhatsApp)
4. **Kirim Lokasi ke Keluarga** — aksi hero sekunder yang direkomendasikan (lihat Bagian 4.4)
5. Kontak wali sekunder opsional
6. Alergi kritis (jika ada) — penting juga untuk anak
7. Catatan opsional: titik pertemuan, "hanya berbahasa Indonesia", non-verbal, dll.

**Label gelang:** `SCAN IF LOST` atau `TAP / SCAN IF LOST`

**Pemakai tipikal:** Anak dan balita usia ~2–12 di bawah pengelolaan orang tua/wali.

**Model akun:** Orang tua/wali memiliki akun Supabase dan mengelola satu atau lebih gelang anak dari dashboard mereka. Anak tidak memerlukan login sendiri.

**Perbedaan utama dari mode dewasa:** Kontak telepon wali adalah **aksi utama** di halaman publik. Field medis opsional dan minimal. Halaman dioptimalkan agar staf mal, acara, atau orang baik hati dapat menyatukan kembali anak dengan keluarganya dalam hitungan detik — bukan untuk triase klinis.

---

### Mode C: Orang Tua Lanjut Usia (`elderly_dependent`)

**Skenario:** Orang tua lanjut usia atau dewasa dependen yang mungkin **bingung**, **lupa jalan pulang**, hidup dengan **Alzheimer/demensia**, atau **tiba-tiba pingsan di kerumunan** — **dikelola akun anak dewasa atau pengasuh**, bukan pemakai.

**Prioritas halaman publik:**
1. Header alert (mis., "Orang ini mungkin butuh bantuan — silakan hubungi keluarganya")
2. Nama panggilan + perkiraan usia
3. Info medis kritis (alergi, kondisi, obat — terutama relevan jika pingsan)
4. Catatan disorientasi/kognitif (mis., "Alzheimer", "Mungkin tidak ingat alamat rumah", "Harap tetap bersamanya")
5. **Call Family / Caregiver** (Telepon Keluarga / Pengasuh) — tombol aksi utama
6. **Kirim Lokasi ke Keluarga** — aksi co-primary yang direkomendasikan
7. Telepon layanan darurat (112 / 119)
8. Catatan reunifikasi opsional (mis., "Tinggal di area Jakarta Selatan — keluarga akan jemput")

**Label gelang:** `TAP / SCAN IF LOST` atau `TAP / SCAN IN EMERGENCY`

**Pemakai tipikal:** Orang tua lanjut usia (60+), penderita penurunan kognitif, atau dependen berisiko wandering — dikelola anak dewasa atau pengasuh.

**Model akun:** Anak dewasa atau pengasuh memiliki akun. Mereka setup dan maintain profil orang tua, kontak darurat (biasanya diri sendiri dan saudara), dan menerima notifikasi pemindaian. Lansia tidak perlu login atau smartphone sendiri.

**Perbedaan utama dari mode dewasa self-managed:** Reunifikasi keluarga dan **telepon keluarga** sama pentingnya dengan info medis. Pengelola akun selalu anak dewasa, bukan orang yang memakai gelang.

**Contoh nyata:**
- Seorang anak laki-laki di Jakarta membuat tag untuk ibunya berusia 78 tahun yang terkadang lupa jalan pulang dari pasar.
- Seorang anak perempuan setup gelang untuk ayahnya dengan Alzheimer stadium awal sebelum acara Lebaran yang ramai.
- Pengasuh mengelola tag untuk klien lansia yang pernah pingsan di lingkungan panas dan ramai.

---

### 4.1 Akun Keluarga & Model Multi-Tag

Satu akun GelangSiaga mendukung **beberapa gelang** untuk anggota keluarga berbeda. Pemegang akun selalu user yang login; setiap tag mewakili **pemakai** dengan profil sendiri.

| Peran tag | Siapa yang memakai | Siapa yang mengelola | Mode tipikal |
|-----------|-------------------|----------------------|--------------|
| **Self (Diri sendiri)** | Pemegang akun | Diri sendiri | `adult_emergency` |
| **Child (Anak)** | Anak/balita | Orang tua/wali | `child_guardian` |
| **Elderly parent (Orang tua)** | Ibu/ayah/kakek-nenek | Anak dewasa/pengasuh | `elderly_dependent` |

**Contoh setup keluarga:**

| Pemegang akun | Tag yang dikelola |
|---------------|-------------------|
| Dewasa untuk diri sendiri | 1× gelang sendiri |
| Orang tua dengan balita | 1× gelang sendiri + 1× gelang anak |
| Anak dewasa merawat orang tua lanjut usia | 1× gelang orang tua (atau + gelang sendiri) |
| Orang tua dengan 2 anak + gelang sendiri | 1× self + 2× gelang anak |
| Caregiver generasi sandwich | 1× self + 1× anak + 1× orang tua lanjut usia |

**Alur Register New Tag (tambah tag ke akun yang sudah ada):**

```
Dashboard / Halaman Keluarga
    │
    └──► Register New Tag (Daftar Tag Baru)
              │
              └──► Masukkan Kode Aktivasi (dari paket baru)
                        │
                        └──► Setup Wizard untuk tag ini saja
                                  ├── Langkah 0: Tag ini untuk siapa? (Diri sendiri / Anak / Orang tua)
                                  ├── Langkah 0b: Pilih mode profil (auto-suggest dari peran)
                                  ├── Langkah 1–6: Sama seperti setup pertama (profil per tag)
                                  └──► Tag muncul di dashboard keluarga
```

Tidak perlu akun kedua. Setiap tag punya Emergency ID, token publik, profil, kontak, dan riwayat pemindaian sendiri.

---

### 4.2 Notifikasi Pemindaian ke Pemegang Akun

Ketika **tag dependen** (`child_guardian` atau `elderly_dependent`) — atau tag apa pun dengan notifikasi aktif — dipindai:

1. Sistem membuat entri `scan_logs` seperti biasa.
2. Pemegang akun menerima **notifikasi in-app** (MVP: badge dashboard + daftar notifikasi; post-MVP: push/SMS).
3. Notifikasi menampilkan: nama pemakai, waktu, metode akses (NFC/QR/manual), dan link ke detail pemindaian.
4. Jika orang di sekitar juga mengetuk **Kirim Lokasi ke Keluarga**, notifikasi menyertakan **pin peta perkiraan** dari perangkat pemindai.

**Contoh copy notifikasi:**
- "Tag Budi dipindai — seseorang mungkin sedang membantunya"
- "Tag ibu Anda dipindai pukul 14:32 — ketuk untuk lihat detail"
- "Lokasi dibagikan: seseorang menemukan Ani di dekat [area perkiraan]"

Ini adalah **alerting saat pemindaian**, bukan pelacakan GPS terus-menerus pemakai gelang. Orang tua/anak hanya tahu ketika ada orang yang secara aktif memindai — momen keselamatan yang dimaksudkan.

---

### 4.3 Berbagi Lokasi oleh Orang di Sekitar (Desain yang Direkomendasikan)

Ketika orang di sekitar membuka halaman publik dependen (anak atau lansia), mereka harus melihat tombol menonjol untuk membantu keluarga **tahu di mana pemakai ditemukan**. Ini menggunakan **GPS ponsel pemindai** dengan persetujuan eksplisit — bukan melacak gelang atau pemakai.

**Label tombol utama yang direkomendasikan:**

| Bahasa | Label direkomendasikan | Subteks |
|--------|------------------------|---------|
| English | **Share Location with Family** | "Send your current location so their family can find them" |
| Indonesian | **Kirim Lokasi ke Keluarga** | "Kirim lokasi Anda agar keluarga bisa menemukan mereka" |

**Mengapa label ini:** Jelas, orientasi aksi, menjelaskan siapa penerima data (keluarga, bukan polisi atau orang asing). Tidak terdengar seperti surveillance. Cocok untuk skenario anak hilang maupun lansia bingung.

**Label alternatif (dapat diterima):**

| Label | Terbaik untuk |
|-------|---------------|
| **I'm Helping — Share My Location** / **Saya Sedang Membantu — Kirim Lokasi** | Menekankan bantuan sukarela orang di sekitar |
| **Send Location to Guardian** / **Kirim Lokasi ke Wali** | Mode anak khusus |
| **Alert Family + Share Location** | Aksi satu ketuk gabungan (notifikasi + geolokasi) — post-MVP |

**Tidak direkomendasikan:** "Track this person", "Emergency GPS", "Find my child" — implikasi pelacakan terus-menerus atau salah menyatakan siapa yang dilokasi.

**Alur orang di sekitar:**

1. Orang di sekitar pindai NFC/QR → halaman publik terbuka.
2. Pemegang akun menerima notifikasi pemindaian segera (meski orang di sekitar tidak melakukan apa-apa lagi).
3. Orang di sekitar ketuk **Kirim Lokasi ke Keluarga**.
4. Browser meminta izin lokasi (sekali, persetujuan eksplisit).
5. Jika diizinkan: koordinat dikirim ke server → terhubung ke `scan_logs` → pemegang akun lihat pin peta di notifikasi/detail pemindaian.
6. Jika ditolak: halaman tetap berfungsi — tombol telepon/WhatsApp tetap tersedia; tidak ada lokasi dibagikan.

**Aturan privasi:**
- Lokasi adalah **posisi pemindai** (di mana bantuan terjadi), bukan tracker tersembunyi pemakai.
- Koordinat dibagikan **hanya ke pemegang akun** dan kontak darurat terkait — tidak pernah publik.
- Lokasi **tidak disimpan selamanya** — simpan untuk window reunifikasi (mis., 7 hari) lalu hapus atau anonimkan.
- Rate limit submit lokasi per sesi pemindaian untuk cegah abuse.

---

### Perilaku Platform Bersama

Semua mode menggunakan hal yang sama:
- Tag NFC NTAG213 + QR + Emergency ID yang terlihat
- Pola URL publik (`/e/[token]`)
- Alur klaim Kode Aktivasi (tag pertama atau Register New Tag)
- Dashboard keluarga multi-tag
- Pencatatan pemindaian + berbagi lokasi opsional
- Notifikasi pemindaian ke pemegang akun
- Kemampuan nonaktifkan/cabut per tag
- Pemisahan privasi (akses publik vs. pemilik)

Sistem memilih template halaman publik yang benar berdasarkan `wristbands.profile_mode` saat render.

---

## 5. Kategori Produk / Track

| Atribut | Nilai |
|---------|-------|
| **Kategori** | Keselamatan & Identifikasi Darurat / Keselamatan Keluarga |
| **Track** | Kompetisi — Safety / Health Tech |
| **Bentuk produk** | Gelang fisik + aplikasi web responsif |
| **Model akses** | Akses darurat publik + portal pemilik pribadi |
| **Mode produk** | Darurat dewasa + Reunifikasi wali anak + Orang tua lanjut usia |
| **Model akun** | Satu akun, banyak tag (diri sendiri + anak + orang tua lanjut usia) |
| **Deployment** | Aplikasi web cloud-hosted (Vercel + Supabase) |

---

## 6. Technology Stack

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | Next.js (App Router) |
| **Backend / BaaS** | Supabase |
| **Database** | Supabase PostgreSQL |
| **Authentication** | Supabase Auth |
| **Authorization** | Supabase Row Level Security (RLS) |
| **Storage** | Supabase Storage (hanya jika diperlukan nanti) |
| **Hosting** | Vercel atau provider kompatibel Next.js lainnya |
| **Tag NFC** | NTAG213 |
| **Kode QR** | Dihasilkan dari URL darurat publik yang sama dengan NFC |
| **Tipe aplikasi (MVP)** | Aplikasi web responsif — bukan aplikasi mobile native |

---

## 7. Target Pengguna

### Pengguna Utama (Pemegang Akun / Wali / Pengasuh)

- Individu yang menginginkan ID darurat yang terlihat dan selalu dapat diakses untuk diri sendiri
- Orang dengan alergi, kondisi kronis, atau obat-obatan penting yang diketahui
- **Orang tua atau wali** yang menginginkan cara andal agar orang asing dapat menghubungi mereka jika anak atau balita mereka hilang di tempat publik
- **Anak dewasa** yang ingin melindungi **orang tua lanjut usia** yang lupa jalan pulang, Alzheimer/demensia, atau mungkin pingsan di kerumunan
- **Caregiver generasi sandwich** yang mengelola tag untuk diri sendiri, anak, dan orang tua lanjut usia dari satu akun
- Keluarga yang bepergian ke tempat ramai (mal, bandara, taman hiburan, acara keagamaan, Lebaran)
- Atlet, pekerja komuter, dan peserta aktivitas outdoor

### Pemakai Utama (Tag Dependen — Mode Anak & Lansia)

**Anak:**
- Anak dan balita usia sekitar 2–12 tahun yang mungkin tidak tahu atau tidak dapat andal membagikan nomor telepon orang tua
- Anak non-verbal atau pemalu dalam situasi pemisahan yang menegangkan
- Gelang dipakai anak; akun dan pengelolaan tetap dengan orang tua/wali

**Orang tua lanjut usia:**
- Orang tua lanjut usia yang mungkin bingung, wandering, atau lupa jalan pulang
- Penderita Alzheimer, demensia, atau penurunan kognitif
- Lansia berisiko pingsan atau episode medis di lingkungan panas/ramai
- Gelang dipakai lansia; akun dan pengelolaan tetap dengan anak dewasa atau pengasuh
- Pemakai tidak perlu smartphone atau login terpisah

### Pengguna Sekunder (Orang di Sekitar / First Responder)

- Pejalan kaki yang menemukan orang tidak sadar atau tidak responsif
- Orang baik hati di lokasi kecelakaan
- **Staf keamanan mal, staf acara, dan personel bandara** yang membantu anak hilang atau lansia bingung
- First responder non-medis yang membutuhkan konteks identifikasi cepat

### Pengguna Tersier (Administrator)

- Produsen atau penyelenggara kompetisi yang membuat gelang secara batch
- Staf dukungan yang menangani gelang yang hilang, dicuri, atau dicabut

---

## 8. Konsep Perangkat Keras

Setiap gelang GelangSiaga mencakup:

| Komponen | Tujuan |
|----------|--------|
| **Tag NFC NTAG213** | Menyimpan URL HTTPS dengan token darurat publik saja — tidak ada data medis di tag |
| **Kode QR** | Metode akses cadangan; URL yang sama dengan NFC |
| **Emergency ID yang terlihat** | Fallback yang dapat dibaca manusia untuk pencarian manual (mis., `GS-XXXX-XXXX`) |
| **Teks instruksi** | Label spesifik mode (lihat di bawah) |

**Teks instruksi per mode:**

| Mode | Label gelang |
|------|--------------|
| Darurat dewasa (self) | `TAP / SCAN IN EMERGENCY` |
| Wali anak | `SCAN IF LOST` atau `TAP / SCAN IF LOST` |
| Orang tua lanjut usia | `TAP / SCAN IF LOST` atau `TAP / SCAN IN EMERGENCY` |

**Varian gelang per pemakai:**
- **Anak:** Strap lebih kecil, warna high-visibility, desain menarik opsional
- **Lansia:** Kait nyaman, teks instruksi cetak besar, warna kontras tinggi
- **Dewasa self:** Ukuran standar; arsitektur NFC/QR/Emergency ID sama — hanya label dan mode profil berbeda

Paket / buku manual berisi:

- **Kode Aktivasi Pribadi** — kode sekali pakai untuk mengklaim kepemilikan
- Instruksi setup
- Penjelasan penggunaan darurat untuk pemilik dan orang di sekitar

**Penting:** NFC dan QR hanya berisi URL publik. Semua data medis dan kontak disimpan di database dan disajikan hanya melalui endpoint publik yang terkontrol.

---

## 9. Model Kode dan Akses

GelangSiaga secara ketat memisahkan akses darurat publik dari akses pemilik pribadi.

### Akses Darurat Publik

| Metode | Identifier | Login Diperlukan | Data yang Ditampilkan |
|--------|------------|------------------|------------------------|
| Ketuk NFC | Token publik di URL | Tidak | Hanya info kritis minimum |
| Pindai QR | Token publik di URL | Tidak | Hanya info kritis minimum |
| Pencarian Emergency ID | Emergency ID yang terlihat | Tidak | Hanya info kritis minimum |

**Halaman publik menampilkan (mode dewasa):** nama panggilan/inisial, perkiraan usia, alergi kritis, kondisi penting, obat-obatan penting, timestamp terakhir diperbarui, dan disclaimer informasi yang dilaporkan sendiri.

**Halaman publik menampilkan (mode anak):** pesan peringatan anak hilang, nama depan atau panggilan anak, perkiraan usia, aksi kontak wali utama (Call Parent/Guardian), tombol **Kirim Lokasi ke Keluarga**, wali sekunder opsional, alergi kritis jika ada, catatan reunifikasi opsional, timestamp terakhir diperbarui, dan disclaimer informasi wali.

**Halaman publik menampilkan (mode orang tua lanjut usia):** pesan alert disorientasi, nama panggilan, perkiraan usia, alergi dan kondisi medis kritis, catatan disorientasi/kognitif (mis., Alzheimer), aksi **Call Family / Caregiver**, tombol **Kirim Lokasi ke Keluarga**, telepon layanan darurat, catatan reunifikasi opsional (area umum saja — bukan alamat lengkap), timestamp terakhir diperbarui, dan disclaimer informasi keluarga.

**Halaman publik tidak menampilkan:** nama lengkap, NIK, alamat rumah, nama sekolah, riwayat medis lengkap, atau detail akun pemilik. Untuk mode dewasa, nomor telepon sebaiknya hanya sebagai tombol aksi; untuk mode anak, kontak wali melalui tombol telepon/WhatsApp yang menonjol adalah aksi utama — opsional menampilkan nomor yang disamarkan atau sebagian untuk verifikasi staf (dapat dikonfigurasi oleh wali).

### Akses Pemilik Pribadi

| Metode | Identifier | Login Diperlukan | Kemampuan |
|--------|------------|------------------|-----------|
| Kode Aktivasi | Kode dari manual/paket | Ya (register/login) | Klaim kepemilikan gelang |
| Dashboard pemilik | Sesi terautentikasi | Ya | Kelola semua tag, edit profil, lihat pemindaian, terima notifikasi, nonaktifkan tag |
| Register New Tag | Kode Aktivasi + sesi terautentikasi | Ya | Tambah gelang ke akun yang sudah ada |

**Properti Kode Aktivasi:**

- Pribadi — tidak pernah dicetak di gelang itu sendiri
- Sekali pakai — dikonsumsi saat klaim berhasil
- Disimpan sebagai hash di database — tidak pernah plain text
- Terikat ke tepat satu record gelang

> **Catatan implementasi MVP:** pada kode saat ini, Kode Aktivasi masih disimpan
> sebagai teks 6 karakter (bukan hash) agar konsisten dengan alur klaim yang ada.
> Migrasi ke hash adalah refactor terpisah (menyentuh alur klaim) dan dicatat
> sebagai tech debt.

### Akses Superadmin (Admin)

| Metode | Identifier | Login Diperlukan | Kemampuan |
|--------|------------|------------------|-----------|
| Dashboard admin (`/admin`) | Sesi terautentikasi + `SUPERADMIN_USER_ID` | Ya | Registrasi tag (generate Public ID, public token, Kode Aktivasi), lihat/cari/filter semua tag, revoke, hapus tag unclaimed |

**Model otorisasi superadmin:**

- **Autentikasi** memakai Supabase Auth biasa (email/password) — tidak ada sistem login terpisah.
- **Otorisasi** ditentukan oleh environment variable server `SUPERADMIN_USER_ID` (uuid akun), **bukan** baris di database. Ini mencegah privilege escalation lewat data: meski seseorang bisa menulis ke `profiles`, mereka tetap tidak bisa menjadikan diri admin.
- Ditegakkan berlapis: **middleware** (redirect non-superadmin), **layout** server, dan **setiap Server Action** (`assertSuperadmin`).
- Operasi tulis admin memakai **service-role client** (bypass RLS) di server, karena RLS bersifat owner-only dan superadmin tidak direpresentasikan di JWT.
- Public token & Emergency ID **di-generate kriptografis** (bukan diketik manual). Kode Aktivasi ditampilkan **sekali** setelah generate untuk dicetak ke paket.

---

## 10. Alur Sistem Tingkat Tinggi

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRODUSEN / ADMIN                              │
│  Buat batch gelang → Generate Emergency ID, token publik,       │
│  Kode Aktivasi → Tulis NFC/QR dengan URL publik → Cetak kode    │
│  di manual/paket                                                 │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PELANGGAN / PEMILIK                         │
│  Beli gelang → Register/Login → Klaim dengan Kode Aktivasi →    │
│  Isi profil darurat → Pratinjau halaman publik → Aktivasi       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DARURAT / ORANG DI SEKITAR                    │
│  Ketuk NFC / Pindai QR / Masukkan Emergency ID → Halaman        │
│  darurat publik terbuka → Lihat info kritis → Hubungi kontak     │
│  darurat atau layanan darurat → Sistem mencatat log pemindaian   │
└─────────────────────────────────────────────────────────────────┘
```

**Langkah demi langkah:**

1. Produsen/admin membuat record gelang di sistem.
2. Sistem menghasilkan Emergency ID, token darurat publik, dan Kode Aktivasi pribadi.
3. Tag NFC dan kode QR ditulis dengan URL darurat publik (`/e/[token]`).
4. Kode Aktivasi ditempatkan di dalam paket/buku manual — bukan di gelang.
5. Pelanggan membeli gelang.
6. Pelanggan mendaftar atau login via Supabase Auth.
7. Pelanggan mengklaim gelang menggunakan Kode Aktivasi.
8. Pelanggan mengisi profil darurat dan menambahkan kontak darurat.
9. Pelanggan meninjau pratinjau darurat publik dan mengaktifkan gelang.
10. Status gelang menjadi **active**.
11. Saat darurat, orang di sekitar mengetuk NFC, memindai QR, atau memasukkan Emergency ID.
12. Halaman darurat publik terbuka tanpa login.
13. Orang di sekitar melihat informasi kritis minimum dan tombol aksi.
14. Orang di sekitar menghubungi kontak darurat atau layanan darurat.
15. Sistem mencatat entri log pemindaian.

**Varian anak hilang (langkah 11–15):**

11. Anak terpisah dari orang tua di tempat ramai; orang di sekitar atau staf melihat anak yang stres dengan gelang.
12. Orang di sekitar memindai QR atau mengetuk NFC (atau memasukkan Emergency ID).
13. Halaman publik terbuka dengan **template anak hilang** — kontak wali adalah aksi utama.
14. Orang di sekitar menelepon atau WhatsApp orang tua/wali; orang tua merespons dan bersatu kembali dengan anak.
15. Sistem mencatat log pemindaian; orang tua mungkin menerima notifikasi (versi mendatang — prioritas tinggi untuk mode anak).

---

## 11. Alur Pengguna

### Alur Onboarding Pemilik

```
Landing Page
    │
    ├──► Register / Login (Supabase Auth)
    │
    └──► Klaim Gelang
              │
              └──► Masukkan Kode Aktivasi
                        │
                        ├──► Kode tidak valid → Tampilkan error, coba lagi
                        ├──► Sudah diklaim → Tampilkan error sudah diklaim
                        └──► Valid & belum diklaim → Hubungkan gelang ke user
                                    │
                                    └──► Setup Wizard
                                              ├── Langkah 0: Pilih mode profil (Dewasa / Anak)
                                              ├── Langkah 1: Identitas dasar
                                              ├── Langkah 2: Info medis kritis (dewasa) ATAU alergi + catatan (anak)
                                              ├── Langkah 3: Kontak darurat / Kontak wali
                                              ├── Langkah 4: Tinjauan privasi
                                              ├── Langkah 5: Pratinjau darurat publik
                                              └── Langkah 6: Aktivasi gelang
                                                        │
                                                        └──► Dashboard (gelang aktif)
```

### Alur Pemilik / Keluarga Berkelanjutan

Dari dashboard atau halaman keluarga, pemegang akun dapat:

- Melihat semua tag yang dikelola (diri sendiri, anak, orang tua lanjut usia) dengan status sekilas
- **Register New Tag** — tambah gelang ke akun
- Edit profil darurat per tag
- Kelola kontak darurat per tag
- Lihat riwayat pemindaian per tag
- Menerima dan tinjau **notifikasi pemindaian** (dengan pin lokasi opsional)
- Nonaktifkan tag (skenario hilang/disalahgunakan)
- Tinjau ulang pratinjau darurat publik per tag

### Alur Wali / Pengasuh (Mode Anak & Lansia)

Orang tua, wali, atau anak dewasa mengikuti alur klaim/setup yang sama (tag pertama atau Register New Tag), dengan perbedaan berikut:

**Untuk tag anak:**
1. Pilih mode **Child Guardian** (atau "Tag ini untuk anak saya" saat setup).
2. Masukkan nama depan/panggilan dan perkiraan usia anak.
3. Tambahkan **kontak wali** — minimal satu telepon orang tua/wali.
4. Opsional tambahkan alergi dan catatan reunifikasi.
5. Aktifkan **notifikasi pemindaian** (default on untuk tag dependen).
6. Pratinjau **halaman publik anak hilang** termasuk tombol **Kirim Lokasi ke Keluarga**.
7. Dari dashboard keluarga, kelola beberapa tag anak di bawah satu akun.

**Untuk tag orang tua lanjut usia:**
1. Pilih mode **Elderly Dependent** (atau "Tag ini untuk orang tua/anggota keluarga lansia").
2. Masukkan nama panggilan dan perkiraan usia orang tua.
3. Tambahkan **kontak keluarga/pengasuh** — biasanya anak dewasa yang setup, plus saudara jika perlu.
4. Isi info medis kritis (obat, alergi, kondisi — terutama jika risiko pingsan).
5. Tambahkan **catatan disorientasi** — flag Alzheimer/demensia, "mungkin lupa jalan pulang", "harap tetap bersamanya".
6. Aktifkan **notifikasi pemindaian** (default on).
7. Pratinjau **halaman publik orang tua lanjut usia** sebelum aktivasi.
8. Lansia tidak perlu menggunakan app — anak dewasa mengelola semuanya.

**Contoh: Orang tua yang sudah punya tag sendiri, beli tag untuk anak:**
1. Orang tua login ke akun yang sudah ada.
2. Ketuk **Register New Tag** dari dashboard.
3. Masukkan Kode Aktivasi dari paket anak.
4. Selesaikan setup wizard untuk anak → tag anak muncul di samping tag sendiri.
5. Ketika seseorang memindai gelang anak → orang tua dapat notifikasi + lokasi opsional di app mereka.

---

## 12. Alur Darurat

### Alur A: Darurat Medis Dewasa

1. **Korban tidak sadar atau tidak mampu berkomunikasi.**
2. **Orang di sekitar melihat gelang** dengan instruksi "TAP / SCAN IN EMERGENCY" dan Emergency ID yang terlihat.
3. **Orang di sekitar mengetuk NFC atau memindai kode QR.**
4. **Jika NFC/QR gagal** (perangkat tidak mendukung, QR rusak), orang di sekitar memasukkan Emergency ID secara manual di halaman pencarian (`/lookup`).
5. **Halaman darurat publik terbuka** — tanpa login (`/e/[token]`).
6. **Halaman menampilkan:**
   - Nama panggilan atau inisial
   - Perkiraan usia
   - Alergi kritis
   - Kondisi medis penting
   - Obat-obatan penting
   - Timestamp terakhir diperbarui
   - Disclaimer informasi yang dilaporkan sendiri
7. **Orang di sekitar mengambil tindakan:**
   - Ketuk **Contact emergency contact** (Hubungi kontak darurat) (aksi tel: atau WhatsApp — telepon tidak ditampilkan sebagai teks biasa jika memungkinkan)
   - Ketuk **Call ambulance / emergency service** (Telepon ambulans / layanan darurat) (mis., 112 / 119)
8. **Sistem mencatat event pemindaian** di `scan_logs` dengan metode akses dan timestamp.
9. **Notifikasi pemilik/keluarga** — direncanakan untuk versi mendatang, bukan MVP.

---

### Alur B: Anak Hilang & Reunifikasi Wali

1. **Anak terpisah** dari orang tua/wali di tempat ramai (mal, bandara, acara, dll.).
2. **Orang di sekitar atau staf melihat** anak sendirian, stres, atau mencari orang tuanya. Gelang menampilkan **"SCAN IF LOST"**.
3. **Orang di sekitar memindai QR atau mengetuk NFC** pada gelang anak.
4. **Jika NFC/QR gagal**, orang di sekitar memasukkan Emergency ID yang terlihat di `/lookup`.
5. **Halaman anak hilang publik terbuka** — tanpa login (`/e/[token]`, template anak).
6. **Halaman menampilkan:**
   - Header menonjol: **"Anak ini mungkin hilang — silakan hubungi walinya"**
   - Nama depan atau panggilan anak
   - Perkiraan usia
   - Alergi kritis (jika dikonfigurasi)
   - Catatan reunifikasi opsional dari wali
   - Timestamp terakhir diperbarui
7. **Orang di sekitar mengambil tindakan (utama):**
   - Ketuk **Call Parent / Guardian** — tombol besar, link tel:
   - Ketuk **Kirim Lokasi ke Keluarga** — kirim GPS pemindai ke orang tua (hero button kedua yang direkomendasikan)
   - Ketuk **WhatsApp Parent / Guardian** — umum di Indonesia
   - Opsional: **Telepon wali sekunder** jika yang utama tidak menjawab
8. **Orang tua/wali menerima notifikasi pemindaian** di app segera — dengan pin peta jika lokasi dibagikan (in-app MVP; push/SMS post-MVP).
9. **Orang tua/wali menjawab**, mengonfirmasi identitas, dan bersatu kembali dengan anak. Orang di sekitar dapat tetap bersama anak hingga wali tiba.
10. **Sistem mencatat event pemindaian** di `scan_logs` dengan data lokasi opsional.

**Penting:** Alur ini untuk **reunifikasi**, bukan pelacakan atau pengawasan anak. GelangSiaga tidak melacak lokasi anak secara terus-menerus — hanya membantu ketika orang di sekitar secara aktif memindai gelang. Berbagi lokasi berasal dari **ponsel orang di sekitar**, dengan persetujuan eksplisit.

---

### Alur C: Lansia Bingung, Wandering, atau Episode Medis

1. **Lansia menjadi tersesat, bingung, atau pingsan** di tempat publik — pasar, masjid, mal, atau acara ramai.
2. **Orang di sekitar melihat** kebingungan, perilaku wandering, atau lansia tidak sadar dengan gelang **"TAP / SCAN IF LOST"** atau **"TAP / SCAN IN EMERGENCY"**.
3. **Orang di sekitar memindai QR atau mengetuk NFC** pada gelang.
4. **Jika NFC/QR gagal**, orang di sekitar memasukkan Emergency ID di `/lookup`.
5. **Halaman orang tua lanjut usia publik terbuka** — tanpa login (`/e/[token]`, template lansia).
6. **Pemegang akun (anak dewasa) menerima notifikasi pemindaian** di dashboard/app segera.
7. **Halaman menampilkan:**
   - Header menonjol: **"Orang ini mungkin butuh bantuan — silakan hubungi keluarganya"**
   - Nama panggilan + perkiraan usia
   - Alergi, kondisi, obat kritis
   - Catatan disorientasi (mis., "Alzheimer — mungkin tidak tahu alamat")
   - Catatan reunifikasi (area umum saja)
   - Timestamp terakhir diperbarui
8. **Orang di sekitar mengambil tindakan:**
   - Ketuk **Call Family / Caregiver** — tombol utama
   - Ketuk **Kirim Lokasi ke Keluarga** — kirim GPS pemindai ke pemegang akun
   - Ketuk **Telepon layanan darurat** (112 / 119) jika darurat medis
9. **Anak dewasa menerima notifikasi** dengan waktu pemindaian dan pin peta opsional → menelepon balik atau menuju lokasi.
10. **Sistem mencatat event pemindaian** di `scan_logs` dengan field `shared_location` opsional.

**Penting:** Prinsip privasi sama dengan mode anak — **tanpa pelacakan terus-menerus** lansia. Lokasi hanya saat pemindaian dan berasal dari perangkat pembantu saja.

---

## 13. Alur UI/UX

### Prinsip Desain

- **Mobile-first** untuk semua halaman darurat publik — orang di sekitar menggunakan ponsel dalam kondisi stres
- **Target sentuh besar** — minimum 48px tombol di halaman darurat
- **Kontras tinggi** — dapat dibaca di bawah sinar matahari terang dan cahaya redup
- **Beban kognitif minimal** — info kritis dulu, tanpa navigasi yang membingungkan
- **Loading cepat** — halaman darurat publik harus load dalam waktu di bawah 2 detik di 3G
- **Pemisahan jelas** — dashboard pemilik terasa seperti aplikasi produk; halaman darurat terasa seperti utilitas penyelamat nyawa

### Inventaris Layar dan Perjalanan

#### Landing Page (`/`)

**Tujuan:** Menjelaskan nilai produk dan mengarahkan pengguna ke entry point yang tepat.

| Elemen | Deskripsi |
|--------|-----------|
| Hero section | Pernyataan masalah + solusi dalam satu kalimat |
| Tab use case | Darurat dewasa + skenario anak hilang |
| Cara kerja | Visual 3 langkah: Pakai → Setup → Pindai untuk membantu |
| CTA: "Activate Wristband" (Aktivasi Gelang) | Mengarah ke `/login` atau `/claim` |
| CTA: "Emergency Lookup" (Pencarian Darurat) | Mengarah ke `/lookup` |
| Footer | Catatan privasi, disclaimer, kontak |

---

#### Halaman Auth (`/login`)

**Tujuan:** Register atau login menggunakan Supabase Auth.

| Elemen | Deskripsi |
|--------|-----------|
| Form email/password | Supabase Auth standar |
| Toggle register/login | Satu halaman dengan switch mode |
| Redirect setelah auth | User baru → `/claim`; user kembali → `/dashboard` |

---

#### Halaman Klaim Gelang (`/claim`)

**Tujuan:** Menghubungkan gelang fisik ke akun pemilik yang terautentikasi.

| Elemen | Deskripsi |
|--------|-----------|
| Input Kode Aktivasi | Satu field, normalisasi uppercase |
| Teks bantuan | "Temukan Kode Aktivasi Anda di dalam paket/buku manual" |
| Submit | Validasi kode, hubungkan gelang |
| State error | Kode tidak valid, sudah diklaim, kode kedaluwarsa |

---

#### Setup Wizard (`/setup`)

**Tujuan:** Pembuatan profil pertama kali yang terpandu setelah klaim berhasil.

| Langkah | Layar | Field / Aksi |
|---------|-------|--------------|
| 0 | Mode profil | Pilih **Adult Emergency**, **Child Guardian**, atau **Elderly Dependent**; atau "Tag ini untuk siapa?" (Diri sendiri / Anak / Orang tua) |
| 1 | Identitas dasar | Dewasa: nama panggilan/inisial, usia. Anak: panggilan anak, usia |
| 2 | Info medis / keselamatan | Dewasa: alergi, kondisi, obat. Anak: alergi (opsional), catatan reunifikasi |
| 3 | Kontak | Dewasa: kontak darurat. Anak: kontak wali (Ibu/Ayah/pengasuh) |
| 4 | Tinjauan privasi | Jelaskan apa yang publik vs. pribadi; persetujuan wali untuk mode anak |
| 5 | Pratinjau darurat publik | Pratinjau live `/e/[token]` — template dewasa atau anak |
| 6 | Aktivasi gelang | Konfirmasi dan set status ke **active** |

Indikator progress ditampilkan sepanjang wizard. User dapat menyimpan draft dan kembali nanti (status gelang: **claimed**, belum **active**).

---

#### Dashboard / Halaman Keluarga (`/dashboard` atau `/family`)

**Tujuan:** Home pemegang akun — semua tag yang dikelola, notifikasi, dan aksi cepat.

| Elemen | Deskripsi |
|--------|-----------|
| Daftar tag | Semua gelang: diri sendiri, anak, orang tua lanjut usia — masing-masing dengan badge status |
| CTA Register New Tag | Tombol menonjol → `/tags/new` (klaim gelang tambahan) |
| Bell notifikasi | Alert pemindaian belum dibaca untuk tag dependen |
| Kartu per tag | Label pemakai, status (unclaimed/claimed/active/disabled), pemindaian terakhir, aksi cepat |
| Kelengkapan profil | Persentase atau checklist per tag |
| Terakhir diperbarui | Timestamp per tag dengan peringatan data usang jika > 90 hari |
| Aksi cepat per tag | Edit profil, Kelola kontak, Lihat riwayat pemindaian, Nonaktifkan tag |
| Aktivitas terbaru | 5 pemindaian terakhir di semua tag dengan nama pemakai, waktu, metode, indikator lokasi dibagikan |

---

#### Halaman Register New Tag (`/tags/new`)

**Tujuan:** Tambah gelang ke akun yang sudah ada tanpa membuat login baru.

| Elemen | Deskripsi |
|--------|-----------|
| Input Kode Aktivasi | Satu field, normalisasi uppercase |
| Teks bantuan | "Masukkan Kode Aktivasi dari paket tag baru Anda" |
| Submit | Validasi kode, hubungkan gelang ke akun saat ini |
| State error | Kode tidak valid, sudah diklaim, kode kedaluwarsa |
| On success | Redirect ke setup wizard untuk tag ini saja |

---

#### Notifikasi Pemindaian (`/notifications` atau panel dashboard)

**Tujuan:** Alert pemegang akun ketika tag dependen dipindai.

| Elemen | Deskripsi |
|--------|-----------|
| Daftar notifikasi | Nama pemakai, waktu pemindaian, metode akses (NFC/QR/manual) |
| Indikator lokasi | Pratinjau pin peta jika orang di sekitar membagikan lokasi |
| Link detail | Buka detail pemindaian lengkap dengan peta opsional |
| Tandai sudah dibaca | Hapus badge notifikasi |
| Empty state | "Belum ada pemindaian — Anda akan diberi tahu saat tag keluarga dipindai" |

---

#### Dashboard (tampilan single-tag)

**Tujuan:** Jika akun hanya punya satu tag, dashboard dapat disederhanakan. Akun multi-tag menggunakan layout Halaman Keluarga di atas.

| Elemen | Deskripsi |
|--------|-----------|
| Badge status gelang | unclaimed / claimed / active / disabled |
| Indikator kelengkapan profil | Persentase atau checklist |
| Timestamp terakhir diperbarui | Dengan peringatan data usang jika > 90 hari |
| Aksi cepat | Edit profil, Kelola kontak, Lihat riwayat pemindaian, Nonaktifkan gelang |
| Ringkasan riwayat pemindaian | 5 pemindaian terakhir dengan waktu dan metode akses |

---

#### Editor Profil Darurat (`/profile`)

**Tujuan:** Edit informasi darurat yang aman untuk publik.

| Field | Wajib | Publik |
|-------|-------|--------|
| Nama panggilan / inisial | Ya | Ya |
| Perkiraan usia | Ya | Ya |
| Golongan darah | Tidak | Ya (dengan disclaimer) |
| Alergi kritis | Direkomendasikan | Ya |
| Kondisi penting | Direkomendasikan | Ya |
| Obat-obatan penting | Direkomendasikan | Ya |
| Catatan untuk first responder | Tidak | Ya |
| Simpan + update `last_confirmed_at` | — | — |

---

#### Manajer Kontak Darurat (`/contacts`)

**Tujuan:** Tambah, edit, hapus, dan prioritaskan kontak darurat.

| Elemen | Deskripsi |
|--------|-----------|
| Daftar kontak | Nama, hubungan, telepon, badge primary |
| Form tambah kontak | Nama, hubungan, telepon, set sebagai primary |
| Kontak primary | Tepat satu primary; digunakan di halaman darurat publik |
| Hapus dengan konfirmasi | Cegah penghapusan tidak sengaja kontak terakhir |

---

#### Halaman Darurat Publik (`/e/[token]`)

**Tujuan:** Halaman untuk orang di sekitar — momen inti produk.

| Elemen | Deskripsi |
|--------|-----------|
| Header darurat besar | "EMERGENCY INFORMATION" (INFORMASI DARURAT) — visibilitas tinggi |
| Blok info kritis | Alergi, kondisi, obat — paling menonjol |
| Blok identitas | Nama panggilan/inisial, perkiraan usia |
| Terakhir diperbarui | "Informasi terakhir diperbarui: [tanggal]" |
| Peringatan usang | Jika > 90 hari sejak terakhir dikonfirmasi |
| Tombol aksi | Besar: "Contact Emergency Contact", "Call Emergency Services" |
| Disclaimer | "Informasi dilaporkan sendiri. Tidak diverifikasi oleh profesional medis." |
| Tanpa navigasi | Tanpa menu header, tanpa link login — bebas distraksi |

**Desain:** Tema gelap atau high-contrast opsional. Tanpa UI autentikasi. Target load di bawah 2 detik.

---

#### Halaman Anak Hilang Publik (`/e/[token]` — template anak)

**Tujuan:** Halaman untuk orang di sekitar/staf ketika anak yang memakai gelang hilang atau terpisah dari walinya.

| Elemen | Deskripsi |
|--------|-----------|
| Header peringatan besar | **"Anak ini mungkin hilang — silakan hubungi walinya"** (EN/ID) |
| Identitas anak | Nama depan atau panggilan + perkiraan usia saja |
| Blok alergi | Ditampilkan jika dikonfigurasi — mis., alergi kacang |
| Catatan reunifikasi | Pesan wali opsional: "Harap tunggu bersama anak saya", titik pertemuan |
| Aksi utama | Extra-large: **Call Parent / Guardian** (tel:) |
| Aksi lokasi | Extra-large: **Kirim Lokasi ke Keluarga** — geolokasi browser dengan persetujuan; kirim pin ke pemegang akun |
| Aksi sekunder | **WhatsApp Parent / Guardian** |
| Aksi tersier | Telepon wali sekunder (jika dikonfigurasi) |
| Terakhir diperbarui | "Informasi terakhir diperbarui: [tanggal]" |
| Disclaimer | "Informasi disediakan wali. Harap verifikasi identitas sebelum penyerahan." |
| Tanpa navigasi | Bebas distraksi; tanpa login, tanpa iklan |

**Catatan desain:**
- Lebih sederhana dari halaman darurat dewasa — **satu tombol utama mendominasi layar**
- Nada ramah tapi urgent — tidak menakutkan untuk anak yang mungkin masih ada
- Bilingual EN/ID direkomendasikan untuk area wisata dan turis
- Opsional: tampilkan label wali ("Telepon Ibu — Sarah") tanpa mengekspos nomor telepon lengkap sebagai teks

---

#### Halaman Orang Tua Lanjut Usia Publik (`/e/[token]` — template lansia)

**Tujuan:** Halaman untuk orang di sekitar ketika lansia yang memakai gelang bingung, tersesat, atau butuh bantuan medis.

| Elemen | Deskripsi |
|--------|-----------|
| Header alert besar | **"Orang ini mungkin butuh bantuan — silakan hubungi keluarganya"** (EN/ID) |
| Blok identitas | Nama panggilan + perkiraan usia |
| Blok medis | Alergi, kondisi, obat — menonjol jika risiko pingsan/medis |
| Catatan disorientasi | mis., "Alzheimer", "Mungkin lupa jalan pulang", "Harap tetap bersamanya" |
| Catatan reunifikasi | Pesan keluarga opsional — area umum saja, bukan alamat lengkap |
| Aksi utama | Extra-large: **Call Family / Caregiver** (tel:) |
| Aksi lokasi | Extra-large: **Kirim Lokasi ke Keluarga** |
| Aksi sekunder | **WhatsApp Family / Caregiver** |
| Aksi tersier | **Call Emergency Services** (112 / 119) |
| Terakhir diperbarui | "Informasi terakhir diperbarui: [tanggal]" |
| Disclaimer | "Informasi disediakan keluarga. Harap verifikasi identitas sebelum penyerahan." |
| Tanpa navigasi | Bebas distraksi; tanpa login, tanpa iklan |

**Catatan desain:**
- Seimbangkan urgensi medis dengan reunifikasi — keduanya penting untuk pemakai lansia
- **Kirim Lokasi ke Keluarga** harus visual setara dengan Telepon Keluarga — banyak orang di sekitar bisa share lokasi lebih cepat dari menelepon
- Pemegang akun menerima notifikasi pemindaian meski orang di sekitar hanya melihat halaman
- Bilingual EN/ID direkomendasikan

---

#### Halaman Pencarian Manual (`/lookup`)

**Tujuan:** Fallback ketika NFC dan QR tidak tersedia.

| Elemen | Deskripsi |
|--------|-----------|
| Input Emergency ID | Petunjuk format: `GS-XXXX-XXXX` |
| Submit | Validasi ID, redirect ke `/e/[token]` jika aktif |
| State error | Tidak ditemukan, gelang dinonaktifkan |
| Teks bantuan | "Masukkan Emergency ID yang tercetak di gelang" |

---

#### Halaman Riwayat Pemindaian (`/wristbands/[id]/scan-history`)

**Tujuan:** Visibilitas pemilik kapan gelang mereka diakses.

| Kolom | Deskripsi |
|-------|-----------|
| Waktu pemindaian | Timestamp `scanned_at` |
| Metode akses | NFC, QR, pencarian manual, unknown |
| Metadata perkiraan | Ringkasan user agent saja — tidak ada IP mentah yang diekspos ke pemilik |

---

#### Halaman Nonaktifkan Gelang (`/wristbands/[id]/disable`)

**Tujuan:** Deaktivasi yang diinisiasi pemilik untuk gelang yang hilang atau disalahgunakan.

| Elemen | Deskripsi |
|--------|-----------|
| Penjelasan | Apa yang terjadi saat dinonaktifkan (halaman publik tidak menampilkan apa-apa) |
| Konfirmasi | Ketik ID gelang atau checkbox konfirmasi |
| Submit | Set status ke **disabled** |
| Catatan re-enable | Hubungi dukungan atau klaim gelang baru |

---

## 14. Alur Database

### Ringkasan Lifecycle

```
Admin membuat batch
    │
    └──► Untuk setiap gelang:
              ├── Buat row wristbands (status: unclaimed)
              ├── Generate emergency_id (unik, random)
              ├── Generate public_token (unik, random)
              ├── Buat row activation_codes (code_hash, status: unused)
              └── Set nfc_url / qr_url
                        │
                        ▼
Pelanggan klaim dengan Kode Aktivasi
    │
    ├── Validasi activation_codes (hash match, status: unused)
    ├── Set activation_codes.status = used
    ├── Set wristbands.owner_id = user.id
    └── Set wristbands.status = claimed
                        │
                        ▼
Pemilik buat profil darurat + kontak
    │
    ├── Insert row emergency_profiles
    ├── Insert row emergency_contacts
    └── Pemilik aktivasi → wristbands.status = active
                        │
                        ▼
Akses publik (/e/[token] atau /lookup)
    │
    ├── Ambil field aman publik (RLS: public read pada gelang aktif)
    ├── Insert row scan_logs
    └── Return data halaman darurat
                        │
                        ▼
Pemilik nonaktifkan gelang
    │
    └── Set wristbands.status = disabled
              └── Query publik return nothing / not-found
```

### Aturan Database Utama

1. Admin membuat batch gelang (manual via Supabase untuk MVP).
2. Untuk setiap gelang, sistem membuat: record gelang, Emergency ID, token publik, Kode Aktivasi, `status = unclaimed`.
3. Pelanggan klaim dengan Kode Aktivasi.
4. Sistem memeriksa tabel `activation_codes` (perbandingan hash).
5. Jika valid dan belum diklaim: tandai kode sebagai used, set `owner_id`, set status ke `claimed`.
6. User membuat profil darurat dan kontak darurat.
7. User aktivasi → status menjadi `active`, `activated_at` diset.
8. Halaman darurat publik mengambil data aman publik berdasarkan token via query terkontrol RLS atau RPC.
9. Setiap akses publik membuat row `scan_logs`.
10. Pemilik dapat nonaktifkan gelang → status `disabled`.
11. Gelang yang dinonaktifkan tidak boleh mengekspos profil darurat di route publik.

---

## 15. Model Data yang Disarankan

### `profiles`

Memperluas user Supabase Auth dengan field spesifik aplikasi.

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | uuid PK | Referensi `auth.users(id)` |
| `full_name` | text | Pribadi — pemilik saja |
| `display_name` | text | Nama tampilan opsional |
| `phone` | text | Kontak pemilik — pribadi |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

### `wristbands`

Entitas gelang inti.

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | uuid PK | |
| `owner_id` | uuid FK → profiles | Nullable sampai diklaim |
| `emergency_id` | text UNIQUE | Publik, random, non-sequential (mis., `GS-A7K2-M9P4`) |
| `public_token` | text UNIQUE | Token aman random untuk URL |
| `status` | text | `unclaimed`, `claimed`, `active`, `disabled`, `revoked` |
| `profile_mode` | text | `adult_emergency`, `child_guardian`, `elderly_dependent` — menentukan template halaman publik |
| `wearer_role` | text | `self`, `child`, `elderly_parent` — pengelompokan dashboard dan default setup wizard |
| `wearer_label` | text | Nama tampilan dashboard, mis., "Budi (anak)", "Ibu Siti (ibu)", "Gelang saya" |
| `notify_on_scan` | boolean | Kirim notifikasi in-app/push ke pemegang akun saat dipindai — default `true` untuk tag dependen |
| `nfc_url` | text | URL HTTPS lengkap yang ditulis ke tag NFC |
| `qr_url` | text | URL yang sama dengan NFC |
| `claimed_at` | timestamptz | Nullable |
| `activated_at` | timestamptz | Nullable |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

### `activation_codes`

Kode klaim pribadi sekali pakai.

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | uuid PK | |
| `wristband_id` | uuid FK → wristbands | |
| `code_hash` | text | Hash bcrypt atau SHA-256 — tidak pernah plain text |
| `status` | text | `unused`, `used`, `revoked` |
| `used_by` | uuid FK → profiles | Nullable |
| `used_at` | timestamptz | Nullable |
| `expires_at` | timestamptz | Nullable |
| `created_at` | timestamptz | |

---

### `emergency_profiles`

Ringkasan medis aman publik yang terhubung ke gelang.

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | uuid PK | |
| `wristband_id` | uuid FK → wristbands | Satu profil per gelang |
| `preferred_name` | text | Ditampilkan publik |
| `approximate_age` | integer | Ditampilkan publik |
| `blood_type` | text | Opsional |
| `critical_allergies` | text | |
| `medical_conditions` | text | |
| `important_medications` | text | |
| `emergency_notes` | text | Catatan untuk first responder |
| `reunification_note` | text | Mode anak/lansia: pesan untuk orang di sekitar, mis., "Harap tunggu bersama anak saya hingga saya tiba" |
| `disorientation_notes` | text | Mode lansia: mis., "Alzheimer", "Mungkin lupa jalan pulang" |
| `cognitive_condition_flag` | boolean | Mode lansia: flag opsional demensia/Alzheimer — menyesuaikan pesan halaman publik |
| `language_hint` | text | Opsional, mis., "Hanya berbahasa Indonesia" |
| `is_public_enabled` | boolean | Toggle pemilik |
| `last_confirmed_at` | timestamptz | Timestamp konfirmasi pemilik |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

### `emergency_contacts`

Kontak yang dapat dihubungi dari halaman darurat publik.

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | uuid PK | |
| `wristband_id` | uuid FK → wristbands | |
| `name` | text | |
| `relationship` | text | mis., "Ibu", "Ayah", "Wali", "Pengasuh" |
| `phone` | text | Digunakan untuk aksi tel:/WhatsApp — tidak ditampilkan sebagai teks biasa di halaman publik secara default |
| `is_primary` | boolean | Satu primary per gelang — ditampilkan pertama di halaman publik |
| `show_name_on_public` | boolean | Mode anak: tampilkan label seperti "Telepon Ibu" di halaman publik |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

---

### `scan_logs`

Audit trail untuk akses halaman darurat publik.

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | uuid PK | |
| `wristband_id` | uuid FK → wristbands | |
| `access_method` | text | `nfc`, `qr`, `manual_lookup`, `unknown` |
| `location_shared` | boolean | Apakah orang di sekitar submit lokasi |
| `shared_latitude` | decimal | Nullable — latitude GPS pemindai (dengan persetujuan) |
| `shared_longitude` | decimal | Nullable — longitude GPS pemindai (dengan persetujuan) |
| `location_accuracy_m` | integer | Nullable — akurasi GPS dalam meter |
| `location_shared_at` | timestamptz | Nullable |
| `scanned_at` | timestamptz | |
| `user_agent` | text | Nullable |
| `ip_hash` | text | IP di-hash — bukan IP mentah |
| `approximate_location` | text | Nullable — label area dari reverse geocoding koordinat |
| `created_at` | timestamptz | |

---

### `scan_notifications`

Alert in-app ke pemegang akun saat tag dipindai.

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | uuid PK | |
| `account_holder_id` | uuid FK → profiles | Penerima notifikasi |
| `wristband_id` | uuid FK → wristbands | Tag mana yang dipindai |
| `scan_log_id` | uuid FK → scan_logs | Link ke detail pemindaian |
| `message` | text | mis., "Tag Budi dipindai" |
| `is_read` | boolean | Default false |
| `created_at` | timestamptz | |

---

### `admin_audit_logs` (opsional)

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | uuid PK | |
| `admin_user_id` | uuid | |
| `action` | text | mis., `batch_create`, `revoke_wristband` |
| `target_type` | text | mis., `wristband`, `activation_code` |
| `target_id` | uuid | |
| `created_at` | timestamptz | |

---

## 16. Route Aplikasi yang Disarankan

| Route | Akses | Tujuan |
|-------|-------|--------|
| `/` | Publik | Landing page |
| `/login` | Publik | Register / login |
| `/dashboard` | Terautentikasi | Home pemilik/keluarga — overview semua tag |
| `/family` | Terautentikasi | Dashboard keluarga — daftar multi-tag |
| `/tags/new` | Terautentikasi | Register New Tag — klaim gelang tambahan |
| `/notifications` | Terautentikasi | Inbox notifikasi pemindaian |
| `/claim` | Terautentikasi | Klaim gelang pertama dengan Kode Aktivasi |
| `/setup` | Terautentikasi | Setup wizard (pasca-klaim); termasuk peran pemakai + mode profil |
| `/profile` | Terautentikasi | Editor profil darurat (per tag) |
| `/contacts` | Terautentikasi | Manajer kontak darurat / wali / keluarga (per tag) |
| `/wristbands/[id]` | Terautentikasi | Detail dan pengaturan gelang |
| `/wristbands/[id]/scan-history` | Terautentikasi | Viewer log pemindaian dengan peta lokasi opsional |
| `/wristbands/[id]/disable` | Terautentikasi | Alur nonaktifkan gelang |
| `/e/[token]` | Publik | Halaman darurat publik (template dewasa, anak, atau lansia berdasarkan `profile_mode`) |
| `/e/[token]/share-location` | Publik | POST endpoint berbagi lokasi orang di sekitar (atau inline di `/e/[token]`) |
| `/lookup` | Publik | Pencarian manual Emergency ID |
| `/admin` | Superadmin | Dashboard registrasi tag NFC (generate Public ID + Kode Aktivasi), daftar & kelola tag |

---

## 17. Fitur MVP

### Wajib Ada

- [ ] Landing page dengan penjelasan produk dan CTA (use case dewasa + anak + lansia)
- [ ] Supabase Auth — register dan login
- [ ] Klaim gelang pertama dengan Kode Aktivasi
- [ ] **Register New Tag** — tambah gelang ke akun yang sama
- [ ] **Dashboard keluarga** — daftar semua tag yang dikelola (arsitektur siap; MVP dapat demo 2+ tag)
- [ ] **Pemilihan mode profil** — Adult Emergency vs. Child Guardian vs. Elderly Dependent
- [ ] **Pemilihan peran pemakai** — Diri sendiri / Anak / Orang tua lanjut usia saat setup
- [ ] Dashboard pemilik/wali/pengasuh dengan status per tag
- [ ] Editor profil darurat (field aware mode termasuk catatan disorientasi)
- [ ] Manajemen kontak darurat / wali / keluarga (tambah, edit, hapus, primary)
- [ ] Setup wizard dengan pratinjau darurat publik (ketiga template)
- [ ] Halaman darurat publik di `/e/[token]` — **template dewasa**
- [ ] Halaman anak hilang publik di `/e/[token]` — **template anak**
- [ ] Halaman orang tua lanjut usia publik di `/e/[token]` — **template lansia**
- [ ] Halaman pencarian manual di `/lookup`
- [ ] Pencatatan pemindaian pada setiap akses publik
- [ ] **Notifikasi pemindaian in-app** untuk tag dependen (badge dashboard + daftar notifikasi)
- [ ] Alur nonaktifkan gelang (per tag)
- [ ] **Dashboard Superadmin** (`/admin`) — registrasi tag NFC dengan generate otomatis Public ID (Emergency ID), public token, dan Kode Aktivasi; daftar/cari/filter tag; revoke; hapus tag unclaimed. Akses dibatasi ke satu akun superadmin via `SUPERADMIN_USER_ID`.

### Fitur Keluarga & Dependen — MVP vs. Post-MVP

| Fitur | MVP | Post-MVP |
|-------|-----|----------|
| Multi-tag per akun (Register New Tag) | **Ya (arsitektur)** | Polish UX penuh |
| Dashboard keluarga daftar semua tag | **Ya (basic)** | Kartu kaya, filter |
| Mode profil anak + halaman publik anak hilang | Ya | — |
| Mode orang tua lanjut usia + halaman publik | **Ya** | — |
| Tombol telepon/WhatsApp kontak wali/keluarga | Ya | — |
| Field catatan reunifikasi + disorientasi | Ya | — |
| Notifikasi pemindaian in-app saat tag dependen dipindai | **Ya (basic)** | — |
| **Kirim Lokasi ke Keluarga** (GPS orang di sekitar) | **Direkomendasikan MVP** | Polish UI peta |
| Notifikasi push/SMS saat pemindaian | Tidak | **Prioritas tinggi** |
| Beberapa tag anak + lansia per akun | **Ya (arsitektur)** | Demo dengan 3+ tag |
| Foto anak/lansia untuk verifikasi | Tidak | Opsional masa depan |
| Mode perjalanan/acara (alert sementara) | Tidak | Ya |

### Eksplisit Di Luar Cakupan MVP

- Aplikasi mobile native (web-first; PWA dapat diterima)
- Notifikasi push/SMS (notifikasi in-app dapat diterima untuk MVP)
- **Pelacakan GPS terus-menerus** pemakai gelang (berbagi lokasi saat pemindaian oleh orang di sekitar dalam cakupan)
- Integrasi rumah sakit atau asuransi
- Generasi batch massal otomatis (registrasi tag satuan via dashboard superadmin sudah tersedia; batch besar tetap post-MVP)
- Foto anak/lansia di halaman publik

---

## 18. Fitur Tambahan yang Direkomendasikan

Fitur yang meningkatkan produk sambil menjaga MVP realistis:

### Fitur Umum

| Fitur | Manfaat |
|-------|---------|
| Pratinjau darurat publik sebelum aktivasi | Kepercayaan pemilik — lihat persis apa yang dilihat orang di sekitar |
| Indikator kelengkapan profil | Mengingatkan pemilik untuk mengisi field kritis |
| Pengingat terakhir dikonfirmasi | Mengurangi risiko data usang |
| Alur nonaktifkan/cabut gelang | Perlindungan gelang hilang atau dicuri |
| Pencarian manual Emergency ID | Fallback NFC/QR |
| Generasi cadangan QR | QR dapat dicetak untuk penggunaan non-gelang |
| Riwayat pemindaian | Kesadaran pemilik terhadap event akses |
| **Akun keluarga multi-tag** | Satu login untuk diri sendiri + anak + orang tua lanjut usia |
| **Register New Tag** | Tambah gelang tanpa akun baru |
| **Notifikasi pemindaian ke pemegang akun** | Orang tua/pengasuh tahu segera saat tag dependen dipindai |
| **Kirim Lokasi ke Keluarga** | Orang di sekitar kirim pin GPS — reunifikasi tanpa pelacakan terus-menerus |
| **Mode orang tua lanjut usia** | Anak dewasa kelola gelang orang tua — disorientasi + konteks medis |
| Prioritas kontak darurat | Kontak primary ditampilkan pertama |
| Aksi kontak WhatsApp | Umum di Indonesia — kontak satu ketuk |
| Fallback cetak offline (Emergency ID di gelang) | Bekerja tanpa jaringan untuk entri ID |
| Generasi batch admin | Skala produksi gelang |
| Mode demo | Presentasi kompetisi tanpa data nyata |
| Halaman darurat multibahasa (EN / ID) | Aksesibilitas lebih luas di Indonesia |
| Halaman darurat dark / high-contrast | Keterbacaan dalam kondisi stres |
| Tombol aksi darurat besar | Usability untuk orang di sekitar yang stres |
| Peringatan data usang (> 90 hari) | Mengingatkan pemilik untuk konfirmasi ulang |
| Golongan darah opsional dengan disclaimer | Berguna tetapi tidak diverifikasi medis |
| Field catatan darurat opsional | Teks bebas untuk first responder |

**Rekomendasi:** Dukungan multi-tag keluarga harus **first-class dalam arsitektur MVP** meski demo kompetisi menampilkan dua tag. Upgrade post-MVP bernilai tertinggi adalah **notifikasi push/SMS saat pemindaian**. **Kirim Lokasi ke Keluarga** sangat direkomendasikan untuk dampak demo MVP — menyelesaikan "di mana anak/orang tua saya?" tanpa membangun tracker.

### Mode Orang Tua Lanjut Usia — Fitur Tambahan

| Fitur | Prioritas | Manfaat |
|-------|-----------|---------|
| **Mode profil: Elderly Dependent** | MVP | Halaman publik memadukan info medis + reunifikasi keluarga |
| **Catatan disorientasi / Alzheimer** | MVP | Membantu orang di sekitar pahami perilaku tanpa jargon klinis |
| **Call Family sebagai CTA utama** | MVP | Anak dewasa kontak pertama — bukan 112 kecuali darurat medis |
| **Kirim Lokasi ke Keluarga** | Direkomendasikan MVP | Anak dewasa lihat di mana orang tua ditemukan |
| **Notifikasi pemindaian ke anak dewasa** | MVP (in-app) | Tahu segera saat gelang orang tua dipindai |
| **Dikelola akun pengasuh** | MVP | Lansia tidak perlu smartphone atau login |
| **Tanpa alamat rumah di halaman publik** | MVP (kebijakan) | Area umum saja — cegah penyalahgunaan |
| **Blok medis/pingsan menonjol** | MVP | Relevan untuk skenario kerumunan/panas |
| **Push/SMS saat pemindaian tag lansia** | Post-MVP (tinggi) | Kritis saat anak dewasa tidak memantau dashboard |

### Mode Anak — Fitur Tambahan

Fitur ini menjadi penting ketika mencakup cakupan **anak hilang & reunifikasi wali**:

| Fitur | Prioritas | Manfaat |
|-------|-----------|---------|
| **Mode profil: Child Guardian** | MVP | Mengalihkan halaman publik ke template anak hilang dengan kontak wali sebagai aksi utama |
| **Kontak wali sebagai CTA utama** | MVP | Call Parent / WhatsApp satu ketuk — nilai inti untuk skenario anak hilang |
| **Template halaman publik anak hilang** | MVP | UI berbeda: header alert, nama anak, tombol wali — bukan layout medis-first |
| **Catatan reunifikasi** | MVP | Wali dapat meninggalkan "Harap tunggu bersama anak saya" atau instruksi titik pertemuan |
| **Kontak wali sekunder** | MVP | Fallback jika orang tua primary tidak menjawab |
| **Notifikasi orang tua saat pemindaian (SMS/push)** | Post-MVP (tinggi) | Orang tua tahu segera saat gelang dipindai — kritis untuk mode anak |
| **Kirim Lokasi ke Keluarga** | Direkomendasikan MVP | Orang tua lihat pin peta di mana anak ditemukan |
| **Beberapa gelang anak per akun** | MVP (arsitektur) | Satu dashboard orang tua untuk semua anak |
| **Dashboard keluarga / wali** | MVP (basic) | Daftar semua gelang (diri sendiri + anak + lansia) dengan status sekilas |
| **Mode perjalanan / acara** | Post-MVP | Mode sementara untuk outing berisiko tinggi (hari taman hiburan, perjalanan Lebaran) dengan alert enhanced opsional |
| **SKU gelang anak (ukuran + warna)** | Post-MVP | Strap lebih kecil, warna terang, desain ramah anak |
| **Halaman anak hilang bilingual (EN/ID)** | Direkomendasikan | Area wisata, bandara, mal internasional |
| **Prompt verifikasi identitas wali** | Post-MVP | Checklist orang di sekitar sebelum menyerahkan anak ke penelepon |
| **Instruksi statis "Tetap bersama anak"** | MVP | Ditampilkan di halaman publik — jangan tinggalkan anak sendirian |
| **Alergi untuk anak** | MVP | Kacang, sengatan lebah, dll. — tetap relevan dalam skenario anak hilang |
| **Field petunjuk bahasa** | Post-MVP | "Anak hanya berbahasa Indonesia" — membantu orang di sekitar berkomunikasi |
| **Mode kontak sekolah / daycare** | Post-MVP | Hubungi sekolah dulu di hari kerja alih-alih orang tua |
| **Foto anak opsional (verifikasi pribadi)** | Masa depan | Staf verifikasi identitas wali — foto tidak pernah sepenuhnya publik tanpa persetujuan |
| **Kode verifikasi penyerahan** | Masa depan | Wali memberi tahu orang di sekitar kode untuk konfirmasi identitas |
| **Alert pemindaian ke wali sekunder** | Post-MVP | Beri tahu Ayah jika Ibu primary dan tidak merespons |
| **Jangan tampilkan alamat rumah atau nama sekolah** | MVP (kebijakan) | Melindungi anak dari predator — reunifikasi hanya via kontak |
| **Rate limiting pada profil anak** | MVP | Mencegah penguntit memindai berulang untuk mengumpulkan data |

**Rekomendasi:** Mode anak dan lansia dapat dirilis di MVP dengan perangkat keras dan database yang sama — penambahan utama adalah `profile_mode`, template halaman publik ketiga, dashboard keluarga multi-tag, notifikasi pemindaian, dan **Kirim Lokasi ke Keluarga**. Fitur post-MVP bernilai tertinggi adalah **notifikasi push/SMS saat pemindaian**.

---

## 19. Persyaratan Keamanan dan Privasi

### Minimisasi Data

- Tag NFC menyimpan **hanya** URL HTTPS dengan token publik — tidak ada data medis di perangkat keras.
- Kode QR menyimpan **URL darurat publik yang sama**.
- **Jangan** simpan atau tampilkan: NIK, alamat lengkap, dokumen, hasil lab, atau riwayat medis detail.
- Halaman darurat publik mengembalikan **hanya** field aman publik via query atau RPC khusus.

### Keamanan Identifier

- Emergency ID bersifat publik tetapi **random dan non-sequential** — tidak dapat ditebak.
- Token publik adalah string **random kriptografis** — tidak diturunkan dari Emergency ID.
- Kode Aktivasi **pribadi, sekali pakai**, dan disimpan sebagai **hash saja** — tidak pernah plain text di database.

### Kontrol Akses (Supabase RLS)

| Tabel | Pemilik | Publik | Admin |
|-------|---------|--------|-------|
| `profiles` | Row sendiri saja | Tanpa akses | Baca semua |
| `wristbands` | Gelang sendiri | Baca aktif (lookup token saja) | Penuh |
| `activation_codes` | Tanpa akses langsung | Tanpa akses | Penuh |
| `emergency_profiles` | Profil sendiri | Baca field publik pada gelang aktif | Penuh |
| `emergency_contacts` | Kontak sendiri | Baca data aksi kontak primary saja | Penuh |
| `scan_logs` | Baca log gelang sendiri | Insert saja | Penuh |

### Privasi Spesifik Lansia

- Aturan sama dengan mode anak: **tanpa nama lengkap, alamat rumah, atau rutinitas harian** di halaman publik.
- **Catatan disorientasi** harus membantu tanpa mengekspos rekam medis detail.
- **Area umum** (mis., "Jakarta Selatan") dapat diterima; **alamat jalan lengkap** tidak di halaman publik.
- Pemegang akun (anak dewasa) bertanggung jawab menjaga info medis orang tua tetap current.

### Privasi Spesifik Anak

- **Jangan ekspos** nama lengkap anak, alamat rumah, nama sekolah, atau rutinitas harian di halaman publik.
- Gunakan **nama depan atau panggilan saja** — cukup untuk wali konfirmasi, tidak cukup untuk pencurian identitas.
- **Telepon wali** diakses via tombol aksi (tel:/WhatsApp), tidak ditampilkan sebagai teks biasa secara default — mengurangi pengumpulan oleh pemindai jahat.
- **Persetujuan orang tua/wali** diperlukan saat setup profil anak — wali mengonfirmasi mereka berwenang mendaftarkan anak.
- **Keamanan penyerahan:** halaman publik harus menginstruksikan orang di sekitar untuk verifikasi identitas wali sebelum menyerahkan anak; GelangSiaga memfasilitasi kontak, bukan transfer hak asuh.
- **Tidak ada foto anak di halaman publik** untuk MVP — mengurangi risiko profiling; penyerahan terverifikasi opsional di versi mendatang.
- **Nonaktifkan segera** jika gelang hilang — mencegah orang asing memancing anak dengan memalsukan kepemilikan.
- **Rate limiting** sangat penting untuk profil anak — mitigasi pemindaian berulang oleh pelaku buruk.

### Berbagi Lokasi Orang di Sekitar — Keamanan & Privasi

- Lokasi dikumpulkan dari **perangkat orang di sekitar saja** — tidak pernah dari perangkat keras gelang.
- Memerlukan **izin browser eksplisit** — tanpa pelacakan diam-diam.
- Koordinat hanya terlihat **pemegang akun** dan kontak darurat terkonfigurasi.
- Jangan tampilkan lokasi dibagikan di halaman publik — privat ke dashboard pemegang akun.
- Simpan data lokasi periode terbatas (mis., 7–30 hari) lalu hapus.
- Rate limit: satu submit lokasi per sesi pemindaian.
- Tampilkan konfirmasi ke orang di sekitar: "Lokasi terkirim ke keluarga. Terima kasih telah membantu."

### Perlindungan Halaman Publik

- Jangan ekspos telepon kontak darurat sebagai teks biasa — gunakan tombol aksi `tel:` atau WhatsApp.
- Rate limiting pada halaman darurat publik dan endpoint lookup.
- Tampilkan disclaimer informasi dilaporkan sendiri di setiap halaman publik.
- Tampilkan timestamp terakhir diperbarui di setiap halaman publik.
- Gelang yang dinonaktifkan atau dicabut return not-found generik — tanpa kebocoran informasi.

### Kontrol Pemilik

- Pemilik dapat segera nonaktifkan gelang yang hilang atau disalahgunakan.
- Pemilik dapat meninjau riwayat pemindaian untuk kesadaran pola akses tidak sah.

---

## 20. Best Practice Supabase

- **Aktifkan RLS di semua tabel** — tidak ada tabel tanpa policy.
- **Policy pemilik saja** — gunakan pola `auth.uid() = owner_id` untuk data scoped gelang.
- **Policy baca publik** — batasi ke `status = 'active'` dan kolom aman publik saja; prefer RPC khusus seperti `get_public_emergency_data(token)`.
- **Generasi token random aman** — gunakan `gen_random_uuid()` atau `encode(gen_random_bytes(32), 'hex')` di PostgreSQL.
- **Simpan kode aktivasi sebagai hash** — bandingkan dengan `crypt()` saat klaim; jangan pernah log atau return kode plain.
- **Hindari menyimpan data sensitif yang tidak perlu** — jika field tidak dibutuhkan secara publik atau untuk pengelolaan pemilik, jangan kumpulkan.
- **Constraint database** — `UNIQUE` pada `emergency_id` dan `public_token`; check constraint pada nilai enum `status`.
- **Timestamp** — gunakan `timestamptz` secara konsisten; maintain `updated_at` via trigger.
- **Jangan ekspos data kontak pribadi di query publik** — RPC publik return URL aksi, bukan nomor telepon mentah.
- **RPC untuk alur klaim** — transaksi atomik: validasi hash kode, tandai used, set owner, update status — cegah race condition.
- **Service role key** — server-side saja; tidak pernah diekspos ke client.
- **Index** — pada `public_token`, `emergency_id`, `wristbands.owner_id`, `scan_logs.wristband_id`.

---

## 21. Best Practice Next.js

- **Gunakan App Router** — semua route di bawah direktori `app/`.
- **Server Components sebagai default** — halaman darurat publik dan fetching data dashboard di server.
- **Server Actions atau Route Handlers** untuk write sensitif — klaim gelang, update profil, nonaktifkan gelang.
- **Halaman darurat publik** — optimasi untuk kecepatan: JS minimal, tanpa auth middleware, statis jika memungkinkan dengan lookup token dinamis.
- **Jangan ekspos service role key ke client** — gunakan anon key client-side; service role hanya di server actions.
- **Environment variables** — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server saja).
- **Middleware** — lindungi `/dashboard`, `/claim`, `/setup`, `/profile`, `/contacts`, `/wristbands/*`; jangan terapkan ke `/e/[token]` atau `/lookup`.
- **Pemisahan bersih** — halaman publik di layout minimal (tanpa nav); halaman terautentikasi di layout dashboard dengan sidebar.
- **Error boundaries** — not-found graceful untuk token tidak valid dan gelang dinonaktifkan.
- **Metadata** — halaman darurat publik: `robots: noindex` untuk mencegah indexing mesin pencari data darurat pribadi.

---

## 22. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| **Penyalahgunaan privasi** — akses tidak sah ke info kesehatan pribadi | Tinggi | RLS, field aman publik saja, akses berbasis token, nonaktifkan pemilik, log pemindaian |
| **Penyalahgunaan pemindaian random** — bot atau pemindaian karena penasaran | Sedang | Rate limiting, log hash IP, tidak ada data sensitif di luar field publik |
| **Pencurian kode aktivasi** — kode dicuri sebelum pemilik klaim | Tinggi | Penyimpanan hash sekali pakai, proteksi race klaim via RPC, expiry pendek opsional |
| **Gelang hilang** — penemu mengakses profil | Tinggi | Alur nonaktifkan pemilik, alert pemindaian (masa depan), data publik minimal |
| **Data usang** — alergi atau obat yang sudah tidak akurat | Tinggi | Timestamp terakhir diperbarui, peringatan usang, pengingat terakhir dikonfirmasi |
| **Perangkat tanpa NFC** — ponsel orang di sekitar tidak punya NFC | Sedang | Cadangan QR + pencarian manual Emergency ID |
| **QR rusak** — QR tidak terbaca di gelang yang aus | Sedang | NFC primary + fallback Emergency ID yang terlihat |
| **User ganti ponsel** — kehilangan akses ke akun | Sedang | Recovery auth berbasis email via Supabase Auth |
| **Kontak darurat tidak tersedia** — kontak primary tidak menjawab | Sedang | Beberapa kontak, tombol layanan darurat langsung selalu terlihat |
| **Downtime database** — halaman darurat tidak tersedia | Tinggi | Edge caching Vercel untuk shell statis, monitoring SLA Supabase, Emergency ID yang terlihat sebagai fallback offline |
| **Rasa otoritas medis palsu** | Sedang | Disclaimer dilaporkan sendiri yang menonjol di setiap halaman publik |
| **Kekhawatiran regulasi** — diklasifikasikan sebagai perangkat medis | Sedang | Posisikan sebagai alat identifikasi, bukan diagnostik; tanpa klaim medis |
| **Keamanan anak / bahaya orang asing** — gelang digunakan untuk menghubungi orang yang salah | Tinggi | Tombol aksi saja, panduan verifikasi penyerahan, alur nonaktifkan, tanpa alamat/sekolah di halaman publik |
| **Pengumpulan telepon wali** — pemindaian berulang untuk mengumpulkan nomor | Sedang | Rate limiting, tanpa tampilan telepon plain text, log hash IP |
| **Reunifikasi palsu** — anak diserahkan ke non-wali | Tinggi | Instruksi orang di sekitar untuk verifikasi identitas; kode penyerahan masa depan; pesan tetap-bersama-anak |
| **Anak melepas gelang** | Sedang | Desain nyaman, warna terang; orang tua edukasi anak untuk memakainya saat outing |

---

## 23. Keterbatasan MVP

MVP GelangSiaga adalah alat **identifikasi** darurat dan **reunifikasi wali**, bukan perangkat medis, pelacak anak, atau sistem rekam medis.

- Tidak ada kemampuan diagnosis atau triase medis
- Tidak ada penyimpanan rekam medis lengkap
- Tidak ada integrasi rumah sakit atau klinik
- Tidak ada integrasi BPJS atau asuransi
- Tidak ada pelacakan GPS otomatis korban, anak, atau lansia
- Tidak ada monitoring lokasi real-time terus-menerus — **hanya berbagi lokasi saat pemindaian oleh orang di sekitar** (dengan persetujuan)
- Tidak ada sensor kesehatan (detak jantung, SpO2, dll.)
- Tidak ada elektronik wearable bertenaga baterai
- Tidak ada aplikasi mobile native — hanya web responsif (PWA dapat diterima)
- Tidak ada jaminan bahwa data yang dilaporkan sendiri akurat secara medis
- Notifikasi push/SMS saat pemindaian — post-MVP (notifikasi in-app dapat diterima untuk MVP)
- Dashboard superadmin tersedia untuk registrasi tag satuan; generasi batch massal otomatis masih post-MVP
- Arsitektur multi-tag di MVP; demo dapat menampilkan 1–3 tag per akun
- Aktivasi dan setup profil memerlukan akses internet
- Halaman darurat publik memerlukan akses internet (fallback offline terbatas pada Emergency ID yang terlihat)
- Bukan pengganti mengajarkan anak nomor telepon orang tua atau titik pertemuan aman

---

## 24. Metrik Keberhasilan

| Metrik | Deskripsi | Target (MVP) |
|--------|-----------|--------------|
| Gelang dihasilkan | Total record gelang dibuat | Lacak baseline |
| Gelang diklaim | Kode aktivasi berhasil digunakan | > 80% dari yang dihasilkan |
| Tingkat penyelesaian aktivasi | Klaim → status active | > 70% dari yang diklaim |
| Tingkat kelengkapan profil darurat | Semua field wajib terisi | > 90% dari yang active |
| Gelang aktif | Status = active | Metrik kesehatan utama |
| Akses halaman darurat | Total entri scan_logs | Lacak per gelang |
| Waktu ke aksi kontak | Halaman darurat terbuka → ketuk tombol kontak | < 30 detik |
| Gelang dinonaktifkan / hilang | Jumlah status = disabled | Lacak untuk keselamatan |
| Kesegaran profil | Profil diperbarui dalam 90 hari terakhir | > 60% dari yang active |
| Penggunaan fallback lookup | Rasio metode akses manual_lookup | Monitor reliabilitas NFC/QR |
| Tag per akun | Rata-rata gelang dikelola per pemegang akun | Lacak adopsi keluarga |
| Notifikasi pemindaian terkirim | Alert in-app saat tag dependen dipindai | Lacak pipeline notifikasi |
| Berbagi lokasi per pemindaian | % pemindaian dengan GPS dari orang di sekitar | Sinyal reunifikasi utama |
| Gelang mode lansia | Jumlah where `profile_mode = elderly_dependent` | Lacak adopsi |
| Akun multi-tag | Akun dengan 2+ gelang active | Lacak penggunaan paket keluarga |
| Gelang mode anak | Jumlah where `profile_mode = child_guardian` | Lacak adopsi |
| Tingkat ketuk kontak wali | Klik tombol Call/WhatsApp di halaman anak | Sinyal keberhasilan utama mode anak |
| Waktu reunifikasi (perkiraan) | Timestamp pemindaian → callback wali (masa depan) | Memerlukan fitur notifikasi |
| Tingkat nonaktifkan gelang anak | Gelang anak disabled / total gelang anak | Monitor kehilangan/pencurian |

---

## 25. Pitch Singkat

**GelangSiaga** (RAKSA-TAG) adalah gelang keselamatan yang membantu orang asing membantu keluarga Anda — baik Anda dewasa yang tidak bisa berbicara dalam darurat medis, anak yang terpisah dari orang tua di mal yang ramai, maupun orang tua lanjut usia yang lupa jalan pulang. Setiap gelang membawa tag NFC, kode QR, dan Emergency ID yang terlihat. Orang di sekitar ketuk, pindai, atau ketik untuk segera menghubungi orang yang tepat.

**Satu akun, banyak tag.** Seorang anak setup gelang untuk ibunya yang lanjut usia. Seorang orang tua menambah tag untuk dua balita. Seorang anak perempuan mengelola gelang sendiri plus gelang ayahnya — semua dari satu login. Daftar tag baru, isi profil pemakai, selesai.

Ketika tag anak atau orang tua lanjut usia dipindai, pemegang akun dapat alert instan — dan jika pembantu mengetuk **Kirim Lokasi ke Keluarga**, Anda tahu persis di mana mereka ditemukan. Tanpa unduh aplikasi untuk orang di sekitar. Tanpa login. Tanpa ponsel yang harus dibuka kuncinya.

Dibangun dengan Next.js dan Supabase untuk kecepatan dan keamanan, GelangSiaga mengubah gelang silikon sederhana menjadi lapisan keselamatan untuk darurat medis, reunifikasi keluarga, dan perawatan lansia — untuk momen ketika setiap detik berarti.

---

## 26. Peningkatan Masa Depan

| Area | Peningkatan |
|------|-------------|
| **Notifikasi** | Push/SMS/email ke pemegang akun saat tag dependen dipindai — **kritis untuk mode anak & lansia** |
| **Kirim Lokasi ke Keluarga** | UI peta penuh, reverse geocoding, riwayat lokasi di detail pemindaian |
| **Akun keluarga** | Kelola beberapa gelang (diri sendiri, anak, orang tua lansia) dari satu dashboard — **arsitektur MVP** |
| **Mode orang tua lanjut usia** | Template penuh + field disorientasi — **MVP** |
| **Register New Tag** | Tambah gelang ke akun yang sudah ada — **MVP** |
| **Aplikasi mobile native** | Pengelolaan pemilik/wali di iOS/Android |
| **Mode perjalanan / acara** | Alert sementara untuk outing berisiko tinggi |
| **Kode verifikasi penyerahan** | Wali membagikan kode untuk konfirmasi identitas sebelum penyerahan anak |
| **SKU gelang anak** | Ukuran lebih kecil, warna terang, desain menarik |
| **Portal admin** | Generasi batch, inventori, cabut, dashboard analytics |
| **Geolokasi saat pemindaian** | Berbagi lokasi inisiasi orang di sekitar via **Kirim Lokasi ke Keluarga** — **direkomendasikan MVP** |
| **Multi-bahasa** | i18n penuh — Indonesia, Inggris, dan bahasa regional |
| **Integrasi wearable** | Companion Apple Watch / Wear OS untuk sinkronisasi profil |
| **Verifikasi profesional medis** | Badge terverifikasi dokter opsional di profil |
| **API integrasi** | Pre-registrasi IGD rumah sakit, hotline darurat asuransi |
| **Model langganan** | Fitur premium: beberapa kontak, paket keluarga, dukungan prioritas |
| **Desain gelang kustom** | Warna, ukuran, pesanan bulk korporat/acara |
| **Baca NFC offline** | URI NTAG213 disimpan lokal — halaman load saat konektivitas kembali |
| **Aksesibilitas** | Optimasi screen reader, pembacaan suara info darurat |
| **Dashboard analytics** | Insight pemilik: frekuensi pemindaian, skor kesehatan profil |
| **Cetak ulang QR** | QR pengganti yang dihasilkan pemilik untuk gelang rusak |

---

*Versi dokumen: 1.2 — Spesifikasi Produk MVP GelangSiaga (termasuk Child Guardian, Elderly Dependent, Family Multi-Tag, Scan Notifications, dan Kirim Lokasi ke Keluarga / cakupan extended RAKSA-TAG)*
