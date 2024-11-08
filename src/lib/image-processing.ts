export interface ImageProcessingOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png';
}

export async function processImage(
  file: File,
  options: ImageProcessingOptions = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      try {
        const width = options.width || img.width;
        const height = options.height || img.height;

        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }

        // Draw image with white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to desired format
        const format = options.format || 'jpeg';
        const quality = options.quality || 0.9;
        const dataUrl = canvas.toDataURL(`image/${format}`, quality);

        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

export function resizeKeepAspectRatio(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
  return {
    width: Math.round(originalWidth * ratio),
    height: Math.round(originalHeight * ratio),
  };
}