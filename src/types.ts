export type ProductCategory = 'all' | 'newcomers' | 'starter-sets' | 'sample-boxes' | 'energy' | 'hydration' | 'milkshake' | 'iced-tea' | 'syrup' | 'bundles' | 'accessories';

export interface NutritionFacts {
  sugar: string;
  calories: string;
  caffeine: string;
  taurine: string;
  vitamins: string[];
  electrolytes?: string[];
  vegan: boolean;
  glutenFree: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'starter-sets' | 'sample-boxes' | 'energy' | 'hydration' | 'milkshake' | 'iced-tea' | 'syrup' | 'bundles' | 'accessories';
  flavorName: string;
  tagline: string;
  flavorNotes: string[];
  description: string;
  price: number;
  originalPrice?: number;
  servings: number;
  pricePerServing: number;
  rating: number;
  reviewCount: number;
  badge?: 'BESTSELLER' | 'NEW' | 'LIMITED DROP' | 'FAN FAVORITE' | 'SAVE 26%' | 'SAVE 30%' | 'FREE SHAKER' | 'HOT DROP' | string;
  cardBg: string; // Background color for the product card
  badgeColor: {
    bg: string;
    text: string;
    border: string;
  };
  accentColor: {
    primary: string;
    secondary: string;
    glow: string;
  };
  image: string;
  fallbackImage?: string;
  nutrition: NutritionFacts;
  ingredients: string[];
  howToUse: string;
  includedItems?: string[];
  isStarterSet?: boolean;
  isSyrup?: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedShakerColor?: string;
  selectedBundleTubs?: Product[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  flavorBought: string;
  badge?: string;
}
