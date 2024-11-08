import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Pencil,
  Eraser,
  Undo,
  Redo,
  Save,
  Download,
  Settings,
  Loader,
  MessageSquare,
  Upload,
  X,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIChat } from '@/components/AIChat';
import { searchImages, generateDesigns, ImageResult } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const tools = [
  { id: 'pencil', icon: <Pencil className="h-4 w-4" />, label: 'Desenho Livre' },
  { id: 'eraser', icon: <Eraser className="h-4 w-4" />, label: 'Borracha' },
  { id: 'upload', icon: <Upload className="h-4 w-4" />, label: 'Enviar Arquivo' },
];

const acceptedFileTypes = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
};

export function DesignWorkspace() {
  const [selectedTool, setSelectedTool] = useState('pencil');
  const [isGenerating, setIsGenerating] = useState(false);
  const [strokeSize, setStrokeSize] = useState(2);
  const [prompt, setPrompt] = useState('');
  const [generatedDesigns, setGeneratedDesigns] = useState<ImageResult[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      Object.keys(acceptedFileTypes).includes(file.type)
    );

    if (validFiles.length === 0) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, envie apenas arquivos PNG ou JPEG.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (canvas && ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt vazio",
        description: "Por favor, descreva o que você quer gerar.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      const results = await Promise.all([
        generateDesigns(prompt, uploadedFiles[0]),
        searchImages(prompt),
      ]);

      const allDesigns = [...results[0], ...results[1]];
      setGeneratedDesigns(allDesigns);
      setIsChatOpen(true);

    } catch (error) {
      toast({
        title: "Erro ao gerar designs",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao gerar os designs.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const downloadDesign = async (design: ImageResult) => {
    try {
      const response = await fetch(design.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-${design.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Erro ao baixar",
        description: "Não foi possível baixar o design.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Toolbar */}
      <div className="w-16 border-r bg-card p-2 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackToHome}
          className="w-full aspect-square mb-4"
          title="Voltar para página inicial"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={selectedTool === tool.id ? 'default' : 'ghost'}
            size="icon"
            onClick={() => {
              setSelectedTool(tool.id);
              if (tool.id === 'upload') {
                fileInputRef.current?.click();
              }
            }}
            className="w-full aspect-square"
          >
            {tool.icon}
          </Button>
        ))}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept={Object.entries(acceptedFileTypes)
            .map(([type, exts]) => exts.join(','))
            .join(',')}
          onChange={handleFileInput}
        />
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="w-full aspect-square">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex items-center gap-4">
          <Input
            placeholder="Descreva o que você quer criar..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            className="max-w-xl"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={cn(
              "min-w-[120px]",
              isGenerating && "bg-primary/80"
            )}
          >
            {isGenerating ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              'Gerar'
            )}
          </Button>
        </div>

        <div className="flex-1 flex">
          {/* Drawing Area */}
          <div className="flex-1 p-4">
            <div
              className="relative w-full h-full bg-white rounded-lg shadow-sm overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              {uploadedFiles.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4" />
                    <p>Arraste e solte arquivos aqui ou use o botão de upload</p>
                    <p className="text-sm mt-2">
                      Suporta PNG e JPEG
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generated Results */}
          {generatedDesigns.length > 0 && (
            <div className="w-80 border-l p-4 space-y-4">
              <h3 className="font-semibold">Designs Gerados</h3>
              <div className="space-y-4">
                {generatedDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="relative aspect-video rounded-lg overflow-hidden group"
                  >
                    <img
                      src={design.url}
                      alt={design.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => downloadDesign(design)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Toolbar */}
        <div className="border-t p-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Tamanho:</span>
            <Slider
              value={[strokeSize]}
              onValueChange={([value]) => setStrokeSize(value)}
              min={1}
              max={20}
              step={1}
              className="w-32"
            />
          </div>
          {uploadedFiles.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Arquivos:</span>
              <div className="flex gap-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                  >
                    <span className="text-xs truncate max-w-[100px]">
                      {file.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex-1" />
          <Button variant="outline" size="sm">
            <Undo className="h-4 w-4 mr-2" />
            Desfazer
          </Button>
          <Button variant="outline" size="sm">
            <Redo className="h-4 w-4 mr-2" />
            Refazer
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
          <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
            <SheetTrigger asChild>
              <Button variant="default">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat com IA
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Assistente Virtual</SheetTitle>
              </SheetHeader>
              <AIChat />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}