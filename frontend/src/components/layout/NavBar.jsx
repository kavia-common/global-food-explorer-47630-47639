import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../common/SearchBar';

/**
 * PUBLIC_INTERFACE
 * NavBar provides the top navigation with brand, links, search input, and theme toggle.
 * - Persists theme to localStorage and respects prefers-color-scheme.
 */
export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const onSearch = (q) => {
    if (!q || q.trim().length === 0) return;
    const params = new URLSearchParams({ q: q.trim() }).toString();
    navigate(`/search?${params}`);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar ocean-surface">
      <div className="navbar-inner container">
        <Link to="/" className="brand" aria-label="Food Explore Home">
          <span className="brand-icon">🍽️</span>
          <span className="brand-text">Food Explore</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
          <Link className={`nav-link ${isActive('/browse') ? 'active' : ''}`} to="/browse">Browse</Link>
        </nav>

        <div className="nav-actions">
          <SearchBar
            placeholder="Search dishes, cuisines, regions…"
            onSubmit={onSearch}
            size="small"
          />
          <button
            className="btn btn-ghost theme-toggle"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}
