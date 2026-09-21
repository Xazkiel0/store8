"use client";

import { useState } from "react";
import { Calculator, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

export function SavingsCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(30000000); // 30 Juta default
  const marketplaceFeeRate = 0.085; // ~8.5% (Admin fee + gratis ongkir xtra marketplace)
  const storeightCost = 150000; // Flat subscription / maintenance per bulan

  const marketplaceCut = monthlyRevenue * marketplaceFeeRate;
  const yearlyMarketplaceCut = marketplaceCut * 12;
  const netSavingsYearly = yearlyMarketplaceCut - storeightCost * 12;

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
            <Calculator className="w-3.5 h-3.5" />
            Kalkulator Penghematan Komisi
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Berapa Banyak Uang Anda yang Hilang Dipotong Marketplace Setiap Bulan?
          </h3>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Marketplace mengenakan biaya admin, komisi kategori, dan biaya promo hingga 7% - 12% dari total omzet. Geser slider di bawah untuk melihat estimasi profit yang bisa Anda selamatkan dengan toko mandiri Storeight.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-300 font-medium">Estimasi Omzet Bulanan Toko Anda:</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">
                {formatIDR(monthlyRevenue)}
              </span>
            </div>

            <input
              type="range"
              min={5000000}
              max={250000000}
              step={5000000}
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
            />

            <div className="flex justify-between text-xs text-zinc-500 font-mono">
              <span>Rp 5 Juta/bln</span>
              <span>Rp 100 Juta/bln</span>
              <span>Rp 250 Juta/bln</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Potongan Marketplace / Bulan (~8.5%)
            </span>
            <div className="text-2xl font-bold text-rose-400 font-mono line-through decoration-rose-500/60">
              {formatIDR(marketplaceCut)}
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              Estimasi Profit yang Anda Selamatkan / Tahun
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
              {formatIDR(netSavingsYearly)}
            </div>
            <p className="text-xs text-zinc-400 pt-1">
              *Uang ini 100% bisa dialihkan untuk budget iklan (Ads), ekspansi stok, atau profit bersih owner.
            </p>
          </div>

          <a
            href="#konsultasi"
            className="inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 group"
          >
            <span>Mulai Selamatkan Profit Anda</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>0% Potongan Penjualan Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}
