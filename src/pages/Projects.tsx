import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { useScheduleModal } from '@/hooks/use-schedule-modal';

const projects = [
  {
    title: 'Residência Moderna Vila Nova',
    category: 'Construção Residencial',
    description: 'Projeto contemporâneo com 450m² de área construída, integrando espaços e maximizando iluminação natural.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    details: {
      area: '450m²',
      duration: '12 meses',
      location: 'São Paulo, SP',
    }
  },
  {
    title: 'Edifício Comercial Paulista',
    category: 'Projeto Comercial',
    description: 'Reforma completa de edifício comercial com 12 andares, incluindo modernização de fachada e áreas comuns.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    details: {
      area: '2800m²',
      duration: '18 meses',
      location: 'São Paulo, SP',
    }
  },
  {
    title: 'Casa de Campo Serra',
    category: 'Construção Residencial',
    description: 'Projeto residencial sustentável com aproveitamento de recursos naturais e integração com a natureza.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80',
    details: {
      area: '380m²',
      duration: '10 meses',
      location: 'Campos do Jordão, SP',
    }
  },
  {
    title: 'Apartamento Luxo Jardins',
    category: 'Reforma',
    description: 'Reforma completa de apartamento de alto padrão com acabamentos premium e automação residencial.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
    details: {
      area: '280m²',
      duration: '6 meses',
      location: 'São Paulo, SP',
    }
  },
];

export function Projects() {
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
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            Nossos Projetos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Conheça alguns dos nossos projetos executados e inspire-se para 
            sua próxima construção ou reforma.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-sm font-medium text-primary-foreground/80 bg-primary/80 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-muted-foreground">Área</span>
                      <p className="font-semibold">{project.details.area}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Duração</span>
                      <p className="font-semibold">{project.details.duration}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Local</span>
                      <p className="font-semibold">{project.details.location}</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={openModal}
                  >
                    Quero um Projeto Assim
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Transformando Sonhos em Realidade
          </h2>
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl italic text-muted-foreground">
              "A Soba Construção Civil superou todas as nossas expectativas. 
              O profissionalismo da equipe, a qualidade do trabalho e o cumprimento 
              dos prazos foram impressionantes. Recomendo fortemente!"
            </blockquote>
            <p className="mt-4 font-semibold">
              Maria Silva
            </p>
            <p className="text-sm text-muted-foreground">
              Projeto Residencial - São Paulo, SP
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Iniciar seu Projeto?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Transforme sua visão em realidade com a expertise da Soba Construção Civil.
            Agende uma consulta e comece seu projeto hoje mesmo.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={openModal}
            className="bg-white text-primary hover:bg-white/90"
          >
            Agendar Consulta Gratuita
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}