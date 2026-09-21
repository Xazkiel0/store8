# 00. Technology Stack & Implementation Standards

Master technology stack matrix, library selections, state management boundaries, and runtime conventions for the **Storeight** modular ecommerce system.

---

## 1. Master Stack Overview

| Domain | Technology / Library | Role & Application |
| :--- | :--- | :--- |
| **UI** | Tailwind CSS + shadcn/ui + Lucide | Responsive layout, accessible component primitives, design system |
| **Animation & Charts** | Motion (`motion/react`) + CSS Transitions + Recharts | Smooth checkout transitions, visual feedback, admin GMV/analytics charts |
| **Database** | SQLite (`better-sqlite3`) + Drizzle ORM + Drizzle Kit | Typesafe relational schema, ACID transactions, migrations, local development |
| **Frontend** | Next.js App Router + React + TypeScript + TanStack (Query, Table) | Storefront, cart synchronization, admin tables, typesafe UI |
| **Backend** | Next.js Server Components, Server Actions, Route Handlers, TypeScript Services | Core transaction pipeline, pricing, inventory locking, order orchestration |
| **Authentication** | Better Auth + Drizzle SQLite Adapter | Customer accounts, session management, RBAC for Admin |
| **Validation & Forms** | Zod + React Hook Form + `@hookform/resolvers` | End-to-end payload validation (Client forms & Server Actions) |
| **Testing & Tooling** | Vitest, Playwright, ESLint, Prettier, Context7 MCP | Unit tests, E2E checkout verification, doc verification |

---

## 2. Detailed Technology Selection Matrix

### 2.1 UI — Presentation & Components

| Selected | ID | Technology / Library | Application in Storeight | Selection Rule & Constraints |
| :---: | :---: | :--- | :--- | :--- |
| ✅ | `UI01` | **Tailwind CSS** | Responsive catalog grid, utility classes, status badges | Foundation styling layer configured with shadcn tokens. |
| ✅ | `UI02` | **shadcn/ui** | Button, Card, Dialog, Sheet (Mini Cart), Form, Tabs, Badge | Accessible headless primitives styled with Tailwind CSS. |
| ✅ | `UI03` | **lucide-react** | Cart, package, payment, chevron, filter, search icons | Single icon family for visual consistency across storefront & admin. |
| ✅ | `UI04` | **CSS Transitions & Transforms** | Product image hover zoom, button states, card lifts | Native browser performance without JS runtime overhead. |
| ✅ | `UI05` | **Motion (`motion/react`)** | Multi-step checkout transitions, cart badge animations | Used for complex state transitions; respects `prefers-reduced-motion`. |
| ✅ | `UI06` | **Recharts** | Admin analytics: GMV trend, order volume, inventory alerts | Rendered in admin analytics dashboard (`/admin/analytics`). |
| ✅ | `UI07` | **next-themes** | Dark/Light mode support | Primary focus on high-contrast light mode for storefront clarity. |
| ✅ | `UI08` | **Sonner** | Non-blocking toasts: "Added to cart", "Order copied" | Non-critical feedback only; critical errors stay as inline banners. |

---

### 2.2 DB — Persistence & Relations

| Selected | ID | Technology / Library | Application in Storeight | Selection Rule & Constraints |
| :---: | :---: | :--- | :--- | :--- |
| ✅ | `DB01` | **SQLite (`better-sqlite3`)** | Local relational persistence for products, orders, cart, users | Fast embedded SQL engine without external DB server dependency. |
| ✅ | `DB02` | **Drizzle ORM** | Schema definition, relations, typesafe query execution | Primary ORM with native transaction support (`db.transaction()`). |
| ✅ | `DB03` | **Drizzle Kit** | Schema migrations generation and execution | Generates timestamped SQL migrations committed to Git. |
| ✅ | `DB04` | **Drizzle Studio** | Local data inspection for dev & QA | Developer inspection tool for checking inventory reserves and order logs. |
| 🔲 | `DB05` | **PostgreSQL (Optional Upgrade)** | Future scale-out production database | Migration path via Drizzle schema compatibility if traffic expands. |

---

### 2.3 FE — Frontend & State Architecture

| Selected | ID | Technology / Library | Application in Storeight | Selection Rule & Constraints |
| :---: | :---: | :--- | :--- | :--- |
| ✅ | `FE01` | **Next.js App Router** | Product pages (`/products/[slug]`), Cart, Checkout, Admin | SSR/ISR for SEO, Client Components for dynamic cart interactions. |
| ✅ | `FE02` | **React + TypeScript** | Interactive UI components, variant selector, quantity stepper | Strict typing for Decimal Money amounts, SKU codes, and state machines. |
| ✅ | `FE03` | **React Hook Form + Zod** | Checkout address form, customer profile, admin product editor | Uncontrolled form inputs with client-side Zod validation. |
| ✅ | `FE04` | **Fetch API bawaan** | Browser-to-Route-Handler HTTP calls when needed | Native Fetch without Axios overhead. |
| ✅ | `FE05` | **TanStack Query** | Mini-cart sync, payment status polling, optimistic updates | Manages server cache, background revalidation, and mutation states. |
| ✅ | `FE06` | **dnd-kit** | Product gallery image reordering, category sorting | Accessible drag-and-drop interactions for back-office admin. |
| ✅ | `FE07` | **TanStack Table** | Order management table, product inventory table | Filtering, sorting, and pagination for high-volume tabular data. |

#### State Responsibility Separation

```text
┌───────────────────────────────┬──────────────────────────────────────────────────────┐
│ Data Layer                    │ Primary Location & Source of Truth                   │
├───────────────────────────────┼──────────────────────────────────────────────────────┤
│ Catalog, Price & Stock Level  │ Database (SQLite via Server Components & Services)   │
│ Active Cart Session           │ Server State / Cookie synced via TanStack Query      │
│ Transient UI Selection        │ React State (Selected variant, color/size, stepper)  │
│ User Session & Roles          │ Better Auth Session Cookie (Verified on Server)      │
│ Filter & Search Query         │ URL Search Params (?category=shoes&sort=price_asc)   │
└───────────────────────────────┴──────────────────────────────────────────────────────┘
```

---

### 2.4 BE — Backend & Business Logic Services

| Selected | ID | Technology / Library | Application in Storeight | Selection Rule & Constraints |
| :---: | :---: | :--- | :--- | :--- |
| ✅ | `BE01` | **Next.js Server Components** | Initial catalog load, order confirmation, admin summary | Zero DB client bundle leak, optimal First Contentful Paint. |
| ✅ | `BE02` | **Next.js Server Actions** | "Add to Cart", "Submit Order", "Update Address", "Fulfill" | Typesafe server RPCs with automatic session & Zod verification. |
| ✅ | `BE03` | **Next.js Route Handlers** | Payment gateway webhooks, shipping callbacks, Better Auth | Dedicated HTTP endpoints requiring raw headers and webhook verification. |
| ✅ | `BE04` | **Better Auth + Drizzle** | Customer auth, Admin RBAC, secure cookie sessions | SQLite-compatible Drizzle adapter for user and session tables. |
| ✅ | `BE05` | **TypeScript Domain Services** | `InventoryService`, `PricingService`, `CheckoutService` | Decoupled domain logic adhering to Storeight state machines. |
| ✅ | `BE06` | **Server-side Zod** | Request validation, payload sanitization, price verification | Never trust client prices; all financial amounts re-computed server-side. |

---

## 3. Documentation & Verification Protocol

When implementing components, database schemas, and service integrations:
- **Context7 MCP**: Always resolve package documentation via `resolve-library-id` and `query-docs` before writing integration code for Next.js App Router, Better Auth, Drizzle ORM, TanStack Query/Table, and shadcn/ui.
- **Strict Typing**: All currency amounts represented as integer minor units (e.g. cents/rupiah integers) or Decimal objects to prevent floating-point rounding errors.
- **Isolation**: Domain service logic in `src/services/` remains strictly decoupled from UI rendering layers.
