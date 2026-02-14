import mongoose from "mongoose";
import path from "path";
import * as fs from "fs";

// Load environment variables manually for ts-node
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("//")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key) {
        process.env[key.trim()] = valueParts.join("=").trim();
      }
    }
  });
}

// Import User model from relative path
const userModelPath = path.resolve(__dirname, "../src/lib/model/User");
const { User } = require(userModelPath);

/**
 * Seed script for creating initial admin user
 * Run with: npx ts-node -P tsconfig.scripts.json scripts/seed.ts
 */

interface SeedResult {
  success: boolean;
  message: string;
  action: "created" | "exists" | "error";
}

async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");
  } catch (error) {
    throw new Error(
      `Failed to connect to MongoDB: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

async function seedAdminUser(): Promise<SeedResult> {
  const adminEmail = "admin@gmail.com";
  const adminPassword = "Admin@12";
  const adminRole = "admin";

  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      const message = `Admin user already exists with email: ${adminEmail}`;
      console.log(`  ${message}`);
      return {
        success: true,
        message,
        action: "exists",
      };
    }

    // Create new admin user
    const newAdmin = new User({
      email: adminEmail,
      password: adminPassword,
      role: adminRole,
    });

    await newAdmin.save();

    const message = `Admin user created successfully\n   Email: ${adminEmail}\n   Role: ${adminRole}`;
    console.log(`✓ ${message}`);

    return {
      success: true,
      message,
      action: "created",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error during seeding";
    console.error(`✗ Error creating admin user: ${errorMessage}`);
    return {
      success: false,
      message: errorMessage,
      action: "error",
    };
  }
}

async function disconnectDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("✓ Disconnected from MongoDB");
  } catch (error) {
    console.error(
      `Warning: Error disconnecting from MongoDB: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

async function main(): Promise<void> {
  console.log(" Starting database seed...\n");

  try {
    // Connect to database
    await connectDB();

    // Seed admin user
    const result = await seedAdminUser();

    // Disconnect from database
    await disconnectDB();

    // Exit with appropriate code
    if (result.success) {
      console.log("\n Seed completed successfully");
      process.exit(0);
    } else {
      console.error("\n Seed completed with errors");
      process.exit(1);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`\n Fatal error: ${errorMessage}`);

    try {
      await disconnectDB();
    } catch (disconnectError) {
      console.error("Failed to disconnect:", disconnectError);
    }

    process.exit(1);
  }
}

// Run the seed script
main();
