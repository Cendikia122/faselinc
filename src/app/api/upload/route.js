import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdmin } from '@/lib/auth';

export async function POST(request) {
  const user = verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Akses ditolak' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'File tidak ditemukan' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/jpeg';
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    // 1. Coba simpan ke file lokal di folder public (berlaku di localhost / cPanel / VPS)
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'assets', 'img', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const ext = path.extname(file.name) || '.jpg';
      const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `${cleanName}_${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        message: 'Upload berhasil',
        fileName,
        url: `/assets/img/uploads/${fileName}`,
      });
    } catch (fsError) {
      // 2. Jika EROFS (Read-only filesystem seperti di Vercel Serverless), gunakan Data URL
      console.warn('[Upload] Filesystem read-only (Serverless Vercel). Beralih ke Data URL:', fsError.message);

      return NextResponse.json({
        success: true,
        message: 'Upload berhasil (Cloud Data URL)',
        fileName: file.name,
        url: dataUrl,
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
