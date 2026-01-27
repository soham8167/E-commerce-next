import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../lib/model/Product";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ NEXT.JS 15 FIX: await params
    const { id } = await params;

    // ✅ CHECK IF ID IS VALID MONGODB OBJECT ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // ✅ FETCH PRODUCT
    const product = await Product.findById(id);

    // ✅ IF NOT FOUND
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // ✅ RETURN PRODUCT
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
