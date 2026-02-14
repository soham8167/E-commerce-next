import jwt, { JwtPayload } from "jsonwebtoken";

// SECURITY: Ensure JWT_SECRET is set in .env.local
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    " CRITICAL: JWT_SECRET is not defined in .env.local\n" +
      "Generate a secure secret by running:\n" +
      "  node scripts/generate-jwt-secret.js\n" +
      "Then add it to .env.local and restart the server.",
  );
}

export function generateToken(email: string, role: string): string {
  return jwt.sign({ email, role }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JwtPayload;
  } catch (error) {
    return null;
  }
}

export function extractTokenFromHeader(header: string | null): string | null {
  if (!header) return null;
  const parts = header.split(" ");
  return parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
}
