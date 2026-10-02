<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Role: 1 = Guru, 2 = Orang Tua, 3 = Admin, 4 = Kepala Sekolah
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@stimulasi.id'],
            [
                'nama' => 'Administrator',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'no_hp' => '081234567890',
            ]
        );
    }
}
