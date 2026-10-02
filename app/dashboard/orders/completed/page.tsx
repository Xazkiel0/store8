"use client";

import React, { Suspense } from "react";
import OrdersHeader from "@/components/orders/orders-header";

export default function CompletedOrdersPage() {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      {/* Top OrdersHeader */}
      <Suspense
        fallback={
          <div className="h-16 bg-white border-b border-[#e2e8f0]" />
        }
      >
        <OrdersHeader
          title="Completed Orders"
          description="Daftar pesanan yang telah berhasil diterima customer dan transaksi selesai"
        />
      </Suspense>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground">
            Completed orders content goes here.
          </p>
        </div>
      </main>
    </div>
  );
}
