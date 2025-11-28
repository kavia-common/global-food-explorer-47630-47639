import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

test('renders Home by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Discover world cuisines/i)).toBeInTheDocument();
});

test('navigates to Browse route', () => {
  render(
    <MemoryRouter initialEntries={['/browse']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Adjust filters/i)).toBeInTheDocument();
});
