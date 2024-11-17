<?php

namespace Tests\Feature\Models;

use App\Models\CommentsModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase;

class CommentsModelFeatureTest extends TestCase
{
    use DatabaseTransactions;

    protected CommentsModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new CommentsModel();
    }

    public function testCreateComment(): void
    {
        $comment = $this->model::factory()->create();
        $comment->save();

        $this->assertDatabaseHas($this->model->getTable(), ['content' => $comment->content]);
    }

    public function testUpdateComment(): void
    {
        $comment = $this->model->factory()->create();
        $comment->content = 'Updated Content';
        $comment->save();

        $this->assertDatabaseHas($this->model->getTable(), ['content' => 'Updated Content']);
    }

    public function testDeleteComment(): void
    {
        $comment = $this->model->factory()->create();
        $comment->delete();

        $this->assertSoftDeleted($this->model->getTable(), ['content' => $comment->content]);
    }
}
