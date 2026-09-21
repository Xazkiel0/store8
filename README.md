# Storeight — Ecommerce System Architecture & Development Plan

Master architecture, domain design, and phased development roadmap for the **Storeight** modular ecommerce system.

---

## 📑 Document Structure

| Document | Focus & Content |
| :--- | :--- |
| **[`00-technology-stack.md`](./docs/00-technology-stack.md)** | Master Technology Stack Matrix, UI/DB/FE/BE library selections, state responsibilities, and MCP Context7 integration. |
| **[`01-system-architecture.md`](./docs/01-system-architecture.md)** | 6 Core Domains, Transaction Core pipeline, Canonical Commerce Model, Adapter architecture, and Source of Truth matrix. |
| **[`02-domain-models-and-states.md`](./docs/02-domain-models-and-states.md)** | Data models (Product/Variant, Cart, Checkout, Order snapshot) and explicit State Machines (Inventory, Order, Payment, Shipment). |
| **[`03-orchestration-and-workflows.md`](./docs/03-orchestration-and-workflows.md)** | End-to-end event choreography: Happy Path checkout, Failure & Rollback paths, Async fulfillment queues, Analytics side-effects, and Dashboard read-model. |
| **[`04-feature-priorities-and-scope.md`](./docs/04-feature-priorities-and-scope.md)** | Prioritization framework (P0 Critical, P1 Operational, P2 Optimization, P3 Expansion) and explicitly deferred features. |
| **[`05-development-roadmap.md`](./docs/05-development-roadmap.md)** | Phased execution roadmap (Phases 0 to 11), deliverables, entry/exit criteria, and milestone definitions. |

---

## 🏛️ System Overview

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

### Core Architecture Principle
> **Shopify vs WooCommerce is not our system foundation. The Canonical Commerce Domain is our foundation.**
> All storefronts and business logic interact strictly with our canonical models; external providers are integrated via swappable adapter layers.

---

## ⚡ Core Transaction Loop (P0 Foundation)

Before building dashboards, analytics, or complex marketing features, the transaction core must be stable and verified end-to-end:

```text
┌─────────┐
│ Product │
└────┬────┘
     ↓
┌─────────┐
│ Variant │
└────┬────┘
     ↓
┌───────────┐
│ Inventory │ (Available → Reserved → Committed)
└─────┬─────┘
      ↓
┌─────────┐
│  Cart   │
└────┬────┘
     ↓
┌──────────┐
│ Checkout │ (Customer + Address + Shipping Rate + Total)
└────┬─────┘
     ↓
┌──────────┐
│ Shipping │ (Rate lookup & Service selection)
└────┬─────┘
     ↓
┌─────────┐
│ Payment │ (Separate from Order fulfillment state)
└────┬────┘
     ↓
┌─────────┐
│  Order  │ (Immutable snapshot of the transaction)
└─────────┘
```
