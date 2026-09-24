"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  PackageCheck,
  Boxes,
  Layers,
  Store,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Executive Overview",
    labelId: "Ringkasan Radar",
    href: "/admin",
    icon: LayoutDashboard,
    badge: "Live",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    name: "GMV & Fee Savings",
    labelId: "Inteligensi Finansial",
    href: "/admin/analytics",
    icon: TrendingUp,
    badge: "0% Cut",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    name: "Order Fulfillment",
    labelId: "Pipeline Pesanan & Resi",
    href: "/admin/orders",
    icon: PackageCheck,
    badge: "14 Butuh Kirim",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    name: "3-Tier Inventory",
    labelId: "Stok TTL & Locking",
    href: "/admin/inventory",
    icon: Boxes,
    badge: "3 Reservasi",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    name: "Catalog & SKU Matrix",
    labelId: "Matriks Varian & Bobot",
    href: "/admin/products",
    icon: Layers,
    badge: "12 SKU",
    badgeColor: "bg-zinc-700/50 text-zinc-300 border-zinc-600/30",
  },
];

export function AdminNav() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);

  return (
    <>
      {/* Mobile Bar Trigger */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800 text-zinc-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-black text-sm">
            S8
          </div>
          <span className="font-bold tracking-tight text-white">Storeight Ops</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-zinc-950/95 backdrop-blur-md border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header / Brand */}
        <div className="p-4 border-b border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-black text-black text-base">
                S8
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Storeight
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 ml-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  D2C Ops
                </span>
              </div>
            </Link>
          </div>

          {/* Store Switcher Mock */}
          <div className="relative">
            <button
              onClick={() => setStoreOpen(!storeOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 text-left transition-all text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <Store className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <p className="font-semibold text-zinc-200 truncate">Storeight Flagship ID</p>
                  <p className="text-[10px] text-zinc-400">storeight-official.store</p>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-1" />
            </button>

            {storeOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-1.5 bg-zinc-900 border border-zinc-700/80 rounded-lg shadow-xl shadow-black/80 z-50 text-xs">
                <div className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Active Workspace
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-zinc-800/80 text-emerald-400 font-medium">
                  <span>Storeight Flagship ID</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer mt-0.5">
                  <span>Storeight Outlet Surabaya</span>
                  <span className="text-[10px] text-zinc-400">Branch</span>
                </div>
                <div className="border-t border-zinc-800 my-1 pt-1">
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center justify-between px-2 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded text-[11px]"
                  >
                    <span>Buka Storefront Pembeli</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Modul Operasional
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative",
                  isActive
                    ? "bg-zinc-800/90 text-white font-semibold shadow-inner border border-zinc-700/60"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-zinc-400 group-hover:text-zinc-300 group-hover:bg-zinc-800/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="leading-tight">{item.name}</div>
                    <div className="text-[11px] text-zinc-400 font-normal group-hover:text-zinc-300 transition-colors">
                      {item.labelId}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border shadow-sm",
                      item.badgeColor
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-400 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Live System Architecture Status Footer */}
        <div className="p-3 m-3 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-900/60 border border-zinc-800/80 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>D2C Engine Status</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              99.98%
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] text-zinc-400 font-mono">
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-800/40">
              <span className="text-zinc-400">Inventory Lock TTL</span>
              <span className="text-emerald-300 font-semibold">600s Auto-Free</span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-b border-zinc-800/40">
              <span className="text-zinc-400">Storage Engine</span>
              <span className="text-zinc-300">SQLite + Drizzle</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-zinc-400">Fee Potongan</span>
              <span className="text-emerald-400 font-bold">0% (Rp 0 Admin)</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Storeight v1.0.4
            </span>
            <span className="text-zinc-400">Latency: 18ms</span>
          </div>
        </div>
      </aside>
    </>
  );
}
