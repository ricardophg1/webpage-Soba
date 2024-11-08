import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.querySelector('main')).toBeInTheDocument();
  });

  it('renders the navigation component', () => {
    render(<App />);
    expect(screen.getByText(/Soba Construção Civil/i)).toBeInTheDocument();
  });

  it('renders the footer component', () => {
    render(<App />);
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();
  });
});