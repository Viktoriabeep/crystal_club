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
        Schema::create('sales.product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('catalog.products')->onDelete('cascade');
            $table->string('image_path')->unique();
            $table->timestamps();
            $table->softDeletes();

            $table->index('product_id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales.product_images');
    }
};
