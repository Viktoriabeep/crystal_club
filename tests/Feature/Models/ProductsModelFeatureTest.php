<?php

namespace Tests\Feature\Models;

use App\Models\ProductsModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase;

class ProductsModelFeatureTest extends TestCase
{
    use DatabaseTransactions;

    protected ProductsModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new ProductsModel();
    }

    public function testCreateProduct(): void
    {
        $product = $this->model::factory()->create();
        $product->save();

        $this->assertDatabaseHas($this->model->getTable(), ['name' => $product->name]);
    }

    public function testUpdateProduct(): void
    {
        $product = $this->model->factory()->create();
        $product->name = 'Updated Product';
        $product->save();

        $this->assertDatabaseHas($this->model->getTable(), ['name' => 'Updated Product']);
    }

    public function testDeleteProduct(): void
    {
        $product = $this->model->factory()->create();
        $product->delete();

        $this->assertSoftDeleted($this->model->getTable(), ['name' => $product->name]);
    }
}
