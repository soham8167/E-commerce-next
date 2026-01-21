import { StaticImageData } from "next/image";

// Navbar
export interface NavState {
  isOpen: boolean;
  toggleMenu: () => void;
}

// Product Type
export interface Product {
  id: number;
  title: string;
  image: StaticImageData; 
  weight: string;
  originalPrice: number;
  price: number;
  discount: number;
  quantity: number;
  bestSeller?: boolean;
}

// Main Store Type
export interface StoreState {
  products: Product[];
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

// Seasonal Store Type
export interface SeasonalStoreState {
  products: Product[]; 
  increment: (id: number) => void;
  decrement: (id: number) => void;
}
