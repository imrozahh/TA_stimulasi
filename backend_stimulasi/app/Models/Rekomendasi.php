<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rekomendasi extends Model
{
    use HasFactory;

    protected $table = 'rekomendasi';
    protected $primaryKey = 'id_rekomendasi';

    protected $fillable = [
        'id_siswa',
        'id_hasil',
        'hasil',
        'rekomendasi_guru',
        'rekomendasi_ortu',
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'id_siswa', 'id_siswa');
    }

    public function hasilKlasifikasi(): BelongsTo
    {
        return $this->belongsTo(HasilKlasifikasi::class, 'id_hasil', 'id_hasil');
    }
}
