import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import { apiClient } from '../services/apiClient';

/**
 * PUBLIC_INTERFACE
 * SearchResults page reads 'q' from the URL and shows grouped results.
 */
export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ cuisines: [], dishes: [] });
  const [loading, setLoading] = useState(false);

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    setQuery(params.get('q') || '');
  }, [params]);

  useEffect(() => {
    let cancelled = false;
    if (!query) {
      setResults({ cuisines: [], dishes: [] });
      return undefined;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await apiClient.searchAll(query);
        if (!cancelled) setResults({ cuisines: data.cuisines || [], dishes: data.dishes || [] });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Search failed', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [query]);

  return (
    <main className="container page search">
      <h1 className="title">Search results for “{query}”</h1>
      {loading && <div className="loading">Searching…</div>}
      {!loading && (results.cuisines.length > 0 || results.dishes.length > 0) ? (
        <>
          <section className="section">
            <h2 className="section-title">Cuisines</h2>
            <div className="grid">
              {results.cuisines.map((c) => (
                <Card key={c.id} imageUrl={c.image} title={c.name} tags={c.tags || []} onClick={() => navigate(`/cuisine/${c.id}`)} />
              ))}
            </div>
          </section>
          <section className="section">
            <h2 className="section-title">Dishes</h2>
            <div className="grid">
              {results.dishes.map((d) => (
                <Card key={d.id} imageUrl={d.image} title={d.name} tags={d.tags || []} onClick={() => navigate(`/dish/${d.id}`)} />
              ))}
            </div>
          </section>
        </>
      ) : !loading ? (
        <div className="empty">No results found.</div>
      ) : null}
    </main>
  );
}
