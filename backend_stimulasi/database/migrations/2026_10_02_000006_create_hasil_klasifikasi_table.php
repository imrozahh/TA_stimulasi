<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Relasi 1:1 dengan tabel penilaian (menghasilkan).
     */
    public function up(): void
    {
        Schema::create('hasil_klasifikasi', function (Blueprint $table) {
            $table->id('id_hasil');
            $table->unsignedBigInteger('id_penilaian')->unique();
            $table->string('hasil')->nullable(); // Sesuai, Meragukan, Penyimpangan
            $table->timestamps();

            $table->foreign('id_penilaian')->references('id_penilaian')->on('penilaian')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_klasifikasi');
    }
};
