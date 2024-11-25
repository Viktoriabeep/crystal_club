<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', ['isAuthenticated' => Auth::check()]);
});

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');

Route::middleware(['auth', 'verified_with_locale'])->group(function () {
    Route::get('/{route}', function ($route) {
        $redirect_routes = ['dashboard'];

        if (in_array($route, $redirect_routes)) {
            $locale = Session::get('locale', config('app.fallback_locale'));
            return redirect("/$locale/$route");
        }

        abort(404);
    })->where('route', 'dashboard');

    Route::group(['prefix' => '{locale?}', 'where' => ['locale' => 'en|uk']], function () {
        Route::get('/dashboard', function () {
            return Inertia::render('user/Dashboard', [
                'user' => auth()->user(),
            ]);
        })->name('dashboard');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/users', [UserController::class, 'index']);

Route::get('/orders', function () {
    return Inertia::render('Orders', [
        'orders' => [],
    ]);
})->middleware('auth')->name('orders');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');


require __DIR__.'/auth.php';
