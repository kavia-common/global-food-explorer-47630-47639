import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import Card from '../components/common/Card';
import { apiClient } from '../services/apiClient';
import useFeatureFlag from '../hooks/useFeatureFlag';

/**
 * PUBLIC_INTERFACE
 * Home page shows hero search and featured sections: popular cuisines and trending dishes.
 */
export default function Home() {
  const navigate = useNavigate();
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const showTrends = useFeatureFlag('trends_panel');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [cuisines, dishes] = await Promise.all([
          apiClient.getCuisines({ page: 1, pageSize: 6 }),
          apiClient.getDishes({ sort: 'trending', page: 1, pageSize: 6 }),
        ]);
        if (!cancelled) {
          setPopular(cuisines.items || []);
          setTrending(dishes.items || []);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load home data', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const onSearch = (q) => {
    if (!q) return;
    const params = new URLSearchParams({ q: q.trim() });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <main className="container page home">
      <section className="hero ocean-surface-gradient">
        <div className="hero-content">
          <h1 className="title">Discover world cuisines and dishes</h1>
          <p className="subtitle">Search by cuisine, dish, region, or dietary preference.</p>
          <SearchBar placeholder="Try 'Sichuan', 'Tacos', or 'Vegan'" onSubmit={onSearch} debounceMs={800} size="large" />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Popular Cuisines</h2>
        </div>
        {loading && <div className="loading">Loading…</div>}
        {!loading && (
          <div className="grid">
            {popular.map((c) => (
              <Card
                key={c.id}
                imageUrl={c.image}
                title={c.name}
                tags={c.tags || []}
                onClick={() => navigate(`/cuisine/${c.id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {showTrends ? (
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Trending Dishes</h2>
          </div>
          {loading && <div className="loading">Loading…</div>}
          {!loading && (
            <div className="grid">
              {trending.map((d) => (
                <Card
                  key={d.id}
                  imageUrl={d.image}
                  title={d.name}
                  tags={d.tags || []}
                  onClick={() => navigate(`/dish/${d.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      ) : null}
    </main>
  );
}
