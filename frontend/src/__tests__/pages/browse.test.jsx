import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Browse from '../../../src/pages/Browse';

jest.mock('../../../src/services/apiClient', () => ({
  apiClient: {
    getDishes: jest.fn().mockResolvedValue({ items: [{ id: '1', name: 'Dish', image: '', tags: [] }], total: 24 })
  }
}));

test('renders filters and pagination', async () => {
  render(<Browse />);
  expect(screen.getByText(/Cuisine/i)).toBeInTheDocument();
  expect(screen.getByText(/Region/i)).toBeInTheDocument();
  expect(screen.getByText(/Dietary/i)).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('Dish')).toBeInTheDocument());
  expect(screen.getByText(/Page 1 of/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Next/i));
  expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Previous/i));
  expect(screen.getByText(/Page 1 of/i)).toBeInTheDocument();
});
