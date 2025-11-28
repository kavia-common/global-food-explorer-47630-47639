import { endpoints } from './endpoints';

const LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL || 'info';
const BASE_URL =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  '/api';
export const WS_URL = process.env.REACT_APP_WS_URL || '';

const shouldLog = (level) => {
  const ranks = { silent: 0, error: 1, warn: 2, info: 3, debug: 4 };
  return (ranks[LOG_LEVEL] || 0) >= (ranks[level] || 0);
};

const timeoutFetch = (input, init = {}, timeoutMs = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  const options = { ...init, signal: controller.signal };
  return fetch(input, options).finally(() => clearTimeout(id));
};

const jsonFetch = async (path, { method = 'GET', headers = {}, body, timeoutMs = 10000, query } = {}) => {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    });
  }
  if (shouldLog('debug')) {
    // eslint-disable-next-line no-console
    console.debug('api request', method, url.toString(), { body });
  }
  const res = await timeoutFetch(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  }, timeoutMs);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`HTTP ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    if (shouldLog('warn')) {
      // eslint-disable-next-line no-console
      console.warn('api error', err, text);
    }
    throw err;
  }
  const data = await res.json().catch(() => ({}));
  if (shouldLog('debug')) {
    // eslint-disable-next-line no-console
    console.debug('api response', data);
  }
  return data;
};

/**
 * PUBLIC_INTERFACE
 * apiClient exposes high-level API calls for the app.
 */
export const apiClient = {
  // PUBLIC_INTERFACE
  getCuisines: (params = {}) => jsonFetch(endpoints.cuisines, { query: params }),
  // PUBLIC_INTERFACE
  getDishes: (params = {}) => jsonFetch(endpoints.dishes, { query: params }),
  // PUBLIC_INTERFACE
  searchAll: (q) => jsonFetch(endpoints.search, { query: { q } }),
  // PUBLIC_INTERFACE
  getCuisineById: (id) => jsonFetch(endpoints.cuisineById(id)),
  // PUBLIC_INTERFACE
  getDishById: (id) => jsonFetch(endpoints.dishById(id)),
  // PUBLIC_INTERFACE
  _resolveBaseUrl: () => BASE_URL,
};
