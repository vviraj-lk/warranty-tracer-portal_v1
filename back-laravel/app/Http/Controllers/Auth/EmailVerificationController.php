<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    /**
     * Send email verification notification
     */
    public function sendVerificationEmail(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.'
            ], 200);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification email sent!'
        ], 200);
    }

    /**
     * Verify email address
     */
    public function verify(Request $request)
    {
        $user = \App\Models\User::findOrFail($request->route('id'));

        if (!hash_equals(
            (string) $request->route('hash'),
            sha1($user->getEmailForVerification())
        )) {
            return response()->json([
                'message' => 'Invalid verification link.'
            ], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.',
                'verified' => true
            ], 200);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return response()->json([
            'message' => 'Email verified successfully!',
            'verified' => true
        ], 200);
    }
}
