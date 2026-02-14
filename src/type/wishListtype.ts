import { StaticImageData } from "next/image";
export interface WishlistItem {
  id: number | string;
  title: string;
  price: number;
  image: StaticImageData | string;
  weight: string;
  variantId: number;
}

export interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number | string) => void;
}
