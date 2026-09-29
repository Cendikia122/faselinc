import { NextResponse } from 'next/server';
import { getBlogs, createBlog } from '@/lib/storage';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: Mengambil semua artikel blog
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null;
    const all = searchParams.get('all') === 'true';

    const result = await getBlogs(limit, all);
    return NextResponse.json({
      success: true,
      source: result.source,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST: Menambah blog baru (Khusus Admin)
export async function POST(request) {
  const user = verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Akses ditolak. Silakan login kembali.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !title.trim() || !content || !content.trim()) {
      return NextResponse.json({ success: false, message: 'Judul dan isi artikel wajib diisi' }, { status: 400 });
    }

    const result = await createBlog(body);

    return NextResponse.json({
      success: true,
      message: 'Artikel berhasil disimpan',
      id: result.id,
      slug: result.slug,
      blog: result.blog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
