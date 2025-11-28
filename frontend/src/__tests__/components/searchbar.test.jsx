import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../src/components/common/SearchBar';

jest.useFakeTimers();

test('debounces onSubmit calls', () => {
  const onSubmit = jest.fn();
  render(<SearchBar onSubmit={onSubmit} debounceMs={500} />);
  const input = screen.getByRole('searchbox', { name: /search/i });
  fireEvent.change(input, { target: { value: 'sushi' } });
  expect(onSubmit).not.toHaveBeenCalled();
  jest.advanceTimersByTime(499);
  expect(onSubmit).not.toHaveBeenCalled();
  jest.advanceTimersByTime(2);
  expect(onSubmit).toHaveBeenCalledWith('sushi');
});

test('submit button triggers immediate submit', () => {
  const onSubmit = jest.fn();
  render(<SearchBar onSubmit={onSubmit} debounceMs={1000} />);
  const input = screen.getByRole('searchbox', { name: /search/i });
  fireEvent.change(input, { target: { value: 'ramen' } });
  fireEvent.click(screen.getByRole('button', { name: /search submit/i }));
  expect(onSubmit).toHaveBeenCalledWith('ramen');
});
