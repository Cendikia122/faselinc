/**
 * Helper kompresi gambar otomatis di sisi browser (client-side).
 * Menjadwalkan resize dan kompresi JPEG agar ukuran file menjadi ringan (~80-150 KB)
 * sehingga upload kilat dan aman untuk serverless Vercel maupun database MySQL.
 */
export async function compressImage(file, maxWidth = 1200, maxHeight = 800, quality = 0.8) {
  if (typeof window === 'undefined' || !file || !file.type || !file.type.startsWith('image/')) {
    return file;
  }

  // Jika ukuran file sudah sangat kecil (< 80KB) dan bukan tipe berat, tidak perlu kompres
  if (file.size < 80 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob && (blob.size < file.size || file.size > 200 * 1024)) {
                const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    } catch (e) {
      console.warn('Image compression fallback:', e);
      resolve(file);
    }
  });
}
