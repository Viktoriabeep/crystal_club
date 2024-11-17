<?php

namespace Database\Factories;

use App\Models\OrderItemsModel;
use App\Models\OrdersModel;
use App\Models\ProductsModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemsModelFactory extends Factory
{
    protected $model = OrderItemsModel::class;

    public function definition()
    {
        $product = ProductsModel::factory()->create();
        return [
            'order_id' => OrdersModel::factory(),
            'product_id' => $product->id,
            'quantity' => fake()->numberBetween(1, 5),
            'price' => $product->price,
        ];
    }
}
