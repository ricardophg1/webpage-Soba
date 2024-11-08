import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Pencil, Wrench, ClipboardCheck, Home } from 'lucide-react';

const steps = [
  {
    icon: <Pencil className="h-8 w-8" />,
    title: 'Planejamento',
    description: 'Desenvolvemos um plano detalhado baseado em suas necessidades e objetivos.',
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: 'Execução',
    description: 'Nossa equipe qualificada transforma o projeto em realidade com precisão.',
  },
  {
    icon: <ClipboardCheck className="h-8 w-8" />,
    title: 'Controle',
    description: 'Monitoramento constante para garantir qualidade e cumprimento de prazos.',
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: 'Entrega',
    description: 'Seu projeto concluído com excelência e pronto para ser aproveitado.',
  },
];

export function Process() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Como Trabalhamos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Um processo simplificado e eficiente para transformar seus sonhos em realidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 left-full w-full">
                  <ArrowRight className="w-8 h-8 text-primary/30 -translate-x-1/2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}