<?php

namespace Tests\Unit\Models;

use App\Models\ProductImagesModel;
use PHPUnit\Framework\TestCase;

class ProductImagesModelUnitTest extends TestCase
{
    protected ProductImagesModel $model;

    public function setUp(): void
    {
        parent::setUp();
        $this->model = new ProductImagesModel();
    }

    public function test_model_has_correct_table_name(): void
    {
        $this->assertEquals('sales.product_images', $this->model->getTable());
    }

    public function test_model_has_correct_fillable_properties(): void
    {
        $expected_fillable = ['product_id', 'image_path'];
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
