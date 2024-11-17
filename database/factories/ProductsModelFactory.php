<?php

namespace Database\Factories;

use App\Models\ProductsModel;
use App\Models\CategoriesModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductsModelFactory extends Factory
{
    protected $model = ProductsModel::class;

    public function definition()
    {
        $name = fake()->words(3, true);
        return [
            'category_id' => CategoriesModel::factory(),
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => fake()->paragraph,
            'price' => fake()->randomFloat(2, 10, 1000),
            'stock' => fake()->numberBetween(0, 100),
            'is_active' => fake()->boolean(90),
        ];
    }
}
