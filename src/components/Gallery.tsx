import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    id: 1,
    title: 'Residência Moderna',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    description: 'Projeto residencial contemporâneo',
  },
  {
    id: 2,
    title: 'Escritório Corporativo',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    description: 'Reforma completa de ambiente corporativo',
  },
  {
    id: 3,
    title: 'Área de Lazer',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
    description: 'Projeto de área externa e paisagismo',
  },
  {
    id: 4,
    title: 'Apartamento Premium',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80',
    description: 'Reforma e decoração de apartamento de luxo',
  },
  {
    id: 5,
    title: 'Casa de Campo',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80',
    description: 'Projeto residencial em área rural',
  },
];

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-background overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
    >
      <div ref={inViewRef} className="max-w-7xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Nossos Projetos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore nossa galeria de projetos executados e inspire-se para sua
            próxima transformação.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          style={{ x }}
          className="flex gap-8 w-fit"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative group w-[400px] flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-200">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}