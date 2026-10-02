"use client";

import React, { Suspense, useState } from "react";
import OrdersHeader from "@/components/orders/orders-header";

export default function ProcessingOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleRefresh = () => {
    // Refresh triggered
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-background">
      {/* Top OrdersHeader */}
      <Suspense
        fallback={
          <div className="h-16 bg-white border-b border-[#e2e8f0]" />
        }
      >
        <OrdersHeader
          title="Processing Orders"
          description="Pesanan lunas dalam antrean fulfillment: pick pack gudang, cetak thermal label resi massal, dan serah terima kurir"
          onRefresh={handleRefresh}
          requiresActionCount={12}
          syncIntervalSec={60}
        />
      </Suspense>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 space-y-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <p className="text-sm text-muted-foreground">
            Processing orders content goes here.
          </p>
        </div>
      </main>
    </div>
  );
}
