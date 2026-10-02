<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Aspek extends Model
{
    use HasFactory;

    protected $table = 'aspek';
    protected $primaryKey = 'id_aspek';

    protected $fillable = [
        'nama_aspek',
    ];

    public function detailPenilaian(): HasMany
    {
        return $this->hasMany(DetailPenilaian::class, 'id_aspek', 'id_aspek');
    }
}
