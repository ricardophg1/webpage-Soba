import { Shield, Lock, UserCheck, Eye, Key, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Banner with Parallax Effect */}
      <div className="relative bg-primary text-primary-foreground py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 transform scale-110" 
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-primary-foreground opacity-90" />
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">Política de Proteção de Dados</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Seu direito à privacidade é nossa prioridade absoluta. 
            Conheça como protegemos seus dados.
          </p>
        </div>
      </div>

      {/* Enhanced LGPD Highlights */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Conformidade LGPD</h3>
            <p className="text-muted-foreground">Total adequação à Lei Geral de Proteção de Dados</p>
          </Card>
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <Lock className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Dados Seguros</h3>
            <p className="text-muted-foreground">Criptografia avançada e proteção contínua</p>
          </Card>
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <UserCheck className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Seus Direitos</h3>
            <p className="text-muted-foreground">Controle total sobre seus dados pessoais</p>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <Eye className="h-8 w-8" />
              1. Introdução
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A Soba Construção Civil está comprometida com a proteção da sua privacidade e de seus dados pessoais. Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <Database className="h-8 w-8" />
              2. Dados que Coletamos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">Coletamos os seguintes tipos de informações:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Dados de identificação (nome, CPF, RG)',
                'Informações de contato (email, telefone, endereço)',
                'Dados de uso da plataforma',
                'Informações de projetos e preferências'
              ].map((item) => (
                <div key={item} className="flex items-center p-4 bg-secondary/20 rounded-lg">
                  <Shield className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <Key className="h-8 w-8" />
              3. Como Utilizamos seus Dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">Seus dados são utilizados para:</p>
            <div className="space-y-4">
              {[
                'Fornecer nossos serviços de construção e reforma',
                'Melhorar sua experiência na plataforma',
                'Enviar atualizações sobre seus projetos',
                'Cumprir obrigações legais e contratuais'
              ].map((item) => (
                <div key={item} className="flex items-center bg-secondary/10 p-4 rounded-lg">
                  <Lock className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <UserCheck className="h-8 w-8" />
              4. Seus Direitos (LGPD)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">Conforme a LGPD, você tem direito a:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Acessar seus dados pessoais',
                'Corrigir dados incompletos ou desatualizados',
                'Solicitar a exclusão de seus dados',
                'Revogar seu consentimento',
                'Solicitar a portabilidade dos dados'
              ].map((item) => (
                <div key={item} className="flex items-center p-4 bg-secondary/20 rounded-lg">
                  <UserCheck className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <Shield className="h-8 w-8" />
              5. Segurança dos Dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Implementamos medidas técnicas e organizacionais para proteger seus dados, incluindo:
            </p>
            <div className="space-y-4">
              {[
                'Criptografia de ponta a ponta',
                'Controles de acesso rigorosos',
                'Monitoramento contínuo de segurança',
                'Backups regulares e seguros'
              ].map((item) => (
                <div key={item} className="flex items-center bg-secondary/10 p-4 rounded-lg">
                  <Lock className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <UserCheck className="h-8 w-8" />
              6. Contato do DPO
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de seus dados, entre em contato com nosso Encarregado de Proteção de Dados (DPO):
            </p>
            <div className="bg-secondary/30 p-6 rounded-xl border border-secondary">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold">Nosso DPO está à sua disposição</span>
              </div>
              <p className="mb-2 text-gray-600">Email: antoniotopvil@gmail.com</p>
              <p className="text-gray-600">Telefone: (41) 98723-6763</p>
            </div>
          </section>

          <div className="text-sm text-muted-foreground mt-8 text-center">
            Última atualização: 15 de março de 2024
          </div>
        </div>
      </div>
    </div>
  );
}