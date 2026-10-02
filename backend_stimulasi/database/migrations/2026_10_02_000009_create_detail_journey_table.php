<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Relasi dengan journey (berisi).
     */
    public function up(): void
    {
        Schema::create('detail_journey', function (Blueprint $table) {
            $table->id('id_detail_journey');
            $table->unsignedBigInteger('id_journey');
            $table->string('aktivitas');
            $table->enum('status', ['Sudah', 'Belum'])->default('Belum');
            $table->text('catatan')->nullable();
            $table->timestamps();

            $table->foreign('id_journey')->references('id_journey')->on('journey')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_journey');
    }
};
