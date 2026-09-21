# 04. Feature Priorities & Scope Boundary

## 1. Global Priority Framework

We categorize all capabilities into four unambiguous priority levels to prevent premature feature bloat and ensure the transaction core is rock-solid before administrative or growth features are developed.

| Level | Classification | Definition | Governance Rule |
| :--- | :--- | :--- | :--- |
| **P0** | **Critical — Foundation** | Capabilities without which the system cannot function as an ecommerce store. | **Mandatory First.** Blocks all subsequent phases. |
| **P1** | **Operational — Core** | Capabilities needed for store owners to manage, fulfill, and monitor operations effectively. | Built immediately after P0 transaction loop is verified. |
| **P2** | **Optimization & Adapters** | External provider bridges (Shopify/WooCommerce) and conversion optimizations. | Built only after canonical models and operations are stable. |
| **P3** | **Expansion — Scale** | Advanced commerce features for high volume, multiple warehouses, and retention loops. | Built strictly after P0–P2 are proven in production. |

---

## 2. Detailed Priority Breakdown

### P0 — Critical (Transaction Foundation)
Goal: *A customer can browse products, select variants, verify stock, add to cart, calculate shipping, pay, and generate an immutable order snapshot.*

- **P0.1 Product Catalog**: Product metadata, categories, image media galleries, pricing, and active/draft status.
- **P0.2 Variant Architecture**: Support for option matrices (Size, Color, Material) with independent SKUs, barcodes, weight, dimensions, and prices.
- **P0.3 Inventory Engine**: Real-time stock validation, 3-tier lifecycle (`Available` $\rightarrow$ `Reserved` $\rightarrow$ `Committed`), and TTL-based reservation timeouts.
- **P0.4 Cart Management**: Session/customer-backed cart with unit price aggregation, quantity updates, and line-item subtotals.
- **P0.5 Checkout Orchestrator**: Aggregation of customer data, shipping address, courier options, discounts, and payment gateway tokenization.
- **P0.6 Shipping & Ongkir Integration**: Dynamic destination parsing, weight aggregation, courier rate query (JNE, J&T, SiCepat), and cost calculation into grand total.
- **P0.7 Payment Processing**: Gateway handshake, webhook listener, idempotent payment capture, and separate payment state machine.
- **P0.8 Order Engine**: Immutable transaction snapshot creation, financial recording, and order confirmation dispatch.

---

### P1 — Operational & Fulfillment System
Goal: *Store managers can operate the store, pick/pack/ship orders, view inventory movements, and monitor daily metrics.*

- **P1.1 Catalog Operations**: Admin CRUD for products, bulk variant generation, image uploads, and category taxonomy management.
- **P1.2 Inventory Operations**: Stock ledger, manual adjustments, stock movement audit trails, and low-stock threshold alerts.
- **P1.3 Order Management System (OMS)**: Filterable order lists (`Pending`, `Paid`, `Processing`, `Shipped`, `Completed`, `Cancelled`), order detail inspection, and manual status overrides.
- **P1.4 Shipment & Fulfillment Management**: Picking list generation, package boxing status (`PACKED`), courier airway bill (AWB/Resi) assignment, and tracking lifecycle updates.
- **P1.5 Customer Directory**: Customer profile inspection, linked order history, and contact details.
- **P1.6 Operations Dashboard**: Live metrics for Today's Revenue, Order Volume, Paid Ratio, Average Order Value (AOV), and Low Stock alerts.
- **P1.7 Asynchronous Analytics**: Event tapping on cart adds, checkout funnels, conversion rates, and revenue trends.

---

### P2 — Adapters & Conversion Optimization
Goal: *Connect to external platforms without altering internal models, and optimize checkout conversion.*

- **P2.1 Canonical Commerce Adapters**:
  - **Shopify Adapter**: Bi-directional synchronization for catalog, inventory, and order ingestion using Shopify Admin/Storefront APIs.
  - **WooCommerce Adapter**: Bi-directional synchronization using WooCommerce REST/GraphQL APIs.
- **P2.2 Discount & Coupon Engine**: Coupon code validation rules (percentage, fixed amount, min spend, expiry, usage caps).
- **P2.3 Automated Checkout Optimizations**: Single-page checkout refinements, autofill address matching, and express payment options.

---

### P3 — Advanced Commerce & Scale
Goal: *Scale operations to multi-location logistics, loyalty programs, and high-volume merchandising.*

- **P3.1 Multi-Warehouse Inventory**: Stock distribution across physical warehouse locations with geo-proximity routing.
- **P3.2 Product Bundling & Subscriptions**: Complex product kits and recurring billing cycles.
- **P3.3 Automated Marketing & Retention**: Abandoned cart recovery automations, customer loyalty points, and tier-based discounts.

---

## 3. Deliberately Deferred Features (Out-of-Scope Boundary)

To ensure razor-sharp execution and on-time delivery of the transaction core, the following features are **explicitly excluded from initial development**:

```text
               OUT-OF-SCOPE FOR PHASES 0–5
┌─────────────────────────────────────────────────────────┐
│ • Wishlist & Saved Items       • Multi-Warehouse Routing│
│ • Product Reviews & Ratings    • Subscription Engine    │
│ • Referral System              • Product Bundles        │
│ • Customer Loyalty Points      • Advanced Promotions    │
│ • Flash Sale Concurrency Engine• AI Product Recommender │
│ • Abandoned Cart Automations                            │
└─────────────────────────────────────────────────────────┘
```

### Guardrail Rationale:
1. **Dependency on Core Stability**: A wishlist or product review is meaningless if inventory reservation or payment webhooks fail under edge cases.
2. **Architecture Integrity**: Building flash sales or multi-warehouse before verifying the single-warehouse 3-tier inventory state machine introduces premature complexity.
3. **Focus on Cash Flow Loop**: The platform's immediate objective is converting customer visits into completed, fulfilled, and tracked orders.
