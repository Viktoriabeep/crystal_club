<?php

namespace Tests\Unit\Models;

use App\Models\OrderItemsModel;
use PHPUnit\Framework\TestCase;

class OrderItemsModelUnitTest extends TestCase
{
    protected OrderItemsModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new OrderItemsModel();
    }

    public function test_model_has_correct_table_name(): void
    {
        $this->assertEquals('sales.order_items', $this->model->getTable());
    }

    public function test_model_has_correct_fillable_properties(): void
    {
        $expected_fillable = ['order_id', 'product_id', 'quantity', 'price'];
        $this->assertEquals($expected_fillable, $this->model->getFillable());
    }

    public function test_model_uses_soft_deletes(): void
    {
        $this->assertContains('Illuminate\Database\Eloquent\SoftDeletes', class_uses($this->model));
    }

    public function test_model_uses_cacheable(): void
    {
        $this->assertContains('ElipZis\Cacheable\Models\Traits\Cacheable', class_uses($this->model));
    }

    public function test_model_uses_has_factory(): void
    {
        $this->assertContains('Illuminate\Database\Eloquent\Factories\HasFactory', class_uses($this->model));
    }

    
}
