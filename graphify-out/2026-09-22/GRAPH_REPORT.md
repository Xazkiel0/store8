# Graph Report - store8  (2026-09-21)

## Corpus Check
- Corpus is ~10,361 words - fits in a single context window. You may not need a graph.

## Summary
- 169 nodes · 170 edges · 17 communities (11 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 15,000 input · 3,000 output

## Community Hubs (Navigation)
- Core Package & Lint Configuration
- Runtime Dependencies
- TypeScript Compiler Options
- Development Tooling & Types
- Architecture & Framework Standards
- Domain Boundaries & System Architecture
- Domain Models, States & Orchestration
- Next.js App Routing & Layout
- NPM Scripts & Lifecycle
- Roadmap & Scope Priorities
- Package Security & Build Scripts
- Writing For Agents Skill
- GitHub PRD Generation Skill
- PostCSS Configuration

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Storeight Architecture` - 10 edges
3. `scripts` - 9 edges
4. `allowScripts` - 6 edges
5. `Transaction Domain` - 6 edges
6. `next` - 4 edges
7. `Three-Tier Inventory Lifecycle` - 4 edges
8. `Next.js App Router & React 19` - 3 edges
9. `Experience Domain` - 3 edges
10. `Operation Domain` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Order Lifecycle State Machine` --governs--> `Transaction Domain`  [INFERRED]
  docs/02-domain-models-and-states.md → docs/01-system-architecture.md
- `Three-Tier Inventory Lifecycle` --implements--> `Operation Domain`  [INFERRED]
  docs/02-domain-models-and-states.md → docs/01-system-architecture.md
- `5-Phase Implementation Roadmap` --executes_in_phases_1_and_2--> `P0 Critical Transaction Foundation`  [INFERRED]
  docs/05-development-roadmap.md → docs/04-feature-priorities-and-scope.md
- `Checkout Orchestrator & Saga` --locks_and_commits--> `Three-Tier Inventory Lifecycle`  [EXTRACTED]
  docs/03-orchestration-and-workflows.md → docs/02-domain-models-and-states.md
- `Inventory TTL Reaper Worker` --reclaims_expired_stock--> `Three-Tier Inventory Lifecycle`  [EXTRACTED]
  docs/03-orchestration-and-workflows.md → docs/02-domain-models-and-states.md

## Import Cycles
- None detected.

## Communities (17 total, 6 thin omitted)

### Community 0 - "Core Package & Lint Configuration"
Cohesion: 0.05
Nodes (37): eslintConfig, name, private, version, better-auth, better-sqlite3, class-variance-authority, clsx (+29 more)

### Community 1 - "Runtime Dependencies"
Cohesion: 0.09
Nodes (23): dependencies, better-auth, better-sqlite3, class-variance-authority, clsx, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+15 more)

### Community 2 - "TypeScript Compiler Options"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "Development Tooling & Types"
Cohesion: 0.15
Nodes (13): devDependencies, drizzle-kit, eslint, eslint-config-next, @playwright/test, tailwindcss, @tailwindcss/postcss, @types/better-sqlite3 (+5 more)

### Community 4 - "Architecture & Framework Standards"
Cohesion: 0.18
Nodes (7): Better Auth & SQLite Adapter, Storeight Architecture Guidelines, SQLite & Drizzle ORM, Storeight Architecture, Tailwind CSS & shadcn/ui, TanStack Query & Table, Zod Schema Validation

### Community 5 - "Domain Boundaries & System Architecture"
Cohesion: 0.25
Nodes (6): Core Infrastructure Domain, Experience Domain, Integration Domain, Intelligence Domain, Operation Domain, Transaction Domain

### Community 6 - "Domain Models, States & Orchestration"
Cohesion: 0.22
Nodes (9): Cart State Model, Checkout Orchestrator & Saga, Domain Event Bus, Order Fulfillment Workflow, Order Lifecycle State Machine, Payment Transaction Lifecycle, Product & Variant Model, Inventory TTL Reaper Worker (+1 more)

### Community 7 - "Next.js App Routing & Layout"
Cohesion: 0.22
Nodes (6): geistMono, geistSans, metadata, Next.js App Router & React 19, nextConfig, next

### Community 8 - "NPM Scripts & Lifecycle"
Cohesion: 0.22
Nodes (9): scripts, build, db:generate, db:migrate, db:studio, dev, lint, start (+1 more)

### Community 9 - "Roadmap & Scope Priorities"
Cohesion: 0.33
Nodes (4): P0 Critical Transaction Foundation, P1 Operational Core, P0-P3 Priority Framework, 5-Phase Implementation Roadmap

### Community 10 - "Package Security & Build Scripts"
Cohesion: 0.33
Nodes (6): allowScripts, better-sqlite3@13.0.3, esbuild@0.18.20, esbuild@0.25.12, esbuild@0.28.2, unrs-resolver

## Knowledge Gaps
- **117 isolated node(s):** `geistSans`, `geistMono`, `metadata`, `eslintConfig`, `nextConfig` (+112 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 135 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Next.js App Routing & Layout` to `Core Package & Lint Configuration`, `Domain Boundaries & System Architecture`?**
  _High betweenness centrality (0.224) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Core Package & Lint Configuration`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **What connects `geistSans`, `geistMono`, `metadata` to the rest of the system?**
  _117 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core Package & Lint Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `TypeScript Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._