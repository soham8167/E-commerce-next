# JWT Admin Authentication Setup

This document describes the JWT-based authentication system implemented for the admin panel.

## ✅ Implementation Complete

The following has been implemented:

### 1. **User Model** (`src/lib/model/User.ts`)

- Mongoose schema with `email`, `password`, and `role` fields
- Role enum: `admin` | `user`
- Pre-save hook: automatically hashes passwords with bcryptjs (10 salt rounds)
- Unique email constraint

### 2. **JWT Helpers** (`src/lib/jwt.ts`)

- `generateToken(email, role)` - Creates signed JWT with 7-day expiration
- `verifyToken(token)` - Validates token signature and expiration
- `extractTokenFromHeader(header)` - Parses "Bearer <token>" format

### 3. **Admin Login API** (`src/app/api/admin/login/route.ts`)

- POST endpoint that:
  - Accepts `email` and `password`
  - Validates user exists and role is "admin" (403 if not)
  - Compares password with bcryptjs
  - Returns JWT token on success

### 4. **Admin Login Page** (`src/app/admin/login/page.tsx`)

- Client component with login form
- Stores JWT and email in localStorage
- Redirects to `/admin` after successful login

### 5. **Admin Route Guard** (`src/app/admin/layout.tsx`)

- "use client" layout that protects `/admin/*` routes
- Checks localStorage for `adminToken` on mount
- Redirects to `/admin/login` if token missing or invalid
- Allows direct access to `/admin/login` route

### 6. **Product API Protection** (`src/app/api/products/route.ts`)

- POST endpoint now verifies JWT from Authorization header
- Returns 401 if token invalid or missing
- Only authenticated admins can create products

## 🚀 How to Use

### Create an Admin User

Run the provided script to create your first admin user:

```bash
node scripts/create-admin.js admin@example.com mySecurePassword123
```

The script will:

1. Connect to MongoDB
2. Hash the password
3. Create a user with role `admin`
4. Display success message with login URL

### Login Flow

1. Navigate to `http://localhost:3002/admin/login`
2. Enter admin email and password
3. On successful login:
   - JWT token stored in `localStorage.adminToken`
   - Redirected to `/admin` page
   - Token valid for 7 days

### Accessing Protected Routes

- **`/admin/*`** - Protected by layout guard, requires valid JWT in localStorage
- **`/api/products`** (POST) - Requires Authorization header: `Bearer <token>`

## 🔐 Security Details

### Password Hashing

- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Pre-save Mongoose hook handles hashing automatically

### JWT Token

- Signed with `JWT_SECRET` from `.env.local`
- Includes: `email`, `role`, `iat`, `exp` (7 days)
- Verified on each protected request

### Authorization

- Check role `admin` during login (403 if not admin)
- Check role `admin` when creating products (401 if not authenticated)

## 📋 Environment Variables

Add to `.env.local`:

```
MONGODB_URI=mongodb+srv://cluster0.sxsob.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
```

⚠️ **Important:** Change `JWT_SECRET` before production deployment!

## 🧪 Testing

### 1. Start the dev server

```bash
npm run dev
```

### 2. Create admin user

```bash
node scripts/create-admin.js admin@example.com mySecurePassword123
```

### 3. Login

- Visit: `http://localhost:3002/admin/login`
- Enter credentials
- Should redirect to `/admin` and store token

### 4. Verify token in localStorage

```javascript
// In browser console
localStorage.getItem("adminToken");
// Should return a JWT token string
```

### 5. Test product creation

- Use product form at `/admin`
- Token automatically sent in Authorization header
- Images upload to `/public/uploads`

### 6. Test unauthorized access

- Clear localStorage: `localStorage.removeItem('adminToken')`
- Try accessing `/admin` - should redirect to login

## 📁 Files Created/Modified

### New Files

- `src/lib/model/User.ts` - User schema with bcrypt
- `src/lib/jwt.ts` - Token generation/verification
- `src/app/api/admin/login/route.ts` - Login endpoint
- `src/app/admin/login/page.tsx` - Login form UI
- `scripts/create-admin.js` - Admin user creation script

### Modified Files

- `src/app/admin/layout.tsx` - Added auth guard
- `src/app/api/products/route.ts` - Added JWT verification
- `.env.local` - Added JWT_SECRET

## 🔧 Adding More Protected Routes

To protect additional API routes, use the same pattern:

```typescript
import { verifyToken, extractTokenFromHeader } from "@/lib/jwt";

export async function POST(req: Request) {
  // Verify JWT token
  const authHeader = req.headers.get("Authorization");
  const token = extractTokenFromHeader(authHeader);
  const decoded = verifyToken(token);

  if (!decoded?.role === "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Your route logic here...
}
```

## 📖 Next Steps

### Optional Enhancements:

1. Add logout button to `/admin` page
2. Add user registration endpoint
3. Add refresh token mechanism
4. Add session management
5. Add rate limiting to login endpoint
6. Add email verification for admin users

## ⚠️ Production Checklist

- [ ] Change `JWT_SECRET` to a secure random value
- [ ] Use HTTPS in production
- [ ] Implement CSRF protection
- [ ] Add rate limiting to login endpoint
- [ ] Store JWT in httpOnly cookies (not localStorage)
- [ ] Implement token refresh mechanism
- [ ] Add monitoring/logging for auth failures
- [ ] Review MongoDB index on email field (unique constraint)

---

For questions or issues, check the implementation files listed above.
