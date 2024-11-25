<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use CrudTrait;

    /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    protected $table = 'catalog.products';

    // protected $primaryKey = 'id';
    // public $timestamps = false;
    protected $guarded = ['id'];

    // protected $fillable = [];
    // protected $hidden = [];

    public function category()
    {
        return $this->belongsTo(ProductCategories::class, 'category_id', 'id');
    }

//    protected static function booted()
//    {
//        static::saving(function ($product) {
//            if ($product->category) {
//                $category = \App\Models\ProductCategories::where('id', $product->category)->first();
//
//                if ($category) {
//                    $product->category = $category->slug;
//                }
//            }
//        });
//    }
}
