<?php

namespace App\Http\Controllers\Shop;

use App\Models\OrderItemsModel;
use Illuminate\Http\Request;

class OrderItemController
{
    public function store(Request $request)
    {
        foreach ($request->all() as $item) {
            OrderItemsModel::create($item);
        }
        return response()->json(['status' => 'success']);
    }
}
