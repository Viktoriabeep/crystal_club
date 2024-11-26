<?php

namespace App\Http\Controllers\Shop;

use App\Models\OrdersModel;
use Illuminate\Http\Request;

class OrderController
{
    public function store(Request $request)
    {
        $order = OrdersModel::create($request->all());
        return response()->json($order);
    }
}
