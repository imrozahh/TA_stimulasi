<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HasilKlasifikasi extends Model
{
    use HasFactory;

    protected $table = 'hasil_klasifikasi';
    protected $primaryKey = 'id_hasil';

    protected $fillable = [
        'id_penilaian',
        'hasil',
    ];

    public function penilaian(): BelongsTo
    {
        return $this->belongsTo(Penilaian::class, 'id_penilaian', 'id_penilaian');
    }

    public function rekomendasi(): HasMany
    {
        return $this->hasMany(Rekomendasi::class, 'id_hasil', 'id_hasil');
    }
}
