# 🧸 Thriftie Trip – Website Thrift Mancanegara

Website statis (HTML + CSS + JS), siap dipasang di **GitHub Pages**.

## Cara pasang di GitHub
1. Buat repository baru di GitHub (misal `thriftie-trip`).
2. Upload semua file di folder ini (`index.html`, `style.css`, `app.js`).
3. Buka **Settings → Pages**, pilih branch `main` dan folder `/ (root)`, lalu Save.
4. Tunggu 1–2 menit. Website tayang di `https://USERNAME.github.io/thriftie-trip/`.

## Fitur
- Katalog 12 produk, filter per negara, pencarian, favorit
- Keranjang belanja (stok 1 per model, barang terjual otomatis berubah jadi "Terjual")
- Daftar dan masuk akun
- Checkout untuk tamu maupun pengguna masuk (alamat, ongkir, metode bayar)

## Mengganti produk
Edit array `PRODUCTS` di bagian atas `app.js`. Ganti `emoji` dengan foto dengan mengubah bagian `.pic` di fungsi `renderGrid()`.

## Catatan penting sebelum dipakai jualan sungguhan
GitHub Pages hanya menampung situs statis, jadi login, keranjang, dan pesanan **tersimpan di browser pengunjung** (localStorage). Ini cocok untuk demo/presentasi ke client. Untuk toko sungguhan, hubungkan ke backend, misalnya:
- **Firebase / Supabase** untuk akun dan database pesanan
- **Midtrans / Xendit** untuk pembayaran otomatis
- Sementara itu, pesanan bisa diarahkan ke WhatsApp admin
