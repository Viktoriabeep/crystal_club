<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ElipZis\Cacheable\Models\Traits\Cacheable;

class CustomersModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Cacheable;

    protected $table = 'sales.customers';
    protected $fillable = ['name', 'email', 'phone', 'address'];
}
