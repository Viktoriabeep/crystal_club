<?php

namespace Database\Factories;

use App\Models\CustomersModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomersModelFactory extends Factory
{
    protected $model = CustomersModel::class;

    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
        ];
    }
}

