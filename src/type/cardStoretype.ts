import { StaticImageData } from "next/image";
export interface CartItem {
  id: number | string;
  variantId: number;
  title: string;
  price: number | undefined;
  image: StaticImageData | string;
  weight: string | undefined;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  increment: (id: number | string, variantId: number) => void;
  decrement: (id: number | string, variantId: number) => void;
  removeItem: (id: number | string, variantId: number) => void;
}
