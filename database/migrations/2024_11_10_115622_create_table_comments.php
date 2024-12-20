<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blog.comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained('blog.posts')->onDelete('cascade');
            $table->foreignId('customer_id')->nullable()->constrained('sales.customers')->onDelete('set null');
            $table->text('content');
            $table->timestamps();
            $table->softDeletes();

            $table->index('post_id');
            $table->index('customer_id');
        });

        DB::statement("CREATE INDEX ON blog.comments USING GIN (to_tsvector('english', content));");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog.comments');
    }
};
