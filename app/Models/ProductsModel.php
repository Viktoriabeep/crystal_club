<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ElipZis\Cacheable\Models\Traits\Cacheable;

class ProductsModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Cacheable;

    protected $table = 'catalog.products';
    protected $fillable = ['category_id', 'name', 'slug', 'description', 'price', 'stock', 'is_active'];
}
