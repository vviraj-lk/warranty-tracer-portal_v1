# Warranty Tracer Portal

A comprehensive warranty tracking and management portal built with Laravel (backend API) and React (frontend). Features include user authentication, email verification, and a protected dashboard for warranty management.

## Project Structure

```
warranty_tracer_portal_v1/
├── portal-api/           # Laravel Backend API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── ...
└── portal-web/          # React Frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   └── contexts/
    └── package.json
```

## Features

- ✅ User Registration with Email Verification
- ✅ User Login/Logout with Sanctum API Authentication
- ✅ Protected Dashboard (requires verified email)
- ✅ CORS Configuration for React Integration
- ✅ React Frontend with Authentication Context
- ✅ Warranty Management System (Coming Soon)

## Backend Setup (Laravel - portal-api)

### Prerequisites
- PHP 8.2+
- Composer
- MySQL 8.0+
- Node.js & NPM (for frontend)

### Installation Steps

1. **Start MySQL Service**
   - Using XAMPP: Start MySQL from control panel
   - Or run: `net start mysql` (as administrator)

2. **Create Database**
   ```sql
   CREATE DATABASE warranty_tracer_db;
   ```

3. **Configure Environment**
   Navigate to portal-api folder and configure `.env`:
   ```bash
   cd portal-api
   cp .env.example .env
   ```
   Update database configuration:
   ```
   DB_DATABASE=warranty_tracer_db
   DB_USERNAME=root
   DB_PASSWORD=root
   ```

4. **Install Dependencies**
   ```bash
   composer install
   ```

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Run Migrations**
   ```bash
   php artisan migrate
   ```

7. **Start Laravel Server**
   ```bash
   php artisan serve
   ```
   Backend will run on: http://localhost:8000

## Frontend Setup (React - portal-web)

### Installation Steps

1. **Navigate to Frontend Directory**
   ```bash
   cd portal-web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   Frontend will run on: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user (requires auth)

### Email Verification
- `POST /api/email/verification-notification` - Resend verification email
- `GET /api/email/verify/{id}/{hash}` - Verify email address

### Protected Routes (require authentication + verified email)
- `GET /api/user` - Get authenticated user info
- `GET /api/dashboard` - Access dashboard

## Request Examples

### Register
```json
POST http://localhost:8000/api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Login
```json
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Access Protected Route
```json
GET http://localhost:8000/api/dashboard
Authorization: Bearer {your_token_here}
```

## Technologies Used

### Backend
- Laravel 11.x
- Laravel Sanctum (API Authentication)
- MySQL 8.0+
- PHP 8.2+
- Composer

### Frontend
- React 18
- React Router
- Context API for State Management
- Create React App

## Development Status

### ✅ Completed
- [x] Laravel installation and configuration
- [x] Laravel Sanctum setup
- [x] User model with email verification
- [x] Authentication controllers (Register, Login, Logout)
- [x] Email verification controller
- [x] API routes configuration
- [x] CORS configuration for React
- [x] Custom middleware for email verification
- [x] React frontend setup with Create React App
- [x] Authentication context and components
- [x] Protected routes implementation

### 🔄 In Progress
- [ ] Warranty management features
- [ ] Dashboard enhancements
- [ ] User profile management
- [ ] Advanced reporting

## Quick Start

See [QUICK_START.md](QUICK_START.md) for a streamlined setup guide.

For detailed API documentation, see [portal-api/API_TESTING.md](portal-api/API_TESTING.md).

## Notes

- Email verification uses `MAIL_MAILER=log` which logs emails to `portal-api/storage/logs/laravel.log`
- For production, configure proper SMTP settings in `.env`
- Sanctum tokens are used for API authentication
- Frontend URL configured: http://localhost:3000
- Backend API URL: http://localhost:8000

## Support

If you encounter any issues:
1. Make sure MySQL is running
2. Check `.env` configuration in portal-api
3. Clear Laravel cache: `php artisan config:clear`
4. Review logs: `portal-api/storage/logs/laravel.log`
5. Check [portal-api/TEST_DB_CONNECTION.md](portal-api/TEST_DB_CONNECTION.md) for database troubleshooting

## License

This project is proprietary software. All rights reserved.
