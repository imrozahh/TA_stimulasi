<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'siswa';
    protected $primaryKey = 'id_siswa';

    protected $fillable = [
        'nama',
        'jenis_kelamin',
        'tanggal_lahir',
        'kelas',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_lahir' => 'date',
        ];
    }

    public function guru(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'guru_siswa', 'id_siswa', 'id_user');
    }

    public function penilaian(): HasMany
    {
        return $this->hasMany(Penilaian::class, 'id_siswa', 'id_siswa');
    }

    public function rekomendasi(): HasMany
    {
        return $this->hasMany(Rekomendasi::class, 'id_siswa', 'id_siswa');
    }
}
