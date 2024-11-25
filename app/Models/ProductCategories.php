<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ElipZis\Cacheable\Models\Traits\Cacheable;

class ProductCategories extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Cacheable;
    use CrudTrait;

    protected $table = 'catalog.categories';

    protected $fillable = ['name', 'slug', 'parent_id'];

    public function products()
    {
        return $this->hasMany(Products::class,  'id', 'category_id'); // Зв'язок по slug
    }
}
