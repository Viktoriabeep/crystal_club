<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::group(['prefix' => '{locale?}', 'where' => ['locale' => 'en|uk']], function () {
        Route::get('/login', fn() => Inertia::render('auth/Login'))->name('login');
        Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
        Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
        Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    });

    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');

    Route::get('/{route}', function ($route) {
        $redirect_routes = ['login', 'register', 'forgot-password'];
        if (in_array($route, $redirect_routes)) {
            $locale = Session::get('locale', config('app.fallback_locale'));
            return redirect("/$locale/$route");
        }
    })->where('route', 'login|register|forgot-password');
});

Route::middleware('auth')->group(function () {
    Route::group(['prefix' => '{locale?}', 'where' => ['locale' => 'en|uk']], function () {
        Route::get('/verify-email', EmailVerificationPromptController::class)
            ->name('verification.notice.locale');
    });

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
