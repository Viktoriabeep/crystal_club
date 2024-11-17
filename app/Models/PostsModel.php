<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ElipZis\Cacheable\Models\Traits\Cacheable;

class PostsModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Cacheable;

    protected $table = 'blog.posts';
    protected $fillable = ['title', 'slug', 'content', 'is_published'];

}
