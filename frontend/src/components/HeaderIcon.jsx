import React from 'react';

// Small presentational header with an icon and title for consistent pages
export default function HeaderIcon({ icon = 'fa-envelope', title = '', subtitle }) {
  return (
    <div className="d-flex align-items-center gap-3 mb-3">
      <div
        className="header-icon d-inline-flex align-items-center justify-content-center"
        aria-hidden="true"
      >
        <i className={`fa ${icon} fa-lg`} />
      </div>
      <div>
        <h2 className="mb-0">{title}</h2>
        {subtitle && <p className="mb-0 text-muted small">{subtitle}</p>}
      </div>
    </div>
  );
}
