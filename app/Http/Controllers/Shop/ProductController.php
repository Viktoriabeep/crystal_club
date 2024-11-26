<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Products;

class ProductController extends Controller
{
    public function index($id)
    {
        $product = Products::where('is_active', true)->findOrFail($id);

        $product->image = collect(json_decode($product->image, true) ?? [])
            ->map(fn($image) => asset('storage/' . $image));

        return response()->json(['product' => $product]);
    }
}
