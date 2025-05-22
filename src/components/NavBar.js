import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const navLeft = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/templates', label: 'Templates' },
  ];
  const navRight = [
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Signup' },
  ];

  // Handler to toggle navbar collapse on mobile
  function toggleExpanded() {
    setExpanded((prev) => !prev);
  }

  // Close navbar on click of link on mobile
  function closeNavbar() {
    setExpanded(false);
  }

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: '#094067',
        boxShadow: '0 4px 8px rgba(9,64,103,0.3)',
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold text-light"
          to="/"
          style={{
            transition: 'transform 0.2s ease, color 0.2s ease',
            display: 'inline-block',
            transform: hoveredIndex === 'brand' ? 'scale(1.1)' : 'scale(1)',
          }}
          onMouseEnter={() => setHoveredIndex('brand')}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={closeNavbar}
        >
          NSTL - DRDO
        </Link>
        <button
          className="navbar-toggler border-white"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={toggleExpanded}
          style={{ borderColor: 'rgba(255,255,255,0.6)' }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: 'invert(1)' }}
          ></span>
        </button>

        <div
          className={`collapse navbar-collapse${expanded ? ' show' : ''}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLeft.map((item, idx) => (
              <li key={item.to} className="nav-item">
                <Link
                  className="nav-link text-light"
                  to={item.to}
                  style={{
                    transition: 'transform 0.2s ease, color 0.2s ease',
                    display: 'inline-block',
                    transform: hoveredIndex === idx ? 'scale(1.1)' : 'scale(1)',
                    color: hoveredIndex === idx ? '#c1dfe6' : 'white',
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={closeNavbar}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navRight.map((item, idx) => {
              const index = idx + navLeft.length;
              return (
                <li key={item.to} className="nav-item">
                  <Link
                    className="nav-link text-light"
                    to={item.to}
                    style={{
                      transition: 'transform 0.2s ease, color 0.2s ease',
                      display: 'inline-block',
                      transform:
                        hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                      color: hoveredIndex === index ? '#c1dfe6' : 'white',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={closeNavbar}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default NavBar;
