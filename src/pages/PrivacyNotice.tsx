import { Shield, Lock, UserCheck, Eye, Key, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { useRegisterModal } from '@/hooks/use-register-modal';
import { RegisterModal } from '@/components/RegisterModal';
import { Card } from '@/components/ui/card';

export function PrivacyNotice() {
  const { openModal } = useRegisterModal();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-primary text-primary-foreground py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 transform scale-110" 
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Lock className="h-16 w-16 text-primary-foreground opacity-90" />
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">Política de Privacidade</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Entenda como tratamos suas informações pessoais e garantimos sua privacidade em nossa plataforma.
          </p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <Lock className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Privacidade Garantida</h3>
            <p className="text-muted-foreground">Seus dados são protegidos com as mais avançadas tecnologias</p>
          </Card>
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Segurança Total</h3>
            <p className="text-muted-foreground">Sistemas de proteção e monitoramento 24/7</p>
          </Card>
          <Card className="p-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <UserCheck className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Controle de Dados</h3>
            <p className="text-muted-foreground">Você decide como seus dados são utilizados</p>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <Eye className="h-8 w-8" />
              Nosso Compromisso com sua Privacidade
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Na Soba Construção Civil, entendemos que a privacidade é um direito fundamental. Nossa política de privacidade foi desenvolvida para garantir a transparência no tratamento de suas informações e assegurar que você tenha total controle sobre seus dados pessoais.
            </p>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <Database className="h-8 w-8" />
              Informações que Coletamos
            </h2>
            <div className="space-y-6">
              <div className="bg-secondary/10 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Dados de Cadastro</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Nome completo e documentos de identificação</li>
                  <li>Endereço de e-mail e telefone</li>
                  <li>Endereço residencial ou comercial</li>
                </ul>
              </div>
              <div className="bg-secondary/10 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Dados de Uso</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Interações com a plataforma</li>
                  <li>Preferências e configurações</li>
                  <li>Histórico de projetos e orçamentos</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
              <Key className="h-8 w-8" />
              Como Protegemos seus Dados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Criptografia de dados em repouso e em trânsito',
                'Firewalls e sistemas de detecção de intrusão',
                'Backups regulares e redundância de dados',
                'Controle de acesso rigoroso',
                'Monitoramento contínuo de segurança',
                'Atualizações regulares de segurança'
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
              <UserCheck className="h-8 w-8" />
              Seus Direitos
            </h2>
            <div className="space-y-4">
              {[
                'Acesso aos seus dados pessoais',
                'Correção de informações incorretas',
                'Exclusão de dados mediante solicitação',
                'Portabilidade para outros serviços',
                'Revogação de consentimento'
              ].map((item) => (
                <div key={item} className="flex items-center bg-secondary/10 p-4 rounded-lg">
                  <UserCheck className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-secondary/80 to-secondary rounded-2xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-6">
            Sua Privacidade é Nossa Prioridade
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
            Comece a transformar seus sonhos em realidade com a segurança de que seus dados estão protegidos.
          </p>
          <Button 
            size="lg" 
            onClick={openModal}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg h-auto"
          >
            Comece Agora com Segurança
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mt-8 text-center">
          Última atualização: 15 de março de 2024
        </div>
      </div>
      <Footer />
      <RegisterModal />
    </div>
  );
}