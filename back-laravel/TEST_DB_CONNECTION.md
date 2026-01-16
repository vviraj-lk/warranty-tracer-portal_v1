# Database Connection Issue

## Problem
MySQL connection is being refused. The target machine actively refused the connection.

## Solution Steps

### Option 1: Using XAMPP
1. Open XAMPP Control Panel
2. Click "Start" next to MySQL
3. Wait for MySQL to turn green
4. Try running migrations again

### Option 2: Using Windows Services
1. Open Services (Win + R, type "services.msc")
2. Find "MySQL" or "MySQL80" service
3. Right-click and select "Start"
4. Try running migrations again

### Option 3: Command Line (Run as Administrator)
```bash
net start mysql
```

### After MySQL is Running
Run this command to test the connection:
```bash
cd back-laravel\back-laravel
php artisan migrate
```

## Current Database Configuration
- Host: 127.0.0.1
- Port: 3306
- Database: testv1_db
- Username: root
- Password: root

Make sure the database `testv1_db` exists, or create it using:
```sql
CREATE DATABASE testv1_db;
```
