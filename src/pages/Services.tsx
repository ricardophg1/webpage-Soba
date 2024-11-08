import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { useScheduleModal } from '@/hooks/use-schedule-modal';

const services = [
  {
    title: 'Construção Residencial',
    description: 'Transforme seu sonho em realidade com projetos residenciais exclusivos e personalizados.',
    features: [
      'Projetos arquitetônicos personalizados',
      'Gerenciamento completo da obra',
      'Acabamentos premium',
      'Garantia estrutural',
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
  },
  {
    title: 'Reforma e Renovação',
    description: 'Renove seus espaços com soluções modernas e funcionais que valorizam seu imóvel.',
    features: [
      'Planejamento detalhado',
      'Execução precisa',
      'Materiais de qualidade',
      'Prazo garantido',
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
  },
  {
    title: 'Projetos Comerciais',
    description: 'Espaços comerciais que impressionam e maximizam o potencial do seu negócio.',
    features: [
      'Design estratégico',
      'Otimização de espaço',
      'Soluções sustentáveis',
      'Conformidade com normas',
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
  },
];

export function Services() {
  const { openModal } = useScheduleModal();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            Nossos Serviços
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Soluções completas em construção e reforma, com excelência e compromisso 
            em cada detalhe do seu projeto.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full"
                    onClick={openModal}
                  >
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Transformar seu Espaço?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Nossa equipe está pronta para tornar seu projeto realidade. 
            Agende uma visita técnica gratuita e comece sua transformação hoje.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={openModal}
            className="bg-white text-primary hover:bg-white/90"
          >
            Agendar Visita Técnica
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}