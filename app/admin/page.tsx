import Link from "next/link";
import {
  TrendingUp,
  PackageCheck,
  Boxes,
  ShieldCheck,
  ArrowUpRight,
  Printer,
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Truck,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Plus,
  RefreshCw,
  Zap,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Hero / Executive Radar Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Real-Time Radar
            </span>
            <span className="text-zinc-400 text-xs flex items-center gap-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sinkronisasi SQLite Aktif
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Ringkasan Eksekutif Toko
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Monitor transaksi langsung tanpa potongan komisi pihak ketiga, locking inventori 3-tier, dan antrean pengiriman resi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 text-xs font-semibold transition-colors"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Cetak AWB Siap Kirim (14)</span>
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tambah Produk Baru</span>
          </Link>
        </div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Real-time GMV */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all group">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">GMV Hari Ini (Gross)</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            Rp 8.450.000
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-emerald-400 font-bold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +18.4%
            </span>
            <span className="text-zinc-400">vs kemarin (28 transaksi)</span>
          </div>
        </div>

        {/* KPI 2: Marketplace Commission Saved */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-900/80 border border-emerald-500/30 hover:border-emerald-500/50 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl -mr-6 -mt-6"></div>
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Fee Marketplace Hemat
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 tracking-tight">
            Rp 14.850.000
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-emerald-300 font-medium">Bulan Berjalan (8.5% Cut)</span>
            <span className="text-zinc-400">• 100% Margin Anda</span>
          </div>
        </div>

        {/* KPI 3: Fulfillment Queue */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all group">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Antrean Dispatch Resi</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 tracking-tight">
            14 Pesanan
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-amber-400 font-semibold">9 Siap Packing</span>
            <span className="text-zinc-400">• 5 Menunggu Pickup</span>
          </div>
        </div>

        {/* KPI 4: 3-Tier Inventory State */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition-all group">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Stok 3-Tier Active</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            1.240 <span className="text-xs text-zinc-400 font-normal">Avail</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="text-purple-400">18 Reserved (TTL)</span>
            <span className="text-cyan-400">94 Committed</span>
          </div>
        </div>
      </div>

      {/* D2C Sovereignty Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-cyan-950/30 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
              Kedaulatan Finansial D2C & Database Pelanggan Penuh
            </h2>
            <p className="text-zinc-400">
              Transaksi mengalir langsung ke rekening toko Anda via QRIS / Virtual Account tanpa sistem hold saldo 3-7 hari ala marketplace.
            </p>
          </div>
        </div>
        <Link
          href="/admin/analytics"
          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold whitespace-nowrap"
        >
          Lihat Simulasi Margin
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Grid: Live Orders Radar (Left 2 cols) & 3-Tier Stock & Quick Action (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Order Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Antrean Transaksi Real-Time
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono font-medium">
                Live Feed
              </span>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
            >
              Buka Semua (128)
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Orders Table Mock */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-800/60 text-zinc-400 font-medium border-b border-zinc-800 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Order ID & Waktu</th>
                    <th className="p-3">Pelanggan & Kontak</th>
                    <th className="p-3">Item Ringkasan</th>
                    <th className="p-3">Total (Rp)</th>
                    <th className="p-3">Status State</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-sans">
                  {/* Row 1: Paid / Confirmed */}
                  <tr className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3 font-mono">
                      <div className="font-bold text-emerald-400">#ORD-20250304-001</div>
                      <div className="text-[10px] text-zinc-400">2 mnt yang lalu</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-white">Budi Santoso</div>
                      <div className="text-[10px] text-zinc-400">0812-9842-xxxx (Jakarta)</div>
                    </td>
                    <td className="p-3">
                      <div className="text-zinc-200">2x Oversized Heavy Hoodie (L, Black)</div>
                      <div className="text-[10px] text-zinc-400">JNE Reguler (1.2 kg)</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-white">
                      Rp 720.000
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> CONFIRMED
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium transition-colors"
                      >
                        <Printer className="w-3 h-3 text-emerald-400" />
                        AWB
                      </Link>
                    </td>
                  </tr>

                  {/* Row 2: Reserved / Awaiting QRIS */}
                  <tr className="hover:bg-zinc-800/40 transition-colors bg-purple-950/10">
                    <td className="p-3 font-mono">
                      <div className="font-bold text-purple-400">#ORD-20250304-002</div>
                      <div className="text-[10px] text-purple-300 font-mono">TTL: 08:42 sisa</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-white">Siti Rahmawati</div>
                      <div className="text-[10px] text-zinc-400">0857-1234-xxxx (Surabaya)</div>
                    </td>
                    <td className="p-3">
                      <div className="text-zinc-200">1x Heavyweight Tee (M, Vintage White)</div>
                      <div className="text-[10px] text-zinc-400">SiCepat BEST (0.4 kg)</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-white">
                      Rp 185.000
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Clock className="w-3 h-3" /> RESERVED (TTL)
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[11px] text-zinc-400 font-mono">Menunggu QRIS</span>
                    </td>
                  </tr>

                  {/* Row 3: Packed */}
                  <tr className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3 font-mono">
                      <div className="font-bold text-amber-400">#ORD-20250304-003</div>
                      <div className="text-[10px] text-zinc-400">15 mnt yang lalu</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-white">Dimas Pratama</div>
                      <div className="text-[10px] text-zinc-400">0819-5567-xxxx (Bandung)</div>
                    </td>
                    <td className="p-3">
                      <div className="text-zinc-200">1x Tactical Cargo Pants (32, Olive)</div>
                      <div className="text-[10px] text-zinc-400">J&T Express (0.7 kg)</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-white">
                      Rp 450.000
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <PackageCheck className="w-3 h-3" /> PACKED
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold transition-colors">
                        <Truck className="w-3 h-3" />
                        Pickup
                      </button>
                    </td>
                  </tr>

                  {/* Row 4: Shipped */}
                  <tr className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3 font-mono">
                      <div className="font-bold text-cyan-400">#ORD-20250304-004</div>
                      <div className="text-[10px] text-zinc-400">42 mnt yang lalu</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-white">Ahmad Fauzi</div>
                      <div className="text-[10px] text-zinc-400">0821-3321-xxxx (Medan)</div>
                    </td>
                    <td className="p-3">
                      <div className="text-zinc-200">3x Essential Crewneck Socks (Free Size)</div>
                      <div className="text-[10px] text-cyan-400 font-mono">Resi: JNE8829103948</div>
                    </td>
                    <td className="p-3 font-mono font-bold text-white">
                      Rp 165.000
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Truck className="w-3 h-3" /> SHIPPED
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="text-[11px] text-zinc-400">In Transit</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: 3-Tier State Breakdown & Quick Dispatch Panel */}
        <div className="space-y-6">
          {/* 3-Tier Stock Lifecycle Radar */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-white text-sm">3-Tier Inventory Locks</h3>
              </div>
              <Link
                href="/admin/inventory"
                className="text-[11px] text-emerald-400 hover:underline"
              >
                Lihat Matrix
              </Link>
            </div>

            <p className="text-xs text-zinc-400">
              State machine mencegah overselling saat checkout bersamaan tanpa mengunci stok permanen.
            </p>

            {/* Visual Bar of 3-Tier */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-zinc-300">
                <span>Total Pool: 1.352 Unit</span>
                <span className="text-emerald-400 font-semibold">91.7% Available</span>
              </div>
              <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: "91.7%" }} title="Available (1.240)"></div>
                <div className="bg-purple-500 h-full animate-pulse" style={{ width: "1.3%" }} title="Reserved (18)"></div>
                <div className="bg-cyan-500 h-full" style={{ width: "7.0%" }} title="Committed (94)"></div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-zinc-800/80 border border-emerald-500/20">
                  <div className="text-[10px] text-emerald-400 font-semibold uppercase">Available</div>
                  <div className="font-mono font-bold text-white text-sm">1.240</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-800/80 border border-purple-500/20">
                  <div className="text-[10px] text-purple-400 font-semibold uppercase">Reserved (TTL)</div>
                  <div className="font-mono font-bold text-purple-300 text-sm">18</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-800/80 border border-cyan-500/20">
                  <div className="text-[10px] text-cyan-400 font-semibold uppercase">Committed</div>
                  <div className="font-mono font-bold text-cyan-300 text-sm">94</div>
                </div>
              </div>
            </div>

            {/* Active Lock Timer Feed */}
            <div className="border-t border-zinc-800 pt-3 space-y-2">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Active Locking Reservations (600s TTL)
              </div>
              <div className="p-2 rounded-lg bg-purple-950/20 border border-purple-500/20 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-zinc-200">Hoodie Heavyweight (L)</p>
                  <p className="text-[10px] text-zinc-400">Cart #c8f2 • Siti Rahmawati</p>
                </div>
                <span className="font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                  08:42
                </span>
              </div>
              <div className="p-2 rounded-lg bg-purple-950/20 border border-purple-500/20 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-zinc-200">Cargo Pants Olive (32)</p>
                  <p className="text-[10px] text-zinc-400">Cart #a11e • Kevin Wijaya</p>
                </div>
                <span className="font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                  03:15
                </span>
              </div>
            </div>
          </div>

          {/* Quick Dispatch Action Widget */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Printer className="w-4 h-4 text-emerald-400" />
              Thermal A6 AWB Generator
            </h3>
            <p className="text-xs text-zinc-400">
              Format thermal label 100x150mm otomatis terstandarisasi untuk JNE, SiCepat, J&T, dan GoSend.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 flex flex-col items-center justify-center gap-1 transition-colors">
                <Printer className="w-4 h-4 text-zinc-400" />
                <span>Cetak 14 AWB</span>
              </button>
              <button className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors">
                <Truck className="w-4 h-4" />
                <span>Request Pickup</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
