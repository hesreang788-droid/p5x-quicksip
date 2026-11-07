import { Product, Review } from '../types';
import starterSetSyrupImg from '../assets/images/starter-set-syrup.png.jpg';
import starterSetDeluxeImg from '../assets/images/starter-set-deluxe.png.jpg';
import starterSetEnergyImg from '../assets/images/starter-set-energy.png.jpg';
import starterSetIcedTeaImg from '../assets/images/starter-set-iced-tea.png.jpg';
import starterSetHydrationImg from '../assets/images/starter-set-hydration.png.jpg';
import starterSetSquadBoxImg from '../assets/images/starter-set-squad-box.png.jpg';
import starterSetMilkshakeImg from '../assets/images/starter-set-milkshake.png';
import bundleCustomTrioImg from '../assets/images/bundle-custom-trio.png';
import sampleBoxEnergyImg from '../assets/images/sample-box-energy.png';
import sampleBoxHydrationImg from '../assets/images/sample-box-hydration.png';
import sampleBoxIcedTeaImg from '../assets/images/sample-box-iced-tea.png';
import sampleBoxMilkshakeImg from '../assets/images/sample-box-milkshake.png';
import tubDonutImg from '../assets/images/tub-donut.png';
import tubBlueRaspberryImg from '../assets/images/tub-blue-raspberry.png';
import tubRaspberryRaptorImg from '../assets/images/tub-raspberry-raptor.png';
import tubStrawberryKiwiImg from '../assets/images/tub-strawberry-kiwi.png';
import tubSourCherryImg from '../assets/images/tub-sour-cherry.png';
import tubFruityFrogImg from '../assets/images/tub-fruity-frog.png';
import tubWhitePeachImg from '../assets/images/tub-white-peach.png';
import tubLemonImg from '../assets/images/tub-lemon.png';
import tubKolaKoalaImg from '../assets/images/tub-kola-koala.png';
import tubPineappleImg from '../assets/images/tub-pineapple.png';
import syrupPod3BoxImg from '../assets/images/syrup-pod-3-box.png';
import shakerThermoSimpsonsImg from '../assets/images/shaker-thermo-simpsons.png';
import shakerLogo500mlImg from '../assets/images/shaker-logo-500ml.png';

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. STARTER SETS & BUNDLES
  // ==========================================
  {
    id: 'starter-set-deluxe',
    name: 'Starter Set Deluxe',
    category: 'starter-sets',
    flavorName: '57 Drinks Multi-Category Sample Box + FREE Shaker',
    tagline: 'Energy, Hydration, Iced Tea and Milkshake — 57 Drinks + Shaker',
    flavorNotes: ['All Energy Flavours', 'All Iced Tea Flavours', 'All Hydration Flavours', 'Limited Milkshake Drops'],
    description: 'The definitive all-in-one QuickSip experience. Includes 57 sample sachets spanning Energy, Hydration, Iced Tea, and Milkshake plus the signature 500ml QuickSip Shaker.',
    price: 49.99,
    originalPrice: 69.99,
    servings: 57,
    pricePerServing: 0.87,
    rating: 5.0,
    reviewCount: 22400,
    badge: 'BESTSELLER',
    isStarterSet: true,
    cardBg: 'bg-[#ffea3b]/20',
    badgeColor: {
      bg: 'bg-[#fde047]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#eab308',
      secondary: '#ca8a04',
      glow: 'rgba(234, 179, 8, 0.4)',
    },
    image: starterSetDeluxeImg,
    nutrition: {
      sugar: '0g',
      calories: '15 kcal avg',
      caffeine: 'Various (0mg to 160mg)',
      taurine: '0g',
      vitamins: ['Vitamin C', 'B-Complex', 'Electrolytes'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: [
      'Complete variety of all QuickSip Energy, Iced Tea, Hydration, and Milkshake botanical formulations',
      'NuCaff® Caffeine, L-Theanine, Real Tea Extracts, Coconut Water Powder',
      '100% Zero Added Sugar Sweeteners'
    ],
    howToUse: 'Pick any sachet, mix with 500ml ice-cold water (or plant milk for milkshakes) in your free shaker, and enjoy!',
    includedItems: ['57x Assorted QuickSip Sachets', '1x 500ml Signature Shaker', '1x Sticker Sheet', '$10 / 41,000៛ Voucher']
  },
  {
    id: 'starter-set-iced-tea',
    name: 'Iced Tea Starter Set',
    category: 'starter-sets',
    flavorName: '7 Brewed Tea Flavours (14 Drinks)',
    tagline: '7 Flavours — 14 Drinks + Shaker',
    flavorNotes: ['Peach Panther', 'Raspberry Vanilla', 'Acai Anaconda', 'Lemon Honey', 'Mango Passion', 'Lime Matcha', 'Apple Tea'],
    description: 'Real brewed tea extracts rich in antioxidants and chicory inulin fiber. Ultra-refreshing, naturally low-calorie, and zero sugar.',
    price: 19.99,
    originalPrice: 26.99,
    servings: 14,
    pricePerServing: 1.42,
    rating: 4.8,
    reviewCount: 9800,
    badge: 'FREE SHAKER',
    isStarterSet: true,
    cardBg: 'bg-[#d8b4fe]/20',
    badgeColor: {
      bg: 'bg-[#c084fc]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#a855f7',
      secondary: '#7e22ce',
      glow: 'rgba(168, 85, 247, 0.4)',
    },
    image: starterSetIcedTeaImg,
    nutrition: {
      sugar: '0g',
      calories: '18 kcal',
      caffeine: '15mg (Natural Tea)',
      taurine: '0g',
      vitamins: ['Vitamin C (100% NRV)', 'Inulin Prebiotic Fiber'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Real Brewed Black, Green, White & Hibiscus Tea Extracts', 'Inulin Chicory Root Prebiotic Fiber', 'Vitamin C', 'Zero Sugar Sweetener Blend'],
    howToUse: 'Mix 1 sachet with 500ml cold still or sparkling water and ice in your free shaker. Shake 10s.',
    includedItems: ['14x QuickSip Iced Tea Sachets (7 Flavours x 2)', '1x 500ml BPA-Free Shaker', '1x Sticker Sheet']
  },
  {
    id: 'starter-set-hydration',
    name: 'Hydration Starter Set',
    category: 'starter-sets',
    flavorName: '7 Electrolyte Flavours (14 Drinks)',
    tagline: '7 Flavours — 14 Drinks + Shaker',
    flavorNotes: ['Blue Raspberry', 'Strawberry Kiwi', 'White Peach', 'Sour Cherry', 'Pineapple', 'Lemon', 'Watermelon'],
    description: 'Zero caffeine, zero sugar, high-performance daily hydration powered by coconut water powder, essential electrolytes, and vitamins.',
    price: 19.99,
    originalPrice: 26.99,
    servings: 14,
    pricePerServing: 1.42,
    rating: 4.9,
    reviewCount: 6500,
    badge: 'FREE SHAKER',
    isStarterSet: true,
    cardBg: 'bg-[#38bdf8]/20',
    badgeColor: {
      bg: 'bg-[#38bdf8]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#0284c7',
      secondary: '#0369a1',
      glow: 'rgba(2, 132, 199, 0.4)',
    },
    image: starterSetHydrationImg,
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg (Caffeine-Free)',
      taurine: '0g',
      vitamins: ['Vitamin B-Complex', 'Vitamin C'],
      electrolytes: ['Magnesium 150mg', 'Potassium 300mg', 'Sodium 250mg', 'Calcium 100mg'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Coconut Water Powder', 'Electrolyte Mineral Complex', 'Goji Berry Juice Extract', 'B-Vitamins', 'Natural Sweeteners'],
    howToUse: 'Mix 1 sachet into 500ml cold water in your shaker. Drink during workouts, sports, or hot days.',
    includedItems: ['14x QuickSip Hydration Sachets (7 Flavours x 2)', '1x 500ml BPA-Free Shaker', '1x Sticker Sheet']
  },
  {
    id: 'starter-set-milkshake',
    name: 'Milkshake Starter Set',
    category: 'starter-sets',
    flavorName: '5 Dessert Milkshake Flavours (15 Drinks)',
    tagline: '5 Flavours — 15 Drinks + Shaker',
    flavorNotes: ['Glazed Donut', 'Vanilla Bean', 'Strawberry Shortcake', 'Salted Caramel', 'Chocolate Fudge'],
    description: 'Creamy, indulgent dessert milkshake powders made with 0 added sugar and fortified with real oat and prebiotic fiber. Perfect with cold milk or plant-based alternatives.',
    price: 19.99,
    originalPrice: 26.99,
    servings: 15,
    pricePerServing: 1.33,
    rating: 4.9,
    reviewCount: 5120,
    badge: 'FREE SHAKER',
    isStarterSet: true,
    cardBg: 'bg-[#fce7f3]',
    badgeColor: {
      bg: 'bg-[#f472b6]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#ec4899',
      secondary: '#be185d',
      glow: 'rgba(236, 72, 153, 0.4)',
    },
    image: starterSetMilkshakeImg,
    nutrition: {
      sugar: '0g',
      calories: '22 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin D3', 'Calcium', 'Vitamin B12'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Oat Fiber Powder', 'Natural Bakery Flavor Extracts', 'Cocoa Powder', 'Stevia & Sucralose', 'Plant Prebiotics'],
    howToUse: 'Mix 1 sachet with 400-500ml cold milk, oat milk, or almond milk. Shake 15s for rich dessert froth.',
    includedItems: ['15x Milkshake Sachets (5 Flavours x 3)', '1x 500ml QuickSip Shaker', '1x Sticker Sheet']
  },
  {
    id: 'starter-set-energy',
    name: 'Energy Starter Set',
    category: 'starter-sets',
    flavorName: '7 Bestselling Energy Flavours (14 Drinks)',
    tagline: '7 Flavours — 14 Drinks + Shaker',
    flavorNotes: ['Raspberry Raptor', 'Fruity Frog', 'Kola Koala', 'Citrus Cobra', 'Apple Alligator', 'Strawberry Shark', 'Sour Peach'],
    description: 'The ultimate zero-sugar energy trial. Powered by NuCaff® slow-release natural caffeine and L-Theanine for sharp focus with zero crash.',
    price: 19.99,
    originalPrice: 26.99,
    servings: 14,
    pricePerServing: 1.42,
    rating: 4.9,
    reviewCount: 14200,
    badge: 'FREE SHAKER',
    isStarterSet: true,
    cardBg: 'bg-[#4fbbf8]/20',
    badgeColor: {
      bg: 'bg-[#ccff00]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#9ae600',
      secondary: '#65a30d',
      glow: 'rgba(154, 230, 0, 0.4)',
    },
    image: starterSetEnergyImg,
    nutrition: {
      sugar: '0g',
      calories: '15 kcal',
      caffeine: '160mg NuCaff®',
      taurine: '0g',
      vitamins: ['Vitamin C', 'Vitamin B3', 'Vitamin B5', 'Vitamin B6', 'Vitamin B12'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['NuCaff® Micro-encapsulated Natural Caffeine', 'L-Theanine from Green Tea', 'Botanical Extracts', 'Inulin Fiber', 'B-Vitamins & Vitamin C'],
    howToUse: 'Mix 1 sachet (7g) with 500ml ice-cold water in your free shaker. Shake 10s. Pure clean energy.',
    includedItems: ['14x QuickSip Energy Sachets (7 Flavours x 2)', '1x 500ml BPA-Free Shaker', '1x Sticker Sheet']
  },
  {
    id: 'bundle-custom-trio',
    name: 'Powder Mix & Match',
    category: 'bundles',
    flavorName: 'Customizable Flavour Tubs Bundle (Pick 3)',
    tagline: 'Customizable flavour tubs bundle — 150 Drinks + FREE Shaker',
    flavorNotes: ['150 Total Drinks', 'Pick Any Flavours', 'Free Shaker (Value $6.99 / 28,000៛)'],
    description: 'Build your custom 3-Tub stack across Energy, Hydration, Iced Tea, or Milkshake. Save 26% + get a FREE QuickSip Shaker and free shipping.',
    price: 94.99,
    originalPrice: 119.97,
    servings: 150,
    pricePerServing: 0.63,
    rating: 5.0,
    reviewCount: 7890,
    badge: 'SAVE 26%',
    cardBg: 'bg-[#e6fbf3]',
    badgeColor: {
      bg: 'bg-[#059669]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#10b981',
      secondary: '#047857',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    image: bundleCustomTrioImg,
    nutrition: {
      sugar: '0g across all tubs',
      calories: '<20 kcal / serving',
      caffeine: 'Customizable per tub',
      taurine: '0g',
      vitamins: ['Full B-Complex', 'Vitamin C', 'Electrolytes'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Choose any combination of our award-winning powder formulas.'],
    howToUse: 'Use the interactive bundle builder to select your 3 favourite tubs.'
  },

  // ==========================================
  // 2. SAMPLE BOXES (14–15 Drinks)
  // ==========================================
  {
    id: 'sample-box-energy',
    name: 'Energy Sample Box',
    category: 'sample-boxes',
    flavorName: '7 Bestselling Energy Flavours (14 Drinks)',
    tagline: '7 Flavours — 14 Drinks',
    flavorNotes: ['Raspberry Raptor', 'Fruity Frog', 'Kola Koala', 'Citrus Cobra', 'Apple Alligator', 'Strawberry Shark', 'Sour Peach'],
    description: 'Discover your holy grail energy flavor. 14 individual sachets powered by clean NuCaff® slow-release caffeine and L-Theanine.',
    price: 14.99,
    originalPrice: 19.99,
    servings: 14,
    pricePerServing: 1.07,
    rating: 4.9,
    reviewCount: 4320,
    badge: 'BESTSELLER',
    cardBg: 'bg-[#4fbbf8]/15',
    badgeColor: {
      bg: 'bg-[#ccff00]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#9ae600',
      secondary: '#65a30d',
      glow: 'rgba(154, 230, 0, 0.4)',
    },
    image: sampleBoxEnergyImg,
    fallbackImage: '/sample-box-energy.png',
    nutrition: {
      sugar: '0g',
      calories: '15 kcal',
      caffeine: '160mg NuCaff®',
      taurine: '0g',
      vitamins: ['Vitamin C', 'Vitamin B3, B5, B6, B12'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Microencapsulated Caffeine', 'L-Theanine', 'Natural Plant Extracts', 'Inulin Fiber', 'Vitamin Blend'],
    howToUse: 'Mix 1 sachet into 500ml cold water. Shake 10s.'
  },
  {
    id: 'sample-box-hydration',
    name: 'Hydration Sample Box',
    category: 'sample-boxes',
    flavorName: '7 Electrolyte Flavours (14 Drinks)',
    tagline: '7 Flavours — 14 Drinks',
    flavorNotes: ['Blue Raspberry', 'Strawberry Kiwi', 'White Peach', 'Sour Cherry', 'Pineapple', 'Lemon', 'Watermelon'],
    description: '14 electrolyte sachets with freeze-dried coconut water powder and mineral salts. 100% caffeine-free recovery.',
    price: 14.99,
    originalPrice: 19.99,
    servings: 14,
    pricePerServing: 1.07,
    rating: 4.9,
    reviewCount: 3120,
    badge: 'HOT DROP',
    cardBg: 'bg-[#38bdf8]/15',
    badgeColor: {
      bg: 'bg-[#38bdf8]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#0284c7',
      secondary: '#0369a1',
      glow: 'rgba(2, 132, 199, 0.4)',
    },
    image: sampleBoxHydrationImg,
    fallbackImage: '/sample-box-hydration.png',
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin C', 'B-Vitamins'],
      electrolytes: ['Magnesium', 'Potassium', 'Sodium', 'Calcium'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Coconut Water Powder', 'Electrolyte Complex', 'Fruit Extracts', 'Stevia'],
    howToUse: 'Mix 1 sachet into 500ml water for rapid workout rehydration.'
  },
  {
    id: 'sample-box-milkshake',
    name: 'Milkshake Sample Box',
    category: 'sample-boxes',
    flavorName: '5 Dessert Flavours (15 Drinks)',
    tagline: '5 Flavours — 15 Drinks',
    flavorNotes: ['Glazed Donut', 'Vanilla Bean', 'Strawberry Shortcake', 'Salted Caramel', 'Chocolate Fudge'],
    description: '15 dessert milkshake sachets with zero added sugar. Mixes smoothly with cold milk or plant-based milks.',
    price: 14.99,
    originalPrice: 19.99,
    servings: 15,
    pricePerServing: 1.00,
    rating: 4.8,
    reviewCount: 2890,
    badge: 'NEW',
    cardBg: 'bg-[#fce7f3]/60',
    badgeColor: {
      bg: 'bg-[#f472b6]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#ec4899',
      secondary: '#be185d',
      glow: 'rgba(236, 72, 153, 0.4)',
    },
    image: sampleBoxMilkshakeImg,
    fallbackImage: '/sample-box-milkshake.png',
    nutrition: {
      sugar: '0g',
      calories: '22 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin D3', 'Calcium'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Oat Fiber Powder', 'Natural Dessert Extracts', 'Stevia & Sucralose'],
    howToUse: 'Mix 1 sachet into 400ml cold milk. Shake 15s.'
  },
  {
    id: 'sample-box-iced-tea',
    name: 'Iced Tea Sample Box',
    category: 'sample-boxes',
    flavorName: '7 Brewed Tea Flavours (14 Drinks)',
    tagline: '7 Flavours — 14 Drinks',
    flavorNotes: ['Peach Panther', 'Raspberry Vanilla', 'Acai Anaconda', 'Lemon Honey', 'Mango Passion', 'Lime Matcha', 'Apple Tea'],
    description: 'Real brewed tea extracts and antioxidant botanicals. 14 refreshing zero-sugar iced tea servings.',
    price: 14.99,
    originalPrice: 19.99,
    servings: 14,
    pricePerServing: 1.07,
    rating: 4.8,
    reviewCount: 3410,
    badge: 'FAN FAVORITE',
    cardBg: 'bg-[#d8b4fe]/15',
    badgeColor: {
      bg: 'bg-[#c084fc]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#a855f7',
      secondary: '#7e22ce',
      glow: 'rgba(168, 85, 247, 0.4)',
    },
    image: sampleBoxIcedTeaImg,
    fallbackImage: '/sample-box-iced-tea.png',
    nutrition: {
      sugar: '0g',
      calories: '18 kcal',
      caffeine: '15mg (Natural Tea)',
      taurine: '0g',
      vitamins: ['Vitamin C', 'Prebiotic Fiber'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Brewed Tea Extracts', 'Chicory Inulin Fiber', 'Vitamin C', 'Natural Fruit Extracts'],
    howToUse: 'Mix 1 sachet into 500ml cold water with ice.'
  },

  // ==========================================
  // 3. TUBS & FLAVOURS (50 Drinks / 10 Boxes)
  // ==========================================
  {
    id: 'tub-milkshake-donut',
    name: 'Donut',
    category: 'milkshake',
    flavorName: 'Glazed Cinnamon Bakery Donut Milkshake (50 Drinks)',
    tagline: 'Milkshake – 50 Drinks',
    flavorNotes: ['Warm Glazed Donut', 'Vanilla Cream', 'Touch of Cinnamon'],
    description: 'Rich, bakery-fresh glazed donut milkshake powder. Zero sugar, low calorie, and irresistibly creamy with milk or plant milk.',
    price: 34.99,
    servings: 50,
    pricePerServing: 0.70,
    rating: 4.9,
    reviewCount: 3820,
    badge: 'NEW',
    cardBg: 'bg-[#fdf2f8]',
    badgeColor: {
      bg: 'bg-[#ec4899]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#ec4899',
      secondary: '#be185d',
      glow: 'rgba(236, 72, 153, 0.4)',
    },
    image: tubDonutImg,
    fallbackImage: '/tub-donut.png',
    nutrition: {
      sugar: '0g',
      calories: '24 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin D3', 'Calcium', 'Vitamin B12'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Oat Fiber Flour', 'Natural Donut Essence', 'Cinnamon Extract', 'Stevia', 'Plant Prebiotics'],
    howToUse: 'Mix 1 scoop with 400ml cold milk or oat milk in a shaker. Shake 15 seconds.'
  },
  {
    id: 'tub-hydration-blue-raspberry',
    name: 'Blue Raspberry',
    category: 'hydration',
    flavorName: 'Electric Blue Raspberry & Coconut Minerals (50 Drinks)',
    tagline: 'Hydration – 50 Drinks',
    flavorNotes: ['Electric Blue Raspberry', 'Coconut Water', 'Tart Berry Zing'],
    description: 'Electric blue raspberry taste with coconut water powder and high-absorption electrolytes. Zero sugar and zero caffeine.',
    price: 34.99,
    servings: 50,
    pricePerServing: 0.70,
    rating: 4.9,
    reviewCount: 6150,
    badge: 'BESTSELLER',
    cardBg: 'bg-[#e0f2fe]',
    badgeColor: {
      bg: 'bg-[#0284c7]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#0284c7',
      secondary: '#0369a1',
      glow: 'rgba(2, 132, 199, 0.4)',
    },
    image: tubBlueRaspberryImg,
    fallbackImage: '/tub-blue-raspberry.png',
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['B-Complex', 'Vitamin C'],
      electrolytes: ['Magnesium', 'Potassium', 'Sodium', 'Calcium'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Coconut Water Powder', 'Electrolyte Mineral Complex', 'Natural Raspberry Flavour', 'Spirulina Extract for color'],
    howToUse: 'Mix 1 scoop with 500ml cold water.'
  },
  {
    id: 'box-hydration-10',
    name: 'Hydration 10 Box',
    category: 'hydration',
    flavorName: '10-Drink Pocket Travel Box (Multi-Flavour)',
    tagline: '10-drink travel box options in various flavours',
    flavorNotes: ['Blue Raspberry', 'Watermelon', 'Dragonfruit', 'Sour Cherry', 'Coconut'],
    description: 'Compact 10-sachet travel pack for on-the-go hydration. Available in flavours like Blue Raspberry, Watermelon, Dragonfruit, Sour Cherry, and Coconut.',
    price: 11.99,
    servings: 10,
    pricePerServing: 1.20,
    rating: 4.8,
    reviewCount: 2190,
    badge: 'HOT DROP',
    cardBg: 'bg-[#e0f7fa]',
    badgeColor: {
      bg: 'bg-[#00acc1]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#00acc1',
      secondary: '#00838f',
      glow: 'rgba(0, 172, 193, 0.4)',
    },
    image: sampleBoxHydrationImg,
    fallbackImage: '/box-hydration-10.png',
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['B-Complex', 'Vitamin C'],
      electrolytes: ['Magnesium', 'Potassium', 'Sodium'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Coconut Water Powder', 'Electrolytes', 'Natural Fruit Extracts', 'Vitamin C'],
    howToUse: 'Toss a sachet in your gym bag, mix into 500ml water anytime.'
  },
  {
    id: 'box-energy-10',
    name: 'Energy 10 Box',
    category: 'energy',
    flavorName: '10-Drink Pocket Travel Box (NuCaff® Energy)',
    tagline: '10-drink travel box options in various flavours',
    flavorNotes: ['Kola Koala', 'Tangerine Tarantula', 'Bloodorange Bat', 'Raspberry Raptor'],
    description: 'Pocket-sized 10-drink travel box powered by slow-burn NuCaff® caffeine and L-Theanine. Great for travel, study, or gaming tournaments.',
    price: 11.99,
    servings: 10,
    pricePerServing: 1.20,
    rating: 4.9,
    reviewCount: 2840,
    badge: 'NEW',
    cardBg: 'bg-[#fef9c3]',
    badgeColor: {
      bg: 'bg-[#eab308]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#eab308',
      secondary: '#ca8a04',
      glow: 'rgba(234, 179, 8, 0.4)',
    },
    image: sampleBoxEnergyImg,
    fallbackImage: '/box-energy-10.png',
    nutrition: {
      sugar: '0g',
      calories: '15 kcal',
      caffeine: '160mg NuCaff®',
      taurine: '0g',
      vitamins: ['B-Complex', 'Vitamin C'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['NuCaff® Microencapsulated Caffeine', 'L-Theanine', 'Botanical Extracts', 'Inulin Fiber'],
    howToUse: 'Mix 1 sachet with 500ml cold water.'
  },
  {
    id: 'energy-raspberry-raptor',
    name: 'Raspberry Raptor',
    category: 'energy',
    flavorName: 'Sweet Blue Raspberry & Tangy Yuzu Citrus (50 Drinks)',
    tagline: 'Energy / Raspberry & Yuzu – 50 Drinks',
    flavorNotes: ['Wild Blue Raspberry', 'Japanese Yuzu', 'Tart Acai'],
    description: 'Our #1 bestselling energy flavour. Juicy blue raspberries balanced with exotic Japanese yuzu citrus and NuCaff® clean energy.',
    price: 39.99,
    servings: 50,
    pricePerServing: 0.80,
    rating: 4.9,
    reviewCount: 8450,
    badge: 'BESTSELLER',
    cardBg: 'bg-[#e9f2fd]',
    badgeColor: {
      bg: 'bg-[#2563eb]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      glow: 'rgba(59, 130, 246, 0.4)',
    },
    image: tubRaspberryRaptorImg,
    fallbackImage: '/tub-raspberry-raptor.png',
    nutrition: {
      sugar: '0g',
      calories: '15 kcal',
      caffeine: '160mg NuCaff®',
      taurine: '0g',
      vitamins: ['Vitamin C', 'Vitamin B3, B5, B6, B12'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['NuCaff® Microencapsulated Caffeine', 'L-Theanine', 'Natural Raspberry & Yuzu Extract', 'Prebiotic Fiber'],
    howToUse: 'Mix 1 level scoop (7g) into 500ml ice water. Shake 10s.'
  },
  {
    id: 'tub-hydration-strawberry-kiwi',
    name: 'Strawberry x Kiwi',
    category: 'hydration',
    flavorName: 'Ripe Strawberry, Kiwi Berry & Electrolytes (50 Drinks)',
    tagline: 'Hydration – 50 Drinks',
    flavorNotes: ['Sun-Ripened Strawberry', 'Tangy Kiwi Berry', 'Coconut Minerals'],
    description: 'Sweet British strawberry paired with sharp kiwi and high-performance coconut electrolytes. Zero sugar and zero caffeine.',
    price: 34.99,
    servings: 50,
    pricePerServing: 0.70,
    rating: 4.9,
    reviewCount: 4680,
    badge: 'BESTSELLER',
    cardBg: 'bg-[#fdebf0]',
    badgeColor: {
      bg: 'bg-[#e11d48]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#f43f5e',
      secondary: '#be123c',
      glow: 'rgba(244, 63, 94, 0.4)',
    },
    image: tubStrawberryKiwiImg,
    fallbackImage: '/tub-strawberry-kiwi.png',
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin C', 'B-Vitamins'],
      electrolytes: ['Magnesium', 'Potassium', 'Sodium', 'Calcium'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Coconut Water Powder', 'Strawberry & Kiwi Extracts', 'Electrolyte Complex', 'Beetroot Extract'],
    howToUse: 'Mix 1 scoop with 500ml cold water.'
  },
  {
    id: 'tub-hydration-sour-cherry',
    name: 'Sour Cherry',
    category: 'hydration',
    flavorName: 'Tangy Morello Dark Cherry & Coconut Water (50 Drinks)',
    tagline: 'Hydration – 50 Drinks',
    flavorNotes: ['Morello Cherry', 'Tart Cranberry', 'Coconut Electrolytes'],
    description: 'Crisp, tangy Morello dark cherry infused with pure coconut water powder and mineral electrolytes. Perfect hydration during training.',
    price: 34.99,
    servings: 50,
    pricePerServing: 0.70,
    rating: 4.9,
    reviewCount: 4210,
    badge: 'FAN FAVORITE',
    cardBg: 'bg-[#fdecee]',
    badgeColor: {
      bg: 'bg-[#dc2626]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#ef4444',
      secondary: '#b91c1c',
      glow: 'rgba(239, 68, 68, 0.4)',
    },
    image: tubSourCherryImg,
    fallbackImage: '/tub-sour-cherry.png',
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['B-Complex', 'Vitamin C'],
      electrolytes: ['Magnesium 150mg', 'Potassium 300mg', 'Sodium 250mg'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Coconut Water Powder', 'Electrolyte Mineral Complex', 'Dark Cherry Extract', 'Goji Extract'],
    howToUse: 'Mix 1 scoop with 500ml water.'
  },
  {
    id: 'energy-fruity-frog',
    name: 'Fruity Frog',
    category: 'energy',
    flavorName: 'Tropical Mango, Passionfruit & Pineapple (50 Drinks)',
    tagline: 'Energy / Mango, Passionfruit, Pineapple – 50 Drinks',
    flavorNotes: ['Golden Mango', 'Tangy Passionfruit', 'Sweet Pineapple'],
    description: 'A vibrant exotic trio of sweet mango, tangy passionfruit, and juicy golden pineapple backed by 160mg NuCaff® natural energy.',
    price: 39.99,
    servings: 50,
    pricePerServing: 0.80,
    rating: 4.8,
    reviewCount: 3920,
    badge: 'NEW',
    cardBg: 'bg-[#fef3c7]',
    badgeColor: {
      bg: 'bg-[#f59e0b]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#f59e0b',
      secondary: '#d97706',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
    image: tubFruityFrogImg,
    fallbackImage: '/tub-fruity-frog.png',
    nutrition: {
      sugar: '0g',
      calories: '15 kcal',
      caffeine: '160mg NuCaff®',
      taurine: '0g',
      vitamins: ['Vitamin C', 'Vitamin B3, B5, B6, B12'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['NuCaff® Caffeine', 'L-Theanine', 'Mango & Passionfruit Extracts', 'Pineapple Powder'],
    howToUse: 'Mix 1 scoop with 500ml cold water.'
  },
  {
    id: 'tub-hydration-white-peach',
    name: 'White Peach',
    category: 'hydration',
    flavorName: 'Juicy White Peach & Floral Botanicals (50 Drinks)',
    tagline: 'Hydration – 50 Drinks',
    flavorNotes: ['White Peach', 'Floral Jasmine', 'Coconut Water'],
    description: 'Velvety sweet white peach infused with delicate floral botanicals and mineral electrolytes for smooth daily hydration.',
    price: 34.99,
    servings: 50,
    pricePerServing: 0.70,
    rating: 4.9,
    reviewCount: 3510,
    badge: 'BESTSELLER',
    cardBg: 'bg-[#fff5eb]',
    badgeColor: {
      bg: 'bg-[#f97316]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#f97316',
      secondary: '#c2410c',
      glow: 'rgba(249, 115, 22, 0.4)',
    },
    image: tubWhitePeachImg,
    fallbackImage: '/tub-white-peach.png',
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['B-Complex', 'Vitamin C'],
      electrolytes: ['Magnesium', 'Potassium', 'Sodium'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Coconut Water Powder', 'White Peach Juice Concentrate', 'Electrolyte Complex'],
    howToUse: 'Mix 1 scoop into 500ml cold water with ice.'
  },
  {
    id: 'tub-hydration-lemon',
    name: 'Lemon',
    category: 'hydration',
    flavorName: 'Sicilian Lemonade & Mineral Salts (50 Drinks)',
    tagline: 'Hydration – 50 Drinks',
    flavorNotes: ['Zesty Sicilian Lemon', 'Lime Peel', 'Himalayan Pink Salt'],
    description: 'Crisp, thirst-quenching Sicilian lemon with balanced mineral salts. Clean, revitalizing, and completely sugar-free.',
    price: 34.99,
    servings: 50,
    pricePerServing: 0.70,
    rating: 4.8,
    reviewCount: 2940,
    badge: 'FAN FAVORITE',
    cardBg: 'bg-[#fefce8]',
    badgeColor: {
      bg: 'bg-[#eab308]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#eab308',
      secondary: '#a16207',
      glow: 'rgba(234, 179, 8, 0.4)',
    },
    image: tubLemonImg,
    fallbackImage: '/tub-lemon.png',
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin C (100% NRV)', 'B-Vitamins'],
      electrolytes: ['Magnesium', 'Potassium', 'Sodium'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Lemon Juice Extract', 'Coconut Water Powder', 'Citric Acid', 'Electrolytes'],
    howToUse: 'Mix 1 scoop into 500ml cold water.'
  },
  {
    id: 'energy-kola-koala',
    name: 'Kola Koala',
    category: 'energy',
    flavorName: 'Vintage Spiced Cola & Vanilla (50 Drinks)',
    tagline: 'Energy / Cola – 50 Drinks',
    flavorNotes: ['Vintage Cola Spices', 'Vanilla Bean', 'Cinnamon & Nutmeg'],
    description: 'Nostalgic retro fizzy cola flavour with zero sugar and zero guilt. Powered by NuCaff® slow-release energy.',
    price: 39.99,
    servings: 50,
    pricePerServing: 0.80,
    rating: 4.9,
    reviewCount: 4890,
    badge: 'HOT DROP',
    cardBg: 'bg-[#f3e8ff]',
    badgeColor: {
      bg: 'bg-[#9333ea]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#9333ea',
      secondary: '#7e22ce',
      glow: 'rgba(147, 51, 234, 0.4)',
    },
    image: tubKolaKoalaImg,
    fallbackImage: '/tub-kola-koala.png',
    nutrition: {
      sugar: '0g',
      calories: '15 kcal',
      caffeine: '160mg NuCaff®',
      taurine: '0g',
      vitamins: ['Vitamin C', 'B-Complex'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['NuCaff® Caffeine', 'L-Theanine', 'Kola Nut Extract', 'Cinnamon Oil', 'Stevia'],
    howToUse: 'Mix 1 scoop with 500ml ice-cold still or sparkling water.'
  },
  {
    id: 'tub-hydration-pineapple',
    name: 'Pineapple',
    category: 'hydration',
    flavorName: 'Golden Pineapple & Coconut Water (50 Drinks)',
    tagline: 'Hydration – 50 Drinks',
    flavorNotes: ['Golden Pineapple', 'Sweet Coconut', 'Citrus Finish'],
    description: 'Tropical paradise in a shaker. Sweet sun-drenched pineapple combined with pure coconut water electrolytes for deep cellular hydration.',
    price: 34.99,
    servings: 50,
    pricePerServing: 0.70,
    rating: 4.8,
    reviewCount: 3100,
    badge: 'NEW',
    cardBg: 'bg-[#fef9c3]',
    badgeColor: {
      bg: 'bg-[#facc15]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#eab308',
      secondary: '#ca8a04',
      glow: 'rgba(234, 179, 8, 0.4)',
    },
    image: tubPineappleImg,
    fallbackImage: '/tub-pineapple.png',
    nutrition: {
      sugar: '0g',
      calories: '12 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin C', 'B-Vitamins'],
      electrolytes: ['Magnesium', 'Potassium', 'Sodium'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Coconut Water Powder', 'Pineapple Juice Concentrate', 'Electrolyte Complex'],
    howToUse: 'Mix 1 scoop with 500ml cold water.'
  },

  // ==========================================
  // 4. SYRUP PODS & SYRUP SYSTEM
  // ==========================================
  {
    id: 'starter-set-syrup',
    name: 'QuickSip Syrup Starter Set',
    category: 'starter-sets',
    flavorName: 'Syrup Intensity Dial Bottle + 3x 3-Packs',
    tagline: 'Custom Flavours • Dial Your Intensity • 0g Sugar',
    flavorNotes: ['Peach Ice Tea', 'Sour Apple', 'Elderflower Lemon', 'Cola Ice Pop'],
    description: 'Get the QuickSip Syrup Bottle with built-in intensity dial and three 3-packs of your choice. Dial in your flavour intensity (1–5) and sip with 0g sugar.',
    price: 24.99,
    originalPrice: 34.99,
    servings: 36,
    pricePerServing: 0.69,
    rating: 4.9,
    reviewCount: 3850,
    badge: 'NEW',
    isStarterSet: true,
    isSyrup: true,
    cardBg: 'bg-[#eafaf1]',
    badgeColor: {
      bg: 'bg-[#a8e2be]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#10b981',
      secondary: '#059669',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    image: starterSetSyrupImg,
    nutrition: {
      sugar: '0g',
      calories: '2 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin C', 'Vitamin B6', 'Vitamin B12'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Natural Botanical Extracts', 'Purified Water & Citric Acid', 'Vitamins B & C', 'Stevia & Sucralose'],
    howToUse: 'Insert pod into QuickSip bottle cap, turn dial to taste preference (1–5), and sip.',
    includedItems: ['1x QuickSip Syrup Reusable Bottle', '3x Syrup Pod 3-Packs (9 Pods = 36L)', '1x Sticker Sheet']
  },
  {
    id: 'syrup-pod-3-box',
    name: 'Syrup Pod 3 Box',
    category: 'syrup',
    flavorName: '3-Pack Pod Cartridges (12 Litres of Flavoured Water)',
    tagline: 'Available in 10 Bestselling Flavours',
    flavorNotes: ['Strawberry', 'Tangerine x Yuzu', 'Raspberry', 'Pomegranate', 'Mango', 'Peach', 'Grapefruit', 'Green Apple', 'Elderflower x Lime', 'Cola Ice Pop'],
    description: 'Pick your favourite 3-pack syrup pod cartridges. Available in Strawberry, Tangerine x Yuzu, Raspberry, Pomegranate, Mango, Peach, Grapefruit, Green Apple, Elderflower x Lime, and Cola Ice Pop.',
    price: 9.99,
    servings: 12,
    pricePerServing: 0.83,
    rating: 4.9,
    reviewCount: 2980,
    badge: 'BESTSELLER',
    isSyrup: true,
    cardBg: 'bg-[#fff5eb]',
    badgeColor: {
      bg: 'bg-[#ff9500]',
      text: 'text-white',
      border: 'border-black'
    },
    accentColor: {
      primary: '#f97316',
      secondary: '#c2410c',
      glow: 'rgba(249, 115, 22, 0.4)',
    },
    image: syrupPod3BoxImg,
    fallbackImage: '/syrup-pod-3-box.png',
    nutrition: {
      sugar: '0g',
      calories: '2 kcal',
      caffeine: '0mg',
      taurine: '0g',
      vitamins: ['Vitamin C', 'Vitamin B6'],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['Fruit Juice Concentrates', 'Citric Acid', 'Stevia Extract', 'Natural Flavouring'],
    howToUse: 'Insert into QuickSip Syrup bottle cap, dial 1–5, and enjoy!'
  },

  // ==========================================
  // 5. SHAKERS & ACCESSORIES
  // ==========================================
  {
    id: 'shaker-thermo-simpsons',
    name: 'Thermo Shaker – Simpsons',
    category: 'accessories',
    flavorName: 'Limited Edition Double-Wall Stainless Steel (700ml)',
    tagline: 'Limited Edition, 700ml stainless steel',
    flavorNotes: ['700ml Volume', '24h Ice Cold', 'Simpsons Collector Design', 'Leakproof Cap'],
    description: 'Limited edition Simpsons collector thermo shaker. Engineered from surgical grade 304 double-wall insulated stainless steel. Keeps drinks frosty for 24 hours.',
    price: 21.99,
    originalPrice: 28.99,
    servings: 1,
    pricePerServing: 21.99,
    rating: 5.0,
    reviewCount: 1890,
    badge: 'LIMITED DROP',
    cardBg: 'bg-[#fef08a]',
    badgeColor: {
      bg: 'bg-[#eab308]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#eab308',
      secondary: '#ca8a04',
      glow: 'rgba(234, 179, 8, 0.4)',
    },
    image: shakerThermoSimpsonsImg,
    fallbackImage: '/shaker-thermo-simpsons.png',
    nutrition: {
      sugar: 'N/A',
      calories: 'N/A',
      caffeine: 'N/A',
      taurine: 'N/A',
      vitamins: [],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['100% 304 Food-Grade Stainless Steel', 'BPA-free Polypropylene Cap'],
    howToUse: 'Fill with ice and water, add powder, lock lid and shake.'
  },
  {
    id: 'shaker-logo-500ml',
    name: 'Logo Shaker',
    category: 'accessories',
    flavorName: '500ml Heavy-Duty Blender Shaker',
    tagline: '500ml capacity — BPA-Free & Leakproof',
    flavorNotes: ['500ml Capacity', 'Internal Blending Grid', '100% Leakproof', 'BPA Free'],
    description: 'The iconic QuickSip Logo Shaker. 100% leakproof, BPA and DEHP free, featuring an internal blending grid that dissolves powder in seconds.',
    price: 6.99,
    servings: 1,
    pricePerServing: 6.99,
    rating: 4.8,
    reviewCount: 5400,
    badge: 'BESTSELLER',
    cardBg: 'bg-[#f4fae6]',
    badgeColor: {
      bg: 'bg-[#ccff00]',
      text: 'text-black',
      border: 'border-black'
    },
    accentColor: {
      primary: '#9ae600',
      secondary: '#65a30d',
      glow: 'rgba(154, 230, 0, 0.4)',
    },
    image: shakerLogo500mlImg,
    fallbackImage: '/shaker-logo-500ml.png',
    nutrition: {
      sugar: 'N/A',
      calories: 'N/A',
      caffeine: 'N/A',
      taurine: 'N/A',
      vitamins: [],
      vegan: true,
      glutenFree: true,
    },
    ingredients: ['100% Recyclable BPA-Free Tritan Polymer'],
    howToUse: 'Dishwasher safe. Mix 500ml cold water + 1 scoop powder.'
  }
];

export const COMPARISON_DATA = [
  {
    feature: 'Sugar Content',
    holy: '0g Added Sugar (Naturally Sweetened)',
    cannedEnergy: '27g – 55g Refined Sugar',
    sodaBottles: '39g – 65g Corn Syrup'
  },
  {
    feature: 'Price per 500ml Drink',
    holy: '~$0.70 – $0.80 (2,800៛ – 3,200៛)',
    cannedEnergy: '$2.20 – $3.50 (9,000៛ – 14,000៛)',
    sodaBottles: '$1.80 – $2.50 (7,500៛ – 10,000៛)'
  },
  {
    feature: 'Crash & Jitters',
    holy: 'Zero Crash (NuCaff® + L-Theanine)',
    cannedEnergy: 'Severe 2-hour crash & spikes',
    sodaBottles: 'Sugar rush then fatigue'
  },
  {
    feature: 'Packaging & Waste',
    holy: '90% Less Waste (1 Tub = 50 Drinks)',
    cannedEnergy: '50 single-use aluminium cans',
    sodaBottles: '50 single-use plastic bottles'
  },
  {
    feature: 'Vitamins & Minerals',
    holy: '100% NRV Vitamin C + B-Complex + Electrolytes',
    cannedEnergy: 'Synthetic Taurine & harsh acids',
    sodaBottles: 'Zero vitamins or electrolytes'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Kravitz D.',
    location: 'Phnom Penh, Cambodia',
    rating: 5,
    title: 'Switched from monster to QuickSip Energy. Never looking back.',
    content: 'NuCaff is a complete game changer. No jitters, zero sugar crash at 3 PM, and Raspberry Raptor tastes unbelievable over ice. Got my order in Phnom Penh in 24 hours!',
    date: '2 days ago',
    verified: true,
    flavorBought: 'Raspberry Raptor (Energy)'
  },
  {
    id: 'rev-2',
    author: 'Sophea M.',
    location: 'Siem Reap, Cambodia',
    rating: 5,
    title: 'The Starter Set Deluxe is insane value',
    content: '57 drinks plus the shaker for $49.99 (205,000៛) is unmatched. I share them with my gym buddies. The Iced Tea and Hydration flavours are top tier.',
    date: '3 days ago',
    verified: true,
    flavorBought: 'Starter Set Deluxe (57 Drinks)'
  },
  {
    id: 'rev-3',
    author: 'Alexandre P.',
    location: 'Battambang, Cambodia',
    rating: 5,
    title: 'Hydration Sour Cherry saved my marathon training',
    content: 'Electrolytes with coconut water powder actually work. No stomach cramps, tastes crisp and refreshing. 10/10.',
    date: '1 week ago',
    verified: true,
    flavorBought: 'Sour Cherry (Hydration)'
  },
  {
    id: 'rev-4',
    author: 'Vanna K.',
    location: 'Phnom Penh, Cambodia',
    rating: 5,
    title: 'Love the Milkshake Donut flavour with cold oat milk!',
    content: 'Tastes just like a bakery cinnamon glazed donut milkshake. 0g sugar and guilt-free evening sweet craving fix.',
    date: '1 week ago',
    verified: true,
    flavorBought: 'Donut (Milkshake)'
  }
];


