import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { catalog, getProductById } from './catalog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

// CORS configuration
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// IMPORTANT: Webhook endpoint must use raw body, NOT express.json()
// Apply express.json() middleware AFTER the webhook route
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// JSON parsing for all other routes
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Checkout endpoint
app.post('/api/checkout', async (req, res) => {
  try {
    const { items } = req.body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required and must not be empty' });
    }

    // Build line items from server-side catalog (DO NOT trust client prices)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      if (!item.id || typeof item.id !== 'string') {
        return res.status(400).json({ error: 'Each item must have a valid id' });
      }

      if (!item.qty || typeof item.qty !== 'number' || item.qty <= 0) {
        return res.status(400).json({ error: `Invalid quantity for item ${item.id}` });
      }

      // Look up product in server-side catalog
      const product = getProductById(item.id);

      if (!product) {
        return res.status(400).json({ error: `Product with id ${item.id} not found` });
      }

      // Create line item with server-side price and image
      const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData = {
        name: product.name,
      };

      // Add image if available (Stripe requires HTTPS URLs in production)
      if (product.imageUrl) {
        productData.images = [product.imageUrl];
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: product.priceCents, // Price in cents from server
        },
        quantity: item.qty,
      });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Webhook endpoint - MUST use raw body
app.post('/api/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).send('Missing stripe-signature header');
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return res.status(500).send('Webhook secret not configured');
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature using raw body
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Mark order as paid
    // Store session_id and payment_intent_id
    // In production, you would save this to a database
    console.log('Payment successful:', {
      sessionId: session.id,
      paymentIntentId: session.payment_intent,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
      currency: session.currency,
    });

    // TODO: Save to database
    // - Mark order as paid
    // - Store session.id
    // - Store session.payment_intent (if present)
    // - Send confirmation email
    // - Update inventory
  }

  // Return 200 to acknowledge receipt
  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for: ${CLIENT_URL}`);
});

