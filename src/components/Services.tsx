import { Building2, Paintbrush, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: <Building2 className="h-8 w-8 text-primary" />,
    title: 'Construção',
    description:
      'Projetos residenciais e comerciais executados com excelência e dentro do prazo.',
  },
  {
    icon: <Paintbrush className="h-8 w-8 text-primary" />,
    title: 'Reforma',
    description:
      'Transformamos seu espaço com reformas planejadas e acabamento impecável.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Decoração',
    description:
      'Design de interiores personalizado para criar ambientes únicos e funcionais.',
  },
];

export function Services() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}