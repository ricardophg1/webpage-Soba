import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboardingModal } from '@/hooks/use-onboarding-modal';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { VideoTutorial } from '@/components/VideoTutorial';

const sourceOptions = [
  'YouTube',
  'Google/Mecanismos de Busca',
  'Instagram',
  'TikTok',
  'Facebook',
  'Twitter',
  'LinkedIn',
  'Reddit',
  'Eventos/Workshops/Webinars',
  'Blog/Fóruns',
  'Amigos',
  'Boca a Boca',
  'Outro',
];

const professionOptions = [
  'Arquiteto',
  'Designer de Interiores',
  'Engenheiro Civil',
  'Construtor',
  'Incorporador',
  'Corretor de Imóveis',
  'Decorador',
  'Estudante',
  'Outro',
];

const focusAreaOptions = [
  'Residencial',
  'Comercial',
  'Industrial',
  'Hotelaria',
  'Educacional',
  'Saúde',
  'Varejo',
  'Outro',
];

export function OnboardingModal() {
  const { isOpen, closeModal, step, nextStep, previousStep } = useOnboardingModal();
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [selectedFocusArea, setSelectedFocusArea] = useState<string>('');
  const [otherSource, setOtherSource] = useState('');
  const [otherProfession, setOtherProfession] = useState('');
  const [otherFocusArea, setOtherFocusArea] = useState('');
  const { toast } = useToast();

  const handleComplete = async () => {
    try {
      const userData = {
        source: selectedSource === 'Outro' ? otherSource : selectedSource,
        profession: selectedProfession === 'Outro' ? otherProfession : selectedProfession,
        focusArea: selectedFocusArea === 'Outro' ? otherFocusArea : selectedFocusArea,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem('userPreferences', JSON.stringify(userData));
      nextStep();
    } catch (error) {
      toast({
        title: 'Erro ao configurar perfil',
        description: 'Por favor, tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handleTutorialComplete = () => {
    toast({
      title: 'Bem-vindo à Soba Construções!',
      description: 'Agora você pode explorar todos os nossos recursos.',
    });
    closeModal();
  };

  const isNextDisabled = () => {
    if (step === 1) {
      return !selectedSource || (selectedSource === 'Outro' && !otherSource);
    }
    if (step === 2) {
      return !selectedProfession || (selectedProfession === 'Outro' && !otherProfession);
    }
    if (step === 3) {
      return !selectedFocusArea || (selectedFocusArea === 'Outro' && !otherFocusArea);
    }
    return false;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Como você conheceu a Soba Construções?</DialogTitle>
              <DialogDescription>
                Selecione a opção que melhor descreve como você nos encontrou
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-4">
              {sourceOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedSource === option ? 'default' : 'outline'}
                  className={cn(
                    'w-full justify-start',
                    selectedSource === option && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => setSelectedSource(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            {selectedSource === 'Outro' && (
              <div className="mt-4">
                <Input
                  placeholder="Digite como nos conheceu..."
                  value={otherSource}
                  onChange={(e) => setOtherSource(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Qual é a sua profissão?</DialogTitle>
              <DialogDescription>
                Selecione a opção que melhor descreve sua atividade profissional
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-4">
              {professionOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedProfession === option ? 'default' : 'outline'}
                  className={cn(
                    'w-full justify-start',
                    selectedProfession === option && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => setSelectedProfession(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            {selectedProfession === 'Outro' && (
              <div className="mt-4">
                <Input
                  placeholder="Digite sua profissão..."
                  value={otherProfession}
                  onChange={(e) => setOtherProfession(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </>
        );
      case 3:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Qual sua área de atuação?</DialogTitle>
              <DialogDescription>
                Selecione a área em que você mais atua profissionalmente
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-4">
              {focusAreaOptions.map((option) => (
                <Button
                  key={option}
                  variant={selectedFocusArea === option ? 'default' : 'outline'}
                  className={cn(
                    'w-full justify-start',
                    selectedFocusArea === option && 'bg-primary text-primary-foreground'
                  )}
                  onClick={() => setSelectedFocusArea(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            {selectedFocusArea === 'Outro' && (
              <div className="mt-4">
                <Input
                  placeholder="Digite sua área de atuação..."
                  value={otherFocusArea}
                  onChange={(e) => setOtherFocusArea(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </>
        );
      case 4:
        return <VideoTutorial onComplete={handleTutorialComplete} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        {renderStep()}
        {step < 4 && (
          <>
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button variant="outline" onClick={previousStep}>
                  Voltar
                </Button>
              )}
              <div className="flex-1" />
              {step < 3 ? (
                <Button onClick={nextStep} disabled={isNextDisabled()}>
                  Próximo
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={isNextDisabled()}
                  className="bg-primary hover:bg-primary/90"
                >
                  Concluir
                </Button>
              )}
            </div>
            <div className="w-full bg-secondary h-2 rounded-full mt-6">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}