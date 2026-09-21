# 05. Development Roadmap & Execution Phases

## 1. Master Phase Overview

```text
                  ┌──────────────────────┐
                  │  PHASE 0: DEFINITION │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │ PHASE 1: CATALOG+VAR │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │ PHASE 2: INV + CART  │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │ PHASE 3: CHECKOUT+SHP│
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │ PHASE 4: PAY + ORDER │
                  └──────────┬───────────┘
                             ▼
                ┌────────────┴────────────┐
                ▼                         ▼
        ┌───────────────┐         ┌───────────────┐
        │ PHASE 5: ADMIN│         │ PHASE 6: SHIP │
        └───────┬───────┘         └───────┬───────┘
                └────────────┬────────────┘
                             ▼
                  ┌──────────────────────┐
                  │ PHASE 7: DASH+ANALYT │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │ PHASE 8/9: ADAPTERS  │
                  │ Shopify / WooCommerce│
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │ PHASE 10: OPTIMIZE   │
                  └──────────┬───────────┘
                             ▼
                  ┌──────────────────────┐
                  │ PHASE 11: ADVANCED   │
                  └──────────────────────┘
```

---

## 2. Phase Breakdown & Acceptance Criteria

| Phase | Name | Urgency | Deliverables | Exit / Verification Criteria |
| :---: | :--- | :---: | :--- | :--- |
| **0** | **System Definition** | 🔴 Critical | • Canonical Entity Schemas<br>• State Machine Invariants<br>• Source of Truth Contracts | Formal schema validation specs locked for Product, Variant, Inventory, Cart, Order, Payment, and Shipment. |
| **1** | **Catalog & Variant** | 🔴 Critical | • Product Catalog Data Layer<br>• Variant Matrix Engine<br>• Media & Pricing Associations | Storefront displays products with dynamic option selection (Size/Color) updating SKU, price, and weight in real time. |
| **2** | **Inventory & Cart** | 🔴 Critical | • 3-Tier Inventory Engine (`Available`, `Reserved`, `Committed`)<br>• Session Cart Manager | User can add variants to cart with real-time stock validation; out-of-stock items block cart addition. |
| **3** | **Checkout & Shipping** | 🔴 Critical | • Checkout Session Orchestrator<br>• Courier Rate Integration (JNE, J&T, SiCepat)<br>• Grand Total Calculator | Submitting destination address outputs live courier rate choices; choosing a service computes final exact Grand Total. |
| **4** | **Payment & Order** | 🔴 Critical | • Payment Gateway Webhooks<br>• Immutable Order Snapshot Engine<br>• Inventory Commit / Rollback Sagas | Payment success produces confirmed immutable Order and commits inventory; payment failure safely restores stock to `Available`. |
| **5** | **Admin Operations** | 🟠 High | • Product/Variant CRUD UI<br>• Stock Movement Ledger & Adjustments<br>• Order Management View (OMS) | Store owner can manage catalog, adjust stock with audit reasons, and inspect customer orders with granular statuses. |
| **6** | **Shipment & Fulfillment** | 🟠 High | • Fulfillment Queue<br>• Package Packing Workflow<br>• Courier Tracking / AWB Assign | Warehouse can move orders to `PACKED`, assign tracking numbers, and advance shipment status to `SHIPPED` / `DELIVERED`. |
| **7** | **Dashboard & Analytics** | 🟠 High | • Read-Model Projection View<br>• Live Metrics Dashboard<br>• Asynchronous Event Analytics Tap | Executive dashboard displays live Today's Revenue, AOV, Order Counts, and Low Stock Alerts without querying transactional tables. |
| **8** | **Shopify Adapter** | 🟡 Medium | • Shopify Storefront/Admin API Bridge<br>• Bidirectional Catalog & Order Sync | Storefront can run on Shopify backend using canonical models without altering UI components. |
| **9** | **WooCommerce Adapter** | 🟡 Medium | • WooCommerce REST/GraphQL Bridge<br>• Product, Stock, and Order Mapping | Storefront can run on WooCommerce backend using canonical models without altering UI components. |
| **10** | **Optimization** | 🟢 Later | • Coupon & Promotional Rules<br>• Single-Page Checkout Polish<br>• Performance Optimizations | Coupon codes validate correctly against cart rules; checkout flow minimizes friction. |
| **11** | **Advanced Commerce** | 🟢 Later | • Multi-Warehouse Routing<br>• Bundles & Subscription Engine<br>• Loyalty & Retention Loops | Advanced scale features enabled on top of the verified core foundation. |

---

## 3. Milestone Gates & Governance

### Milestone Gate 1: Transaction Core Verification (Phases 0–4)
- **Condition**: A complete end-to-end purchase must be executable by a test customer in under 60 seconds with verified stock reservation, courier rate selection, mock/live payment webhook, and immutable order creation.
- **Rule**: No work on Admin UI (Phase 5) or Dashboard (Phase 7) may commence before Milestone 1 passes automated end-to-end integration tests.

### Milestone Gate 2: Operational Readiness (Phases 5–7)
- **Condition**: Store operations staff can fulfill an order from `CONFIRMED` to `DELIVERED` using the admin portal, and the dashboard immediately reflects the updated financial metrics.
- **Rule**: Adapter work (Phases 8–9) begins only after internal operational workflows are fully functional.

### Milestone Gate 3: Multi-Provider Interoperability (Phases 8–9)
- **Condition**: The identical storefront UI seamlessly switches between Native Commerce, Shopify, and WooCommerce backends purely via configuration flags.
