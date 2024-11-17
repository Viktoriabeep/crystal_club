<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blog.posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->boolean('is_published')->default(true);
            $table->timestamps();
            $table->softDeletes();
        }); 

        DB::statement("CREATE INDEX ON blog.posts USING GIN (to_tsvector('english', content));");
        DB::statement("CREATE INDEX ON blog.posts USING GIN (to_tsvector('english', title));");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog.posts');
    }
};
