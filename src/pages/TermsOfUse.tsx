import { ArrowLeft, CheckCircle2, Scroll, Shield, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner with Parallax Effect */}
      <div className="relative bg-primary text-primary-foreground py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 transform scale-110" 
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Scroll className="h-16 w-16 text-primary-foreground opacity-90" />
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">Termos de Uso</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Transparência e confiança são os pilares do nosso relacionamento. 
            Conheça seus direitos e responsabilidades.
          </p>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Aceitação dos Termos</h3>
            <p className="text-muted-foreground">Entenda as condições de uso da nossa plataforma</p>
          </Card>
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Seus Direitos</h3>
            <p className="text-muted-foreground">Conheça seus direitos e proteções como usuário</p>
          </Card>
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <Scale className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Responsabilidades</h3>
            <p className="text-muted-foreground">Saiba mais sobre suas responsabilidades</p>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">1. Aceitação dos Termos</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ao acessar e utilizar a plataforma Soba Construção Civil, você concorda em cumprir e estar vinculado aos seguintes termos e condições. Se você não concordar com qualquer parte destes termos, por favor, não utilize nossos serviços.
            </p>
            <div className="bg-secondary/30 p-6 rounded-xl border border-secondary mb-6">
              <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
              <p className="text-sm text-gray-600">
                Ao se cadastrar, você confirma que leu e aceitou todos os termos apresentados.
              </p>
            </div>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">2. Serviços Oferecidos</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A Soba Construção Civil oferece uma plataforma digital para gerenciamento de projetos de construção, reforma e decoração, incluindo:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Orçamentos personalizados',
                'Acompanhamento em tempo real de obras',
                'Comunicação direta com profissionais',
                'Gestão de cronogramas e materiais'
              ].map((item) => (
                <div key={item} className="flex items-center p-4 bg-secondary/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">3. Responsabilidades do Usuário</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ao utilizar nossa plataforma, você se compromete a:
            </p>
            <div className="space-y-4">
              {[
                'Fornecer informações verdadeiras e atualizadas',
                'Manter a confidencialidade de suas credenciais de acesso',
                'Utilizar a plataforma de acordo com a legislação vigente',
                'Respeitar os direitos de propriedade intelectual'
              ].map((item) => (
                <div key={item} className="flex items-center bg-secondary/10 p-4 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">4. Propriedade Intelectual</h2>
            <p className="text-gray-600 leading-relaxed">
              Todo o conteúdo disponível na plataforma Soba Construção Civil, incluindo mas não se limitando a textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é de propriedade da Soba Construção Civil ou de seus fornecedores de conteúdo e está protegido pelas leis brasileiras e internacionais de propriedade intelectual.
            </p>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary">5. Limitação de Responsabilidade</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A Soba Construção Civil se esforça para manter a plataforma funcionando de maneira estável e segura, mas não pode garantir a ausência total de problemas técnicos. Não nos responsabilizamos por:
            </p>
            <div className="space-y-4">
              {[
                'Interrupções temporárias do serviço',
                'Perdas de dados devido a falhas de conexão',
                'Danos indiretos decorrentes do uso da plataforma'
              ].map((item) => (
                <div key={item} className="flex items-center bg-secondary/10 p-4 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="text-sm text-muted-foreground mt-8 text-center">
          Última atualização: 15 de março de 2024
        </div>
      </div>
    </div>
  );
}