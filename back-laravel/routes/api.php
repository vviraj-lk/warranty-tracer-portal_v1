<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\EmailVerificationController;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

// Email Verification Routes
Route::prefix('email')->group(function () {
    Route::post('/verification-notification', [EmailVerificationController::class, 'sendVerificationEmail'])
        ->middleware('auth:sanctum');
    Route::get('/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->name('verification.verify');
});

// Protected routes (require authentication and email verification)
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/dashboard', function (Request $request) {
        return response()->json([
            'message' => 'Welcome to your dashboard!',
            'user' => $request->user()
        ]);
    });
});
