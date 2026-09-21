# 07. Use Case Diagrams & Actor Interaction Specifications

Dokumentasi ini memetakan seluruh **Use Case Diagram** sistem **Storeight** (Platform Toko Online Mandiri / Self-Hosted D2C E-Commerce) menggunakan format standar **Mermaid**.

Perancangan use case ini mendefinisikan batas sistem (*system boundary*), aktor utama (*primary actors*), aktor eksternal (*secondary/supporting actors*), serta relasi ketergantungan (`<<include>>` dan `<<extend>>`) untuk seluruh domain fungsional.

---

## 1. Identifikasi Aktor (Actor Catalog)

| Kategori Aktor | Nama Aktor | Deskripsi & Peran |
| :--- | :--- | :--- |
| **Aktor Manusia (Primary)** | **Pelanggan (Customer / Guest / Buyer)** | Pengunjung toko online yang menjelajahi katalog, memilih varian, melakukan reservasi stok, membayar, dan melacak pesanan. |
| | **Admin Toko / Merchant (Store Owner)** | Pemilik atau pengelola bisnis yang mengelola produk, menetapkan matriks varian, memantau pesanan, mengelola stok, dan menganalisis metrik finansial. |
| | **Staf Gudang (Warehouse / Fulfillment Staff)** | Operator logistik internal yang melakukan *picking*, *packing*, pencetakan label resi A6, dan serah terima paket ke ekspedisi. |
| **Aktor Sistem Eksternal (Secondary)** | **Payment Gateway (PG)** | Provider pembayaran (Midtrans, Xendit, Tripay) yang memproses QRIS, Virtual Account, kartu, dan mengirimkan notifikasi status webhook. |
| | **Logistics / Courier API Provider** | Layanan agregator/ekspedisi (Biteship, RajaOngkir, JNE, J&T, SiCepat) untuk penghitungan tarif ongkir real-time dan update pelacakan resi (AWB). |
| | **WhatsApp Gateway / Notification Engine** | Layanan pengiriman pesan WhatsApp otomatis (Fonnte, Waha, Wablas) untuk invoice, link pelacakan pesanan, dan *abandoned cart recovery*. |
| **Aktor Internal Terjadwal** | **TTL Worker / Cron Engine** | Background scheduler yang memeriksa TTL reservasi inventaris dan melepaskan (*release/rollback*) stok yang kadaluarsa secara periodik. |

---

## 2. High-Level Global System Use Case Diagram

Diagram menyeluruh yang menghubungkan seluruh aktor utama dan eksternal ke dalam domain inti Storeight.

```mermaid
graph LR
    %% Actors
    Customer((Pelanggan / Pembeli))
    Admin((Admin / Merchant))
    Staff((Staf Gudang))
    PG[("Payment Gateway")]
    Courier[("Logistics API")]
    WA[("WhatsApp Gateway")]
    Cron[("Cron / TTL Engine")]

    subgraph StoreightSystem ["Sistem Toko Online Mandiri (Storeight Platform)"]
        UC_Browse["Jelajah Katalog & Filter Varian"]
        UC_Cart["Kelola Keranjang Belanja"]
        UC_Checkout["Lakukan Checkout & Kunci Stok"]
        UC_Pay["Lakukan Pembayaran Direct (QRIS/VA)"]
        UC_Track["Lacak Status Pesanan (Live Tracking)"]

        UC_ManageCatalog["Kelola Katalog, Opsi & Matriks Varian"]
        UC_ManageInventory["Monitor & Atur Inventaris 3-Tier"]
        UC_ProcessOrder["Kelola Status Pesanan & Pembayaran"]
        UC_Fulfill["Proses Picking, Packing & Cetak Resi A6"]
        UC_Analytics["Lihat Laporan Penjualan & GMV"]

        UC_TTL["Otomatis Rollback Stok Expired"]
        UC_WA_Notify["Kirim Notifikasi Invoice & Resi Otomatis"]
        UC_Reconcile["Rekonsiliasi Webhook Pembayaran"]
        UC_CalcShip["Kalkulasi Ongkos Kirim Presisi"]
    end

    %% Customer Connections
    Customer --> UC_Browse
    Customer --> UC_Cart
    Customer --> UC_Checkout
    Customer --> UC_Pay
    Customer --> UC_Track

    %% Admin Connections
    Admin --> UC_ManageCatalog
    Admin --> UC_ManageInventory
    Admin --> UC_ProcessOrder
    Admin --> UC_Analytics

    %% Warehouse Staff Connections
    Staff --> UC_Fulfill
    Staff --> UC_ManageInventory

    %% System Actor Connections
    UC_Checkout -.-> UC_CalcShip
    UC_CalcShip --> Courier

    UC_Pay -.-> UC_Reconcile
    PG --> UC_Reconcile

    UC_ProcessOrder -.-> UC_WA_Notify
    UC_Track -.-> Courier
    UC_WA_Notify --> WA

    Cron --> UC_TTL
```

---

## 3. Detail Use Case: Domain Storefront & Transaksi Pelanggan

Diagram terperinci interaksi pembeli saat melakukan pemesanan langsung, termasuk relasi `<<include>>` dan `<<extend>>`.

```mermaid
graph TD
    User((Pelanggan))
    PG[("Payment Gateway")]
    Courier[("Kurir API")]

    subgraph DomainStorefront ["Sub-Sistem Storefront & Checkout"]
        UC_1["Melihat Detail Produk & Galeri"]
        UC_2["Memilih Varian (Ukuran/Warna)"]
        UC_3["Menambahkan Item ke Keranjang"]
        UC_4["Menerapkan Kupon Diskon / Voucher"]
        UC_5["Mengisi Alamat & Kontak Pengiriman"]
        UC_6["Memilih Opsi Kurir & Layanan Pengiriman"]
        UC_7["Menghitung Total Transaksi"]
        UC_8["Melakukan Reservasi Stok (TTL 15 Menit)"]
        UC_9["Memilih Jalur Pembayaran (QRIS / VA)"]
        UC_10["Melakukan Pembayaran"]
        UC_11["Menerima Konfirmasi & Resi Pesanan"]
    end

    User --> UC_1
    User --> UC_3
    User --> UC_5
    User --> UC_9
    User --> UC_10

    UC_1 -. "<<include>>" .-> UC_2
    UC_3 -. "<<extend>>" .-> UC_4
    UC_5 -. "<<include>>" .-> UC_6
    UC_6 --> Courier
    UC_5 -. "<<include>>" .-> UC_8
    UC_6 -. "<<include>>" .-> UC_7
    UC_7 -. "<<include>>" .-> UC_9
    UC_9 -. "<<include>>" .-> UC_10
    UC_10 --> PG
    UC_10 -. "<<include>>" .-> UC_11
```

### Spesifikasi Skenario Utama: Checkout & Reservasi
- **Aktor Utama**: Pelanggan
- **Pra-kondisi**: Pelanggan memiliki minimal 1 item di keranjang belanja.
- **Alur Normal**:
  1. Pelanggan membuka halaman checkout.
  2. Sistem memicu `UC_8: Reservasi Stok` untuk mengunci kuantitas varian selama TTL 15 menit.
  3. Pelanggan memasukkan data nama, nomor WhatsApp aktif, dan alamat lengkap.
  4. Sistem memanggil `Courier API` untuk mengambil opsi layanan dan tarif berdasarkan total berat item.
  5. Pelanggan memilih metode pembayaran (QRIS/VA).
  6. Pelanggan menyelesaikan pembayaran; status pesanan berubah menjadi `CONFIRMED`.
- **Ekstensi (Alur Alternatif)**:
  - *4a. Kupon Promo Diterapkan*: Jika kupon valid, kurangi subtotal sebelum penambahan ongkos kirim.
  - *2a. Stok Tidak Cukup*: Sistem membatalkan transaksi dan menampilkan notifikasi varian habis.

---

## 4. Detail Use Case: Domain Manajemen Operasional & Admin Toko

Diagram alur kerja pengelolaan merchant untuk katalog, stok, dan laporan keuangan.

```mermaid
graph TD
    Admin((Merchant / Admin))

    subgraph DomainAdmin ["Sub-Sistem Back-Office & Operasional Merchant"]
        UC_A1["Kelola Kategori & Tag Produk"]
        UC_A2["Buat Produk Baru & Upload Media"]
        UC_A3["Konfigurasi Matriks Opsi Varian (SKU)"]
        UC_A4["Atur Berat & Dimensi per Varian"]
        UC_A5["Monitoring Stok Real-Time (3-Tier)"]
        UC_A6["Manual Adjustment / Restock Opname"]
        UC_A7["Pantau Daftar Pesanan Masuk"]
        UC_A8["Kelola Pembatalan / Refund Transaksi"]
        UC_A9["Analisis GMV, Margin Bersih & Laporan Finansial"]
        UC_A10["Ekspor Data Pelanggan (CRM Contact List)"]
    end

    Admin --> UC_A1
    Admin --> UC_A2
    Admin --> UC_A5
    Admin --> UC_A7
    Admin --> UC_A9
    Admin --> UC_A10

    UC_A2 -. "<<include>>" .-> UC_A3
    UC_A3 -. "<<include>>" .-> UC_A4
    UC_A5 -. "<<extend>>" .-> UC_A6
    UC_A7 -. "<<extend>>" .-> UC_A8
```

---

## 5. Detail Use Case: Domain Pergudangan & Logistik (Fulfillment)

Diagram aktivitas pemenuhan pesanan dari gudang ke tangan kurir.

```mermaid
graph TD
    Staff((Staf Gudang))
    Courier[("Logistics API")]

    subgraph DomainGudang ["Sub-Sistem Pergudangan & Fulfillment"]
        UC_G1["Filter Pesanan Siap Kirim (Status: CONFIRMED)"]
        UC_G2["Cetak Lembar Picking & Packing List"]
        UC_G3["Ambil Item Sesuai Lokasi & SKU Varian"]
        UC_G4["Cetak Label Resi Pengiriman (Thermal A6 AWB)"]
        UC_G5["Pengepakan Paket (Packing QC)"]
        UC_G6["Request Pickup Kurir / Drop-off Counter"]
        UC_G7["Input Nomor Resi / Scan Barcode Kurir"]
        UC_G8["Update Status Pesanan Menjadi 'SHIPPED'"]
    end

    Staff --> UC_G1
    Staff --> UC_G2
    Staff --> UC_G3
    Staff --> UC_G4
    Staff --> UC_G5
    Staff --> UC_G6
    Staff --> UC_G7

    UC_G4 -. "<<include>>" .-> Courier
    UC_G6 -. "<<include>>" .-> Courier
    UC_G7 -. "<<include>>" .-> UC_G8
```

---

## 6. Detail Use Case: Integrasi Sistem Eksternal & Otomatisasi (Background Services)

Diagram use case untuk proses otomatisasi backend tanpa keterlibatan manual manusia.

```mermaid
graph TD
    PG[("Payment Gateway")]
    Cron[("Cron / Worker Engine")]
    WA[("WhatsApp Gateway")]

    subgraph DomainBackground ["Sub-Sistem Layanan Otomatisasi Backend"]
        UC_B1["Terima Webhook Notifikasi Pembayaran"]
        UC_B2["Validasi SHA512 Signature & Idempotensi"]
        UC_B3["Ubah Status Stok: Reserved -> Committed"]
        UC_B4["Update Status Pesanan: PENDING -> CONFIRMED"]
        UC_B5["Scan Reservasi Stok Kadaluarsa (> 15 Menit)"]
        UC_B6["Rollback Stok: Reserved -> Available"]
        UC_B7["Kirim Notifikasi Invoice WhatsApp ke Pembeli"]
        UC_B8["Kirim Notifikasi Live Tracking Resi ke Pembeli"]
        UC_B9["Kirim Reminder Keranjang Menggantung (Abandoned Cart)"]
    end

    PG --> UC_B1
    UC_B1 -. "<<include>>" .-> UC_B2
    UC_B2 -. "<<include>>" .-> UC_B3
    UC_B2 -. "<<include>>" .-> UC_B4
    UC_B4 -. "<<include>>" .-> UC_B7
    UC_B7 --> WA

    Cron --> UC_B5
    UC_B5 -. "<<include>>" .-> UC_B6
    Cron --> UC_B9
    UC_B9 --> WA
```

---

## 7. Matriks Hubungan Aktor dan Use Case (Traceability Matrix)

| Use Case ID | Nama Use Case | Primary Actor | Supporting Actor | Ketergantungan (`include`/`extend`) |
| :--- | :--- | :--- | :--- | :--- |
| **UC-01** | Cari & Filter Katalog Produk | Pelanggan | - | - |
| **UC-02** | Pilih Opsi & Varian SKU | Pelanggan | - | `<<include>>` UC-01 |
| **UC-03** | Reservasi Stok 15 Menit (TTL) | Sistem (Checkout) | SQLite Engine | `<<include>>` UC-04 |
| **UC-04** | Inisiasi Checkout & Isi Alamat | Pelanggan | Logistics API | `<<include>>` UC-05 |
| **UC-05** | Hitung Ongkir Multi-Kurir | Sistem | Logistics API | `<<include>>` UC-04 |
| **UC-06** | Bayar via QRIS / VA | Pelanggan | Payment Gateway | `<<include>>` UC-07 |
| **UC-07** | Rekonsiliasi Webhook Pembayaran | Payment Gateway | SQLite Engine | `<<include>>` UC-08, UC-09 |
| **UC-08** | Commit Stok Terjual | Sistem | SQLite Engine | `<<include>>` UC-07 |
| **UC-09** | Kirim Notifikasi WhatsApp | Sistem | WhatsApp Gateway | - |
| **UC-10** | Rollback Stok Kadaluarsa | Cron Engine | SQLite Engine | - |
| **UC-11** | Buat Matriks Varian Produk | Merchant / Admin | - | `<<include>>` UC-12 |
| **UC-12** | Input Berat & Dimensi Varian | Merchant / Admin | - | `<<include>>` UC-11 |
| **UC-13** | Cetak Resi Pengiriman A6 | Staf Gudang | Logistics API | - |
| **UC-14** | Request Pickup / Drop-Off Kurir | Staf Gudang | Logistics API | `<<include>>` UC-15 |
| **UC-15** | Update Status Pesanan SHIPPED | Staf Gudang | WhatsApp Gateway | `<<include>>` UC-09 |
| **UC-16** | Analisis GMV & Finansial | Merchant / Admin | - | - |
| **UC-17** | Recovery Abandoned Cart | Cron Engine | WhatsApp Gateway | - |
