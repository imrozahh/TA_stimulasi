<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Relasi dengan users (mengisi).
     */
    public function up(): void
    {
        Schema::create('journey', function (Blueprint $table) {
            $table->id('id_journey');
            $table->unsignedBigInteger('id_user');
            $table->integer('minggu_ke');
            $table->date('tanggal');
            $table->timestamps();

            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journey');
    }
};
