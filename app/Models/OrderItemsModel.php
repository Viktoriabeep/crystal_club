<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ElipZis\Cacheable\Models\Traits\Cacheable;

class OrderItemsModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Cacheable;

    protected $table = 'sales.order_items';
    protected $fillable = ['order_id', 'product_id', 'quantity', 'price'];
}
