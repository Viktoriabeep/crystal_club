<?php

namespace Database\Factories;

use App\Models\PostsModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostsModelFactory extends Factory
{
    protected $model = PostsModel::class;

    public function definition()
    {
        $title = fake()->sentence();
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => fake()->paragraphs(3, true),
            'is_published' => fake()->boolean(80),
        ];
    }
}
