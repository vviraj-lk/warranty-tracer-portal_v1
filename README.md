# TestV1 - Laravel React SSO Application

A Single Sign-On (SSO) application built with Laravel (backend API) and React (frontend) featuring user registration, email verification, login/logout, and a protected dashboard.

## Project Structure

```
Test_V1/
├── back-laravel/         # Laravel Backend API
│   └── back-laravel/
└── front-react/          # React Frontend (To be created)
```

## Features

- ✅ User Registration with Email Verification
- ✅ User Login/Logout
- ✅ Laravel Sanctum API Authentication
- ✅ Protected Dashboard (requires verified email)
- ✅ CORS Configuration for React Integration
- 🔄 React Frontend (Coming next)

## Backend Setup (Laravel)

### Prerequisites
- PHP 8.2+
- Composer
- MySQL 8.0+
- Node.js & NPM

### Installation Steps

1. **Start MySQL Service**
   - Using XAMPP: Start MySQL from control panel
   - Or run: `net start mysql` (as administrator)

2. **Create Database**
   ```sql
   CREATE DATABASE testv1_db;
   ```

3. **Configure Environment**
   - The `.env` file is already configured
   - Database: testv1_db
   - Username: root
   - Password: root

4. **Run Migrations**
   ```bash
   cd back-laravel/back-laravel
   php artisan migrate
   ```

5. **Start Laravel Server**
   ```bash
   php artisan serve
   ```
   Backend will run on: http://localhost:8000

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
- MySQL
- PHP 8.2+

### Frontend (Coming Next)
- React 18
- React Router
- Axios
- Tailwind CSS / Material-UI

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

### 🔄 Next Steps
- [ ] Run database migrations (requires MySQL running)
- [ ] Test API endpoints
- [ ] Set up React frontend
- [ ] Create authentication components
- [ ] Build user dashboard UI
- [ ] Integrate React with Laravel API

## Notes

- Email verification uses `MAIL_MAILER=log` which logs emails to `storage/logs/laravel.log`
- For production, configure proper SMTP settings in `.env`
- Sanctum tokens are used for API authentication
- Frontend URL configured: http://localhost:3000

## Support

If you encounter any issues:
1. Make sure MySQL is running
2. Check `.env` configuration
3. Clear Laravel cache: `php artisan config:clear`
4. Review logs: `storage/logs/laravel.log`
