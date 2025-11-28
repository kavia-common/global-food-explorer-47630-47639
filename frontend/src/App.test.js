import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders home title', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(screen.getByText(/Discover world cuisines/i)).toBeInTheDocument();
});
