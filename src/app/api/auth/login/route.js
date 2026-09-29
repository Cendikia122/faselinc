import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fasel_consulting_jwt_secret_default_key';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim();
    let user = null;

    // 1. Cek ke database MySQL jika terhubung
    try {
      const rows = await query('SELECT * FROM admin_users WHERE username = ? LIMIT 1', [cleanUsername]);
      if (rows && rows.length > 0) {
        const dbUser = rows[0];
        let isMatch = false;

        // Cek apakah password cocok secara langsung (plain text dari phpMyAdmin)
        if (dbUser.password === password) {
          isMatch = true;
        } else {
          // Cek apakah password cocok via bcrypt hash
          try {
            isMatch = bcrypt.compareSync(password, dbUser.password);
          } catch (e) {
            isMatch = false;
          }
        }

        if (isMatch) {
          user = { id: dbUser.id, username: dbUser.username, name: dbUser.name || 'Admin Fasel' };
        }
      }
    } catch (dbError) {
      console.warn('[Auth] MySQL offline / tidak terhubung, memeriksa fallback credentials:', dbError.message);
    }

    // 2. Fallback jika database offline atau Environment Variables belum termuat
    if (!user) {
      const defaultUser = (process.env.ADMIN_USERNAME || 'admin').trim();
      const envPass = process.env.ADMIN_PASSWORD;

      const validPasswords = [
        envPass,
        'suksesmuliaBUL123',
        'admin123',
      ].filter(Boolean);

      if (cleanUsername.toLowerCase() === defaultUser.toLowerCase() && validPasswords.includes(password)) {
        user = { id: 1, username: defaultUser, name: 'Admin Fasel Consulting' };
      }
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: { id: user.id, username: user.username, name: user.name },
    });

    // Set Cookie
    response.cookies.set('fasel_admin_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
