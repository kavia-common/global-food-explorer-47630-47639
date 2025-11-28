import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer displays copyright and optional healthcheck link.
 * Uses REACT_APP_HEALTHCHECK_PATH when provided.
 */
export default function Footer() {
  const healthPath = process.env.REACT_APP_HEALTHCHECK_PATH;
  const year = new Date().getFullYear();

  return (
    <footer className="footer ocean-surface">
      <div className="container footer-inner">
        <div className="footer-copy">© {year} Food Explore</div>
        <div className="footer-right">
          {healthPath ? (
            <a className="footer-link" href={healthPath} target="_blank" rel="noreferrer">
              Healthcheck
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
