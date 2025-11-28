import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import { apiClient } from '../services/apiClient';

/**
 * PUBLIC_INTERFACE
 * CuisineDetail page fetches cuisine by ID and shows related dishes list.
 */
export default function CuisineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cuisine, setCuisine] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await apiClient.getCuisineById(id);
        const dishes = await apiClient.getDishes({ cuisineId: id, page: 1, pageSize: 8 });
        if (!cancelled) {
          setCuisine(data);
          setRelated(dishes.items || []);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load cuisine', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <main className="container page"><div className="loading">Loading…</div></main>;
  if (!cuisine) return <main className="container page"><div className="empty">Cuisine not found.</div></main>;

  return (
    <main className="container page cuisine">
      <section className="hero ocean-surface">
        <h1 className="title">{cuisine.name}</h1>
        {cuisine.description ? <p className="description">{cuisine.description}</p> : null}
      </section>
      <section className="section">
        <h2 className="section-title">Popular Dishes</h2>
        <div className="grid">
          {related.map((d) => (
            <Card key={d.id} imageUrl={d.image} title={d.name} tags={d.tags || []} onClick={() => navigate(`/dish/${d.id}`)} />
          ))}
        </div>
      </section>
    </main>
  );
}
