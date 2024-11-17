<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use ElipZis\Cacheable\Models\Traits\Cacheable;

class CommentsModel extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Cacheable;

    protected $table = 'blog.comments';
    protected $fillable = ['post_id', 'customer_id', 'content'];
}
