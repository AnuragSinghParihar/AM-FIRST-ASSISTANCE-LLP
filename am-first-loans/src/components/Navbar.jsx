import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'used-car-loans', label: 'Car Loans' },
  { id: 'emi-calc', label: 'EMI Calculator' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'media', label: 'Media' },
  { id: 'about', label: 'About' },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id) => {
    onNavigate(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}>
      <div className="navbar__inner" style={{ padding: '0 40px', width: '100%', maxWidth: '100%', position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Logo */}
        <button className="navbar__logo" onClick={() => handleNav('home')} id="nav-logo" style={{ border: 'none', background: 'transparent', padding: '0', display: 'flex', alignItems: 'center' }}>
          <img src="/logo-am.png" alt="AM First Loans Logo" style={{ height: '70px', width: 'auto', objectFit: 'contain', display: 'block' }} />
        </button>

        {/* Container for Links and Actions together */}
        <div style={{ display: 'flex', position: 'absolute', left: 'calc(26vw + 180px)', alignItems: 'center', gap: '40px' }}>
          {/* Desktop Links */}
          <ul className="navbar__links" style={{ display: 'flex', gap: '32px' }}>
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <button
                  id={`nav-${link.id}`}
                  className={`navbar__link${currentPage === link.id ? ' navbar__link--active' : ''}`}
                  onClick={() => handleNav(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="tel:18001234567" className="navbar__phone" id="nav-phone">
              <span className="navbar__phone-icon">📞</span>
              +91-8818884843
            </a>
            <button
              id="nav-apply-now"
              className="btn-primary navbar__cta"
              onClick={() => handleNav('apply')}
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          id="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              className={`navbar__mobile-link${currentPage === link.id ? ' active' : ''}`}
              onClick={() => handleNav(link.id)}
            >
              {link.label}
            </button>
          ))}
          <button className="btn-primary navbar__mobile-cta" onClick={() => handleNav('apply')}>
            Apply Now
          </button>
          <a href="tel:18001234567" className="navbar__mobile-phone">📞 1800-XXX-XXXX</a>
        </div>
      )}
    </nav>
  );
}
