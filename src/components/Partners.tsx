import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Award, Users2, BadgeCheck } from 'lucide-react';

const partners = [
  {
    logo: <Building2 className="h-12 w-12" />,
    type: 'Construtoras Premium',
    description: 'Empresas especializadas em construções de alto padrão com décadas de experiência',
  },
  {
    logo: <Award className="h-12 w-12" />,
    type: 'Designers de Interiores',
    description: 'Profissionais renomados em design e decoração de ambientes exclusivos',
  },
  {
    logo: <Users2 className="h-12 w-12" />,
    type: 'Escritórios de Arquitetura',
    description: 'Arquitetos premiados com projetos inovadores e sustentáveis',
  },
  {
    logo: <BadgeCheck className="h-12 w-12" />,
    type: 'Especialistas em Automação',
    description: 'Líderes em soluções tecnológicas para residências inteligentes',
  },
];

export function Partners() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Parceiros de Excelência</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trabalhamos com os melhores do mercado para garantir resultados excepcionais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.type}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-primary">{partner.logo}</div>
                <h3 className="text-xl font-semibold mb-4">{partner.type}</h3>
                <p className="text-muted-foreground">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}