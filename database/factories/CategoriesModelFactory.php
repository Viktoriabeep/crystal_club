<?php

namespace Database\Factories;

use App\Models\CategoriesModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoriesModelFactory extends Factory
{
    protected $model = CategoriesModel::class;

    public function definition()
    {
        $name = fake()->word();
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'parent_id' => null, // можна налаштувати логіку для створення вкладених категорій
        ];
    }
}

