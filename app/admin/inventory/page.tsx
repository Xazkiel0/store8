"use client";

import { useState, useEffect } from "react";
import {
  Boxes,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  ShieldCheck,
  Zap,
  Lock,
  Unlock,
  Layers,
  Search,
  Timer,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface StockSKU {
  id: string;
  sku: string;
  name: string;
  variant: string;
  available: number;
  reserved: number;
  committed: number;
  threshold: number;
}

interface ActiveReservation {
  id: string;
  cartId: string;
  sku: string;
  productName: string;
  variant: string;
  quantity: number;
  customerRef: string;
  secondsRemaining: number;
}

const INITIAL_SKUS: StockSKU[] = [
  {
    id: "sku-1",
    sku: "HD-BLK-L",
    name: "Oversized Heavyweight Hoodie",
    variant: "L / Jet Black",
    available: 180,
    reserved: 4,
    committed: 18,
    threshold: 20,
  },
  {
    id: "sku-2",
    sku: "HD-BLK-XL",
    name: "Oversized Heavyweight Hoodie",
    variant: "XL / Jet Black",
    available: 110,
    reserved: 2,
    committed: 12,
    threshold: 15,
  },
  {
    id: "sku-3",
    sku: "TS-WHT-M",
    name: "Heavyweight Vintage Tee",
    variant: "M / Chalk White",
    available: 240,
    reserved: 5,
    committed: 22,
    threshold: 30,
  },
  {
    id: "sku-4",
    sku: "TS-WHT-L",
    name: "Heavyweight Vintage Tee",
    variant: "L / Chalk White",
    available: 195,
    reserved: 3,
    committed: 14,
    threshold: 25,
  },
  {
    id: "sku-5",
    sku: "CRG-OLV-32",
    name: "Tactical Modular Cargo Pants",
    variant: "32 / Olive Drab",
    available: 85,
    reserved: 2,
    committed: 9,
    threshold: 15,
  },
  {
    id: "sku-6",
    sku: "CRG-OLV-34",
    name: "Tactical Modular Cargo Pants",
    variant: "34 / Olive Drab",
    available: 12,
    reserved: 1,
    committed: 6,
    threshold: 15, // Low stock alert
  },
  {
    id: "sku-7",
    sku: "JKT-WND-XL",
    name: "Ultralight Windbreaker",
    variant: "XL / Slate Grey",
    available: 98,
    reserved: 1,
    committed: 8,
    threshold: 10,
  },
  {
    id: "sku-8",
    sku: "ACC-SCK-01",
    name: "Essential Crewneck Socks 3-Pack",
    variant: "Free Size / Multi",
    available: 320,
    reserved: 0,
    committed: 5,
    threshold: 40,
  },
];

const INITIAL_RESERVATIONS: ActiveReservation[] = [
  {
    id: "res-1",
    cartId: "CART-99A1",
    sku: "HD-BLK-L",
    productName: "Oversized Heavyweight Hoodie",
    variant: "L / Jet Black",
    quantity: 2,
    customerRef: "Siti Rahmawati (Surabaya)",
    secondsRemaining: 522, // 08:42
  },
  {
    id: "res-2",
    cartId: "CART-88B2",
    sku: "TS-WHT-M",
    productName: "Heavyweight Vintage Tee",
    variant: "M / Chalk White",
    quantity: 3,
    customerRef: "Kevin Wijaya (Jakarta)",
    secondsRemaining: 245, // 04:05
  },
  {
    id: "res-3",
    cartId: "CART-77C3",
    sku: "CRG-OLV-34",
    productName: "Tactical Modular Cargo Pants",
    variant: "34 / Olive Drab",
    quantity: 1,
    customerRef: "Rian Hidayat (Bandung)",
    secondsRemaining: 88, // 01:28
  },
  {
    id: "res-4",
    cartId: "CART-66D4",
    sku: "HD-BLK-XL",
    productName: "Oversized Heavyweight Hoodie",
    variant: "XL / Jet Black",
    quantity: 2,
    customerRef: "Anisa Putri (Yogyakarta)",
    secondsRemaining: 410, // 06:50
  },
];

export default function InventoryPage() {
  const [skus, setSkus] = useState<StockSKU[]>(INITIAL_SKUS);
  const [reservations, setReservations] = useState<ActiveReservation[]>(INITIAL_RESERVATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [restockModalSKU, setRestockModalSKU] = useState<StockSKU | null>(null);
  const [restockAmount, setRestockAmount] = useState(50);

  // Live countdown ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setReservations((prev) =>
        prev
          .map((res) => ({
            ...res,
            secondsRemaining: Math.max(0, res.secondsRemaining - 1),
          }))
          .filter((res) => res.secondsRemaining > 0)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalAvailable = skus.reduce((acc, s) => acc + s.available, 0);
  const totalReserved = skus.reduce((acc, s) => acc + s.reserved, 0);
  const totalCommitted = skus.reduce((acc, s) => acc + s.committed, 0);
  const totalPhysical = totalAvailable + totalReserved + totalCommitted;

  const filteredSKUs = skus.filter(
    (s) =>
      s.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.variant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleForceRelease = (id: string, skuCode: string, qty: number) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
    setSkus((prev) =>
      prev.map((s) =>
        s.sku === skuCode
          ? {
              ...s,
              available: s.available + qty,
              reserved: Math.max(0, s.reserved - qty),
            }
          : s
      )
    );
  };

  const handleApplyRestock = () => {
    if (!restockModalSKU) return;
    setSkus((prev) =>
      prev.map((s) =>
        s.id === restockModalSKU.id
          ? { ...s, available: s.available + Number(restockAmount) }
          : s
      )
    );
    setRestockModalSKU(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              State Machine 3-Tier
            </span>
            <span className="text-zinc-400 text-xs font-mono">Anti-Overselling Guarantee</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Monitor Inventori 3-Tier & TTL Locking
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Transisi siklus stok: <code className="text-emerald-400 font-mono">Available</code> → <code className="text-purple-400 font-mono">Reserved (600s TTL)</code> → <code className="text-cyan-400 font-mono">Committed (Payment Captured)</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Cron Auto-Release: Aktif</span>
          </div>
        </div>
      </div>

      {/* 3-Tier State Metrics Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* State 1: Total Physical */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Fisik Gudang</span>
            <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {formatNumber(totalPhysical)} <span className="text-xs text-zinc-400 font-normal">Unit</span>
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            Semua SKU aktif terdaftar di Drizzle DB
          </div>
        </div>

        {/* State 2: Available */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-emerald-500/30">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">1. Available (Bebas)</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Unlock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 tracking-tight">
            {formatNumber(totalAvailable)} <span className="text-xs text-emerald-300 font-normal">Unit</span>
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            Siap masuk keranjang belanja pembeli
          </div>
        </div>

        {/* State 3: Reserved */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-purple-500/30">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-purple-400">2. Reserved (Locked TTL)</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Timer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-400 tracking-tight">
            {formatNumber(totalReserved)} <span className="text-xs text-purple-300 font-normal">Unit</span>
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            Terkunci 600s menunggu QRIS/VA lunas
          </div>
        </div>

        {/* State 4: Committed */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-cyan-500/30">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-cyan-400">3. Committed (Lunas)</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400 tracking-tight">
            {formatNumber(totalCommitted)} <span className="text-xs text-cyan-300 font-normal">Unit</span>
          </div>
          <div className="mt-2 text-xs text-zinc-400">
            Pembayaran sukses, proses packing/kirim
          </div>
        </div>
      </div>

      {/* Live Locking Reservations Deck */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-purple-500/20 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-purple-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Sesi Checkout Aktif yang Mengunci Stok (Live TTL Countdown)
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Jika pembeli tidak membayar dalam 10 menit (600 detik), worker otomatis mengembalikan stok ke status Available.
            </p>
          </div>

          <span className="text-xs font-mono text-purple-400 font-bold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            {reservations.length} Active Locks
          </span>
        </div>

        {/* Reservation Cards / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {reservations.length === 0 ? (
            <div className="col-span-full p-6 text-center text-zinc-500 text-xs bg-zinc-950/60 rounded-xl">
              Tidak ada sesi reservasi aktif saat ini. Semua stok berada di Available atau Committed.
            </div>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id}
                className="p-3.5 rounded-xl bg-zinc-950 border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-2.5 text-xs relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-400 font-bold">
                    {res.cartId}
                  </span>
                  <span className="font-mono text-xs font-black text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 flex items-center gap-1">
                    <Clock className="w-3 h-3 animate-spin" />
                    {formatTimer(res.secondsRemaining)}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-white truncate" title={res.productName}>
                    {res.productName}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    {res.sku} • {res.variant}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-zinc-900">
                  <span className="text-zinc-400">{res.customerRef}</span>
                  <span className="font-bold text-purple-300 font-mono">
                    {res.quantity} unit
                  </span>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => handleForceRelease(res.id, res.sku, res.quantity)}
                    className="w-full py-1 text-[10px] font-semibold text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    Force Release ke Available
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SKU Matrix Table & Quick Restock */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Matriks Stok per Varian & Safety Stock Alert
            </h2>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kode SKU atau nama varian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-800/80 text-zinc-400 font-medium border-b border-zinc-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Kode SKU</th>
                  <th className="p-3">Produk & Varian</th>
                  <th className="p-3 text-center">Available</th>
                  <th className="p-3 text-center">Reserved</th>
                  <th className="p-3 text-center">Committed</th>
                  <th className="p-3 text-center">Total Fisik</th>
                  <th className="p-3">Status Alert</th>
                  <th className="p-3 text-right">Aksi Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-sans">
                {filteredSKUs.map((sku) => {
                  const isLowStock = sku.available <= sku.threshold;
                  const total = sku.available + sku.reserved + sku.committed;
                  return (
                    <tr key={sku.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-white">
                        {sku.sku}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-zinc-200">{sku.name}</div>
                        <div className="text-[10px] text-zinc-400">{sku.variant}</div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-emerald-400">
                        {sku.available}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-purple-400">
                        {sku.reserved}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-cyan-400">
                        {sku.committed}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-white">
                        {total}
                      </td>
                      <td className="p-3">
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <AlertTriangle className="w-3 h-3" /> Low Stock (&le; {sku.threshold})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Normal Safe
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setRestockModalSKU(sku)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-[11px] font-medium transition-colors"
                        >
                          <Plus className="w-3 h-3 text-emerald-400" />
                          Restock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Restock Modal */}
      {restockModalSKU && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-white text-base">
              Tambah Stok Opname SKU
            </h3>
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-1">
              <div className="font-bold text-white">{restockModalSKU.name}</div>
              <div className="text-zinc-400 font-mono">{restockModalSKU.sku} • {restockModalSKU.variant}</div>
              <div className="text-emerald-400 font-semibold pt-1">
                Stok Available Saat Ini: {restockModalSKU.available} unit
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-zinc-300 font-medium">Jumlah Unit Tambahan</label>
              <input
                type="number"
                min={1}
                value={restockAmount}
                onChange={(e) => setRestockAmount(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRestockModalSKU(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleApplyRestock}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold"
              >
                Konfirmasi Restock (+{restockAmount} unit)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
