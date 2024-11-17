<?php

namespace Tests\Feature\Models;

use App\Models\OrderItemsModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase;

class OrderItemsModelFeatureTest extends TestCase
{
    use DatabaseTransactions;

    protected OrderItemsModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new OrderItemsModel();
    }

    public function testCreateOrderItem(): void
    {
        $orderItem = $this->model::factory()->create();
        $orderItem->save();

        $this->assertDatabaseHas($this->model->getTable(), ['quantity' => $orderItem->quantity]);
    }

    public function testUpdateOrderItem(): void
    {
        $orderItem = $this->model->factory()->create();
        $orderItem->quantity = 10;
        $orderItem->save();

        $this->assertDatabaseHas($this->model->getTable(), ['quantity' => 10]);
    }

    public function testDeleteOrderItem(): void
    {
        $orderItem = $this->model->factory()->create();
        $orderItem->delete();

        $this->assertSoftDeleted($this->model->getTable(), ['quantity' => $orderItem->quantity]);
    }
}
