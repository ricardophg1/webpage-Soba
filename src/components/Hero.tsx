import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScheduleModal } from '@/hooks/use-schedule-modal';

export function Hero() {
  const { openModal: openScheduleModal } = useScheduleModal();

  return (
    <section
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Transformamos Visões em Realidade
        </h1>
        <p className="text-xl sm:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
          Construção, Reforma e Decoração sem Complicação
        </p>
        <Button 
          size="lg" 
          className="bg-white hover:bg-white/90 text-primary hover:text-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={openScheduleModal}
        >
          Agendar Visita
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}