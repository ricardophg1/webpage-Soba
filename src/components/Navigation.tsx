import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScheduleModal } from '@/hooks/use-schedule-modal';

export function Navigation() {
  const { openModal } = useScheduleModal();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo on the left */}
        <Link to="/" className="flex items-center space-x-2 ml-8">
          <span className="font-bold text-lg">Soba Construção Civil</span>
        </Link>

        {/* Centered navigation links */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex gap-8">
            <Link 
              to="/servicos" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Serviços
            </Link>
            <Link 
              to="/projetos" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projetos
            </Link>
            <Link 
              to="/contato" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contato
            </Link>
          </div>
        </div>

        {/* Button on the right */}
        <div className="flex items-center">
          <Button onClick={openModal}>Agendar Visita</Button>
        </div>
      </div>
    </nav>
  );
}