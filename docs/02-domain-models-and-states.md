# 02. Domain Models & State Machines

## 1. Domain Entities & Schemas

### 1.1 Product & Variant Model

Variants are independent child entities of Products. SKU, stock level, pricing, and shipping physical properties (weight & dimensions) live strictly at the **Variant** level.

```text
Product (Parent)
├── id, title, slug, description, category_id, status (draft, active, archived)
├── media: Array<{ id, url, position, alt_text }>
└── variants: Array<Variant>
      │
      ├── id, sku, barcode
      ├── option_values: { size?: string, color?: string, material?: string, ... }
      ├── price: { amount, currency }
      ├── compare_at_price?: { amount, currency }
      ├── weight: { value, unit }
      └── dimensions: { length, width, height, unit }
```

---

### 1.2 Inventory Model & Three-Tier Lifecycle

Stock is managed as a finite resource pool through three distinct states:

```text
               ┌───────────────┐
               │   AVAILABLE   │
               └───────┬───────┘
                       │
             Customer Initiates Checkout
             (Reserve stock with TTL)
                       │
                       ▼
               ┌───────────────┐
         ┌────►│   RESERVED    ├─────┐
         │     └───────┬───────┘     │
         │             │             │
  Payment Failed       │      Payment Success
   or TTL Expired      │     (Commit inventory)
         │             │             │
         └─────────────┘             ▼
                             ┌───────────────┐
                             │   COMMITTED   │
                             └───────────────┘
```

#### Inventory Quantities Definition:
- **`Available`**: Quantity physically on hand and unreserved. Safe to purchase.
  $$\text{Available} = \text{Total On Hand} - (\text{Reserved} + \text{Committed})$$
- **`Reserved`**: Quantity temporarily held during active checkout session. Held until payment confirmation or TTL timeout (e.g. 15–30 mins).
- **`Committed`**: Quantity attached to a confirmed, paid order waiting for or undergoing physical fulfillment.

---

### 1.3 Cart Model

A Cart is an ephemeral container representing intent to purchase. A Cart is **not** an Order.

```typescript
interface Cart {
  id: string;
  customer_id?: string; // Nullable for guest carts
  session_id: string;
  items: CartItem[];
  subtotal: Money;
  currency: string;
  updated_at: ISOTimestamp;
}

interface CartItem {
  id: string;
  product_id: string;
  variant_id: string;
  product_title: string;
  variant_title: string;
  sku: string;
  quantity: number;
  unit_price: Money;
  subtotal: Money;
  selected_options: Record<string, string>;
}
```

---

### 1.4 Checkout Model

The Checkout object aggregates all data required to form a transaction before payment execution.

$$\text{CHECKOUT} = \text{Customer Data} + \text{Cart Items} + \text{Shipping Address} + \text{Shipping Rate} + \text{Discounts} + \text{Payment Method}$$

```typescript
interface CheckoutSession {
  id: string;
  cart_id: string;
  customer: {
    email: string;
    phone?: string;
    is_guest: boolean;
  };
  shipping_address: Address;
  billing_address?: Address;
  line_items: CartItem[];
  selected_shipping_rate: ShippingRate;
  applied_discount?: Discount;
  breakdown: {
    subtotal: Money;
    shipping_cost: Money;
    discount_amount: Money;
    tax_amount: Money;
    grand_total: Money;
  };
  inventory_reservation_id: string;
  expires_at: ISOTimestamp;
}
```

---

### 1.5 Order Snapshot Model (Immutability Guarantee)

When payment succeeds, the system creates an **Order Snapshot**. The Order copies all product titles, variant attributes, unit prices, discounts, and customer addresses verbatim. 

> **Immutability Rule**: Subsequent updates to product titles, variant prices, or customer addresses in the catalog/profile MUST NEVER mutate existing Order records.

```typescript
interface Order {
  id: string; // e.g. "ORD-2026-0091"
  created_at: ISOTimestamp;
  customer: {
    id?: string;
    email: string;
    name: string;
    phone: string;
  };
  status: OrderStatus;
  payment_status: PaymentStatus;
  items: Array<{
    variant_id: string;
    product_title_snapshot: string;
    variant_title_snapshot: string;
    sku_snapshot: string;
    unit_price_snapshot: Money;
    quantity: number;
    subtotal: Money;
    weight_snapshot: { value: number; unit: string };
  }>;
  shipping_address_snapshot: Address;
  shipping_details: {
    courier_code: string;
    courier_service: string;
    shipping_cost: Money;
  };
  financials: {
    subtotal: Money;
    shipping_total: Money;
    discount_total: Money;
    grand_total: Money;
    currency: string;
  };
}
```

---

## 2. State Machines & Lifecycle Transitions

### 2.1 Order State Machine (`OrderStatus`)

Tracks order fulfillment and overall business lifecycle.

```text
                     ┌───────────┐
                     │  PENDING  │
                     └─────┬─────┘
                           │ Payment Verified
                           ▼
                     ┌───────────┐
       ┌────────────►│ CONFIRMED │
       │             └─────┬─────┘
       │                   │ Admin/WMS Starts Picking & Packing
       │                   ▼
Order  │             ┌────────────┐
Reopen │             │ PROCESSING │
       │             └─────┬──────┘
       │                   │ Parcel Handed to Courier
       │                   ▼
       │             ┌───────────┐
       │             │  SHIPPED  │
       │             └─────┬─────┘
       │                   │ Confirmed Delivered to Customer
       │                   ▼
       │             ┌───────────┐
       │             │ COMPLETED │
       │             └───────────┘
       │
       │ (From PENDING/CONFIRMED before shipment)
       ▼
 ┌───────────┐
 │ CANCELLED │
 └───────────┘
```

---

### 2.2 Payment State Machine (`PaymentStatus`)

Tracks financial settlement independently from order fulfillment.

```text
                     ┌───────────┐
                     │  PENDING  │
                     └─────┬─────┘
            ┌──────────────┼──────────────┐
            │              │              │
     Gateway Paid   Gateway Failed  TTL Exceeded
            │              │              │
            ▼              ▼              ▼
      ┌──────────┐   ┌──────────┐   ┌─────────┐
      │   PAID   │   │  FAILED  │   │ EXPIRED │
      └────┬─────┘   └──────────┘   └─────────┘
           │
     Refund Triggered
           │
           ▼
      ┌──────────┐
      │ REFUNDED │
      └──────────┘
```

---

### 2.3 Shipment State Machine (`ShipmentStatus`)

Maintained on the child `Shipment` entity attached to an Order.

```text
   ┌───────────┐
   │  PENDING  │ (Awaiting package packing and label generation)
   └─────┬─────┘
         │ Label printed & package boxed
         ▼
   ┌───────────┐
   │  PACKED   │ (Ready for courier pickup / drop-off)
   └─────┬─────┘
         │ Scanned at courier drop-off point
         ▼
   ┌───────────┐
   │  SHIPPED  │ (Tracking number active)
   └─────┬─────┘
         │ In transit through courier hubs
         ▼
   ┌────────────┐
   │ IN_TRANSIT │
   └─────┬──────┘
         │
    ┌────┴────────────────┐
    │                     │
Courier Confirms     Delivery Exception / Return
    │                     │
    ▼                     ▼
┌───────────┐       ┌───────────┐
│ DELIVERED │       │  FAILED   │
└───────────┘       └───────────┘
```

---

## 3. Customer & Discount Sub-Models

### 3.1 Customer Types
- **Guest Customer**: Identified by email & phone during checkout; orders linked via customer email without credentialed account.
- **Registered Customer**: Persistent profile with encrypted credentials, address book, and aggregated order history.

### 3.2 Discount Engine Rules
- **`None`**: Default standard checkout pricing.
- **`Coupon`**: Explicit discount code applied by user; validated against constraints (minimum spend, specific categories, expiration date, max usage limit).
- **`Automatic Discount`**: Evaluated dynamically by the cart orchestrator when cart conditions are met (e.g. "Buy 2 get 10% off", free shipping over Rp 200.000).
