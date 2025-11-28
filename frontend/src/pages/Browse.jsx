import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/common/Card';
import { apiClient } from '../services/apiClient';

/**
 * PUBLIC_INTERFACE
 * Browse page presents dishes/cuisines grid with filters and pagination.
 */
export default function Browse() {
  const [filters, setFilters] = useState({ cuisine: '', region: '', dietary: '', sort: 'popular' });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const totalPages = useMemo(() => Math.max(1, Math.ceil((total || 0) / pageSize)), [total, pageSize]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await apiClient.getDishes({
          cuisine: filters.cuisine || undefined,
          region: filters.region || undefined,
          dietary: filters.dietary || undefined,
          sort: filters.sort || 'popular',
          page,
          pageSize,
        });
        if (!cancelled) {
          setItems(data.items || []);
          setTotal(data.total || 0);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load browse data', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [filters, page, pageSize]);

  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
    setPage(1);
  };

  return (
    <main className="container page browse">
      <section className="controls ocean-surface">
        <div className="control-group">
          <label>
            Cuisine
            <input name="cuisine" className="input" placeholder="e.g., Italian" value={filters.cuisine} onChange={onFilterChange} />
          </label>
          <label>
            Region
            <input name="region" className="input" placeholder="e.g., Europe" value={filters.region} onChange={onFilterChange} />
          </label>
          <label>
            Dietary
            <input name="dietary" className="input" placeholder="e.g., Vegan" value={filters.dietary} onChange={onFilterChange} />
          </label>
          <label>
            Sort
            <select name="sort" className="input" value={filters.sort} onChange={onFilterChange}>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
              <option value="new">New</option>
            </select>
          </label>
        </div>
      </section>

      <section className="section">
        {loading && <div className="loading">Loading…</div>}
        {!loading && items.length === 0 && <div className="empty">No items found. Adjust filters.</div>}
        {!loading && items.length > 0 && (
          <div className="grid">
            {items.map((it) => (
              <Card key={it.id} imageUrl={it.image} title={it.name} tags={it.tags || []} />
            ))}
          </div>
        )}
      </section>

      <section className="pagination">
        <button className="btn" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
        <span className="page-indicator">Page {page} of {totalPages}</span>
        <button className="btn" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
      </section>
    </main>
  );
}
