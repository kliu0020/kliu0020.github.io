// API client for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export type CheckoutItem = {
  id: string;
  qty: number;
};

export type CheckoutResponse = {
  url: string;
};

/**
 * Create a Stripe Checkout session
 * @param items Array of items with id and qty (no prices - resolved server-side)
 * @returns Checkout session URL
 */
export async function createCheckoutSession(
  items: CheckoutItem[]
): Promise<CheckoutResponse> {
  const response = await fetch(`${API_BASE_URL}/api/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Failed to create checkout session',
    }));
    throw new Error(error.error || 'Failed to create checkout session');
  }

  return response.json();
}

