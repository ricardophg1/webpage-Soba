import { useState } from 'react';
import { searchImages, generateDesign } from '@/lib/api';
import { processImage } from '@/lib/image-processing';

interface UseImageGenerationOptions {
  onSuccess?: (images: string[]) => void;
  onError?: (error: Error) => void;
}

export function useImageGeneration(options: UseImageGenerationOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const generate = async (prompt: string, referenceImage?: File) => {
    try {
      setIsLoading(true);
      setError(null);

      let images: string[] = [];

      if (referenceImage) {
        // Process reference image before sending
        const processedImage = await processImage(referenceImage, {
          width: 1024,
          height: 1024,
          format: 'png',
          quality: 0.9,
        });

        // Generate designs based on reference
        const generatedImages = await generateDesign(prompt, referenceImage);
        images = [...generatedImages];
      }

      // Search for additional inspiration images
      const searchResults = await searchImages(prompt);
      images = [...images, ...searchResults];

      setResults(images);
      options.onSuccess?.(images);
    } catch (error) {
      const errorMessage = error instanceof Error ? error : new Error('Failed to generate images');
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading,
    error,
    results,
  };
}