<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("create schema if not exists sales");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("drop schema if exists sales");
    }
};
