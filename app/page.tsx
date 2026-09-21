import Link from "next/link";
import {
  ShoppingBag,
  ShieldCheck,
  Zap,
  Percent,
  Truck,
  QrCode,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  Database,
  Smartphone,
  PhoneCall,
  Check,
  HelpCircle,
  Clock,
  RefreshCw,
  Globe2,
} from "lucide-react";
import { SavingsCalculator } from "@/components/savings-calculator";

export default function LandingPage() {
  const whatsappUrl =
    "https://wa.me/6281234567890?text=Halo%20Tim%20Storeight,%20saya%20tertarik%20konsultasi%20layanan%20pembuatan%20website%20toko%20online%20mandiri.";

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-black">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-zinc-950 font-black text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              S8
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Storeight
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  D2C Engine
                </span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#keunggulan" className="hover:text-emerald-400 transition-colors">
              Keunggulan
            </a>
            <a href="#fitur" className="hover:text-emerald-400 transition-colors">
              Fitur Arsitektur
            </a>
            <a href="#kalkulator" className="hover:text-emerald-400 transition-colors">
              Hitung Penghematan
            </a>
            <a href="#harga" className="hover:text-emerald-400 transition-colors">
              Paket Layanan
            </a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Konsultasi Toko</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-zinc-900">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs sm:text-sm font-medium text-emerald-400">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Platform E-Commerce Mandiri Berkinerja Tinggi</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Miliki Website Toko Online Sendiri.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Bebas Potongan Komisi 10%+
              </span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-normal">
              Hentikan ketergantungan pada marketplace. Bangun toko online D2C dengan kecepatan ultra-cepat, integrasi pembayaran QRIS otomatis, cek ongkir instan, dan 100% kepemilikan database pembeli.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base transition-all shadow-xl shadow-emerald-500/25 group"
              >
                <span>Mulai Buat Toko Online</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#fitur"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-base transition-all"
              >
                <span>Pelajari Cara Kerja</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl sm:text-2xl font-mono">
                  <Percent className="w-5 h-5" /> 0% Komisi
                </div>
                <div className="text-xs text-zinc-400 mt-1">Bebas fee marketplace per transaksi</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xl sm:text-2xl font-mono">
                  <Zap className="w-5 h-5" /> &lt;0.8s Load
                </div>
                <div className="text-xs text-zinc-400 mt-1">Next.js 16 + SQLite ultra-cepat</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xl sm:text-2xl font-mono">
                  <Lock className="w-5 h-5" /> 3-Tier Lock
                </div>
                <div className="text-xs text-zinc-400 mt-1">Anti-overselling saat flash sale</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl sm:text-2xl font-mono">
                  <Database className="w-5 h-5" /> 100% Data
                </div>
                <div className="text-xs text-zinc-400 mt-1">Database & kontak WA milik Anda</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Marketplace vs Toko Mandiri */}
      <section id="keunggulan" className="py-20 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Perbandingan Nyata
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mengapa Brand Sukses Beralih ke Toko Online Mandiri?
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              Jangan biarkan margin keuntungan dan data pelanggan bisnis Anda dikontrol pihak ketiga.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Marketplace Card */}
            <div className="rounded-3xl border border-rose-500/20 bg-rose-950/10 p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-rose-300 flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-rose-400" />
                  Marketplace Konvensional
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Potongan Tinggi
                </span>
              </div>

              <ul className="space-y-4 text-sm text-zinc-300">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Potongan Komisi 7% - 12%</strong> per transaksi (biaya admin, biaya kategori, gratis ongkir ekstra).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Data Pembeli Disamarkan:</strong> Tidak bisa ekspor nomor WhatsApp pembeli untuk repeat order / CRM.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Iklan Kompetitor Muncul:</strong> Produk pesaing yang lebih murah dipajang tepat di bawah produk Anda.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Pencairan Dana Ditahan:</strong> Dana tertahan 3-7 hari sampai pelanggan mengonfirmasi penerimaan barang.
                  </span>
                </li>
              </ul>
            </div>

            {/* Storeight D2C Card */}
            <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  Toko Mandiri Storeight
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Profit Anda
                </span>
              </div>

              <ul className="space-y-4 text-sm text-zinc-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">0% Biaya Komisi Platform:</strong> Hanya biaya standard Payment Gateway (QRIS ~0.7% / VA flat).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">100% Kepemilikan Data:</strong> Database lengkap alamat, nomor WhatsApp, & histori belanja untuk broadcast promosi.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Brand Eksklusif:</strong> Halaman toko bersih tanpa gangguan iklan kompetitor atau perang harga.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Pencairan Dana Otomatis H+1:</strong> Uang langsung masuk ke rekening bisnis Anda tanpa tertahan.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <section id="kalkulator" className="py-20 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SavingsCalculator />
        </div>
      </section>

      {/* 6 Core Architecture Features */}
      <section id="fitur" className="py-20 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Arsitektur & Fitur Lengkap
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Teknologi E-Commerce Mutakhir untuk Menangani Ribuan Pesanan
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              Dibangun dari nol dengan standar enterprise untuk memastikan stabilitas transaksi saat traffic memuncak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">3-Tier Inventory Locking</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Stok otomatis dikunci (Reserved) dengan timer TTL saat pembeli checkout, dan berubah menjadi Committed saat bayar. Mencegah drama stok minus saat flash sale.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">QRIS & Virtual Account Otomatis</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Verifikasi pembayaran instan tanpa perlu cek mutasi rekening manual. Pelanggan bisa bayar lewat QRIS (BCA, GoPay, OVO, ShopeePay) & semua bank.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Multi-Ekspedisi & Cek Ongkir</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Kalkulasi ongkos kirim otomatis hingga tingkat kecamatan di seluruh Indonesia (JNE, J&T, SiCepat, Anteraja, Paxel) beserta cetak label resi instan.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">WhatsApp CRM & Cart Recovery</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Otomatis kirim notifikasi WhatsApp saat pesanan dibuat, bukti bayar terkonfirmasi, resi dikirim, serta follow-up otomatis bagi calon pembeli yang belum bayar.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Performa Kilat (Next.js 16)</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Kecepatan loading website &lt; 0.8 detik meningkatkan konversi iklan hingga 2.5x lipat. Pengunjung tidak akan kabur karena website lambat.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Custom Domain & Branding Penuh</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Gunakan nama domain toko Anda sendiri (misal: <code>tokosaya.com</code>). Tampilan profesional tanpa embel-embel watermark platform pihak ketiga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / 3 Steps */}
      <section className="py-20 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Proses Mudah
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              3 Langkah Praktis Meluncurkan Toko Online Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-8 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/40">
                01
              </div>
              <h4 className="text-xl font-bold text-white">Setup Domain & Katalog</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Pilih nama domain brand Anda, upload foto produk, tentukan variasi ukuran & warna beserta harga dan stok awal.
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-8 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 font-mono font-bold flex items-center justify-center border border-teal-500/40">
                02
              </div>
              <h4 className="text-xl font-bold text-white">Hubungkan Pembayaran & Ekspedisi</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Aktifkan QRIS instan dan pilih kurir ekspedisi favorit toko Anda. Semua kalkulasi ongkir dan verifikasi bayar berjalan otomatis.
              </p>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-8 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center border border-cyan-500/40">
                03
              </div>
              <h4 className="text-xl font-bold text-white">Mulai Jualan & Terima Profit Penuh</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Sebarkan link toko di bio Instagram, TikTok, atau pasang Meta Ads. Terima transaksi 24 jam nonstop dengan profit 100% milik Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      <section id="harga" className="py-20 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Paket Layanan
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Investasi Transparan Tanpa Biaya Tersembunyi
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              Pilih paket yang sesuai dengan skala bisnis toko online Anda saat ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Starter D2C
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-white">Rp 1.499.000</div>
                  <div className="text-xs text-zinc-500">Biaya Setup Awal (Sekali Bayar)</div>
                </div>
                <p className="text-xs text-zinc-400">
                  Cocok untuk UMKM pemula yang ingin mulai lepas dari ketergantungan marketplace.
                </p>

                <div className="h-px bg-zinc-800" />

                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Hingga 100 SKU Produk & Varian</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Integrasi QRIS & Virtual Account</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cek Ongkir Otomatis Multi-Kurir</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Domain Custom .com / .id (1 Tahun)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>0% Biaya Komisi Platform</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-colors"
              >
                Pilih Paket Starter
              </a>
            </div>

            {/* Growth / Pro Plan (Highlighted) */}
            <div className="bg-gradient-to-b from-emerald-950/30 to-zinc-900 border-2 border-emerald-500/50 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-emerald-500 text-zinc-950 text-xs font-bold uppercase tracking-wider">
                Paling Diminati Brand
              </div>

              <div className="space-y-4">
                <div className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                  Growth & Ads Ready
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-white">Rp 2.999.000</div>
                  <div className="text-xs text-zinc-400">Biaya Setup Lengkap Siap Iklan</div>
                </div>
                <p className="text-xs text-zinc-300">
                  Ideal untuk Brand D2C aktif beriklan Meta/TikTok Ads yang butuh konversi tinggi.
                </p>

                <div className="h-px bg-zinc-800" />

                <ul className="space-y-3 text-xs sm:text-sm text-zinc-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited SKU Produk & Varian</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <strong className="text-emerald-400">3-Tier Inventory Locking</strong> (Anti-Oversell)
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp Follow-up Cart Recovery</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Integrasi Meta Pixel & TikTok Pixel</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Support Prioritas & Panduan Setup</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25"
              >
                Konsultasi Paket Growth
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  Scale & Custom
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-extrabold text-white">Hubungi Kami</div>
                  <div className="text-xs text-zinc-500">Custom Architecture & SLA</div>
                </div>
                <p className="text-xs text-zinc-400">
                  Untuk brand skala besar dengan multi-gudang, volume ratusan ribu order, & integrasi ERP.
                </p>

                <div className="h-px bg-zinc-800" />

                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-Warehouse / Multi-Gudang</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Integrasi API Eksternal & ERP</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom Workflow & Loyalty Points</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Cloud Server & Backup Harian</span>
                  </li>
                </ul>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-colors"
              >
                Diskusi Kebutuhan Khusus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Tanya Jawab (FAQ)
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pertanyaan yang Sering Diajukan
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                Apakah saya tetap bisa jualan di marketplace sambil punya toko online mandiri?
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Tentu saja! Strategi terbaik adalah menggunakan marketplace sebagai saluran akuisisi pembeli baru, lalu mengarahkan pembeli setia (repeat customer) untuk berbelanja di website mandiri Anda agar Anda mendapatkan 100% profit tanpa potongan komisi.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                Bagaimana proses pencairan dana dari pembayaran pembeli?
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Pembayaran via QRIS, Virtual Account, atau E-Wallet langsung diproses oleh Payment Gateway resmi (seperti Midtrans/Xendit/Duitku) dan dicairkan otomatis langsung ke rekening bank bisnis Anda setiap H+1 kerja.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                Apakah sistem aman dari masalah stok minus saat ramai flash sale?
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Ya! Storeight dilengkapi arsitektur <em>3-Tier Inventory Locking</em> yang secara otomatis mengunci stok saat pembeli menekan tombol checkout dengan timer TTL (Time-to-Live). Jika tidak dibayar dalam batas waktu, stok otomatis dikembalikan ke etalase.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                Apakah saya dibantu proses upload produk dan setup domain?
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Ya, tim kami menyediakan layanan pendampingan penuh mulai dari konfigurasi nama domain toko, integrasi payment gateway, pengaturan ekspedisi, hingga training penggunaan dashboard admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Banner */}
      <section id="konsultasi" className="py-20 bg-gradient-to-b from-zinc-950 to-emerald-950/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-3xl p-8 sm:p-14 text-zinc-950 shadow-2xl text-center space-y-6 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950">
                Siap Melipatgandakan Profit Bersih Toko Anda?
              </h3>
              <p className="text-base sm:text-lg text-emerald-950/90 font-medium">
                Konsultasikan kebutuhan toko online mandiri Anda bersama tim ahli Storeight hari ini. Dapatkan estimasi penghematan dan demo langsung secara gratis.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-base transition-all shadow-xl"
              >
                <PhoneCall className="w-5 h-5 text-emerald-400" />
                <span>Hubungi via WhatsApp Sekarang</span>
              </a>
            </div>

            <div className="pt-2 text-xs font-semibold text-emerald-950/80">
              Respon Cepat • Tanpa Biaya Tersembunyi • 100% Kedaulatan Bisnis Anda
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 text-sm text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-zinc-950 font-black text-xs">
              S8
            </div>
            <span className="font-bold text-zinc-300">Storeight D2C Platform</span>
            <span>— Solusi Toko Online Mandiri Indonesia</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#keunggulan" className="hover:text-zinc-300 transition-colors">
              Keunggulan
            </a>
            <a href="#fitur" className="hover:text-zinc-300 transition-colors">
              Fitur
            </a>
            <a href="#harga" className="hover:text-zinc-300 transition-colors">
              Harga
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">
              Kontak
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
