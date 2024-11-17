<?php

namespace Database\Factories;

use App\Models\CommentsModel;
use App\Models\PostsModel;
use App\Models\CustomersModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentsModelFactory extends Factory
{
    protected $model = CommentsModel::class;

    public function definition()
    {
        
        return [
            'post_id' => PostsModel::factory(),
            'customer_id' => CustomersModel::factory(),
            'content' => fake()->paragraph,
        ];
    }
}
