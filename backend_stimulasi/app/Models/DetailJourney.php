<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DetailJourney extends Model
{
    use HasFactory;

    protected $table = 'detail_journey';
    protected $primaryKey = 'id_detail_journey';

    protected $fillable = [
        'id_journey',
        'aktivitas',
        'status',
        'catatan',
    ];

    public function journey(): BelongsTo
    {
        return $this->belongsTo(Journey::class, 'id_journey', 'id_journey');
    }
}
