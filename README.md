# Unishop Nepal — React Interview Task

A small React/Vite implementation of the Unishop Nepal product listing interview task.

## Features

- Product fetching from `public/products.json`
- Functional React components and hooks
- Debounced client-side product search
- Category filtering
- Product cards with image, vendor, price and stock status
- Add-to-cart functionality
- Quantity adjustment and item removal
- Running subtotal
- Cart item count badge
- Multi-vendor shipping notice
- Loading, error and empty states
- Responsive layout for mobile widths
- Cart persisted with `localStorage`

## Setup

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

To create a production build:

```bash
npm run build
```

## Component structure

- `src/App.jsx` — page-level state, data fetching and filtering
- `src/components/Header.jsx` — brand and cart badge
- `src/components/ProductCard.jsx` — individual product presentation
- `src/components/CartDrawer.jsx` — cart UI and quantity controls
- `src/styles.css` — responsive styling
- `public/products.json` — mock product API

## State-management decision

The task does not require Redux/Zustand, so state is kept in `App.jsx` and passed to child components through props. This keeps the implementation simple for a single-page prototype while still demonstrating state lifting and React hooks.

The cart is also persisted to `localStorage` as an optional stretch goal.

## Assumptions / tradeoffs

- Checkout is intentionally disabled because real payment integration is out of scope.
- Product images use placeholder URLs because the supplied task only requires an image field.
- Cart quantity cannot exceed the product's available stock.
- The mock JSON file acts as the API source.
