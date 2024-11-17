<?php

namespace Database\Factories;

use App\Models\OrdersModel;
use App\Models\CustomersModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrdersModelFactory extends Factory
{
    protected $model = OrdersModel::class;

    public function definition()
    {
        return [
            'customer_id' => CustomersModel::factory(),
            'total_price' => fake()->randomFloat(2, 20, 1000),
            'status' => fake()->randomElement(['pending', 'completed', 'canceled']),
        ];
    }
}
