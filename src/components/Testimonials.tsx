import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Ana Silva',
    project: 'Reforma Residencial',
    text: 'Excelente trabalho! A equipe foi muito profissional e o resultado superou minhas expectativas.',
  },
  {
    name: 'Carlos Santos',
    project: 'Construção Comercial',
    text: 'O acompanhamento em tempo real foi fundamental para manter tudo sob controle. Recomendo!',
  },
  {
    name: 'Marina Costa',
    project: 'Decoração de Interiores',
    text: 'O projeto ficou incrível! Cada detalhe foi pensado com muito cuidado e atenção.',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          O Que Nossos Clientes Dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="p-6 flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.text}"
                </p>
              </div>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.project}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}