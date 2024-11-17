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
        Schema::create('sales.order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('sales.orders')->onDelete('cascade');
            $table->foreignId('product_id')->nullable()->constrained('catalog.products')->onDelete('set null');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['order_id', 'product_id']);
            $table->index('quantity');
            $table->index('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales.order_items');
    }
};
