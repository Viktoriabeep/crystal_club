<?php

namespace Tests\Feature\Models;

use App\Models\CategoriesModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase;

class CategoriesModelFeatureTest extends TestCase
{
    use DatabaseTransactions;

    protected CategoriesModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new CategoriesModel();
    }

    public function testCreateCategory(): void
    {
        $category = $this->model::factory()->create();
        $category->save();

        $this->assertDatabaseHas($this->model->getTable(), ['name' => $category->name]);
    }

    public function testUpdateCategory(): void
    {
        $category = $this->model->factory()->create();
        $category->name = 'Updated Category';
        $category->save();

        $this->assertDatabaseHas($this->model->getTable(), ['name' => 'Updated Category']);
    }

    public function testDeleteCategory(): void
    {
        $category = $this->model->factory()->create();
        $category->delete();

        $this->assertSoftDeleted($this->model->getTable(), ['name' => $category->name]);
    }
}
