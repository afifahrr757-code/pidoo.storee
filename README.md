# THRIFTERRA — Global Thrift Marketplace

Website marketplace thrift fashion dari mancanegara, dibuat dengan **HTML + CSS + JavaScript vanilla** dan siap di-host di **GitHub Pages**.

## ✦ Fitur

- Landing page premium / editorial
- Responsive untuk desktop, tablet, dan mobile
- Katalog produk thrift
- Filter kategori: Outerwear, Tops, Bottoms, Accessories
- Add to Bag
- Keranjang belanja
- Update quantity & remove item
- Data keranjang tersimpan di `localStorage`
- Login demo
- Checkout demo dengan alamat & pilihan pembayaran
- Order ID otomatis
- Newsletter form
- Navigasi kategori
- Animasi hover dan UI modern
- Tidak membutuhkan framework

## 📁 Struktur

```text
thrift-global-market/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

## 🚀 Cara menjalankan

### Opsi 1 — Langsung di komputer
1. Extract ZIP.
2. Buka `index.html` di browser.
3. Semua fitur front-end bisa dicoba langsung.

### Opsi 2 — GitHub Pages
1. Buat repository baru di GitHub.
2. Upload `index.html`, `style.css`, `script.js`, `README.md`, dan folder `assets`.
3. Masuk ke **Settings → Pages**.
4. Pada **Build and deployment**, pilih:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Save.
6. GitHub akan memberikan URL website.

## 🔐 Tentang Login

Login di versi ini adalah **demo front-end**. Email disimpan di browser menggunakan `localStorage`. Jangan gunakan sistem ini untuk menyimpan password atau data pelanggan sungguhan.

Untuk website produksi, hubungkan login ke backend/authentication seperti Firebase Authentication, Supabase Auth, atau layanan backend sendiri.

## 🛒 Tentang Checkout

Checkout saat ini adalah **simulasi**:
- Pengunjung mengisi nama, nomor telepon, alamat.
- Memilih metode pembayaran.
- Website membuat nomor order.
- Keranjang dikosongkan setelah order.

Belum ada pembayaran uang sungguhan.

Untuk produksi, checkout dapat dihubungkan ke payment gateway seperti Midtrans/Xendit dan backend database.

## 🖼️ Gambar Produk

Demo ini menggunakan gambar dari Unsplash melalui URL eksternal. Untuk website client yang benar-benar dipublikasikan, sebaiknya ganti dengan foto produk milik sendiri agar branding dan hak penggunaan gambar lebih aman.

## 🎨 Branding

Nama: **THRIFTERRA®**

Tagline: **Wear the world. Own the story.**

Konsep visual:
- Editorial fashion
- Earthy / off-white
- Black typography
- Terracotta accent
- Minimal luxury
- Vintage + contemporary

## ⚠️ Catatan Penting

Ini adalah **front-end marketplace demo**, bukan e-commerce production-ready. Login, database produk, stok, order management, payment gateway, email notification, dan admin dashboard memerlukan backend.

Jika ingin mengembangkan versi production, arsitektur yang disarankan:

```text
Frontend
HTML + CSS + JavaScript
        ↓
Authentication
Firebase / Supabase
        ↓
Database
Products + Users + Orders
        ↓
Payment
Midtrans / Xendit
        ↓
Admin Dashboard
Products + Stock + Orders
```
