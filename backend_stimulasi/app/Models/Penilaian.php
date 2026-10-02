<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Penilaian extends Model
{
    use HasFactory;

    protected $table = 'penilaian';
    protected $primaryKey = 'id_penilaian';

    protected $fillable = [
        'id_siswa',
        'tanggal',
        'semester',
        'tahun',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
        ];
    }

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'id_siswa', 'id_siswa');
    }

    public function detailPenilaian(): HasMany
    {
        return $this->hasMany(DetailPenilaian::class, 'id_penilaian', 'id_penilaian');
    }

    public function hasilKlasifikasi(): HasOne
    {
        return $this->hasOne(HasilKlasifikasi::class, 'id_penilaian', 'id_penilaian');
    }
}
