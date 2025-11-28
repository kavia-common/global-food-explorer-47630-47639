import { apiClient } from '../services/apiClient';

describe('apiClient', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.useFakeTimers();
    process.env = { ...originalEnv };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    global.fetch && (global.fetch = undefined);
    process.env = originalEnv;
  });

  test('resolves base URL from REACT_APP_API_BASE first', async () => {
    process.env.REACT_APP_API_BASE = 'https://example.com/base';
    process.env.REACT_APP_BACKEND_URL = 'https://example.com/other';

    fetch.mockResolvedValueOnce(new Response(JSON.stringify({ ok: true, items: [] }), { status: 200 }));
    await apiClient.getCuisines();
    const called = fetch.mock.calls[0][0];
    expect(called.startsWith('https://example.com/base')).toBe(true);
  });

  test('error handling throws with status on non-ok', async () => {
    process.env.REACT_APP_API_BASE = 'https://example.com/base';
    fetch.mockResolvedValueOnce(new Response('nope', { status: 500, statusText: 'Server Error' }));
    await expect(apiClient.getDishes()).rejects.toHaveProperty('status', 500);
  });
});
