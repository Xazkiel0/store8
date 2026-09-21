# 06. Activity Diagrams & Independent E-Commerce Operational Workflows

Dokumentasi ini memetakan seluruh **Activity Diagram** operasional sistem **Storeight** (Platform Toko Online Mandiri / Self-Hosted D2C E-Commerce) menggunakan format standar **Mermaid**.

Perancangan ini berfokus pada arsitektur transaksi langsung untuk **menghilangkan biaya komisi/potongan marketplace** (*Marketplace Fee Elimination*), menjaga kedaulatan data pelanggan (*1st-Party Customer Data Ownership*), dan menjamin integritas transaksi melalui *3-Tier Inventory Locking* dan otomatisasi logistik multi-kurir.

---

## 1. Analisis Strategis: Toko Online Mandiri vs Marketplace

```mermaid
graph TD
    subgraph MarketplaceModel [Model Marketplace Konvensional]
        direction TB
        M_Cust[Pelanggan Beli di Marketplace] --> M_Fee[Potongan Biaya Admin 4.5% - 10%]
        M_Cust --> M_ShipFee[Potongan Biaya Gratis Ongkir XTRA 3% - 4.5%]
        M_Cust --> M_Mask[Data Pembeli Disamarkan / Tidak Bisa CRM]
        M_Cust --> M_Escrow[Dana Ditahan di Saldo Marketplace 2-7 Hari]
        M_Cust --> M_Comp[Iklan Toko Kompetitor Muncul di Halaman Produk]
    end

    subgraph StoreightModel [Model Toko Online Mandiri - Storeight]
        direction TB
        S_Cust[Pelanggan Beli di Storeight Storefront] --> S_Direct[0% Biaya Komisi Platform / Marketplace]
        S_Cust --> S_PG[Hanya Biaya Payment Gateway: QRIS 0.7% / VA Flat ~Rp2.000]
        S_Cust --> S_Data[100% Kepemilikan Database Pelanggan & No. WhatsApp]
        S_Cust --> S_Payout[Pencairan Dana Otomatis H+1 Langsung ke Rekening]
        S_Cust --> S_Brand[Eksklusif Brand Sendiri Tanpa Gangguan Kompetitor]
    end

    style MarketplaceModel fill:#ffebee,stroke:#c62828,stroke-width:2px
    style StoreightModel fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

---

## 2. Activity Diagram: End-to-End Customer Purchase & Checkout Loop

Diagram aktivitas lengkap interaksi pembeli dari katalog hingga konfirmasi pesanan berhasil.

```mermaid
stateDiagram-v2
    [*] --> BukaStorefront: Pelanggan Mengunjungi Web Toko
    
    state "Katalog & Pilihan Varian" as Katalog {
        BukaStorefront --> PilihProduk: Eksplorasi Produk
        PilihProduk --> PilihVarian: Tentukan Opsi (Ukuran/Warna)
        PilihVarian --> CekStok: Verifikasi Stok Real-Time
    }

    CekStok --> VarianHabis: Stok == 0
    VarianHabis --> PilihVarian: Pilih Varian Lain / Tunggu Restock

    CekStok --> MasukKeranjang: Stok > 0
    MasukKeranjang --> ReviewKeranjang: Buka Cart Drawer / Page
    ReviewKeranjang --> InisiasiCheckout: Klik Tombol "Lanjut ke Pembayaran"

    state "Orkestrasasi Checkout & Reservasi Stok" as CheckoutProses {
        InisiasiCheckout --> KunciStokTTL: Reserve Stock (TTL 15 Menit)
        KunciStokTTL --> IsiAlamatPengiriman: Masukkan Alamat & Kontak (Nama, No WA, Kota/Kecamatan)
        
        IsiAlamatPengiriman --> KalkulasiOngkir: Hitung Berat Total & Panggil API Multi-Kurir
        KalkulasiOngkir --> PilihLayananKurir: Pilih Kurir (JNE, J&T, SiCepat, Instant)
        
        PilihLayananKurir --> HitungGrandTotal: Grand Total = Subtotal + Ongkir - Diskon Promo
        HitungGrandTotal --> PilihMetodeBayar: Pilih Jalur Pembayaran (QRIS, VA Bank, Transfer)
    }

    state "Proses Pembayaran & Rekonsiliasi Webhook" as Pembayaran {
        PilihMetodeBayar --> GenerateInstruksiBayar: Tampilkan QRIS / Nomor VA
        GenerateInstruksiBayar --> MenungguPembayaran: Menunggu Customer Transfer

        state c_pembayaran <<choice>>
        MenungguPembayaran --> c_pembayaran: Evaluasi Status Transaksi
        
        c_pembayaran --> WebhookSukses: Payment Gateway Webhook (PAID)
        c_pembayaran --> ExpiredTTL: Waktu Habis (TTL > 15 Menit)
        c_pembayaran --> UserBatal: Pelanggan Membatalkan Transaksi
    }

    ExpiredTTL --> RollbackStok: Kembalikan Stok ke Pool 'Available'
    UserBatal --> RollbackStok
    RollbackStok --> [*]: Pesanan Dibatalkan (Expired / Cancelled)

    state "Finalisasi Pesanan & Notifikasi" as Finalisasi {
        WebhookSukses --> CommitStok: Ubah Status Stok dari 'Reserved' -> 'Committed'
        CommitStok --> BuatOrderSnapshot: Buat Snapshot Data Pesanan Imutabel (CONFIRMED)
        BuatOrderSnapshot --> KirimNotifikasiWA: Kirim Invoice & Link Tracking via WhatsApp / Email
        KirimNotifikasiWA --> TampilHalamanSukses: Tampilkan Layar Terima Kasih & Resi Pesanan
    }

    TampilHalamanSukses --> [*]: Pesanan Siap Diproses Merchant
```

---

## 3. Activity Diagram: 3-Tier Inventory Lifecycle & Concurrency Locking

Diagram aktivitas pengelolaan daur hidup stok 3 tingkat (*Available $\rightarrow$ Reserved $\rightarrow$ Committed*) dengan pencegahan *race-condition* dan *overselling* saat lonjakan transaksi (flash sale).

```mermaid
flowchart TD
    Start([Pelanggan Mengklik Checkout]) --> LockCheck{Eksekusi db.transaction: Cek Stok Fisik}
    
    LockCheck -- "Stok Tersedia < Permintaan" --> Reject[Tolak Checkout & Notifikasi 'Stok Habis']
    Reject --> EndFail([Selesai - Transaksi Batal])

    LockCheck -- "Stok Tersedia >= Permintaan" --> ReserveTx[Update Database Atomik:\n1. available = available - qty\n2. reserved = reserved + qty\n3. Catat expires_at = now + 15 Menit]
    
    ReserveTx --> StartTimer[/Jalankan Timer TTL / Cron Worker/]
    
    StartTimer --> WaitPayment{Status Pembayaran Dalam 15 Menit?}

    WaitPayment -- "Webhook PAID Diterima" --> CommitTx[Eksekusi db.transaction:\n1. reserved = reserved - qty\n2. committed = committed + qty\n3. Status Order -> CONFIRMED]
    CommitTx --> StockDeducted([Stok Final Terpotong Permanen])

    WaitPayment -- "Waktu Habis / Expired" --> ReleaseTx[Eksekusi db.transaction:\n1. reserved = reserved - qty\n2. available = available + qty\n3. Status Order -> CANCELLED]
    ReleaseTx --> StockRestored([Stok Kembali Tersedia ke Katalog])

    WaitPayment -- "Customer Cancel Manual" --> ReleaseTx

    style ReserveTx fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style CommitTx fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style ReleaseTx fill:#ffebee,stroke:#c62828,stroke-width:2px
```

---

## 4. Activity Diagram: Pemenuhan Pesanan Merchant (Fulfillment & Logistics)

Diagram alur kerja merchant/admin dari pesanan terbayar hingga pengiriman paket ke kurir.

```mermaid
stateDiagram-v2
    [*] --> PesananMasuk: Order Terkonfirmasi (Status: CONFIRMED / PAID)

    state "Verifikasi & Batching" as Verifikasi {
        PesananMasuk --> CetakLabel: Cetak Invoice & Label Pengiriman (Thermal A6)
        CetakLabel --> AmbilBarang: Picking Barang di Gudang Sesuai Varian SKU
        AmbilBarang --> QualityControl: Cek Fisik Barang & Kelengkapan
    }

    state "Packing & Request Kurir" as Logistik {
        QualityControl --> PackingPaket: Pengemasan Aman (Bubble wrap / Polymailer)
        PackingPaket --> TempelResi: Tempel Label AWB / Barcode Resi
        
        state c_tipe_kurir <<choice>>
        TempelResi --> c_tipe_kurir: Tipe Layanan Pengiriman
        
        c_tipe_kurir --> RequestPickup: Layanan Pickup (Kurir Jemput ke Toko)
        c_tipe_kurir --> DropOffOutlet: Layanan Drop-Off (Merchant Antar ke Agen)
    }

    state "Serah Terima & Tracking" as Pengiriman {
        RequestPickup --> KurirScan: Kurir Scan Paket Saat Penjemputan
        DropOffOutlet --> KurirScan: Petugas Agen Scan Barcode Paket
        
        KurirScan --> UpdateStatusShipped: Update Status Order: SHIPPED
        UpdateStatusShipped --> AutoKirimResiWA: Sistem Kirim Link Live Tracking ke WhatsApp Pembeli
    }

    state "Penyelesaian Pengiriman" as Selesai {
        UpdateStatusShipped --> PaketDalamPerjalanan: Paket Bergerak di Jaringan Ekspedisi
        PaketDalamPerjalanan --> PaketTerkirim: Kurir Konfirmasi Diterima Pembeli (DELIVERED)
        PaketTerkirim --> UpdateStatusDelivered: Status Order: COMPLETED
        UpdateStatusDelivered --> KirimPesanUlasan: Kirim Pesan Terima Kasih & Permintaan Review Otomatis
    }

    KirimPesanUlasan --> [*]: Transaksi Selesai Sepenuhnya
```

---

## 5. Activity Diagram: Pembayaran Langsung & Rekonsiliasi Otomatis (0% Marketplace Fee)

Diagram alur penerimaan uang langsung via Payment Gateway (Midtrans / Xendit / Tripay) dan pencairan saldo (*auto-disbursement*) ke rekening bank toko.

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Pembeli
    participant UI as Storefront UI
    participant Server as Storeight Server Actions
    participant DB as SQLite (Drizzle ORM)
    participant PG as Payment Gateway (QRIS/VA)
    participant Bank as Rekening Bank Toko

    Customer->>UI: Klik "Bayar Sekarang"
    UI->>Server: createPaymentTransaction(orderId)
    Server->>PG: Request Payment Token / QRIS / VA String
    PG-->>Server: Response (QRIS Image URL, VA Number, Expiry)
    Server-->>UI: Render Tampilan Pembayaran

    Customer->>PG: Bayar via Mobile Banking / E-Wallet
    Note over Customer,PG: Pelanggan scan QRIS atau transfer ke VA

    PG->>Server: HTTP POST Webhook: /api/webhooks/payment
    Note over PG,Server: Payload berisi signature_key, status: 'settlement'

    rect rgb(240, 248, 255)
        Note over Server,DB: Verifikasi & Rekonsiliasi Aman (Idempotent)
        Server->>Server: Verifikasi SHA512 Signature Key
        Server->>DB: Query Order by ID & Cek Status Saat Ini
        alt Status Sudah 'PAID' (Duplicate Webhook)
            Server-->>PG: HTTP 200 OK (Abaikan Proses Ulang)
        else Status Masih 'PENDING'
            Server->>DB: UPDATE orders SET payment_status = 'PAID', status = 'CONFIRMED'
            Server->>DB: UPDATE inventory (Commit Reserved Stock)
            Server-->>PG: HTTP 200 OK
        end
    end

    Server->>Customer: Kirim Notifikasi WhatsApp Pembayaran Sukses
    
    rect rgb(232, 245, 233)
        Note over PG,Bank: Settlement Payout (H+1 Otomatis)
        PG->>Bank: Transfer Bersih Dana Penjualan (Hanya dipotong Fee PG ~0.7%)
        Note over Bank: 0% Potongan Komisi Marketplace Terserap
    end
```

---

## 6. Activity Diagram: CRM 1st-Party & Retensi Pembeli (WhatsApp Automation)

Diagram pemanfaatan data mandiri (*1st-party customer data*) untuk meningkatkan pembelian berulang (*repeat order*) dan pemulihan keranjang tertinggal (*abandoned cart recovery*).

```mermaid
stateDiagram-v2
    [*] --> EventCustomer: Aksi Pembeli di Toko

    state c_event <<choice>>
    EventCustomer --> c_event: Deteksi Peristiwa Pelanggan

    c_event --> AbandonedCart: Masukkan Item ke Keranjang tapi Tidak Checkout (> 2 Jam)
    c_event --> OrderPaid: Pesanan Berhasil Dibayar
    c_event --> OrderCompleted: Pesanan Sudah Diterima 7 Hari Lalu

    state "Alur Abandoned Cart Recovery" as AlurCart {
        AbandonedCart --> TriggerCronCart: Worker Mendeteksi Keranjang Menggantung
        TriggerCronCart --> KirimReminderWA: Kirim Pengingat WhatsApp Ramah + Voucher Diskon 5%
        KirimReminderWA --> CustomerKlikLink: Pembeli Klik Link Direct-Checkout
        CustomerKlikLink --> SelesaikanPembelian: Transaksi Berhasil Dipulihkan
    }

    state "Alur Customer Delight & Repeat Order" as AlurRepeat {
        OrderPaid --> SimpanProfilPelanggan: Simpan Data Kontak & Riwayat Belanja ke DB Toko
        SimpanProfilPelanggan --> SegmentasiPelanggan: Kelompokkan (VIP, Repeat, New Customer)

        OrderCompleted --> KirimVoucherLoyalitas: Kirim WhatsApp Promo Eksklusif Produk Pelengkap
        KirimVoucherLoyalitas --> RepeatOrder: Pembeli Belanja Kembali Langsung di Web Toko
    }

    SelesaikanPembelian --> [*]
    RepeatOrder --> [*]
```

---

## 7. Activity Diagram: Manajemen Produk & Multi-Varian (Merchant Back-Office)

Diagram alur pengelolaan katalog produk, matriks varian otomatis, penentuan berat untuk ongkir otomatis, dan sinkronisasi stok.

```mermaid
stateDiagram-v2
    [*] --> BukaAdminProduk: Admin Membuka Dashboard Produk
    BukaAdminProduk --> InputInformasiDasar: Isi Judul, Deskripsi, Kategori, & Upload Foto

    state "Konfigurasi Varian & Matriks Opsi" as VarianMatrix {
        InputInformasiDasar --> TentukanOpsi: Tambah Opsi (Misal: Warna = Merah, Hitam | Ukuran = S, M, L)
        TentukanOpsi --> GenerateKombinasi: Sistem Otomatis Generate Matriks Kombinasi (6 SKU)
        
        GenerateKombinasi --> SetHargaDanStok: Input Harga Jual, Harga Coret, & Stok per SKU
        SetHargaDanStok --> SetBeratDimensi: Input Berat (gram) & Dimensi (P x L x T cm) per Varian
        note right of SetBeratDimensi: Wajib diisi akurat agar kalkulasi ongkir kurir presisi otomatis
    }

    state "Validasi & Publikasi" as Publikasi {
        SetBeratDimensi --> ValidasiData: Zod Schema Validation (Server Action)
        
        state c_validasi <<choice>>
        ValidasiData --> c_validasi: Apakah Data Lengkap & Valid?
        
        c_validasi --> TampilError: Ada Kolom Kosong / Invalid
        TampilError --> SetHargaDanStok: Perbaiki Input
        
        c_validasi --> SimpanKeDatabase: Valid (db.transaction)
        SimpanKeDatabase --> IndexKatalog: Simpan Produk & Varian ke SQLite
    }

    IndexKatalog --> TayangDiStorefront: Produk Aktif & Siap Dipesan di Web Toko
    TayangDiStorefront --> [*]
```

---

## 8. Ringkasan Keunggulan Operasional & Finansial Toko Mandiri

| Parameter | Marketplace Pihak Ketiga | Toko Mandiri Storeight | Keuntungan Strategis |
| :--- | :--- | :--- | :--- |
| **Biaya Transaksi / Komisi** | 6.5% - 12.5% per transaksi | 0% biaya platform (hanya PG ~0.7%) | **Penghematan margin bersih 6% - 11% per order** |
| **Biaya Layanan Pembeli** | Rp1.000 - Rp3.000 per transaksi | Rp0 (Gratis untuk pembeli) | Mengurangi friksi checkout pembeli |
| **Pencairan Dana (Disbursement)** | Tertahan 3 - 7 hari di saldo e-commerce | H+1 otomatis ke rekening merchant | Arus kas (*cash flow*) jauh lebih sehat |
| **Kepemilikan Data Pembeli** | Data disamarkan (*masked*), nomor HP disensor | 100% milik toko (Nama, HP, Email, Riwayat) | Aset jangka panjang untuk *remarketing* WhatsApp |
| **Perang Harga & Iklan Kompetitor** | Iklan toko lain muncul di halaman produk sendiri | 100% lingkungan brand eksklusif | Bebas dari perang harga (*price war*) |
| **Ketentuan & Kebijakan Toko** | Terikat aturan penalti & penutupan sepihak | Kendali penuh di tangan pemilik bisnis | Bisnis aman dan berkelanjutan jangka panjang |
