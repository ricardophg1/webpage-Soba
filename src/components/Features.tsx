import { Clock, Brain, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScheduleModal } from '@/hooks/use-schedule-modal';

const features = [
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Acompanhamento em Tempo Real',
    description: 'Monitore o progresso do seu projeto a qualquer momento.',
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: 'IA Integrada',
    description: 'Otimização inteligente de recursos e processos.',
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'Relatórios Detalhados',
    description: 'Análises completas e transparentes do seu projeto.',
  },
];

export function Features() {
  const { openModal } = useScheduleModal();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Recursos Inteligentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={openModal}
            className="bg-primary hover:bg-primary/90 text-white font-semibold"
          >
            Agendar Visita
          </Button>
        </div>
      </div>
    </section>
  );
}