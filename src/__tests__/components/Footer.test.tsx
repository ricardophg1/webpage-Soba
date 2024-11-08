import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders the about section', () => {
    expect(screen.getByText(/Sobre Nós/i)).toBeInTheDocument();
    expect(screen.getByText(/Transformando sonhos em realidade/i)).toBeInTheDocument();
  });

  it('renders quick links', () => {
    expect(screen.getByText(/Links Rápidos/i)).toBeInTheDocument();
    expect(screen.getByText(/Serviços/i)).toBeInTheDocument();
    expect(screen.getByText(/Projetos/i)).toBeInTheDocument();
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    expect(screen.getByText(/antoniotopvil@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\(41\) 98723-6763/i)).toBeInTheDocument();
    expect(screen.getByText(/Curitiba - PR/i)).toBeInTheDocument();
  });

  it('renders newsletter section', () => {
    expect(screen.getByText(/Newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Assinar/i })).toBeInTheDocument();
  });

  it('renders copyright information', () => {
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Adsumtec Tecnologia/i)).toBeInTheDocument();
  });
});