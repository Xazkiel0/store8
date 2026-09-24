"use client";

import { useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Percent,
  Wallet,
  ArrowUpRight,
  Sparkles,
  Calculator,
  Layers,
  ChevronRight,
  Download,
  Info,
  BadgePercent,
  CircleDollarSign,
  QrCode,
  CreditCard,
  Truck,
} from "lucide-react";
import { formatIDR, formatNumber } from "@/lib/utils";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"today" | "7d" | "30d" | "ytd">("30d");
  const [customGMV, setCustomGMV] = useState(175000000);
  const [marketplaceFeePct, setMarketplaceFeePct] = useState(8.5);

  const stats = {
    today: {
      gmv: 8450000,
      netSettlement: 8407750,
      feeSaved: 718250,
      orders: 28,
      aov: 301785,
    },
    "7d": {
      gmv: 48900000,
      netSettlement: 48655500,
      feeSaved: 4156500,
      orders: 142,
      aov: 344366,
    },
    "30d": {
      gmv: 174800000,
      netSettlement: 173926000,
      feeSaved: 14858000,
      orders: 468,
      aov: 373504,
    },
    ytd: {
      gmv: 580000000,
      netSettlement: 577100000,
      feeSaved: 49300000,
      orders: 1540,
      aov: 376623,
    },
  }[timeframe];

  const simulatedMarketplaceCut = (customGMV * marketplaceFeePct) / 100;
  const storeightD2CCost = (customGMV * 0.5) / 100; // 0.5% average QRIS fee
  const netSavings = simulatedMarketplaceCut - storeightD2CCost;

  return (
    <div className="space-y-6">
      {/* Top Header & Timeframe Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Inteligensi Finansial & Margin
            </span>
            <span className="text-zinc-400 text-xs font-mono">0% Take-Rate Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            GMV, Profit & Penghematan Fee
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Analisis transparansi pendapatan kotor vs bersih, perbandingan take-rate marketplace, dan efisiensi kanal D2C.
          </p>
        </div>

        {/* Timeframe Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800 self-start sm:self-auto text-xs font-medium">
          {(
            [
              { id: "today", label: "Hari Ini" },
              { id: "7d", label: "7 Hari" },
              { id: "30d", label: "30 Hari" },
              { id: "ytd", label: "YTD 2025" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeframe === tab.id
                  ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Financial KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: GMV */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Gross Merchandise Value</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {formatIDR(stats.gmv)}
          </div>
          <div className="mt-2 text-xs text-zinc-400 flex items-center justify-between">
            <span>{formatNumber(stats.orders)} Transaksi</span>
            <span className="text-emerald-400 font-semibold font-mono">100% Real</span>
          </div>
        </div>

        {/* Metric 2: Net Settlement */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Net Rekening Toko</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400 tracking-tight">
            {formatIDR(stats.netSettlement)}
          </div>
          <div className="mt-2 text-xs text-zinc-400 flex items-center justify-between">
            <span>Realisasi Kas: 99.5%</span>
            <span className="text-cyan-300 font-mono">T+0 / T+1 Langsung</span>
          </div>
        </div>

        {/* Metric 3: Total Marketplace Fee Saved */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-emerald-950/30 border border-emerald-500/40 relative overflow-hidden">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Komisi Hemat (8.5%)
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 tracking-tight">
            {formatIDR(stats.feeSaved)}
          </div>
          <div className="mt-2 text-xs text-emerald-300/90 font-medium">
            Uang tunai yang diselamatkan ke kas Anda
          </div>
        </div>

        {/* Metric 4: AOV */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Rata-Rata Order (AOV)</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <BadgePercent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {formatIDR(stats.aov)}
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            Optimal untuk strategi bundling D2C
          </div>
        </div>
      </div>

      {/* Interactive Marketplace Fee vs D2C Comparison Simulator */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Kalkulator Pemulihan Margin: Storeight vs Marketplace
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Simulasikan potensi laba bersih yang kembali ke bisnis Anda dengan mengalihkan pesanan ke website mandiri.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Est. Hemat Tahunan (12x)</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {formatIDR(netSavings * 12)}
              </span>
            </div>
          </div>
        </div>

        {/* Sliders & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-300 font-medium">Omset Bulanan (GMV)</label>
              <span className="font-mono text-emerald-400 font-bold text-sm">
                {formatIDR(customGMV)}
              </span>
            </div>
            <input
              type="range"
              min={10000000}
              max={1000000000}
              step={5000000}
              value={customGMV}
              onChange={(e) => setCustomGMV(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>Rp 10 Juta</span>
              <span>Rp 500 Juta</span>
              <span>Rp 1 Miliar</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-zinc-300 font-medium">Fee Potongan Marketplace (Platform + Admin)</label>
              <span className="font-mono text-amber-400 font-bold text-sm">
                {marketplaceFeePct}%
              </span>
            </div>
            <input
              type="range"
              min={5.0}
              max={15.0}
              step={0.5}
              value={marketplaceFeePct}
              onChange={(e) => setMarketplaceFeePct(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>5.0% (Standar)</span>
              <span>8.5% (Rata-rata 2025)</span>
              <span>15.0% (Power Merchant + Iklan)</span>
            </div>
          </div>
        </div>

        {/* Comparison Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Card A: Marketplace Cut */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-red-500/20 space-y-2">
            <div className="text-[11px] font-semibold text-red-400 uppercase tracking-wider flex items-center justify-between">
              <span>Marketplace Raksasa</span>
              <span>{marketplaceFeePct}% Cut</span>
            </div>
            <div className="text-xl font-black text-red-400 font-mono">
              - {formatIDR(simulatedMarketplaceCut)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Dipotong langsung per transaksi: Biaya layanan 6.5%, biaya transaksi 1.0%, biaya penanganan pembeli 1.0%.
            </p>
          </div>

          {/* Card B: Storeight D2C Infrastructure */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-cyan-500/20 space-y-2">
            <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center justify-between">
              <span>Storeight D2C Mandiri</span>
              <span>0% Take Rate</span>
            </div>
            <div className="text-xl font-black text-cyan-400 font-mono">
              - {formatIDR(storeightD2CCost)}
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Hanya MDR resmi Bank Indonesia (QRIS ~0.3-0.7%). Nol persen potongan admin platform selamanya.
            </p>
          </div>

          {/* Card C: Net Extra Profit Retained */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-2 shadow-lg shadow-emerald-500/10">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
              <span>Tambahan Margin Bersih</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Kantong Anda</span>
            </div>
            <div className="text-xl font-black text-emerald-400 font-mono">
              + {formatIDR(netSavings)} / bln
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              Bisa dialokasikan untuk anggaran iklan Meta/Google Ads atau modal restock inventori produk baru.
            </p>
          </div>
        </div>
      </div>

      {/* Two-Column Section: Top 5 SKU Performance & Payment Gateway Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Top 5 SKU Performance */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Top 5 High-Velocity SKU Performance
              </h2>
            </div>
            <span className="text-xs text-zinc-400">Urut berdasarkan kontribusi GMV</span>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-800/60 text-zinc-400 font-medium border-b border-zinc-800 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">SKU & Nama Produk</th>
                    <th className="p-3 text-center">Terjual</th>
                    <th className="p-3">Total GMV</th>
                    <th className="p-3">Margin %</th>
                    <th className="p-3 text-right">Fee Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-sans">
                  {[
                    {
                      sku: "HD-BLK-L",
                      name: "Oversized Heavy Hoodie (L, Jet Black)",
                      sold: 142,
                      gmv: 51120000,
                      margin: "68%",
                      saved: 4345200,
                    },
                    {
                      sku: "TS-WHT-M",
                      name: "Heavyweight Vintage Tee (M, Chalk White)",
                      sold: 118,
                      gmv: 21830000,
                      margin: "62%",
                      saved: 1855550,
                    },
                    {
                      sku: "CRG-OLV-32",
                      name: "Tactical Cargo Pants (32, Olive Drab)",
                      sold: 84,
                      gmv: 37800000,
                      margin: "74%",
                      saved: 3213000,
                    },
                    {
                      sku: "JKT-WND-XL",
                      name: "Ultralight Windbreaker (XL, Slate Grey)",
                      sold: 67,
                      gmv: 32160000,
                      margin: "71%",
                      saved: 2733600,
                    },
                    {
                      sku: "ACC-SCK-01",
                      name: "Essential Crewneck Socks 3-Pack",
                      sold: 157,
                      gmv: 8635000,
                      margin: "55%",
                      saved: 733975,
                    },
                  ].map((row, idx) => (
                    <tr key={row.sku} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="p-3">
                        <div className="font-semibold text-white">{row.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{row.sku}</div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-zinc-200">
                        {row.sold} pcs
                      </td>
                      <td className="p-3 font-mono font-bold text-white">
                        {formatIDR(row.gmv)}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                          {row.margin}
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-400">
                        + {formatIDR(row.saved)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Payment Method & Channel Distribution */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <QrCode className="w-4 h-4 text-cyan-400" />
            Distribusi Metode Bayar
          </h2>

          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-lg text-xs">
            <div className="space-y-3">
              {/* QRIS */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-white flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-emerald-400" /> QRIS Dinamis (GoPay, OVO, Dana)
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">62% (Rp 108.37M)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>

              {/* Virtual Account */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-white flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-cyan-400" /> Virtual Account (BCA, Mandiri, BRI)
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">30% (Rp 52.44M)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>

              {/* COD / Ekspedisi */}
              <div className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" /> COD Ekspedisi (J&T / SiCepat)
                  </span>
                  <span className="font-mono text-amber-400 font-bold">8% (Rp 13.98M)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "8%" }}></div>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-3 text-[11px] text-zinc-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                Catatan Settlement Otomatis
              </div>
              <p>
                Dana pembayaran QRIS & VA masuk ke rekening operasional Anda setiap pukul 23:59 WIB secara otomatis tanpa potongan komisi pihak ketiga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
