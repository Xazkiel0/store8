# 01. System Architecture & Boundaries

## 1. Domain Architecture

The system is decomposed into **6 top-level domains**, maintaining a strict separation of concerns between customer experience, transaction execution, store operations, external integrations, and business intelligence.

```text
                    ECOMMERCE SYSTEM
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
     EXPERIENCE        TRANSACTION         OPERATION
        │                  │                  │
   Storefront            Cart              Products
   Product UI           Checkout            Inventory
   Customer             Payment               Orders
   Admin UI             Shipping            Customers
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                       INTEGRATION
                           │
              ┌────────────┼────────────┐
              │            │            │
          Commerce       Payment      Shipping
          Provider       Provider     Provider
              │
        Shopify / WooCommerce
                           │
                       INTELLIGENCE
                           │
                       Analytics
```

### Domain Responsibilities

| Domain | Scope & Responsibilities | Key Components |
| :--- | :--- | :--- |
| **Experience** | Customer and operator interaction surfaces, state presentation, and input handling. | Customer Storefront, Product Detail UI, Customer Account Portal, Admin Management UI. |
| **Transaction** | Core transactional pipeline, pricing calculations, validations, and state commits. | Cart Manager, Checkout Orchestrator, Shipping Rate Calculator, Payment Manager, Order Writer. |
| **Operation** | Back-office management, stock tracking, catalog lifecycle, and fulfillment. | Product Catalog Admin, Inventory Ledger, Order Processing, Shipment Dispatch, Customer CRM. |
| **Integration** | Boundary adapters for 3rd-party platforms, payment gateways, and courier APIs. | Commerce Provider Adapters (Shopify, WooCommerce), Payment Gateways, Courier Logistics APIs. |
| **Intelligence** | Read-only analytics ingestion, metric aggregation, and reporting. | Event Bus Listener, Metric Aggregator, Funnel Tracker, Conversion Analyzer. |

---

## 2. Transaction Core

The **Transaction Core** represents the non-negotiable critical path of the ecommerce platform. Supporting domains (Analytics, Dashboard, Marketing, Recommendations) observe or consume from the Transaction Core without blocking or coupling to it.

```text
Product ──> Variant ──> Inventory ──> Cart ──> Checkout ──> Shipping ──> Payment ──> Order
```

### Invariants:
1. **No Order without Payment Intent**: An order is only formed and confirmed once the payment state transition validates.
2. **No Direct Variant Mutation from Transaction**: Cart and Checkout read Variant data and lock Inventory reservations; they do not mutate catalog data.
3. **Decoupled Fulfillment**: Order creation confirms the sale; Shipment creation handles logistics asynchronously.

---

## 3. Canonical Commerce Model & Adapter Strategy

To prevent vendor lock-in and spaghetti code, **the frontend and business logic never communicate directly with provider-specific APIs (Shopify / WooCommerce)**.

### Layered Architecture

```text
┌─────────────────────────────────────────────────────────┐
│              Storefront & Admin Experience UI           │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 Canonical Commerce Model                │
│ (Product, Variant, Inventory, Cart, Order, Customer...) │
└────────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│    Shopify Adapter    │         │  WooCommerce Adapter  │
│  (Shopify Storefront  │         │   (Woo REST / GraphQL │
│     & Admin API)      │         │          API)         │
└───────────────────────┘         └───────────────────────┘
```

### Architectural Rules:
- **Unified Schema**: All internal operations consume the canonical data structure defined in `02-domain-models-and-states.md`.
- **Bidirectional Transformation**: Adapters are solely responsible for converting external provider payloads into canonical objects and vice-versa.
- **Pluggable Providers**: Switching from an internal commerce engine to Shopify or WooCommerce requires zero changes in the Experience or Intelligence layers.

---

## 4. Source of Truth Matrix

Clear ownership of state prevents synchronization conflicts and double-updates across distributed components and adapters.

| Domain Entity | Primary Source of Truth | Authority Rules & Invariants |
| :--- | :--- | :--- |
| **Product & Category** | Commerce System / Catalog Service | Master catalog definitions, descriptions, categories, and media assets. |
| **Variant** | Commerce System / Catalog Service | SKU definitions, variant options (size, color), base prices, dimensions, weights. |
| **Inventory** | Inventory Ledger Service | Authoritative count for `available`, `reserved`, and `committed` quantities. |
| **Cart** | Commerce System / Cart Session Store | Temporary customer selection and quantities prior to checkout initiation. |
| **Checkout Session** | Orchestration Layer | Ephemeral transactional aggregation (Cart + Address + Selected Rate + Totals). |
| **Payment** | Payment Gateway Provider + Payment Record | Verification of funds transfer, gateway transaction IDs, and payment status. |
| **Order** | Canonical Order Record Store | Immutable transactional snapshot created upon payment confirmation. |
| **Shipment** | Logistics Provider + Shipment Record | Courier tracking numbers, manifest status, and transit progression. |
| **Analytics** | Analytics Data Store | Non-authoritative, append-only business event log. |
| **Dashboard** | Read-Model Projection Layer | Aggregated read model projected from Orders, Payments, Inventory, and Customers. |

---

## 5. Architectural Decision Records (ADR Summary)

1. **ADR-01: Separation of Order and Payment States**
   - *Decision*: Separate `OrderStatus` (fulfillment/lifecycle) from `PaymentStatus` (financial status).
   - *Rationale*: A payment may be pending/failed while an order attempt exists; an order may be confirmed while payout or capture settles.
2. **ADR-02: Three-Tier Inventory Lifecycle**
   - *Decision*: Inventory uses `Available`, `Reserved`, and `Committed` states instead of a single scalar quantity.
   - *Rationale*: Prevents overselling during concurrent checkouts while allowing clean rollbacks on payment failure/timeout.
3. **ADR-03: Immutable Order Snapshots**
   - *Decision*: Orders store deep copies of Product title, SKU, variant attributes, prices, discounts, and customer address at the exact moment of checkout.
   - *Rationale*: Catalog price updates or deleted products must never retroactively alter historic financial records.
4. **ADR-04: Analytics as Asynchronous Side-Effect**
   - *Decision*: Analytics ingestion listens to domain events; it is never in the synchronous execution path of transactions.
   - *Rationale*: Analytics outages or latency spikes must never degrade checkout conversion rates or block order processing.
