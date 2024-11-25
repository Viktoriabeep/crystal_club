<?php

use Illuminate\Support\Facades\Route;

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\CRUD.
// Routes you generate using Backpack\Generators will be placed here.

Route::group([
    'prefix' => config('backpack.base.route_prefix', 'admin'),
    'middleware' => array_merge(
        (array) config('backpack.base.web_middleware', 'web'),
        (array) config('backpack.base.middleware_key', 'admin')
    ),
    'namespace' => 'App\Http\Controllers\Admin',
], function () { // custom admin routes
    Route::crud('user', 'UserCrudController');
    Route::crud('role', 'RoleCrudController');
    Route::crud('permission', 'PermissionCrudController');
    Route::crud('products', 'ProductsCrudController');
    Route::crud('product-categories', 'ProductCategoriesCrudController');
    Route::crud('orders', 'OrdersCrudController');
    Route::crud('order-items', 'OrderItemsCrudController');
    Route::crud('customers', 'CustomersCrudController');
    Route::crud('blog-posts', 'BlogPostsCrudController');
    Route::crud('info', 'InfoCrudController');
}); // this should be the absolute last line of this file
