# Food Ordering Frontend (Next.js)

A Foodpanda/restaurant-style ordering frontend built with Next.js (App Router)
and Tailwind CSS, made to connect to your existing Express + MongoDB backend.

## 1. Install dependencies

```bash
npm install
```

## 2. Set your backend URL

Copy the example env file and edit it:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

Set `NEXT_PUBLIC_API_URL` to wherever your Express backend runs.

## 3. Enable CORS on the backend

In your Express project:

```bash
npm install cors
```

```js
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
```

## 4. Run the frontend

```bash
npm run dev
```

Visit http://localhost:3000

## Project structure

```
src/
  app/
    page.js                 -> Home page (hero + menu)
    login/page.js
    register/page.js
    cart/page.js
    checkout/page.js
    checkout/success/page.js -> Stripe redirects here after payment
    orders/page.js
    layout.js
    globals.css
  components/
    Navbar.jsx
    Footer.jsx
    MenuItem.jsx
    CartLineItem.jsx
  context/
    AuthContext.jsx          -> login/register/logout, stores token in a cookie
    CartContext.jsx          -> cart state, saved to localStorage
  lib/
    api.js                   -> all backend API calls in one place
```

## IMPORTANT: match this to your real backend routes

This was built based on the routes described for your project (auth, products,
cart, orders/checkout with Stripe). Open `src/lib/api.js` and double check
each endpoint path matches your actual Express routes exactly:

- `POST /auth/login`, `POST /auth/register`
- `GET /products` (menu items), `GET /products/:id`
- `POST /cart/add`, `GET /cart`, `DELETE /cart/remove/:productId`
- `POST /orders/checkout` -> should return `{ url: "<stripe checkout url>" }`
- `GET /orders/verify-payment?session_id=...`
- `GET /orders`

Also check the exact field names returned by your login/register endpoints
in `src/context/AuthContext.jsx` (currently expects `{ token, user }`).

## Styling

Colors and fonts are defined in `tailwind.config.js` and `src/app/layout.js`.
The restaurant name "Tandoor House" in `Navbar.jsx` and `layout.js` is a
placeholder — replace it with your actual restaurant name.
