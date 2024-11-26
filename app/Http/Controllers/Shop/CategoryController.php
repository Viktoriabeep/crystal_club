<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\ProductCategories;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategories::select('id', 'name')->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }

}
