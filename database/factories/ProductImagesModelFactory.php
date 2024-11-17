<?php

namespace Database\Factories;

use App\Models\ProductImagesModel;
use App\Models\ProductsModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImagesModelFactory extends Factory
{
    protected $model = ProductImagesModel::class;

    public function definition()
    {
        return [
            'product_id' => ProductsModel::factory(),
            'image_path' => fake()->imageUrl(640, 480, 'product', true),
        ];
    }
}
