#!/usr/bin/env node
/**
 * Script to create an admin user for testing
 * Usage: node scripts/create-admin.js <email> <password>
 * Example: node scripts/create-admin.js admin@example.com mySecurePassword123
 */

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

// Mongoose User schema
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true },
);

// Hash password pre-save
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: node scripts/create-admin.js <email> <password>");
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    const mongoUrl =
      process.env.MONGODB_URI ||
      "mongodb+srv://cluster0.sxsob.mongodb.net/ecommerce?retryWrites=true&w=majority";
    await mongoose.connect(mongoUrl);
    console.log("✓ Connected to MongoDB");

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("✗ User with this email already exists");
      process.exit(1);
    }

    // Create admin user
    const user = new User({
      email,
      password,
      role: "admin",
    });

    await user.save();
    console.log(`✓ Admin user created successfully!`);
    console.log(`  Email: ${email}`);
    console.log(`  Role: admin`);
    console.log(`\n  You can now login at: http://localhost:3002/admin/login`);

    process.exit(0);
  } catch (error) {
    console.error(
      "✗ Error creating admin user:",
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
}

createAdmin();
