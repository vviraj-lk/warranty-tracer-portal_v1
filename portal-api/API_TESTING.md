# Warranty Tracer Portal - API Testing Guide

Complete guide for testing the Laravel backend API endpoints.

## Base URL
```
http://localhost:8000/api
```

## Important Headers

For all requests, include:
```
Accept: application/json
Content-Type: application/json
```

For authenticated requests, also include:
```
Authorization: Bearer {your_token}
```

## 1. Register a New User

**Endpoint:** `POST /register`

**Request:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response (201):**
```json
{
  "message": "Registration successful! Please check your email to verify your account.",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "email_verified_at": null,
    "created_at": "2026-01-16T01:23:45.000000Z",
    "updated_at": "2026-01-16T01:23:45.000000Z"
  },
  "token": "1|AbCdEf123456...",
  "token_type": "Bearer"
}
```

**Note:** Save the token for subsequent requests!

---

## 2. Login

**Endpoint:** `POST /login`

**Request:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful!",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "email_verified_at": null
  },
  "token": "2|XyZ789...",
  "token_type": "Bearer",
  "email_verified": false
}
```

---

## 3. Send Email Verification

**Endpoint:** `POST /email/verification-notification`

**Headers:**
```
Authorization: Bearer {your_token}
Accept: application/json
```

**Response (200):**
```json
{
  "message": "Verification email sent!"
}
```

**Note:** Check `storage/logs/laravel.log` for the verification email (since we're using log mailer)

---

## 4. Verify Email

**Endpoint:** `GET /email/verify/{id}/{hash}`

Example: `GET /email/verify/1/abc123hash...`

**Response (200):**
```json
{
  "message": "Email verified successfully!",
  "verified": true
}
```

---

## 5. Get User Info (Protected)

**Endpoint:** `GET /user`

**Headers:**
```
Authorization: Bearer {your_token}
Accept: application/json
```

**Response (200) - If email verified:**
```json
{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com",
  "email_verified_at": "2026-01-16T01:25:00.000000Z"
}
```

**Response (403) - If email not verified:**
```json
{
  "message": "Your email address is not verified. Please verify your email to access this resource."
}
```

---

## 6. Access Dashboard (Protected)

**Endpoint:** `GET /dashboard`

**Headers:**
```
Authorization: Bearer {your_token}
Accept: application/json
```

**Response (200) - If email verified:**
```json
{
  "message": "Welcome to your dashboard!",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "email_verified_at": "2026-01-16T01:25:00.000000Z"
  }
}
```

**Response (403) - If email not verified:**
```json
{
  "message": "Your email address is not verified. Please verify your email to access this resource."
}
```

---

## 7. Logout

**Endpoint:** `POST /logout`

**Headers:**
```
Authorization: Bearer {your_token}
Accept: application/json
```

**Response (200):**
```json
{
  "message": "Logged out successfully!"
}
```

---

## Testing Flow

1. **Register** a new user → Get token
2. **Login** (optional, to get a new token)
3. **Try to access dashboard** → Should get 403 (email not verified)
4. **Send verification email**
5. **Check logs** at `storage/logs/laravel.log` for verification link
6. **Copy the verification URL** and test it
7. **Access dashboard again** → Should now work!
8. **Logout** when done

---

## Tips

- Use Postman, Insomnia, or Thunder Client (VS Code extension) for testing
- Always include `Accept: application/json` header
- Save the token from login/register responses
- Email verification links will be in `storage/logs/laravel.log`
- For testing, you can manually verify email in database:
  ```sql
  UPDATE users SET email_verified_at = NOW() WHERE id = 1;
  ```

---

## Common Errors

### 401 Unauthorized
- Missing or invalid token
- Solution: Login again to get a fresh token

### 403 Forbidden
- Email not verified
- Solution: Complete email verification process

### 422 Validation Error
- Invalid input data
- Check the error response for details

### 500 Server Error
- Check Laravel logs: `storage/logs/laravel.log`
- Common causes: Database connection, missing migrations
