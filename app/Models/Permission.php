<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use CrudTrait;

    protected $table = 'permissions';

    protected $fillable = ['name', 'guard_name'];
}
