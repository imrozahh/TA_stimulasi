<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Journey extends Model
{
    use HasFactory;

    protected $table = 'journey';
    protected $primaryKey = 'id_journey';

    protected $fillable = [
        'id_user',
        'minggu_ke',
        'tanggal',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
            'minggu_ke' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function detailJourney(): HasMany
    {
        return $this->hasMany(DetailJourney::class, 'id_journey', 'id_journey');
    }
}
