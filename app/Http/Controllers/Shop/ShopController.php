<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->get('category');
        $price = $request->get('price', 500);

        $query = Products::query();

        if ($category) {
            $query->where('category_id', $category);
        }

        $query->where('price', '<=', $price);

        $products = $query->get()->map(function ($product) {
            $images = json_decode($product->image, true) ?? [];
            $product->image = count($images) > 0
                ? asset('storage/' . $images[0])
                : null;

            return $product;
        });

        return response()->json([
            'products' => $products,
        ]);
    }
}

