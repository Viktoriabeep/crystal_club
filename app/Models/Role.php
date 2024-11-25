<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use CrudTrait;

    public $table = 'roles';

    protected $fillable = ['name', 'guard_name'];
}
