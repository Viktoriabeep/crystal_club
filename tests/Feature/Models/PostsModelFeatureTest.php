<?php

namespace Tests\Feature\Models;

use App\Models\PostsModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase;

class PostsModelFeatureTest extends TestCase
{
    use DatabaseTransactions;

    protected PostsModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new PostsModel();
    }

    public function testCreatePost(): void
    {
        $post = $this->model::factory()->create();
        $post->save();

        $this->assertDatabaseHas($this->model->getTable(), ['title' => $post->title]);
    }

    public function testUpdatePost(): void
    {
        $post = $this->model->factory()->create();
        $post->title = 'Updated Title';
        $post->save();

        $this->assertDatabaseHas($this->model->getTable(), ['title' => 'Updated Title']);
    }

    public function testDeletePost(): void
    {
        $post = $this->model->factory()->create();
        $post->delete();

        $this->assertSoftDeleted($this->model->getTable(), ['title' => $post->title]);
    }
}

