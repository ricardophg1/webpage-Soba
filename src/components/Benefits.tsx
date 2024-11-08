import { CheckCircle2, Clock, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const benefits = [
  {
    icon: <Clock className="h-12 w-12 text-primary" />,
    title: 'Economia de Tempo',
    description: 'Reduza o tempo de planejamento e execução com nossa plataforma inteligente.',
  },
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: 'Garantia de Qualidade',
    description: 'Profissionais verificados e materiais de primeira linha para seu projeto.',
  },
  {
    icon: <CheckCircle2 className="h-12 w-12 text-primary" />,
    title: 'Transparência Total',
    description: 'Acompanhe cada etapa do seu projeto com relatórios detalhados em tempo real.',
  },
  {
    icon: <Sparkles className="h-12 w-12 text-primary" />,
    title: 'Resultados Excepcionais',
    description: 'Transformamos suas ideias em espaços extraordinários que superam expectativas.',
  },
];

export function Benefits() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Por Que Escolher a Soba Construção Civil?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções completas e inovadoras para transformar seus sonhos em realidade.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}