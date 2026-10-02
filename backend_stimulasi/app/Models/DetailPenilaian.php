<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DetailPenilaian extends Model
{
    use HasFactory;

    protected $table = 'detail_penilaian';
    protected $primaryKey = 'id_detail';

    protected $fillable = [
        'id_penilaian',
        'id_aspek',
        'nilai',
    ];

    public function penilaian(): BelongsTo
    {
        return $this->belongsTo(Penilaian::class, 'id_penilaian', 'id_penilaian');
    }

    public function aspek(): BelongsTo
    {
        return $this->belongsTo(Aspek::class, 'id_aspek', 'id_aspek');
    }
}
