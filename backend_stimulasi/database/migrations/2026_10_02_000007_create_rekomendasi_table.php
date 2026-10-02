<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Relasi dengan siswa (dimiliki) dan hasil_klasifikasi (memberikan).
     */
    public function up(): void
    {
        Schema::create('rekomendasi', function (Blueprint $table) {
            $table->id('id_rekomendasi');
            $table->unsignedBigInteger('id_siswa');
            $table->unsignedBigInteger('id_hasil');
            $table->string('hasil');
            $table->text('rekomendasi_guru');
            $table->text('rekomendasi_ortu');
            $table->timestamps();

            $table->foreign('id_siswa')->references('id_siswa')->on('siswa')->onDelete('cascade');
            $table->foreign('id_hasil')->references('id_hasil')->on('hasil_klasifikasi')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekomendasi');
    }
};
