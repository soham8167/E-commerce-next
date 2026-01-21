import { StaticImageData } from "next/image";
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


// veg store

export interface vegCardState {
  products: Product[];
  increment: (id: number) => void;
  decrement: (id: number) => void;
}
