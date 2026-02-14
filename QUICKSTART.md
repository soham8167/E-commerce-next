# Quick Reference - JWT Admin Auth

## 🎯 Start Here (2 min setup)

### 1️⃣ Create Test Admin User

```bash
node scripts/create-admin.js admin@example.com password123
```

### 2️⃣ Start Dev Server

```bash
npm run dev
# Runs on http://localhost:3002
```

### 3️⃣ Login to Admin Panel

- Visit: http://localhost:3002/admin/login
- Email: admin@example.com
- Password: password123
- ✅ You should be redirected to /admin

---

## 📍 Key URLs

| URL                  | Purpose        | Auth Required |
| -------------------- | -------------- | ------------- |
| `/admin/login`       | Login form     | ❌ No         |
| `/admin`             | Admin panel    | ✅ Yes (JWT)  |
| `/api/admin/login`   | Login endpoint | ❌ No         |
| `/api/products` POST | Create product | ✅ Yes (JWT)  |
| `/api/products` GET  | List products  | ❌ No         |

---

## 💾 Storage

### localStorage (Client)

```javascript
localStorage.adminToken; // JWT token string
localStorage.adminEmail; // Admin email address
```

### HTTP Headers (API)

```
Authorization: Bearer <jwt-token>
```

---

## 🔧 Common Tasks

### Login

```js
async function login(email, password) {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  localStorage.adminToken = data.token; // Stored automatically
}
```

### Create Product (with JWT)

```js
async function createProduct(formData) {
  const token = localStorage.adminToken;
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
}
```

### Check if Logged In

```js
const isLoggedIn = !!localStorage.getItem("adminToken");
console.log(isLoggedIn ? "✅ Logged in" : "❌ Not logged in");
```

### Logout

```js
localStorage.removeItem("adminToken");
localStorage.removeItem("adminEmail");
window.location.href = "/admin/login";
```

---

## 🛡️ Tech Stack

| Component | Library            | Details          |
| --------- | ------------------ | ---------------- |
| Hashing   | bcryptjs           | 10 salt rounds   |
| Tokens    | jsonwebtoken       | 7-day expiration |
| Database  | MongoDB/Mongoose   | User collection  |
| Frontend  | Next.js 15 + React | App Router       |

---

## 📋 API Responses

### ✅ Successful Login

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "email": "admin@example.com",
  "role": "admin"
}
```

### ❌ Missing Credentials

```json
{ "error": "Email and password are required" }
// Status: 400
```

### ❌ Invalid Credentials

```json
{ "error": "Invalid email or password" }
// Status: 401
```

### ❌ Not Admin Role

```json
{ "error": "Unauthorized. Only admins can login" }
// Status: 403
```

### ❌ Missing JWT for Product Creation

```json
{ "error": "Unauthorized. Admin token required." }
// Status: 401
```

---

## 🔑 Environment Variables

**`.env.local`:**

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_key
```

**Change before production!** 🚨

---

## 📝 File Locations

```
src/
├── lib/
│   ├── model/User.ts          ← User schema
│   └── jwt.ts                 ← JWT helpers
├── app/
│   ├── api/
│   │   └── admin/
│   │       └── login/route.ts ← Login endpoint
│   └── admin/
│       ├── login/page.tsx     ← Login form
│       └── layout.tsx         ← Auth guard
└── ...

scripts/
└── create-admin.js            ← Create admin user

.env.local                      ← Config
```

---

## 🧪 Test Command

```bash
# TypeScript check
npx tsc --noEmit

# Build
npm run build

# Dev server
npm run dev
```

---

## ❓ Troubleshooting

### Token not storing?

```js
// Check localStorage
console.log(localStorage.getItem("adminToken"));
```

### Got 401 on product creation?

```js
// Verify token in localStorage
localStorage.getItem("adminToken"); // Should not be empty
```

### Can't access /admin?

- Check if redirected to /admin/login
- Clear localStorage and login again
- Check browser console for errors

### Database connection error?

- Verify MONGODB_URI in .env.local
- Check MongoDB credentials
- Ensure IP whitelist on MongoDB Atlas

---

## 📕 Full Documentation

See `JWT_AUTH_SETUP.md` for complete details.

---

## ✨ That's it! You're ready to use admin authentication.
