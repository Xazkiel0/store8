import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/admin-nav";
import {
  Bell,
  Search,
  ExternalLink,
  ShieldAlert,
  Printer,
  Plus,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Storeight Operations & Admin Hub",
  description: "Executive radar, 3-tier inventory locking, order dispatch, and 0% commission analytics.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Notification / Savings Announcement Bar */}
      <header className="sticky top-0 z-30 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2.5 flex items-center justify-between text-xs lg:pl-76">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>0% Fee Marketplace Aktif</span>
          </div>
          <div className="text-zinc-400 hidden md:block">
            Penghematan komisi kumulatif bulan ini: <strong className="text-white font-mono">Rp 14.850.000</strong> (Hemat 8.5%)
          </div>
        </div>

        {/* Global Quick Action Deck */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin/orders"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-400" />
            <span>Batch Thermal AWB</span>
          </Link>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Tambah SKU</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
            title="Buka Toko Online"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <div className="h-4 w-px bg-zinc-800 mx-1"></div>
          {/* Admin Avatar */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center font-bold text-black text-xs">
              AD
            </div>
            <div className="hidden xl:block text-left text-[11px] leading-tight">
              <p className="font-semibold text-zinc-200">Admin Utama</p>
              <p className="text-zinc-400 text-[10px]">Store Owner</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 flex">
        <AdminNav />

        {/* Dynamic Content Surface */}
        <main className="flex-1 lg:pl-72 flex flex-col w-full overflow-x-hidden">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </div>

          {/* Footer Bar */}
          <footer className="border-t border-zinc-900 bg-zinc-950/80 px-6 py-4 text-center text-xs text-zinc-400">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
              <div>
                © {new Date().getFullYear()} <strong>Storeight D2C Platform</strong>. Kedaulatan penuh data transaksi & inventori mandiri.
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span className="text-emerald-400">Next.js 16 App Router</span>
                <span className="text-zinc-400">•</span>
                <span className="text-cyan-400">SQLite + Drizzle ORM</span>
                <span className="text-zinc-400">•</span>
                <span className="text-purple-400">3-Tier Stock State</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
