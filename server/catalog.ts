// Server-side product catalog
// Prices are in cents (USD)
// 
// IMPORTANT: Image URLs must be publicly accessible HTTPS URLs
// - Images are referenced from the frontend's assets folder
// - In production: Ensure these assets are served via your CDN or static hosting
// - Stripe Checkout requires images to be at least 500x500px for best display
// - Base URL should match your frontend deployment URL (CLIENT_URL env var)

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Helper function to construct asset URLs
// Note: Vite processes assets and gives them hashed names
// For production, you may need to adjust this or use a CDN
// These URLs should match where Vite serves the processed assets
const getAssetUrl = (filename: string): string => {
  // In production, Vite serves assets from /assets/ with hashed names
  // For now, using a path that should work if assets are in public folder
  // TODO: Update this to match your actual asset serving setup
  return `${CLIENT_URL}/assets/${filename}`;
};

export type Product = {
  id: string;
  name: string;
  priceCents: number;
  imageUrl?: string; // Optional image URL for Stripe Checkout (must be HTTPS)
};

export const catalog: Product[] = [
  // Whisky
  {
    id: '1',
    name: 'Macallan 18 Year Old Sherry Oak',
    priceCents: 420000, // $4,200.00
    imageUrl: getAssetUrl('Macallan 18 Year Old Sherry Oak.jpg'),
  },
  {
    id: '2',
    name: 'Bowmore 25 Year Old',
    priceCents: 580000, // $5,800.00
    imageUrl: getAssetUrl('Bowmore 25 Year Old.jpg'),
  },
  {
    id: '3',
    name: 'Glenfiddich 21 Year Old Gran Reserva',
    priceCents: 320000, // $3,200.00
    imageUrl: getAssetUrl('Glenfiddich 21 Year Old Gran Reserva.jpg'),
  },
  // Cognac
  {
    id: '4',
    name: 'Rémy Martin XO Excellence',
    priceCents: 280000, // $2,800.00
    imageUrl: getAssetUrl('Remy Martin XO Excellence.jpg'),
  },
  {
    id: '5',
    name: 'Hennessy Paradis',
    priceCents: 380000, // $3,800.00
    imageUrl: getAssetUrl('Hennessy Paradis.jpg'),
  },
  {
    id: '6',
    name: 'Martell Cordon Bleu',
    priceCents: 220000, // $2,200.00
    imageUrl: getAssetUrl('Martell Cordon Bleu.jpg'),
  },
  // Champagne
  {
    id: '7',
    name: 'Dom Pérignon Vintage 2012',
    priceCents: 320000, // $3,200.00
    imageUrl: getAssetUrl('Dom Pérignon Vintage 2012.jpg'),
  },
  {
    id: '8',
    name: 'Krug Grande Cuvée',
    priceCents: 420000, // $4,200.00
    imageUrl: getAssetUrl('Krug Grande Cuvée.jpg'),
  },
  {
    id: '9',
    name: 'Cristal 2015',
    priceCents: 580000, // $5,800.00
    imageUrl: getAssetUrl('Cristal 2015.jpg'),
  },
  // Rare Spirits
  {
    id: '10',
    name: 'Pappy Van Winkle\'s Family Reserve 23 Year',
    priceCents: 850000, // $8,500.00
    imageUrl: getAssetUrl("Pappy Van Winkle's Family Reserve 23 Year.jpg"),
  },
  {
    id: '11',
    name: 'Yamazaki 18 Year Old',
    priceCents: 720000, // $7,200.00
    imageUrl: getAssetUrl('Yamazaki 18 Year Old.jpg'),
  },
  {
    id: '12',
    name: 'Macallan 25 Year Old Sherry Oak',
    priceCents: 980000, // $9,800.00
    imageUrl: getAssetUrl('Macallan 25 Year Old Sherry Oak.jpg'),
  },
  // Additional Whisky
  {
    id: '13',
    name: 'Lagavulin 16 Year Old',
    priceCents: 180000, // $1,800.00
    imageUrl: getAssetUrl('Lagavulin 16 Year Old.jpg'),
  },
  {
    id: '14',
    name: 'Dalmore 15 Year Old',
    priceCents: 240000, // $2,400.00
    imageUrl: getAssetUrl('Dalmore 15 Year Old.jpg'),
  },
  {
    id: '15',
    name: 'Ardbeg Uigeadail',
    priceCents: 120000, // $1,200.00
    imageUrl: getAssetUrl('Ardbeg Uigeadail.jpg'),
  },
  {
    id: '16',
    name: 'Glenlivet 18 Year Old',
    priceCents: 280000, // $2,800.00
    imageUrl: getAssetUrl('Glenlivet 18 Year Old.jpg'),
  },
  // Additional Cognac
  {
    id: '17',
    name: 'Courvoisier XO',
    priceCents: 260000, // $2,600.00
    imageUrl: getAssetUrl('Courvoisier XO.jpg'),
  },
  {
    id: '18',
    name: 'Hine Triomphe',
    priceCents: 450000, // $4,500.00
    imageUrl: getAssetUrl('Hine Triomph.jpeg'),
  },
  {
    id: '19',
    name: 'Frapin VSOP',
    priceCents: 190000, // $1,900.00
    imageUrl: getAssetUrl('Frapin VSOP.jpg'),
  },
  // Additional Champagne
  {
    id: '20',
    name: 'Veuve Clicquot La Grande Dame',
    priceCents: 480000, // $4,800.00
    imageUrl: getAssetUrl('Veuve Clicquot La Grande Dame.jpg'),
  },
  {
    id: '21',
    name: 'Bollinger La Grande Année',
    priceCents: 380000, // $3,800.00
    imageUrl: getAssetUrl('Bollinger La Grande Année.jpg'),
  },
  {
    id: '22',
    name: 'Salon Le Mesnil',
    priceCents: 680000, // $6,800.00
    imageUrl: getAssetUrl('Salon Le Mesnil.jpg'),
  },
  {
    id: '23',
    name: 'Taittinger Comtes de Champagne',
    priceCents: 520000, // $5,200.00
    imageUrl: getAssetUrl('Taittinger Comtes de Champagne.jpg'),
  },
  // Additional Rare Spirits
  {
    id: '24',
    name: 'Hibiki 21 Year Old',
    priceCents: 650000, // $6,500.00
    imageUrl: getAssetUrl('Hibiki 21 Year Old.jpg'),
  },
  {
    id: '25',
    name: 'George T. Stagg',
    priceCents: 420000, // $4,200.00
    imageUrl: getAssetUrl('George T. Stagg.jpg'),
  },
  {
    id: '26',
    name: 'Kavalan Solist Vinho Barrique',
    priceCents: 380000, // $3,800.00
    imageUrl: getAssetUrl('Kavalan Solist Vinho Barrique.jpg'),
  },
  {
    id: '27',
    name: 'Port Ellen 35 Year Old',
    priceCents: 1250000, // $12,500.00
    imageUrl: getAssetUrl('Port Ellen 35 Year Old.jpg'),
  },
];

export function getProductById(id: string): Product | undefined {
  return catalog.find((p) => p.id === id);
}

