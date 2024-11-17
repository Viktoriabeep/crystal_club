<?php

namespace Tests\Feature\Models;

use App\Models\CustomersModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase;

class CustomersModelFeatureTest extends TestCase
{
    use DatabaseTransactions;

    protected CustomersModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new CustomersModel();
    }

    public function testCreateCustomer(): void
    {
        $customer = $this->model::factory()->create();
        $customer->save();

        $this->assertDatabaseHas($this->model->getTable(), ['email' => $customer->email]);
    }

    public function testUpdateCustomer(): void
    {
        $customer = $this->model->factory()->create();
        $customer->email = 'updated@example.com';
        $customer->save();

        $this->assertDatabaseHas($this->model->getTable(), ['email' => 'updated@example.com']);
    }

    public function testDeleteCustomer(): void
    {
        $customer = $this->model->factory()->create();
        $customer->delete();

        $this->assertSoftDeleted($this->model->getTable(), ['email' => $customer->email]);
    }
}
