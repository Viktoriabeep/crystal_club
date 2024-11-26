<?php

use App\Http\Controllers\Blog\BlogController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\Shop\CategoryController;
use App\Http\Controllers\Shop\CustomerController;
use App\Http\Controllers\Shop\OrderController;
use App\Http\Controllers\Shop\OrderItemController;
use App\Http\Controllers\Shop\ProductController;
use App\Http\Controllers\Shop\ShopController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/storefront', [ShopController::class, 'index'])
    ->name('shop.index');

Route::get('/storefront-categories', [CategoryController::class, 'index'])
    ->name('shop.categories');

Route::get('/store-product/{id}', [ProductController::class, 'index'])
    ->name('shop.product.show');

Route::post('/customers', [CustomerController::class, 'store'])
    ->name('shop.customer.store');

Route::post('/orders', [OrderController::class, 'store'])
    ->name('shop.order.store');

Route::post('/order-items', [OrderItemController::class, 'store'])
    ->name('shop.order-item.store');

Route::get('/info/{slug}', [InfoController::class, 'index'])
    ->name('info.show');

Route::get('/blog/posts', [BlogController::class, 'index']);

Route::get('/blog/{slug}', [BlogController::class, 'singlePost']);
