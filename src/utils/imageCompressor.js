/**
 * Image compressor utility for Viksit Shetkari.
 * Accepts image files up to 1MB, compresses via HTML Canvas to ~200KB base64.
 * Returns { success: boolean, data?: string, error?: string }
 */
export async function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
  return new Promise((resolve) => {
    if (!file) {
      return resolve({ success: false, error: 'No image file provided' });
    }

    // Check MIME type
    if (!file.type || !file.type.startsWith('image/')) {
      return resolve({
        success: false,
        error: 'Please upload a valid image file (JPEG, PNG, or WebP).',
      });
    }

    // Check file size (max 1MB input)
    const MAX_SIZE = 1 * 1024 * 1024; // 1MB
    if (file.size > MAX_SIZE) {
      return resolve({
        success: false,
        error: 'Image file exceeds 1MB limit. Please choose a smaller photo.',
      });
    }

    const reader = new FileReader();
    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read image file.' });
    };

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = () => {
        resolve({ success: false, error: 'Failed to parse image data.' });
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-preserving dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve({ success: false, error: 'Canvas context unavailable.' });
        }

        ctx.drawImage(img, 0, 0, width, height);
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve({ success: true, data: dataUrl });
        } catch {
          resolve({ success: false, error: 'Failed to encode compressed image.' });
        }
      };

      img.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  });
}
