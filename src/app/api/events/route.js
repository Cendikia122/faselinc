import { NextResponse } from 'next/server';
import { getEvents, createEvent } from '@/lib/storage';
import { verifyAdmin } from '@/lib/auth';

// GET: Mengambil semua event / pelatihan
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null;
    const all = searchParams.get('all') === 'true';

    const result = await getEvents(limit, all);
    return NextResponse.json({
      success: true,
      source: result.source,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in GET /api/events:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST: Menambah event / pelatihan baru (Khusus Admin)
export async function POST(request) {
  const user = verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Akses ditolak. Silakan login kembali.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, message: 'Nama pelatihan / event wajib diisi' }, { status: 400 });
    }

    const result = await createEvent(body);

    return NextResponse.json({
      success: true,
      message: 'Pelatihan / Event berhasil ditambahkan',
      id: result.id,
      event: result.event,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
