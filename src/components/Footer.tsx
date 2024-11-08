import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Sobre Nós</h3>
            <p className="text-muted-foreground">
              Transformando sonhos em realidade através de projetos excepcionais e
              execução impecável.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicos" className="text-muted-foreground hover:text-primary">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="text-muted-foreground hover:text-primary">
                  Projetos
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>antoniotopvil@gmail.com</li>
              <li>(41) 98723-6763</li>
              <li>Curitiba - PR</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Receba novidades e dicas exclusivas.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-3 py-2 rounded-md border"
              />
              <Button>Assinar</Button>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <div>
            © 2024 <a href="https://www.adsumtec.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Adsumtec Tecnologia</a>. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/termos" className="hover:text-primary">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-primary">Política de Proteção de Dados</Link>
            <Link to="/politica-de-privacidade" className="hover:text-primary">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}