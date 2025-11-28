import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../services/apiClient';

/**
 * PUBLIC_INTERFACE
 * DishDetail page fetches dish by ID and shows information and related suggestions.
 */
export default function DishDetail() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await apiClient.getDishById(id);
        if (!cancelled) setDish(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load dish', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <main className="container page"><div className="loading">Loading…</div></main>;
  if (!dish) return <main className="container page"><div className="empty">Dish not found.</div></main>;

  return (
    <main className="container page dish">
      <section className="hero ocean-surface">
        <h1 className="title">{dish.name}</h1>
        {dish.description ? <p className="description">{dish.description}</p> : null}
        {dish.image ? <img className="detail-image" src={dish.image} alt={dish.name} /> : null}
        <div className="meta">
          {dish.region ? <span className="tag">{dish.region}</span> : null}
          {Array.isArray(dish.tags) ? dish.tags.map((t) => <span className="tag" key={t}>{t}</span>) : null}
        </div>
      </section>
    </main>
  );
}
