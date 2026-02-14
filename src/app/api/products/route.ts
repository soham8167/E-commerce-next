import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/model/Product";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { verifyToken, extractTokenFromHeader } from "@/lib/jwt";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

// Helper to verify admin JWT
function verifyAdminToken(req: Request): boolean {
  const authHeader = req.headers.get("Authorization");
  const token = extractTokenFromHeader(authHeader);
  if (!token) return false;

  const decoded = verifyToken(token);
  return decoded?.role === "admin";
}

export async function POST(req: Request) {
  try {
    // Verify JWT token
    if (!verifyAdminToken(req)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin token required." },
        { status: 401 },
      );
    }

    // Check if it's FormData (file upload) or JSON (URL upload)
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // File upload handling
      await connectDB();
      const formData = await req.formData();

      const title = formData.get("title") as string;
      const price = formData.get("price") as string;
      const category = formData.get("category") as string;
      const imageFile = formData.get("image") as File;

      if (!title || !price || !category || !imageFile) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 },
        );
      }

      // Ensure upload directory exists
      if (!existsSync(UPLOAD_DIR)) {
        await mkdir(UPLOAD_DIR, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${imageFile.name}`;
      const filepath = join(UPLOAD_DIR, filename);

      // Convert File to Buffer and save
      const bytes = await imageFile.arrayBuffer();
      await writeFile(filepath, Buffer.from(bytes));

      // Save to DB with image path
      const imagePath = `/uploads/${filename}`;
      const product = await Product.create({
        title,
        price: Number(price),
        category,
        image: imagePath,
      });

      return NextResponse.json(product);
    } else {
      // JSON (legacy URL upload) - fallback
      await connectDB();
      const body = await req.json();
      const product = await Product.create(body);
      return NextResponse.json(product);
    }
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
