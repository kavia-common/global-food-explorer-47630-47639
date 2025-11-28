import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Card component
 * Props:
 * - imageUrl?: string
 * - title: string
 * - tags?: string[]
 * - onClick?: () => void
 */
export default function Card({ imageUrl, title, tags = [], onClick }) {
  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0}>
      {imageUrl ? (
        <div className="card-media">
          <img src={imageUrl} alt={title} loading="lazy" />
        </div>
      ) : (
        <div className="card-media placeholder" aria-hidden="true">🍽️</div>
      )}
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {tags && tags.length > 0 ? (
          <div className="card-tags">
            {tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
