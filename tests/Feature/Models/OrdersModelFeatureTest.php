<?php

namespace Tests\Feature\Models;

use App\Models\OrdersModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase;

class OrdersModelFeatureTest extends TestCase
{
    use DatabaseTransactions;

    protected OrdersModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new OrdersModel();
    }

    public function testCreateOrder(): void
    {
        $order = $this->model::factory()->create();
        $order->save();

        $this->assertDatabaseHas($this->model->getTable(), ['total_price' => $order->total_price]);
    }

    public function testUpdateOrder(): void
    {
        $order = $this->model->factory()->create();
        $order->status = 'completed';
        $order->save();

        $this->assertDatabaseHas($this->model->getTable(), ['status' => 'completed']);
    }

    public function testDeleteOrder(): void
    {
        $order = $this->model->factory()->create();
        $order->delete();

        $this->assertSoftDeleted($this->model->getTable(), ['total_price' => $order->total_price]);
    }
}
