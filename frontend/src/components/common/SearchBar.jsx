import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar component
 * Props:
 * - placeholder?: string
 * - onSubmit: (value: string) => void
 * - debounceMs?: number (default 400)
 * - size?: 'small' | 'medium' | 'large'
 */
export default function SearchBar({ placeholder = 'Search…', onSubmit, debounceMs = 400, size = 'medium' }) {
  const [value, setValue] = useState('');
  const latest = useRef(value);

  useEffect(() => {
    latest.current = value;
  }, [value]);

  const debouncedSubmit = useMemo(() => {
    let timer;
    const fn = (v) => {
      if (!onSubmit) return;
      onSubmit(v);
    };
    const wrapped = (v) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn(v), debounceMs);
    };
    wrapped.cancel = () => timer && clearTimeout(timer);
    return wrapped;
  }, [onSubmit, debounceMs]);

  useEffect(() => {
    debouncedSubmit(value);
    return () => debouncedSubmit.cancel && debouncedSubmit.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (debouncedSubmit.cancel) debouncedSubmit.cancel();
    onSubmit && onSubmit(latest.current);
  };

  return (
    <form className={`searchbar ${size}`} role="search" onSubmit={handleSubmit}>
      <input
        aria-label="Search"
        className="input"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="submit" aria-label="Search submit">
        🔎
      </button>
    </form>
  );
}
