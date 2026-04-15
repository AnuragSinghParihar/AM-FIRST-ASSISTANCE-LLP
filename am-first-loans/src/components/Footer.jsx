import './Footer.css';

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <button className="footer__logo" onClick={() => onNavigate('home')} id="footer-logo" style={{ border: 'none', background: 'transparent', padding: '0', display: 'flex', alignItems: 'center' }}>
            <img src="/logo-am.png" alt="AM First Loans Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </button>
          <p className="footer__tagline">
            AM First is a leading financial services group specializing in used car refinance, with a growing presence in personal, business, and home loans.
            <br /><br />
            Founded in 2015, we operate 9 branches across India and have disbursed ₹270+ Cr in FY25 and FY26.
            <br /><br />
            <strong>Our mission:</strong> Easy. Fast. 200% Loan for Used Cars.
          </p>
          <div className="footer__social">
            <a href="https://www.instagram.com/_amfirst_?igsh=MW5hdzh0dzZyaTI0dw==" id="footer-instagram" aria-label="Instagram" className="footer__social-link" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://x.com/amfirstloans" id="footer-twitter" aria-label="Twitter" className="footer__social-link" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61577128086595" id="footer-facebook" aria-label="Facebook" className="footer__social-link" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/am-first-8b09b736a/" id="footer-linkedin" aria-label="LinkedIn" className="footer__social-link" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            <li><button onClick={() => onNavigate('home')} id="footer-link-home">Home</button></li>
            <li><button onClick={() => onNavigate('about')} id="footer-link-about">About Us</button></li>
            <li><button onClick={() => onNavigate('media')} id="footer-link-media">Media</button></li>
            <li><button onClick={() => onNavigate('cookie')} id="footer-link-cookie">Cookie Policy</button></li>
            <li><button onClick={() => onNavigate('disclaimer')} id="footer-link-disclaimer">Disclaimer</button></li>
            <li><button onClick={() => onNavigate('privacy')} id="footer-link-privacy">Privacy Policy</button></li>
          </ul>
        </div>

        {/* Loan Products */}
        <div className="footer__col">
          <h4 className="footer__col-title">Loan Products</h4>
          <ul className="footer__links">
            <li><button onClick={() => onNavigate('used-car-loans')} id="footer-link-car-loan">Used Car Loan</button></li>
            <li><button onClick={() => onNavigate('emi-calc')} id="footer-link-emi">EMI Calculator</button></li>
            <li><button onClick={() => onNavigate('apply')} id="footer-link-apply">Apply Now</button></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contact Us</h4>
          <ul className="footer__contact">
            <li>
              418A, City Center, MG Road, Indore, Madhya Pradesh
            </li>
            <li>
              <a href="tel:8818884843" id="footer-phone">+91-8818884843</a>
            </li>
            <li>
              <a href="mailto:amfirst.contact@gmail.com" id="footer-email">amfirst.contact@gmail.com</a>
            </li>
            <li>
              Mon–Sat: 9AM–6PM
            </li>
            <li>
              WhatsApp: +91-8818884843
            </li>
            <li className="footer__branches">
              9 Branches across India
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="footer__legal">
        <div className="footer__container footer__legal-inner">
          <span>© {year} AM First Assistance LLP. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
