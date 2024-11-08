import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoTutorialProps {
  onComplete: () => void;
}

export function VideoTutorial({ onComplete }: VideoTutorialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [canSkip, setCanSkip] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setCanSkip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    onComplete();
  };

  const handleSkip = () => {
    if (canSkip) {
      onComplete();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onComplete]);

  return (
    <div className="space-y-6">
      <div className="aspect-video relative rounded-lg overflow-hidden bg-black">
        <iframe
          ref={videoRef}
          className="w-full h-full"
          src="https://www.youtube.com/embed/VIDEO_ID?autoplay=0&controls=1&rel=0&modestbranding=1&enablejsapi=1"
          title="Tutorial Soba Construções"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsPlaying(true)}
            >
              <Play className="mr-2 h-5 w-5" />
              Assistir Tutorial
            </Button>
          </div>
        )}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {canSkip && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-black/60 hover:bg-black/40"
              onClick={handleSkip}
            >
              <SkipForward className="mr-2 h-4 w-4" />
              Pular Tutorial
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            className="bg-black/60 hover:bg-black/40"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">
          Guia Rápido: Conheça Nossa Plataforma
        </h3>
        <p className="text-muted-foreground">
          Assista este breve tutorial para conhecer todos os recursos disponíveis.
          O botão "Pular" estará disponível em alguns segundos.
        </p>
        {progress > 0 && (
          <div className="w-full bg-secondary h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}