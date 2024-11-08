import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { Navigation } from '@/components/Navigation';

describe('Navigation', () => {
  beforeEach(() => {
    render(<Navigation />);
  });

  it('renders the company name', () => {
    expect(screen.getByText(/Soba Construção Civil/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    expect(screen.getByText(/Serviços/i)).toBeInTheDocument();
    expect(screen.getByText(/Projetos/i)).toBeInTheDocument();
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();
  });

  it('renders the schedule button', () => {
    const button = screen.getByRole('button', { name: /Agendar Visita/i });
    expect(button).toBeInTheDocument();
  });
});