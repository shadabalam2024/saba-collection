# Saba Collection

Saba Collection is a modern clothing storefront with a customer shopping experience and an admin dashboard. The frontend is built with React, Vite, and TailwindCSS, and it is designed to work with the backend and Supabase schema described in the project brief.

## Overview

This frontend includes:

- Customer-facing homepage, shop, product detail, cart, and checkout flows
- Admin login and dashboard for order and product management
- WhatsApp order generation flow for customer checkout
- Local cart persistence via browser storage
- Clean project structure following a scalable frontend architecture

## Tech Stack

- React 19
- Vite
- React Router DOM
- TailwindCSS
- Lucide React

## Project Structure

```bash
src/
├── components/
│   ├── Admin/
│   │   ├── AdminLogin.jsx
│   │   ├── OrdersList.jsx
│   │   └── ProductManager.jsx
│   ├── Cart/
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── ...
│   ├── Checkout/
│   │   └── CheckoutForm.jsx
│   ├── Layout/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── ...
│   └── Product/
│       ├── ProductCard.jsx
│       ├── ProductDetails.jsx
│       └── ProductGrid.jsx
├── data/
│   └── products.js
├── hooks/
│   └── useLocalStorage.js
├── lib/
│   └── utils.js
├── pages/
│   ├── AdminPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── HomePage.jsx
│   ├── ProductPage.jsx
│   └── ShopPage.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Key Features

- Responsive storefront for men, women, kids, and accessories
- Product filtering by category and price range
- Detailed product pages with size/color selection and quantity controls
- Cart with quantity updates and subtotal calculation
- Checkout form that prepares a WhatsApp order message
- Admin login screen and dashboard with revenue/order/product overview
- Product and order management controls for admin UI

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

## Environment Notes

This frontend is structured to connect to a backend API later. For now, it uses local demo data and localStorage for cart persistence. To connect to real data, add environment variables such as:

```bash
VITE_API_URL=http://localhost:5000/api
```

## Admin Demo Access

The admin UI uses a mock login flow for frontend demonstration.

- Email: admin@sabacollection.ae
- Password: admin123

## WhatsApp Flow

Checkout triggers a WhatsApp message with product details, size, color, quantity, and customer information. This is prepared in the utility file and can later be connected to your production WhatsApp business number.

## Future Backend Integration

This frontend is prepared for the Node.js + Express + Supabase backend described in the project brief. The intended integration points include:

- Product listing and detail fetches from `/api/products`
- Order creation from checkout flow
- Admin auth with `/api/auth/login`
- Admin product management and order status updates

## Deployment

This project can be deployed to Vercel as a static frontend. The build command is:

```bash
npm run build
```

## Notes

- No payment gateway is included, matching the brief.
- Orders are routed through WhatsApp to confirm and process sales.
- Product data and admin actions in this frontend are mock/demo content, ready to be replaced with Supabase-backed APIs.
