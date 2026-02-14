import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/User";
import bcryptjs from "bcryptjs";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Only admins can login" },
        { status: 403 },
      );
    }

    // Compare password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = generateToken(user.email, user.role);

    return NextResponse.json({ token, email: user.email, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
