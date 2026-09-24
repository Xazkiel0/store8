"use client";

import { useState } from "react";
import {
  PackageCheck,
  Search,
  Filter,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  FileText,
  ChevronDown,
  ExternalLink,
  QrCode,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  X,
} from "lucide-react";
import { formatIDR } from "@/lib/utils";

type OrderStatus =
  | "ALL"
  | "PENDING"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

interface OrderItem {
  id: string;
  sku: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  weightGrams: number;
}

interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  address: string;
  postalCode: string;
  courier: string;
  courierService: string;
  trackingNumber?: string;
  totalWeightKg: number;
  totalAmount: number;
  paymentMethod: string;
  status: "PENDING" | "CONFIRMED" | "PACKED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  ttlRemaining?: string;
  items: OrderItem[];
}

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-20250304-001",
    date: "04 Mar 2025, 14:28 WIB",
    customerName: "Budi Santoso",
    customerPhone: "0812-9842-1192",
    customerCity: "Jakarta Selatan, DKI Jakarta",
    address: "Jl. Tebet Barat Dalam VII No. 14, RT 05 / RW 02",
    postalCode: "12810",
    courier: "JNE",
    courierService: "REG (Reguler)",
    trackingNumber: "JNE8829103948",
    totalWeightKg: 1.2,
    totalAmount: 720000,
    paymentMethod: "QRIS Dinamis (GoPay)",
    status: "CONFIRMED",
    items: [
      {
        id: "item-1",
        sku: "HD-BLK-L",
        name: "Oversized Heavyweight Hoodie",
        variant: "L / Jet Black",
        quantity: 2,
        price: 360000,
        weightGrams: 600,
      },
    ],
  },
  {
    id: "ORD-20250304-002",
    date: "04 Mar 2025, 14:32 WIB",
    customerName: "Siti Rahmawati",
    customerPhone: "0857-1234-5678",
    customerCity: "Gubeng, Surabaya, Jawa Timur",
    address: "Jl. Manyar Kertoarjo IX No. 22",
    postalCode: "60285",
    courier: "SiCepat",
    courierService: "BEST (Next Day)",
    totalWeightKg: 0.4,
    totalAmount: 185000,
    paymentMethod: "BCA Virtual Account",
    status: "PENDING",
    ttlRemaining: "08:42",
    items: [
      {
        id: "item-2",
        sku: "TS-WHT-M",
        name: "Heavyweight Vintage Tee",
        variant: "M / Vintage Chalk White",
        quantity: 1,
        price: 185000,
        weightGrams: 400,
      },
    ],
  },
  {
    id: "ORD-20250304-003",
    date: "04 Mar 2025, 14:10 WIB",
    customerName: "Dimas Pratama",
    customerPhone: "0819-5567-9912",
    customerCity: "Coblong, Bandung, Jawa Barat",
    address: "Jl. Dago Asri Blok B No. 7",
    postalCode: "40135",
    courier: "J&T",
    courierService: "EZ (Regular)",
    trackingNumber: "JT9920194812",
    totalWeightKg: 0.7,
    totalAmount: 450000,
    paymentMethod: "Mandiri Virtual Account",
    status: "PACKED",
    items: [
      {
        id: "item-3",
        sku: "CRG-OLV-32",
        name: "Tactical Modular Cargo Pants",
        variant: "32 / Olive Drab",
        quantity: 1,
        price: 450000,
        weightGrams: 700,
      },
    ],
  },
  {
    id: "ORD-20250304-004",
    date: "04 Mar 2025, 13:45 WIB",
    customerName: "Ahmad Fauzi",
    customerPhone: "0821-3321-4401",
    customerCity: "Medan Baru, Medan, Sumatera Utara",
    address: "Jl. Dr. Mansyur No. 88",
    postalCode: "20153",
    courier: "JNE",
    courierService: "YES (Yakin Esok Sampai)",
    trackingNumber: "JNE7739102941",
    totalWeightKg: 0.3,
    totalAmount: 165000,
    paymentMethod: "QRIS Dinamis (ShopeePay)",
    status: "SHIPPED",
    items: [
      {
        id: "item-4",
        sku: "ACC-SCK-01",
        name: "Essential Crewneck Socks 3-Pack",
        variant: "Free Size / Multi",
        quantity: 3,
        price: 55000,
        weightGrams: 100,
      },
    ],
  },
  {
    id: "ORD-20250304-005",
    date: "04 Mar 2025, 12:15 WIB",
    customerName: "Fajar Nugraha",
    customerPhone: "0878-9901-2234",
    customerCity: "Banjarsari, Surakarta, Jawa Tengah",
    address: "Jl. Adi Sucipto No. 45",
    postalCode: "57139",
    courier: "SiCepat",
    courierService: "GOKIL (Cargo)",
    trackingNumber: "004192839182",
    totalWeightKg: 2.4,
    totalAmount: 940000,
    paymentMethod: "BRI Virtual Account",
    status: "DELIVERED",
    items: [
      {
        id: "item-5",
        sku: "HD-BLK-L",
        name: "Oversized Heavyweight Hoodie",
        variant: "L / Jet Black",
        quantity: 1,
        price: 360000,
        weightGrams: 600,
      },
      {
        id: "item-6",
        sku: "JKT-WND-XL",
        name: "Ultralight Windbreaker",
        variant: "XL / Slate Grey",
        quantity: 1,
        price: 480000,
        weightGrams: 500,
      },
    ],
  },
  {
    id: "ORD-20250304-006",
    date: "04 Mar 2025, 11:00 WIB",
    customerName: "Jessica Tanuwidjaja",
    customerPhone: "0813-4455-6677",
    customerCity: "Serpong, Tangerang Selatan, Banten",
    address: "Cluster Sheffield Blok E No. 12",
    postalCode: "15330",
    courier: "GoSend",
    courierService: "Instant Delivery",
    totalWeightKg: 0.4,
    totalAmount: 185000,
    paymentMethod: "QRIS Dinamis",
    status: "CANCELLED",
    items: [
      {
        id: "item-7",
        sku: "TS-WHT-M",
        name: "Heavyweight Vintage Tee",
        variant: "M / Vintage Chalk White",
        quantity: 1,
        price: 185000,
        weightGrams: 400,
      },
    ],
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("ALL");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [thermalModalOrder, setThermalModalOrder] = useState<Order | null>(null);
  const [detailModalOrder, setDetailModalOrder] = useState<Order | null>(null);
  const [copiedResi, setCopiedResi] = useState<string | null>(null);

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesTab = activeTab === "ALL" || order.status === activeTab;
    const matchesCourier =
      selectedCourier === "ALL" || order.courier === selectedCourier;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.includes(query) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(query));

    return matchesTab && matchesCourier && matchesSearch;
  });

  const toggleSelectOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter((item) => item !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const selectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResi(text);
    setTimeout(() => setCopiedResi(null), 2000);
  };

  const statusCounts = {
    ALL: MOCK_ORDERS.length,
    PENDING: MOCK_ORDERS.filter((o) => o.status === "PENDING").length,
    CONFIRMED: MOCK_ORDERS.filter((o) => o.status === "CONFIRMED").length,
    PACKED: MOCK_ORDERS.filter((o) => o.status === "PACKED").length,
    SHIPPED: MOCK_ORDERS.filter((o) => o.status === "SHIPPED").length,
    DELIVERED: MOCK_ORDERS.filter((o) => o.status === "DELIVERED").length,
    CANCELLED: MOCK_ORDERS.filter((o) => o.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Fulfillment Dispatch Center
            </span>
            <span className="text-zinc-400 text-xs font-mono">Ekspedisi Logistik Terintegrasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pipeline Pesanan & Cetak Resi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Kelola verifikasi pembayaran lunas, cetak label thermal AWB standar 100x150mm, dan update nomor resi otomatis.
          </p>
        </div>

        {/* Global Batch Action */}
        <div className="flex items-center gap-2">
          {selectedOrders.length > 0 && (
            <button
              onClick={() => {
                const firstSelected = MOCK_ORDERS.find((o) => o.id === selectedOrders[0]);
                if (firstSelected) setThermalModalOrder(firstSelected);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak {selectedOrders.length} Label Batch</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-zinc-800 text-xs scrollbar-none">
        {(
          [
            { id: "ALL", label: "Semua Pesanan" },
            { id: "PENDING", label: "Menunggu Bayar" },
            { id: "CONFIRMED", label: "Lunas / Butuh Packing" },
            { id: "PACKED", label: "Siap Kirim (Packed)" },
            { id: "SHIPPED", label: "Dalam Pengiriman" },
            { id: "DELIVERED", label: "Selesai" },
            { id: "CANCELLED", label: "Batal / Expired" },
          ] as const
        ).map((tab) => {
          const count = statusCounts[tab.id];
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-zinc-800 text-white font-bold border border-zinc-700 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Courier Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari No. Order, Nama Pembeli, HP, atau Resi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <span>Kurir:</span>
            <select
              value={selectedCourier}
              onChange={(e) => setSelectedCourier(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-zinc-900 text-white">Semua Ekspedisi</option>
              <option value="JNE" className="bg-zinc-900 text-white">JNE Express</option>
              <option value="SiCepat" className="bg-zinc-900 text-white">SiCepat Express</option>
              <option value="J&T" className="bg-zinc-900 text-white">J&T Express</option>
              <option value="GoSend" className="bg-zinc-900 text-white">GoSend Instant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-800/80 text-zinc-400 font-medium border-b border-zinc-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredOrders.length > 0 &&
                      selectedOrders.length === filteredOrders.length
                    }
                    onChange={selectAll}
                    className="accent-emerald-500 rounded cursor-pointer"
                  />
                </th>
                <th className="p-3">Order ID & Waktu</th>
                <th className="p-3">Penerima & Tujuan</th>
                <th className="p-3">Ekspedisi & Resi</th>
                <th className="p-3">Total Nilai</th>
                <th className="p-3">Status State</th>
                <th className="p-3 text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-zinc-400">
                    Tidak ada pesanan yang sesuai dengan filter atau pencarian saat ini.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isSelected = selectedOrders.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-zinc-800/40 transition-colors ${
                        isSelected ? "bg-emerald-500/5" : ""
                      }`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOrder(order.id)}
                          className="accent-emerald-500 rounded cursor-pointer"
                        />
                      </td>

                      {/* ID & Date */}
                      <td className="p-3 font-mono">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{order.id}</span>
                        </div>
                        <div className="text-[10px] text-zinc-400">{order.date}</div>
                        <div className="text-[10px] text-zinc-400">{order.paymentMethod}</div>
                      </td>

                      {/* Recipient */}
                      <td className="p-3">
                        <div className="font-bold text-zinc-100">{order.customerName}</div>
                        <div className="text-[10px] text-zinc-400">{order.customerPhone}</div>
                        <div className="text-[10px] text-zinc-400 truncate max-w-xs" title={order.address}>
                          {order.customerCity}
                        </div>
                      </td>

                      {/* Courier & Tracking */}
                      <td className="p-3">
                        <div className="font-semibold text-zinc-200 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{order.courier} - {order.courierService}</span>
                        </div>
                        <div className="text-[10px] text-zinc-400">
                          Berat: {order.totalWeightKg} kg ({order.items.reduce((acc, i) => acc + i.quantity, 0)} pcs)
                        </div>
                        {order.trackingNumber ? (
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="font-mono text-cyan-400 font-bold text-[11px]">
                              {order.trackingNumber}
                            </span>
                            <button
                              onClick={() => copyToClipboard(order.trackingNumber!)}
                              title="Salin Nomor Resi"
                              className="text-zinc-400 hover:text-white"
                            >
                              {copiedResi === order.trackingNumber ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-zinc-400 italic">Belum ada resi</span>
                        )}
                      </td>

                      {/* Total */}
                      <td className="p-3 font-mono font-bold text-white">
                        {formatIDR(order.totalAmount)}
                      </td>

                      {/* Status */}
                      <td className="p-3">
                        {order.status === "PENDING" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                            <Clock className="w-3 h-3" /> RESERVED ({order.ttlRemaining})
                          </span>
                        )}
                        {order.status === "CONFIRMED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> LUNAS / PACKING
                          </span>
                        )}
                        {order.status === "PACKED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <PackageCheck className="w-3 h-3" /> SIAP KIRIM
                          </span>
                        )}
                        {order.status === "SHIPPED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            <Truck className="w-3 h-3" /> DALAM PENGIRIMAN
                          </span>
                        )}
                        {order.status === "DELIVERED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-700/60 text-zinc-300 border border-zinc-600/30">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> TERKIRIM
                          </span>
                        )}
                        {order.status === "CANCELLED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                            <XCircle className="w-3 h-3" /> EXPIRED / BATAL
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => setThermalModalOrder(order)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
                            title="Preview Thermal AWB 100x150mm"
                          >
                            <Printer className="w-3.5 h-3.5 text-emerald-400" />
                          </button>
                          <button
                            onClick={() => setDetailModalOrder(order)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
                            title="Lihat Detail Pesanan"
                          >
                            <Eye className="w-3.5 h-3.5 text-zinc-300" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thermal AWB Label Print Modal Simulation */}
      {thermalModalOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-base">
                  Simulasi Thermal AWB (100 x 150 mm)
                </h3>
              </div>
              <button
                onClick={() => setThermalModalOrder(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Thermal Label Graphic Simulation */}
            <div className="bg-white text-black p-5 rounded-lg border border-zinc-300 font-mono text-xs space-y-3 shadow-inner">
              {/* Courier Header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <div>
                  <div className="text-xl font-black tracking-tighter">
                    {thermalModalOrder.courier} EXPRESS
                  </div>
                  <div className="text-[10px] font-bold">
                    SERVICE: {thermalModalOrder.courierService}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px]">BERAT AKTUAL:</div>
                  <div className="text-base font-black">
                    {thermalModalOrder.totalWeightKg} KG
                  </div>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="text-center py-2 border-b-2 border-black space-y-1">
                <div className="h-10 bg-black/90 flex items-center justify-center text-white text-[10px] tracking-widest font-mono">
                  ||| | |||| || |||||| | ||| |||| | |||||| |||
                </div>
                <div className="font-bold text-sm tracking-wider">
                  {thermalModalOrder.trackingNumber || "GEN-AUTO-AWB-2025"}
                </div>
              </div>

              {/* Destination & Sender */}
              <div className="grid grid-cols-2 gap-3 border-b-2 border-black pb-2 text-[11px]">
                <div>
                  <div className="font-bold uppercase text-[9px] text-zinc-600">
                    Penerima:
                  </div>
                  <div className="font-bold text-sm">{thermalModalOrder.customerName}</div>
                  <div>{thermalModalOrder.customerPhone}</div>
                  <div className="text-[10px] mt-1 leading-tight">{thermalModalOrder.address}</div>
                  <div className="font-bold text-xs mt-0.5">{thermalModalOrder.postalCode}</div>
                </div>
                <div className="border-l border-zinc-400 pl-3">
                  <div className="font-bold uppercase text-[9px] text-zinc-600">
                    Pengirim:
                  </div>
                  <div className="font-bold text-sm">Storeight Flagship</div>
                  <div>0811-STOREIGHT</div>
                  <div className="text-[10px] mt-1">Gudang D2C Storeight Central, Jakarta Selatan</div>
                </div>
              </div>

              {/* Contents & SKU breakdown */}
              <div>
                <div className="font-bold uppercase text-[9px] text-zinc-600 mb-1">
                  Daftar Isi Paket ({thermalModalOrder.items.length} Macam SKU):
                </div>
                <ul className="text-[10px] space-y-0.5 divide-y divide-zinc-200">
                  {thermalModalOrder.items.map((it) => (
                    <li key={it.id} className="pt-0.5 flex justify-between">
                      <span>
                        {it.quantity}x {it.name} ({it.variant})
                      </span>
                      <span className="font-bold">{it.sku}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t-2 border-black pt-2 flex justify-between items-center text-[10px] font-bold">
                <span>NON-COD (LUNAS D2C)</span>
                <span>STOREIGHT INDEPENDENT ECOM</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setThermalModalOrder(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  alert(`Mencetak label AWB thermal untuk order ${thermalModalOrder.id}`);
                  setThermalModalOrder(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Kirim Perintah Cetak</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {detailModalOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base font-mono">
                  {detailModalOrder.id}
                </h3>
                <p className="text-xs text-zinc-400">{detailModalOrder.date}</p>
              </div>
              <button
                onClick={() => setDetailModalOrder(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="font-bold text-white">{detailModalOrder.customerName}</div>
                <div className="text-zinc-400">{detailModalOrder.customerPhone}</div>
                <div className="text-zinc-300">{detailModalOrder.address}</div>
                <div className="text-zinc-400 font-mono">{detailModalOrder.customerCity} - {detailModalOrder.postalCode}</div>
              </div>

              <div>
                <h4 className="font-semibold text-zinc-300 mb-2">Item Belanja</h4>
                <div className="space-y-2">
                  {detailModalOrder.items.map((it) => (
                    <div key={it.id} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{it.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{it.sku} • {it.variant}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white font-mono">{formatIDR(it.price * it.quantity)}</div>
                        <div className="text-[10px] text-zinc-400">{it.quantity} unit @ {formatIDR(it.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex justify-between items-center font-bold">
                <span className="text-zinc-300">Total Pembayaran</span>
                <span className="text-emerald-400 text-base font-mono">{formatIDR(detailModalOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setDetailModalOrder(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
