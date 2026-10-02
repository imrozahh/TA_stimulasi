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
        Schema::create('detail_penilaian', function (Blueprint $table) {
            $table->id('id_detail');
            $table->unsignedBigInteger('id_penilaian');
            $table->unsignedBigInteger('id_aspek');
            $table->string('nilai');
            $table->timestamps();

            $table->foreign('id_penilaian')->references('id_penilaian')->on('penilaian')->onDelete('cascade');
            $table->foreign('id_aspek')->references('id_aspek')->on('aspek')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_penilaian');
    }
};
