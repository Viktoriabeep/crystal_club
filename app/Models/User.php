<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use ElipZis\Cacheable\Models\Traits\Cacheable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use CrudTrait;
    use HasFactory;
    use HasRoles;
    use Notifiable;
    use SoftDeletes;
    use Cacheable;

    public $table = 'users';

    protected $fillable = ['name', 'email', 'password',];

    protected $hidden = ['password', 'remember_token',];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
