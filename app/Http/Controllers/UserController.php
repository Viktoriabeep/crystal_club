<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all(); // Отримуємо всіх користувачів з бази даних
        return view('users.index', compact('users')); // Передаємо їх у представлення
    }

    public function show($id)
    {
        // Перевірка, чи є користувач аутентифікованим і чи має роль "developer"
        if (auth()->check() && auth()->user()->isDeveloper()) {
            $user = User::findOrFail($id); // Знайти користувача за ID
            return view('users.show', compact('user')); // Повернути уявлення профілю
        } else {
            abort(403, 'Unauthorized action. Only developers can access this page.');
        }
    }
}
