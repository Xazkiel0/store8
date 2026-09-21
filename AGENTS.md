<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Guidelines

## Project Overview
Storeight is a modular, high-performance ecommerce platform and transactional engine built on Next.js 16 (App Router), React 19, SQLite (`better-sqlite3`) with Drizzle ORM, and Tailwind CSS v4. It features a strict domain-driven architecture for catalog management, 3-tier inventory locking, cart workflows, shipping calculation, payment reconciliation, and admin operations.

## Architecture & Data Flow
- **Domain Boundaries**: Divided into 6 core domains:
  - `Experience`: Customer storefront, cart drawer, checkout UI, admin portal.
  - `Transaction`: Cart management, checkout orchestration, pricing, and order creation.
  - `Operation`: Catalog/variant management, inventory reservations, order fulfillment.
  - `Integration`: Third-party providers (payment gateways, shipping couriers, Shopify/WooCommerce bridges).
  - `Intelligence`: Analytics, GMV metrics, and sales reporting.
  - `Core Infrastructure`: Database connection, authentication, and background workers.
- **Server-First Boundary**:
  - React Server Components (RSC) fetch data directly from services/database queries.
  - Server Actions handle transactional state mutations and form submissions.
  - Route Handlers (`app/api/**/route.ts`) serve webhooks (payments, shipping) and public APIs.
  - Client Components (`"use client"`) are restricted to interactive UI leaves (forms, interactive filters, cart drawer, drag-and-drop).
- **Inventory & Transaction State Machine**:
  - 3-tier inventory lifecycle: `Available` $\rightarrow$ `Reserved` (with TTL) $\rightarrow$ `Committed` (on payment capture).
  - Multi-table operations MUST run inside atomic Drizzle `db.transaction()` blocks.

## Key Directories
- `app/`: Next.js App Router root layouts, pages, loading states, error boundaries, and API route handlers.
- `src/db/`: Database configuration, SQLite client instance (`better-sqlite3`), and Drizzle migrations.
  - `src/db/schema/`: Colocated Drizzle table schemas (e.g., `products.ts`, `variants.ts`, `orders.ts`, `inventory.ts`, `users.ts`).
- `src/modules/` or `src/server/`: Domain business logic and orchestrator services (cart, checkout, pricing, shipping, orders).
- `src/components/`: Reusable UI components.
  - `src/components/ui/`: shadcn/ui accessible primitives (Button, Dialog, Dropdown, Table, Input).
- `src/lib/`: Shared utilities, Zod validation schemas, Better Auth configurations, and helper functions (`cn`).
- `docs/`: Comprehensive architectural specifications, domain state machines, and implementation roadmaps.

## Development Commands
```bash
# Package & Server Lifecycle
npm run dev              # Launch Next.js development server
npm run build            # Create production build
npm run start            # Run production server
npm run lint             # Run ESLint (flat config)

# Database Operations (Drizzle ORM + SQLite)
npm run db:generate      # Generate Drizzle migration files from schema
npm run db:migrate       # Apply pending schema migrations to SQLite
npm run db:studio        # Open Drizzle Studio visual database inspector

# Testing & Quality Assurance
npm run test             # Run unit and integration tests with Vitest
npx playwright test      # Run end-to-end checkout & browser tests
```

## Code Conventions & Common Patterns
- **File & Path Naming**:
  - Use `kebab-case` for files and folders (e.g., `order-service.ts`, `cart-drawer.tsx`, `checkout-session.ts`).
  - Use `PascalCase` for React components and TypeScript type/interface declarations.
  - Use `camelCase` for variables, utility functions, and database column names.
- **Database Access & Transactions**:
  - Always colocate table definitions and relations under `src/db/schema/`.
  - Always execute multi-entity mutations inside transactions:
    ```typescript
    await db.transaction(async (tx) => {
      await tx.update(inventory).set({ reserved: sql`${inventory.reserved} + ${qty}` }).where(eq(inventory.variantId, variantId));
      await tx.insert(orderItems).values({ orderId, variantId, quantity: qty, unitPrice });
    });
    ```
- **Validation & Error Handling**:
  - Validate all incoming payloads (Server Actions, API route requests) with Zod schemas.
  - Prefer returning structured result objects from Server Actions over throwing unhandled errors:
    ```typescript
    export type ActionResult<T> = { success: true; data: T } | { success: false; error: string; code?: string };
    ```
- **Async & React 19 Standards**:
  - Use `useActionState` and Server Actions for form handling and pending feedback.
  - Wrap async server components in `Suspense` boundaries with appropriate skeleton fallbacks.
- **Styling**:
  - Tailwind CSS v4 utility classes combined via `cn()` helper (`clsx` + `tailwind-merge`).
  - Follow shadcn/ui design tokens and semantic color classes (`bg-background`, `text-foreground`, `border-border`).

## Important Files
- `package.json`: Dependency definitions and npm scripts.
- `next.config.ts`: Next.js application configuration.
- `tsconfig.json`: TypeScript compiler options and `@/*` path mapping alias.
- `eslint.config.mjs`: ESLint flat configuration extending `next/core-web-vitals` and TypeScript configs.
- `app/layout.tsx`: Root HTML layout, font variables (Geist Sans / Geist Mono), and global styles.
- `app/globals.css`: Tailwind v4 import (`@import "tailwindcss";`) and root theme variables.

## Runtime & Tooling Preferences
- **Runtime**: Node.js v20+ with `npm` package manager (`package-lock.json`).
- **Path Aliasing**: Use `@/*` pointing to project root for clean imports across modules.
- **AI Tooling & Code Intelligence**:
  - **LSP (`xd://lsp`)**: Use for symbol lookups, cross-module definition jumps, diagnostics, and renames.
  - **shadcn MCP (`xd://mcp__shadcn_*`)**: Use when adding or querying UI component primitives.

## Testing & QA
- **Unit & Integration**: Vitest (`vitest`) for domain logic, cart calculations, pricing algorithms, and Drizzle transaction testing.
- **End-to-End**: Playwright (`@playwright/test`) for end-to-end checkout, payment webhook simulation, and administrative flows.
- **Test Invariants**: Focus tests on transactional boundaries:
  - Inventory reservation, TTL expiration, and stock commit accuracy.
  - Subtotal, discount, tax, and shipping calculation idempotency.
  - Order snapshot immutability upon checkout completion.

## Context Pointers (Progressive Disclosure)
Consult specific domain documentation before modifying relevant subsystems:
- `docs/00-technology-stack.md`: Library decisions, state boundaries, dependency rules.
- `docs/01-system-architecture.md`: Domain boundaries, service interactions, data flow diagrams.
- `docs/02-domain-models-and-states.md`: Entity schemas, inventory 3-tier lifecycle, order status transitions.
- `docs/03-orchestration-and-workflows.md`: Checkout saga, payment webhooks, inventory reservation TTLs.
- `docs/04-feature-priorities-and-scope.md`: P0-P3 priorities, MVP requirements, feature boundaries.
- `docs/05-development-roadmap.md`: Implementation phase sequencing and milestone verification gates.
- `docs/06-activity-diagrams.md`: Mermaid activity diagrams for independent D2C ecommerce operations and marketplace fee avoidance.
- `docs/07-use-case-diagrams.md`: Mermaid use case diagrams and actor interaction specifications across all functional domains.
