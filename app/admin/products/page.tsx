"use client";

import { useState } from "react";
import {
  Layers,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Boxes,
  Scale,
  Ruler,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  Tag,
} from "lucide-react";
import { formatIDR, formatNumber } from "@/lib/utils";

interface Variant {
  id: string;
  sku: string;
  size: string;
  color: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  weightGrams: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  createdAt: string;
  variants: Variant[];
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Oversized Heavyweight 450gsm Hoodie",
    slug: "oversized-heavyweight-450gsm-hoodie",
    category: "Apparel / Outerwear",
    status: "ACTIVE",
    createdAt: "01 Mar 2025",
    variants: [
      {
        id: "var-1",
        sku: "HD-BLK-M",
        size: "M",
        color: "Jet Black",
        price: 360000,
        compareAtPrice: 450000,
        stock: 140,
        weightGrams: 580,
        lengthCm: 32,
        widthCm: 25,
        heightCm: 6,
      },
      {
        id: "var-2",
        sku: "HD-BLK-L",
        size: "L",
        color: "Jet Black",
        price: 360000,
        compareAtPrice: 450000,
        stock: 180,
        weightGrams: 600,
        lengthCm: 32,
        widthCm: 25,
        heightCm: 6,
      },
      {
        id: "var-3",
        sku: "HD-BLK-XL",
        size: "XL",
        color: "Jet Black",
        price: 380000,
        compareAtPrice: 480000,
        stock: 110,
        weightGrams: 640,
        lengthCm: 34,
        widthCm: 26,
        heightCm: 7,
      },
    ],
  },
  {
    id: "prod-2",
    title: "Vintage Heavyweight 240gsm Cotton Tee",
    slug: "vintage-heavyweight-240gsm-cotton-tee",
    category: "Apparel / T-Shirt",
    status: "ACTIVE",
    createdAt: "28 Feb 2025",
    variants: [
      {
        id: "var-4",
        sku: "TS-WHT-S",
        size: "S",
        color: "Vintage Chalk White",
        price: 185000,
        stock: 95,
        weightGrams: 350,
        lengthCm: 28,
        widthCm: 20,
        heightCm: 3,
      },
      {
        id: "var-5",
        sku: "TS-WHT-M",
        size: "M",
        color: "Vintage Chalk White",
        price: 185000,
        stock: 240,
        weightGrams: 380,
        lengthCm: 28,
        widthCm: 20,
        heightCm: 3,
      },
      {
        id: "var-6",
        sku: "TS-WHT-L",
        size: "L",
        color: "Vintage Chalk White",
        price: 185000,
        stock: 195,
        weightGrams: 410,
        lengthCm: 28,
        widthCm: 20,
        heightCm: 3,
      },
    ],
  },
  {
    id: "prod-3",
    title: "Tactical Modular Ripstop Cargo Pants",
    slug: "tactical-modular-ripstop-cargo-pants",
    category: "Apparel / Bottoms",
    status: "ACTIVE",
    createdAt: "24 Feb 2025",
    variants: [
      {
        id: "var-7",
        sku: "CRG-OLV-30",
        size: "30",
        color: "Olive Drab",
        price: 450000,
        compareAtPrice: 520000,
        stock: 64,
        weightGrams: 680,
        lengthCm: 35,
        widthCm: 25,
        heightCm: 5,
      },
      {
        id: "var-8",
        sku: "CRG-OLV-32",
        size: "32",
        color: "Olive Drab",
        price: 450000,
        compareAtPrice: 520000,
        stock: 85,
        weightGrams: 700,
        lengthCm: 35,
        widthCm: 25,
        heightCm: 5,
      },
      {
        id: "var-9",
        sku: "CRG-OLV-34",
        size: "34",
        color: "Olive Drab",
        price: 450000,
        compareAtPrice: 520000,
        stock: 12,
        weightGrams: 720,
        lengthCm: 35,
        widthCm: 25,
        heightCm: 5,
      },
    ],
  },
  {
    id: "prod-4",
    title: "Ultralight Packable Windbreaker Jacket",
    slug: "ultralight-packable-windbreaker-jacket",
    category: "Apparel / Outerwear",
    status: "DRAFT",
    createdAt: "03 Mar 2025",
    variants: [
      {
        id: "var-10",
        sku: "JKT-WND-L",
        size: "L",
        color: "Slate Grey",
        price: 480000,
        stock: 50,
        weightGrams: 420,
        lengthCm: 25,
        widthCm: 20,
        heightCm: 4,
      },
      {
        id: "var-11",
        sku: "JKT-WND-XL",
        size: "XL",
        color: "Slate Grey",
        price: 480000,
        stock: 98,
        weightGrams: 450,
        lengthCm: 25,
        widthCm: 20,
        heightCm: 4,
      },
    ],
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [expandedProductIds, setExpandedProductIds] = useState<string[]>([
    "prod-1",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Apparel / T-Shirt");
  const [newSKU, setNewSKU] = useState("");
  const [newSize, setNewSize] = useState("M");
  const [newColor, setNewColor] = useState("Black");
  const [newPrice, setNewPrice] = useState(195000);
  const [newStock, setNewStock] = useState(100);
  const [newWeight, setNewWeight] = useState(400);
  const [newLength, setNewLength] = useState(30);
  const [newWidth, setNewWidth] = useState(20);
  const [newHeight, setNewHeight] = useState(4);

  const toggleExpand = (id: string) => {
    if (expandedProductIds.includes(id)) {
      setExpandedProductIds(expandedProductIds.filter((pId) => pId !== id));
    } else {
      setExpandedProductIds([...expandedProductIds, id]);
    }
  };

  // Volumetric weight calculation formula: (L x W x H) / 6000 kg
  const calculateVolumetricWeight = (l: number, w: number, h: number) => {
    return (l * w * h) / 6000;
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "ALL" || p.category.includes(selectedCategory);
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.variants.some((v) => v.sku.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSKU) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, "-"),
      category: newCategory,
      status: "ACTIVE",
      createdAt: "04 Mar 2025",
      variants: [
        {
          id: `var-${Date.now()}`,
          sku: newSKU.toUpperCase(),
          size: newSize,
          color: newColor,
          price: Number(newPrice),
          stock: Number(newStock),
          weightGrams: Number(newWeight),
          lengthCm: Number(newLength),
          widthCm: Number(newWidth),
          heightCm: Number(newHeight),
        },
      ],
    };

    setProducts([newProd, ...products]);
    setExpandedProductIds([...expandedProductIds, newProd.id]);
    setIsAddModalOpen(false);
    setNewTitle("");
    setNewSKU("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Katalog & Matriks SKU
            </span>
            <span className="text-zinc-400 text-xs font-mono">Volumetric Logistics Ready</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Katalog Produk & Matriks Varian
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Kelola SKU kode unik, bobot aktual (gram) & dimensi fisik $(L \times W \times H / 6000)$ untuk akurasi ongkir ekspedisi.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Master Produk</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama produk atau kode SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <span>Kategori:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-zinc-900 text-white">Semua Kategori</option>
              <option value="Outerwear" className="bg-zinc-900 text-white">Outerwear / Jaket</option>
              <option value="T-Shirt" className="bg-zinc-900 text-white">T-Shirt / Kaos</option>
              <option value="Bottoms" className="bg-zinc-900 text-white">Bottoms / Celana</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List Deck */}
      <div className="space-y-4">
        {filteredProducts.map((product) => {
          const isExpanded = expandedProductIds.includes(product.id);
          const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
          const minPrice = Math.min(...product.variants.map((v) => v.price));
          const maxPrice = Math.max(...product.variants.map((v) => v.price));

          return (
            <div
              key={product.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-xl transition-all"
            >
              {/* Product Header Row */}
              <div
                onClick={() => toggleExpand(product.id)}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40 transition-colors border-b border-zinc-800/60"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-400 text-sm shrink-0">
                    <Layers className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm md:text-base">
                        {product.title}
                      </h3>
                      {product.status === "ACTIVE" && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ACTIVE
                        </span>
                      )}
                      {product.status === "DRAFT" && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-400">
                          DRAFT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1 font-mono">
                      <span>{product.category}</span>
                      <span>•</span>
                      <span>{product.variants.length} Varian Matrix</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">Total Stok: {formatNumber(totalStock)} unit</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 text-xs">
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Rentang Harga</div>
                    <div className="font-bold text-white font-mono text-sm">
                      {minPrice === maxPrice
                        ? formatIDR(minPrice)
                        : `${formatIDR(minPrice)} - ${formatIDR(maxPrice)}`}
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Nested Variant & SKU Matrix Table */}
              {isExpanded && (
                <div className="p-4 bg-zinc-950/60 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
                      <tr>
                        <th className="p-2">Kode SKU</th>
                        <th className="p-2">Ukuran & Warna</th>
                        <th className="p-2">Harga Jual</th>
                        <th className="p-2">Stok Unit</th>
                        <th className="p-2">Berat Aktual</th>
                        <th className="p-2">Dimensi (P x L x T)</th>
                        <th className="p-2">Bobot Volumetrik</th>
                        <th className="p-2 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/40 font-sans">
                      {product.variants.map((variant) => {
                        const volKg = calculateVolumetricWeight(
                          variant.lengthCm,
                          variant.widthCm,
                          variant.heightCm
                        );
                        const actualKg = variant.weightGrams / 1000;
                        const billedKg = Math.max(actualKg, volKg);

                        return (
                          <tr key={variant.id} className="hover:bg-zinc-800/30 transition-colors">
                            <td className="p-2 font-mono font-bold text-emerald-400">
                              {variant.sku}
                            </td>
                            <td className="p-2 text-zinc-200">
                              <span className="font-semibold">{variant.size}</span> / {variant.color}
                            </td>
                            <td className="p-2 font-mono font-bold text-white">
                              {formatIDR(variant.price)}
                              {variant.compareAtPrice && (
                                <span className="ml-1.5 text-[10px] text-zinc-400 line-through">
                                  {formatIDR(variant.compareAtPrice)}
                                </span>
                              )}
                            </td>
                            <td className="p-2 font-mono font-bold text-zinc-100">
                              {variant.stock} pcs
                            </td>
                            <td className="p-2 font-mono text-zinc-300">
                              {variant.weightGrams}g ({actualKg.toFixed(2)} kg)
                            </td>
                            <td className="p-2 font-mono text-zinc-400">
                              {variant.lengthCm} &times; {variant.widthCm} &times; {variant.heightCm} cm
                            </td>
                            <td className="p-2">
                              <div className="font-mono text-cyan-400 font-semibold">
                                {volKg.toFixed(2)} kg
                              </div>
                              <div className="text-[9px] text-zinc-400">
                                Ditagih: <strong>{billedKg.toFixed(2)} kg</strong>
                              </div>
                            </td>
                            <td className="p-2 text-right">
                              <button
                                onClick={() => alert(`Edit SKU ${variant.sku}`)}
                                className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                                title="Edit Matriks Varian"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Master Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-base">
                  Tambah Master Produk & Varian Perdana
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              {/* Product Basic Info */}
              <div className="space-y-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Nama Produk Master</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Oversized Heavyweight 450gsm Hoodie"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Kategori Produk</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Apparel / Outerwear">Apparel / Outerwear</option>
                      <option value="Apparel / T-Shirt">Apparel / T-Shirt</option>
                      <option value="Apparel / Bottoms">Apparel / Bottoms</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Kode SKU Perdana</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: HD-BLK-M"
                      value={newSKU}
                      onChange={(e) => setNewSKU(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono uppercase focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Ukuran</label>
                    <input
                      type="text"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Warna</label>
                    <input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Harga (Rp)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Stok Awal</label>
                    <input
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Physical Logistics Dimensions */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-cyan-400" />
                    Atribut Logistik Fisik & Volumetrik
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">Rumus: $(P \times L \times T) / 6000$</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-400">Berat (gram)</label>
                    <input
                      type="number"
                      value={newWeight}
                      onChange={(e) => setNewWeight(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400">Panjang (cm)</label>
                    <input
                      type="number"
                      value={newLength}
                      onChange={(e) => setNewLength(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400">Lebar (cm)</label>
                    <input
                      type="number"
                      value={newWidth}
                      onChange={(e) => setNewWidth(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400">Tinggi (cm)</label>
                    <input
                      type="number"
                      value={newHeight}
                      onChange={(e) => setNewHeight(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-zinc-900 text-[11px] text-zinc-300 flex justify-between items-center font-mono">
                  <span>Bobot Volumetrik: <strong className="text-cyan-400">{calculateVolumetricWeight(newLength, newWidth, newHeight).toFixed(2)} kg</strong></span>
                  <span>Bobot Aktual: <strong className="text-emerald-400">{(newWeight / 1000).toFixed(2)} kg</strong></span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/20"
                >
                  Simpan Produk & SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
