# Stripe Checkout Setup Guide

This guide explains how to set up and run the Stripe Checkout integration locally.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Stripe account (get one at https://stripe.com)
- Stripe CLI (for local webhook testing)

## Installation

### 1. Install Dependencies

All dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Install Stripe CLI (for webhook testing)

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows (using Scoop)
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Or download from: https://github.com/stripe/stripe-cli/releases
```

## Environment Variables

### Backend (Server)

Create a `.env` file in the root directory:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Client URL (React app)
CLIENT_URL=http://localhost:5173

# Server Port
PORT=4000
```

**How to get Stripe keys:**

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret key** (starts with `sk_test_`)
3. For webhook secret, see "Local Webhook Testing" section below

### Frontend (React)

Create a `.env` file in the root directory (or add to existing):

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:4000
```

**Note:** Vite requires the `VITE_` prefix for environment variables.

## Product Catalog

The server-side product catalog is defined in `server/catalog.ts` with 12 products:

**Whisky:**
- Product ID: `1` - Macallan 18 Year Old Sherry Oak ($4,200.00)
- Product ID: `2` - Bowmore 25 Year Old ($5,800.00)
- Product ID: `3` - Glenfiddich 21 Year Old Gran Reserva ($3,200.00)

**Cognac:**
- Product ID: `4` - Rémy Martin XO Excellence ($2,800.00)
- Product ID: `5` - Hennessy Paradis ($3,800.00)
- Product ID: `6` - Martell Cordon Bleu ($2,200.00)

**Champagne:**
- Product ID: `7` - Dom Pérignon Vintage 2012 ($3,200.00)
- Product ID: `8` - Krug Grande Cuvée ($4,200.00)
- Product ID: `9` - Cristal 2015 ($5,800.00)

**Rare Spirits:**
- Product ID: `10` - Pappy Van Winkle's Family Reserve 23 Year ($8,500.00)
- Product ID: `11` - Yamazaki 18 Year Old ($7,200.00)
- Product ID: `12` - Macallan 25 Year Old Sherry Oak ($9,800.00)

**Important:** 
- Only products with IDs `1-12` will be accepted by the checkout endpoint
- Prices are resolved server-side and cannot be modified by the client
- Product images are included for Stripe Checkout display
- To use your own product images, update the `imageUrl` field in `server/catalog.ts` with publicly accessible HTTPS URLs

## Running Locally

### Option 1: Run Both Servers Together (Recommended)

```bash
npm run dev:all
```

This starts:
- Frontend (React) on http://localhost:5173
- Backend (Express) on http://localhost:4000

### Option 2: Run Servers Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

## Local Webhook Testing

To test webhooks locally, use the Stripe CLI:

1. **Login to Stripe CLI:**
   ```bash
   stripe login
   ```

2. **Forward webhooks to your local server:**
   ```bash
   stripe listen --forward-to localhost:4000/api/webhook
   ```

3. **Copy the webhook signing secret:**
   The CLI will output something like:
   ```
   > Ready! Your webhook signing secret is whsec_xxxxx
   ```
   
   Add this to your `.env` file as `STRIPE_WEBHOOK_SECRET`.

4. **Trigger test events:**
   ```bash
   stripe trigger checkout.session.completed
   ```

## Testing the Flow

1. **Start both servers:**
   ```bash
   npm run dev:all
   ```

2. **Start webhook listener (separate terminal):**
   ```bash
   stripe listen --forward-to localhost:4000/api/webhook
   ```

3. **Add products to cart:**
   - Navigate to http://localhost:5173
   - Add products with IDs `1`, `2`, or `3` to your cart
   - Go to cart page

4. **Test checkout:**
   - Click "Proceed to Checkout"
   - You'll be redirected to Stripe Checkout
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date, any CVC, any ZIP

5. **Complete payment:**
   - After payment, you'll be redirected to `/success?session_id=...`
   - Check your backend console for webhook logs

## API Endpoints

### POST `/api/checkout`

Creates a Stripe Checkout session.

**Request:**
```json
{
  "items": [
    { "id": "1", "qty": 2 },
    { "id": "2", "qty": 1 }
  ]
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### POST `/api/webhook`

Stripe webhook endpoint. Verifies signature and handles `checkout.session.completed` events.

**Note:** This endpoint uses raw body parsing (not JSON) to verify Stripe signatures.

## Security Features

✅ **Server-side price validation** - Prices are never accepted from the client  
✅ **Webhook signature verification** - All webhooks are verified using raw body  
✅ **No secret keys in frontend** - Stripe secret keys only exist on the server  
✅ **Product ID validation** - Only products from the server catalog are accepted  

## Troubleshooting

### CORS Errors

Make sure `CLIENT_URL` in your `.env` matches your frontend URL (default: `http://localhost:5173`).

### Webhook Signature Verification Failed

- Ensure `STRIPE_WEBHOOK_SECRET` matches the secret from `stripe listen`
- Make sure the webhook endpoint uses raw body (already configured)

### Product Not Found

Only products with IDs `1`, `2`, or `3` are valid. Check `server/catalog.ts` for available products.

### Checkout URL Not Working

- Verify `STRIPE_SECRET_KEY` is set correctly
- Check that `CLIENT_URL` matches your frontend URL
- Ensure the Stripe account is in test mode

## Production Deployment

For production:

1. Use live Stripe keys (`sk_live_...`)
2. Set up a production webhook endpoint in Stripe Dashboard
3. Update `CLIENT_URL` to your production domain
4. Update `VITE_API_BASE_URL` to your production API URL
5. Enable HTTPS (required for Stripe Checkout)

## File Structure

```
├── server/
│   ├── index.ts          # Express server with API routes
│   ├── catalog.ts        # Product catalog (server-only)
│   └── tsconfig.json     # TypeScript config for server
├── src/
│   ├── lib/
│   │   └── api.ts       # Frontend API client
│   └── pages/
│       ├── Cart.tsx     # Cart page with checkout button
│       └── Success.tsx  # Success page after payment
└── .env                  # Environment variables (create this)
```

