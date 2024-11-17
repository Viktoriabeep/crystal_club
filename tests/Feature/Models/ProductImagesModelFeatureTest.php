<?php

namespace Tests\Feature\Models;

use App\Models\ProductImagesModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase;

class ProductImagesModelFeatureTest extends TestCase
{
    use DatabaseTransactions;

    protected ProductImagesModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new ProductImagesModel();
    }

    public function testCreateProductImage(): void
    {
        $image = $this->model::factory()->create();
        $image->save();

        $this->assertDatabaseHas($this->model->getTable(), ['image_path' => $image->image_path]);
    }

    public function testUpdateProductImage(): void
    {
        $image = $this->model->factory()->create();
        $image->image_path = 'updated_image_path.jpg';
        $image->save();

        $this->assertDatabaseHas($this->model->getTable(), ['image_path' => 'updated_image_path.jpg']);
    }

    public function testDeleteProductImage(): void
    {
        $image = $this->model->factory()->create();
        $image->delete();

        $this->assertSoftDeleted($this->model->getTable(), ['image_path' => $image->image_path]);
    }
}
