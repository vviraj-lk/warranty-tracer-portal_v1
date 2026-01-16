# Warranty Tracer Portal - Quick Start Guide

## 🚀 Get Started in 5 Steps

### Step 1: Start MySQL
Open XAMPP Control Panel and start MySQL service
(Or run as admin: `net start mysql`)

### Step 2: Create Database
Open phpMyAdmin or MySQL client and run:
```sql
CREATE DATABASE warranty_tracer_db;
```

### Step 3: Run Migrations
```bash
cd portal-api
php artisan migrate
```

### Step 4: Start Laravel Server
```bash
php artisan serve
```
Server will run at: **http://localhost:8000**

### Step 5: Test the API
Use Postman or any API client:

**Register a user:**
```
POST http://localhost:8000/api/register

{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

Save the token from the response!

**Login:**
```
POST http://localhost:8000/api/login

{
  "email": "john@test.com",
  "password": "password123"
}
```

**Access Dashboard (needs verified email):**
```
GET http://localhost:8000/api/dashboard
Headers: Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📁 Project Structure

```
warranty_tracer_portal_v1/
├── portal-api/                   ← Laravel Backend (COMPLETE!)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Auth/
│   │   │   │       ├── RegisterController.php
│   │   │   │       ├── LoginController.php
│   │   │   │       └── EmailVerificationController.php
│   │   │   └── Middleware/
│   │   │       └── EnsureEmailIsVerified.php
│   │   ├── Models/
│   │   │   └── User.php
│   │   └── Providers/
│   ├── config/
│   ├── database/
│   ├── routes/
│   │   └── api.php
│   └── .env
│
└── portal-web/                   ← React Frontend (COMPLETE!)
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## 📚 Documentation Files

- **README.md** - Complete project overview
- **BACKEND_COMPLETE.md** - What we've built
- **API_TESTING.md** - Detailed API testing guide
- **TEST_DB_CONNECTION.md** - MySQL troubleshooting
- **QUICK_START.md** - This file!

---

## ⚡ Common Commands

```bash
# Start Laravel server
php artisan serve

# Run migrations
php artisan migrate

# Clear cache
php artisan config:clear
php artisan cache:clear

# View routes
php artisan route:list

# Check logs
tail -f storage/logs/laravel.log
```

---

## 💡 Tips

- Keep Laravel server running on port 8000
- React will run on port 3000
- Use `Accept: application/json` header in all API requests
- Email verification links are in `storage/logs/laravel.log`

---

**Current Status:** Full Stack Application Complete! 🎉

## 🚀 Testing the Complete Application

### Start Both Servers

1. **Laravel Backend** (Terminal 1):
   ```bash
   cd portal-api
   php artisan serve
   ```
   Runs on: http://localhost:8000

2. **React Frontend** (Terminal 2):
   ```bash
   cd portal-web
   npm start
   ```
   Runs on: http://localhost:3000

### Test the Full Flow

1. Open http://localhost:3000 in your browser
2. Click "create a new account" 
3. Register with any email (verification happens via logs)
4. Check Laravel logs for verification URL
5. Copy/paste verification URL into browser
6. Login with your credentials
7. Access the protected dashboard!

### API Endpoints Still Available

You can still test the API directly with Postman using the endpoints listed above.
