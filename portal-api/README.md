# Warranty Tracer Portal - API Backend

Laravel 11 REST API backend for the Warranty Tracer Portal application. This API provides authentication, authorization, and warranty management endpoints.

## Features

- User Registration & Authentication
- Email Verification System
- Laravel Sanctum Token-based Authentication
- Protected API Routes
- CORS Support for React Frontend
- MySQL Database with Migrations
- Comprehensive API Documentation

## Tech Stack

- **Framework:** Laravel 11.x
- **Authentication:** Laravel Sanctum
- **Database:** MySQL 8.0+
- **PHP Version:** 8.2+
- **Package Manager:** Composer

## Prerequisites

- PHP 8.2 or higher
- Composer
- MySQL 8.0 or higher
- Node.js & NPM (optional, for asset compilation)

## Installation

### 1. Install Dependencies

```bash
composer install
```

### 2. Environment Configuration

Copy the `.env.example` file to `.env` and configure your database:

```bash
cp .env.example .env
```

Update the following in your `.env` file:

```env
APP_NAME="Warranty Tracer Portal"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=warranty_tracer_db
DB_USERNAME=root
DB_PASSWORD=root

FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000

MAIL_MAILER=log
```

### 3. Generate Application Key

```bash
php artisan key:generate
```

### 4. Create Database

Create the database in MySQL:

```sql
CREATE DATABASE warranty_tracer_db;
```

### 5. Run Migrations

```bash
php artisan migrate
```

### 6. Start Development Server

```bash
php artisan serve
```

The API will be available at: **http://localhost:8000**

## API Endpoints

### Authentication Endpoints

#### Register
- **URL:** `/api/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```

#### Login
- **URL:** `/api/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Logout
- **URL:** `/api/logout`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`

### Email Verification Endpoints

#### Send Verification Email
- **URL:** `/api/email/verification-notification`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`

#### Verify Email
- **URL:** `/api/email/verify/{id}/{hash}`
- **Method:** `GET`

### Protected Endpoints (Requires Authentication + Verified Email)

#### Get User Info
- **URL:** `/api/user`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer {token}`

#### Dashboard
- **URL:** `/api/dashboard`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer {token}`

## Project Structure

```
portal-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Auth/
│   │   │       ├── RegisterController.php
│   │   │       ├── LoginController.php
│   │   │       └── EmailVerificationController.php
│   │   └── Middleware/
│   │       └── EnsureEmailIsVerified.php
│   ├── Models/
│   │   └── User.php
│   └── Providers/
│       └── AppServiceProvider.php
├── bootstrap/
├── config/
│   ├── app.php
│   ├── database.php
│   ├── sanctum.php
│   └── ...
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── api.php
│   ├── web.php
│   └── console.php
├── storage/
│   └── logs/
│       └── laravel.log
├── tests/
├── .env
├── composer.json
└── artisan
```

## Key Components

### Controllers

- **RegisterController:** Handles user registration
- **LoginController:** Manages login and logout
- **EmailVerificationController:** Handles email verification process

### Middleware

- **EnsureEmailIsVerified:** Custom middleware to ensure email is verified before accessing protected routes

### Models

- **User:** Extended with Sanctum and MustVerifyEmail traits

## Common Commands

```bash
# Clear application cache
php artisan config:clear
php artisan cache:clear

# View all routes
php artisan route:list

# Run tests
php artisan test

# View logs
tail -f storage/logs/laravel.log
```

## Testing

For detailed API testing instructions, see [API_TESTING.md](API_TESTING.md)

Use Postman, Insomnia, or Thunder Client to test endpoints.

## Database Troubleshooting

If you encounter database connection issues, see [TEST_DB_CONNECTION.md](TEST_DB_CONNECTION.md)

## Email Configuration

By default, emails are logged to `storage/logs/laravel.log`. To use SMTP:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
```

## CORS Configuration

The API is configured to accept requests from `http://localhost:3000` (React frontend). To modify CORS settings, update `config/cors.php` or the `SANCTUM_STATEFUL_DOMAINS` in `.env`.

## Security

- API uses Laravel Sanctum for token-based authentication
- All passwords are hashed using bcrypt
- Email verification is required for accessing protected routes
- CSRF protection is enabled
- XSS protection through Laravel's automatic escaping

## Development Notes

- Email verification links are valid for 60 minutes
- Sanctum tokens don't expire by default (configure in `sanctum.php` if needed)
- Database queries are logged when `APP_DEBUG=true`

## Support

For issues or questions:
1. Check the logs: `storage/logs/laravel.log`
2. Review [API_TESTING.md](API_TESTING.md) for testing guidance
3. Consult [TEST_DB_CONNECTION.md](TEST_DB_CONNECTION.md) for database issues

## License

Proprietary software. All rights reserved.
