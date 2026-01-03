// Import product images from assets
import macallan18Image from '@/assets/Macallan 18 Year Old Sherry Oak.jpg';
import lagavulin16Image from '@/assets/Lagavulin 16 Year Old.jpg';
import dalmore15Image from '@/assets/Dalmore 15 Year Old.jpg';
import ardbegImage from '@/assets/Ardbeg Uigeadail.jpg';
import glenlivet18Image from '@/assets/Glenlivet 18 Year Old.jpg';
import veuveClicquotImage from '@/assets/Veuve Clicquot La Grande Dame.jpg';
import bollingerImage from '@/assets/Bollinger La Grande Année.jpg';
import salonImage from '@/assets/Salon Le Mesnil.jpg';
import taittingerImage from '@/assets/Taittinger Comtes de Champagne.jpg';
import hibiki21Image from '@/assets/Hibiki 21 Year Old.jpg';
import georgeStaggImage from '@/assets/George T. Stagg.jpg';
import kavalanImage from '@/assets/Kavalan Solist Vinho Barrique.jpg';
import portEllenImage from '@/assets/Port Ellen 35 Year Old.jpg';
import bowmore25Image from '@/assets/Bowmore 25 Year Old.jpg';
import glenfiddich21Image from '@/assets/Glenfiddich 21 Year Old Gran Reserva.jpg';
import remyMartinXOExcellenceImage from '@/assets/Rémy Martin XO Excellence.jpg';
import hennessyParadisImage from '@/assets/Hennessy Paradis.jpg';
import martellCordonBleuImage from '@/assets/Martell Cordon Bleu.jpg';
import domPerignonVintage2012Image from '@/assets/Dom Pérignon Vintage 2012.jpg';
import cristal2015Image from '@/assets/Cristal 2015.jpg';
import hineTriompheImage from '@/assets/Hine Triomph.jpeg';
import frapinVSOPImage from '@/assets/Frapin VSOP.jpg';
import yamazaki18Image from '@/assets/Yamazaki 18 Year Old.jpg';
import macallan25Image from '@/assets/Macallan 25 Year Old Sherry Oak.jpg';
import pappy23Image from '@/assets/Pappy Van Winkle\'s Family Reserve 23 Year.jpg';
import krugGrandeCuveeImage from '@/assets/Krug Grande Cuvée.jpg';
import courvoisierXOImage from '@/assets/Courvoisier XO.jpg';

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: 'whisky' | 'cognac' | 'champagne' | 'rare-spirits';
  price: number;
  image: string;
  description: string;
  provenance: string;
  tastingNotes: string[];
  region?: string;
  age?: string;
  abv: string;
  inStock: boolean;
};

export const categories = [
  {
    slug: 'whisky',
    name: 'Whisky',
    description: 'Single malts and rare blends from Scotland\'s finest distilleries.',
  },
  {
    slug: 'cognac',
    name: 'Cognac',
    description: 'XO and vintage expressions from the heart of Cognac, France.',
  },
  {
    slug: 'champagne',
    name: 'Champagne',
    description: 'Prestige cuvées from the most distinguished houses.',
  },
  {
    slug: 'rare-spirits',
    name: 'Rare & Allocated',
    description: 'Limited editions and collector\'s selections.',
  },
] as const;

export const products: Product[] = [
  {
    id: '1',
    name: 'Macallan 18 Year Old Sherry Oak',
    slug: 'macallan-18-year-old-sherry-oak',
    category: 'whisky',
    price: 4200,
    image: macallan18Image,
    description: 'A distinguished single malt matured exclusively in European oak sherry-seasoned casks.',
    provenance: 'From the Macallan Estate in Speyside, this expression reflects over two centuries of whisky-making tradition. Each cask is personally selected by the Master Whisky Maker.',
    tastingNotes: ['Raisin', 'Vanilla', 'Orange peel', 'Chocolate', 'Oak spice'],
    region: 'Speyside, Scotland',
    age: '18 Years',
    abv: '43%',
    inStock: true,
  },
  {
    id: '2',
    name: 'Bowmore 25 Year Old',
    slug: 'bowmore-25-year-old',
    category: 'whisky',
    price: 5800,
    image: bowmore25Image,
    description: 'An exceptionally rare Islay single malt with profound complexity.',
    provenance: 'Aged in the island\'s coastal warehouses, this whisky captures the essence of Islay\'s maritime character.',
    tastingNotes: ['Sea salt', 'Toffee', 'Peat smoke', 'Citrus', 'Dark chocolate'],
    region: 'Islay, Scotland',
    age: '25 Years',
    abv: '43%',
    inStock: true,
  },
  {
    id: '3',
    name: 'Glenfiddich 21 Year Old Gran Reserva',
    slug: 'glenfiddich-21-year-old-gran-reserva',
    category: 'whisky',
    price: 3200,
    image: glenfiddich21Image,
    description: 'Finished in Caribbean rum casks for a unique tropical character.',
    provenance: 'A final maturation in rum casks from the Caribbean imparts distinctive warmth and spice.',
    tastingNotes: ['Tropical fruit', 'Vanilla', 'Brown sugar', 'Oak', 'Spice'],
    region: 'Speyside, Scotland',
    age: '21 Years',
    abv: '40%',
    inStock: true,
  },
  {
    id: '4',
    name: 'Rémy Martin XO Excellence',
    slug: 'remy-martin-xo-excellence',
    category: 'cognac',
    price: 2800,
    image: remyMartinXOExcellenceImage,
    description: 'A blend of eaux-de-vie from the finest terroirs of Grande and Petite Champagne.',
    provenance: 'Crafted exclusively from grapes grown in Grande and Petite Champagne, the two premier crus of Cognac.',
    tastingNotes: ['Apricot', 'Honey', 'Vanilla', 'Cinnamon', 'Oak'],
    region: 'Cognac, France',
    age: 'XO',
    abv: '40%',
    inStock: true,
  },
  {
    id: '5',
    name: 'Hennessy Paradis',
    slug: 'hennessy-paradis',
    category: 'cognac',
    price: 3800,
    image: hennessyParadisImage,
    description: 'An elegant blend of eaux-de-vie aged up to 130 years.',
    provenance: 'Selected from the Maison\'s most treasured reserves, representing over two centuries of cognac expertise.',
    tastingNotes: ['Flowers', 'Fruit', 'Spice', 'Honey', 'Oak'],
    region: 'Cognac, France',
    age: 'Paradis',
    abv: '40%',
    inStock: true,
  },
  {
    id: '6',
    name: 'Martell Cordon Bleu',
    slug: 'martell-cordon-bleu',
    category: 'cognac',
    price: 2200,
    image: martellCordonBleuImage,
    description: 'A classic cognac with remarkable balance and depth.',
    provenance: 'Created in 1912, this timeless expression showcases the Martell signature style of elegance.',
    tastingNotes: ['Fruit', 'Hazelnut', 'Spice', 'Oak', 'Vanilla'],
    region: 'Cognac, France',
    age: 'Cordon Bleu',
    abv: '40%',
    inStock: true,
  },
  {
    id: '7',
    name: 'Dom Pérignon Vintage 2012',
    slug: 'dom-perignon-vintage-2012',
    category: 'champagne',
    price: 3200,
    image: domPerignonVintage2012Image,
    description: 'A vintage champagne of exceptional harmony and precision.',
    provenance: 'From the house of Moët & Chandon, each vintage is only released when it reaches perfect maturity.',
    tastingNotes: ['White flowers', 'Citrus', 'Mineral', 'Toast', 'Almond'],
    region: 'Champagne, France',
    age: 'Vintage 2012',
    abv: '12.5%',
    inStock: true,
  },
  {
    id: '8',
    name: 'Krug Grande Cuvée',
    slug: 'krug-grande-cuvee',
    category: 'champagne',
    price: 4200,
    image: krugGrandeCuveeImage,
    description: 'A complex multi-vintage blend of exceptional depth.',
    provenance: 'Composed of over 120 wines from up to 12 different years, aged for seven years in Krug\'s cellars.',
    tastingNotes: ['Honey', 'Dried fruit', 'Marmalade', 'Brioche', 'Spice'],
    region: 'Champagne, France',
    age: 'Multi-vintage',
    abv: '12.5%',
    inStock: true,
  },
  {
    id: '9',
    name: 'Cristal 2015',
    slug: 'cristal-2015',
    category: 'champagne',
    price: 5800,
    image: cristal2015Image,
    description: 'The prestige cuvée from Louis Roederer, created for Tsar Alexander II.',
    provenance: 'First created in 1876 exclusively for Russian royalty, Cristal remains the ultimate expression of luxury.',
    tastingNotes: ['Pear', 'Lime', 'White pepper', 'Mineral', 'Toast'],
    region: 'Champagne, France',
    age: 'Vintage 2015',
    abv: '12.5%',
    inStock: true,
  },
  {
    id: '10',
    name: 'Pappy Van Winkle\'s Family Reserve 23 Year',
    slug: 'pappy-van-winkle-family-reserve-23-year',
    category: 'rare-spirits',
    price: 8500,
    image: pappy23Image,
    description: 'An extraordinarily rare bourbon, aged for 23 years in charred white oak.',
    provenance: 'From the legendary Van Winkle distillery, this is one of the world\'s most sought-after bourbons.',
    tastingNotes: ['Caramel', 'Vanilla', 'Oak', 'Spice', 'Tobacco'],
    region: 'Kentucky, USA',
    age: '23 Years',
    abv: '47.8%',
    inStock: true,
  },
  {
    id: '11',
    name: 'Yamazaki 18 Year Old',
    slug: 'yamazaki-18-year-old',
    category: 'rare-spirits',
    price: 7200,
    image: yamazaki18Image,
    description: 'Japan\'s most celebrated single malt whisky.',
    provenance: 'From Suntory\'s first distillery, founded in 1923, representing the pinnacle of Japanese whisky craftsmanship.',
    tastingNotes: ['Raisin', 'Apricot', 'Cinnamon', 'Mizunara oak', 'Long finish'],
    region: 'Yamazaki, Japan',
    age: '18 Years',
    abv: '43%',
    inStock: true,
  },
  {
    id: '12',
    name: 'Macallan 25 Year Old Sherry Oak',
    slug: 'macallan-25-year-old-sherry-oak',
    category: 'rare-spirits',
    price: 9800,
    image: macallan25Image,
    description: 'An exceptional quarter-century-aged single malt of profound richness.',
    provenance: 'Matured exclusively in European oak sherry-seasoned casks, representing the highest expression of Macallan\'s sherry oak maturation.',
    tastingNotes: ['Dark fruits', 'Orange marmalade', 'Vanilla', 'Oak spice', 'Cocoa'],
    region: 'Speyside, Scotland',
    age: '25 Years',
    abv: '43%',
    inStock: true,
  },
  // Additional Whisky
  {
    id: '13',
    name: 'Lagavulin 16 Year Old',
    slug: 'lagavulin-16-year-old',
    category: 'whisky',
    price: 1800,
    image: lagavulin16Image,
    description: 'A classic Islay single malt with intense peat smoke and maritime character.',
    provenance: 'Distilled on the shores of Islay, this whisky is known for its bold, smoky profile and long finish.',
    tastingNotes: ['Peat smoke', 'Seaweed', 'Iodine', 'Vanilla', 'Oak'],
    region: 'Islay, Scotland',
    age: '16 Years',
    abv: '43%',
    inStock: true,
  },
  {
    id: '14',
    name: 'Dalmore 15 Year Old',
    slug: 'dalmore-15-year-old',
    category: 'whisky',
    price: 2400,
    image: dalmore15Image,
    description: 'A rich Highland single malt with notes of orange, chocolate, and spice.',
    provenance: 'From the Highlands of Scotland, matured in American white oak and finished in Matusalem, Apostoles, and Amoroso sherry casks.',
    tastingNotes: ['Orange', 'Chocolate', 'Spice', 'Vanilla', 'Honey'],
    region: 'Highlands, Scotland',
    age: '15 Years',
    abv: '40%',
    inStock: true,
  },
  {
    id: '15',
    name: 'Ardbeg Uigeadail',
    slug: 'ardbeg-uigeadail',
    category: 'whisky',
    price: 1200,
    image: ardbegImage,
    description: 'A non-age-statement Islay single malt with intense peat and sherry influence.',
    provenance: 'Named after the loch that supplies water to Ardbeg distillery, this expression combines peat smoke with rich sherry casks.',
    tastingNotes: ['Peat', 'Sherry', 'Dark chocolate', 'Raisin', 'Smoke'],
    region: 'Islay, Scotland',
    age: 'Non-age-statement',
    abv: '54.2%',
    inStock: true,
  },
  {
    id: '16',
    name: 'Glenlivet 18 Year Old',
    slug: 'glenlivet-18-year-old',
    category: 'whisky',
    price: 2800,
    image: glenlivet18Image,
    description: 'A sophisticated Speyside single malt with elegant fruit and oak notes.',
    provenance: 'From the oldest licensed distillery in Scotland, matured in a combination of first and second fill American oak casks.',
    tastingNotes: ['Apple', 'Pear', 'Vanilla', 'Oak', 'Honey'],
    region: 'Speyside, Scotland',
    age: '18 Years',
    abv: '43%',
    inStock: true,
  },
  // Additional Cognac
  {
    id: '17',
    name: 'Courvoisier XO',
    slug: 'courvoisier-xo',
    category: 'cognac',
    price: 2600,
    image: courvoisierXOImage,
    description: 'A refined XO cognac with notes of dried fruit, vanilla, and oak.',
    provenance: 'A blend of eaux-de-vie from Grande Champagne and Petite Champagne, aged for at least 20 years.',
    tastingNotes: ['Dried fruit', 'Vanilla', 'Oak', 'Spice', 'Honey'],
    region: 'Cognac, France',
    age: 'XO',
    abv: '40%',
    inStock: true,
  },
  {
    id: '18',
    name: 'Hine Triomphe',
    slug: 'hine-triomphe',
    category: 'cognac',
    price: 4500,
    image: hineTriompheImage,
    description: 'An exceptional cognac from one of the oldest houses, with remarkable complexity.',
    provenance: 'Created to celebrate Hine\'s 250th anniversary, this cognac represents the pinnacle of the house\'s craftsmanship.',
    tastingNotes: ['Flowers', 'Fruit', 'Spice', 'Oak', 'Long finish'],
    region: 'Cognac, France',
    age: 'Extra',
    abv: '40%',
    inStock: true,
  },
  {
    id: '19',
    name: 'Frapin VSOP',
    slug: 'frapin-vsop',
    category: 'cognac',
    price: 1900,
    image: frapinVSOPImage,
    description: 'A classic VSOP cognac from Grande Champagne with balanced fruit and oak.',
    provenance: 'From the heart of Grande Champagne, this cognac is aged for a minimum of four years in Limousin oak casks.',
    tastingNotes: ['Fruit', 'Vanilla', 'Oak', 'Spice', 'Honey'],
    region: 'Grande Champagne, France',
    age: 'VSOP',
    abv: '40%',
    inStock: true,
  },
  // Additional Champagne
  {
    id: '20',
    name: 'Veuve Clicquot La Grande Dame',
    slug: 'veuve-clicquot-la-grande-dame',
    category: 'champagne',
    price: 4800,
    image: veuveClicquotImage,
    description: 'The prestige cuvée from Veuve Clicquot, a blend of exceptional vintages.',
    provenance: 'Created in honor of Madame Clicquot, this champagne is only produced in exceptional years.',
    tastingNotes: ['Brioche', 'Citrus', 'Mineral', 'Toast', 'Almond'],
    region: 'Champagne, France',
    age: 'Vintage',
    abv: '12.5%',
    inStock: true,
  },
  {
    id: '21',
    name: 'Bollinger La Grande Année',
    slug: 'bollinger-la-grande-annee',
    category: 'champagne',
    price: 3800,
    image: bollingerImage,
    description: 'A vintage champagne with remarkable depth and complexity.',
    provenance: 'Made only in exceptional years, this champagne is aged in the house\'s cellars for extended periods.',
    tastingNotes: ['Pear', 'Apple', 'Brioche', 'Hazelnut', 'Mineral'],
    region: 'Champagne, France',
    age: 'Vintage',
    abv: '12.5%',
    inStock: true,
  },
  {
    id: '22',
    name: 'Salon Le Mesnil',
    slug: 'salon-le-mesnil',
    category: 'champagne',
    price: 6800,
    image: salonImage,
    description: 'An ultra-prestige blanc de blancs from a single grand cru village.',
    provenance: 'From the legendary Salon house, this champagne is made exclusively from Chardonnay from Le Mesnil-sur-Oger.',
    tastingNotes: ['Citrus', 'Mineral', 'Toast', 'Almond', 'Long finish'],
    region: 'Le Mesnil-sur-Oger, France',
    age: 'Vintage',
    abv: '12.5%',
    inStock: true,
  },
  {
    id: '23',
    name: 'Taittinger Comtes de Champagne',
    slug: 'taittinger-comtes-de-champagne',
    category: 'champagne',
    price: 5200,
    image: taittingerImage,
    description: 'A prestigious blanc de blancs from one of Champagne\'s great houses.',
    provenance: 'Made exclusively from Chardonnay from grand cru vineyards, this is Taittinger\'s most prestigious cuvée.',
    tastingNotes: ['White flowers', 'Citrus', 'Mineral', 'Brioche', 'Honey'],
    region: 'Champagne, France',
    age: 'Vintage',
    abv: '12.5%',
    inStock: true,
  },
  // Additional Rare Spirits
  {
    id: '24',
    name: 'Hibiki 21 Year Old',
    slug: 'hibiki-21-year-old',
    category: 'rare-spirits',
    price: 6500,
    image: hibiki21Image,
    description: 'A harmonious blend of Japanese whiskies, representing the art of balance.',
    provenance: 'From Suntory, this blend combines malt and grain whiskies aged for 21 years, representing Japanese whisky at its finest.',
    tastingNotes: ['Rose', 'Lily', 'Mizunara', 'Honey', 'Long finish'],
    region: 'Japan',
    age: '21 Years',
    abv: '43%',
    inStock: true,
  },
  {
    id: '25',
    name: 'George T. Stagg',
    slug: 'george-t-stagg',
    category: 'rare-spirits',
    price: 4200,
    image: georgeStaggImage,
    description: 'An uncut, unfiltered bourbon from the Buffalo Trace Antique Collection.',
    provenance: 'Part of the highly allocated Buffalo Trace Antique Collection, this bourbon is bottled at barrel proof.',
    tastingNotes: ['Caramel', 'Vanilla', 'Oak', 'Spice', 'Dark fruit'],
    region: 'Kentucky, USA',
    age: '15+ Years',
    abv: 'Variable (Barrel Proof)',
    inStock: true,
  },
  {
    id: '26',
    name: 'Kavalan Solist Vinho Barrique',
    slug: 'kavalan-solist-vinho-barrique',
    category: 'rare-spirits',
    price: 3800,
    image: kavalanImage,
    description: 'A single cask Taiwanese whisky matured in wine casks.',
    provenance: 'From Taiwan\'s premier distillery, this single cask expression showcases the unique character of Taiwanese whisky.',
    tastingNotes: ['Tropical fruit', 'Vanilla', 'Wine', 'Oak', 'Spice'],
    region: 'Yilan, Taiwan',
    age: 'Single Cask',
    abv: 'Variable (Cask Strength)',
    inStock: true,
  },
  {
    id: '27',
    name: 'Port Ellen 35 Year Old',
    slug: 'port-ellen-35-year-old',
    category: 'rare-spirits',
    price: 12500,
    image: portEllenImage,
    description: 'An extremely rare Islay single malt from a closed distillery.',
    provenance: 'From the legendary Port Ellen distillery, closed in 1983, this is one of the most sought-after whiskies in the world.',
    tastingNotes: ['Peat', 'Seaweed', 'Citrus', 'Oak', 'Long finish'],
    region: 'Islay, Scotland',
    age: '35 Years',
    abv: '51.2%',
    inStock: true,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getCategoryBySlug = (slug: string) => {
  return categories.find(c => c.slug === slug);
};




