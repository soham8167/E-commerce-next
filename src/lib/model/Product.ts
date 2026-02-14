import mongoose, { Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  image: string;
  category?: string;
}

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: false },
  },
  { timestamps: true },
);
// Ensure the exported model is typed
export const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);
