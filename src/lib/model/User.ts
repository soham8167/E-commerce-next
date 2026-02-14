import mongoose, { Document, Model } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "user";
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true },
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Ensure model has the correct generic type for TypeScript
export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
