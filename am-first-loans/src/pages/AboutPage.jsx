import './AboutPage.css';
import indiaMap from '../assets/india_map_fintech.png';
import award1 from '../assets/Award-bg-1.png';
import award2 from '../assets/Award-bg-2.png';
import award3 from '../assets/Award-bg-3.png';
import award4 from '../assets/Award-bg-4.jpeg';

const GROWTH_CARDS = [
  { value: '₹125 Cr', subtitle: 'FY 2025-26', extra: 'Current FY', type: 'dark', extraColor: 'var(--success, #2ECC71)' },
  { value: '₹150 Cr', subtitle: 'FY 2024-25', extra: '+57% growth', type: 'dark', extraColor: 'var(--success, #2ECC71)' },
  { value: '₹95 Cr', subtitle: 'FY 2023-24', extra: '+46% growth', type: 'dark', extraColor: 'var(--success, #2ECC71)' },
  { value: '₹65 Cr', subtitle: 'FY 2022-23', extra: 'Base year', type: 'dark', extraColor: '#A0AEC0' },
  { value: '9', subtitle: 'Branches', extra: 'Indore, Raipur, Ujjain,\nJaipur', type: 'gold' },
  { value: '100+', subtitle: 'Professionals', extra: 'Experienced team', type: 'gold' },
  { value: '2015', subtitle: 'Founded', extra: 'by Mr. Manish Parihar', type: 'gold' },
];

const AWARDS = [
  { img: award1, title: 'Excellence Trophy', org: 'AM First Assistance LLP', desc: 'Awarded to Manish Parihar for outstanding contribution' },
  { img: award2, title: 'Celebrating 5 Years', org: 'Reliance Life Insurance', desc: 'Recognition for 5 years of dedication and commitment' },
  { img: award3, title: 'The Select', org: 'Tata Capital', desc: 'Used Car Loans — July 2023 to October 2023' },
  { img: award4, title: 'Best Activisation', org: 'Reliance Life Insurance', desc: 'Awarded to Manish Parihar for best activisation performance' },
];

const LEADERSHIP = [
  { initials: 'MP', name: 'Manish Parihar', role: 'Founder & Co-Head', desc: '25+ yrs Finance, Real Estate & Insurance' },
  { initials: 'AP', name: 'Ashish Pathak', role: 'Co-Head, Credit Ops', desc: 'Ex-SBI Banker | 25+ yrs Retail Banking' },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <h1 className="about-hero__title">About <span>AM First Loans</span></h1>
          <p className="about-hero__sub">
            Founded in 2015 by Mr. Manish Parihar, AM First specializes in used car refinance distribution. With over 100 professionals, we are a trusted Direct Selling Agent (DSA) partner for leading banks and NBFCs across India. While used car loans remain our core, we are expanding into Home Loans. Our operations span 9 branches in Indore (4), Raipur (3), Ujjain (1), and Jaipur (1).
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="container about-mission__grid">
          <div className="about-mission__card">
            <span className="about-mission__number">1</span>
            <div className="about-mission__header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              <h3>Our Mission</h3>
            </div>
            <p>To make credit accessible, efficient, and customer-friendly especially in underserved Tier 2 & Tier 3 cities across India.</p>
          </div>
          <div className="about-mission__card dark">
            <span className="about-mission__number dark-num">2</span>
            <div className="about-mission__header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              <h3>Our Vision</h3>
            </div>
            <p>To become India's most trusted DSA for used car loans and retail credit, reaching 1 million+ customers by 2030.</p>
          </div>
          <div className="about-mission__card">
            <span className="about-mission__number">3</span>
            <div className="about-mission__header">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="m9.75 19.5 2.25-1.5 2.25 1.5v-5.25"/></svg>
              <h3>Our Values</h3>
            </div>
            <p>Integrity · Transparency · Customer First · Speed · Innovation · Inclusivity · Fairness · Empowerment</p>
          </div>
        </div>
      </section>

      {/* Growth & Milestones */}
      <section className="about-growth">
        <div className="container">
          <h2 className="section-title">DISBURSEMENT GROWTH & MILESTONES</h2>
          <div className="about-growth__grid">
            {GROWTH_CARDS.map((card, i) => (
              <div key={i} className={`growth-card growth-card--${card.type}`}>
                <div className="growth-card__value">{card.value}</div>
                <div className="growth-card__subtitle">{card.subtitle}</div>
                <div className="growth-card__extra" style={{ color: card.extraColor }}>
                  {card.extra.split('\n').map((line, idx) => (
                    <span key={idx}>{line}<br /></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Reach */}
      <section className="about-reach">
        <div className="container about-reach__inner">
          <div className="about-reach__content">
            <div className="reach-tag">Our Reach</div>
            <h2 className="reach-title">Serving Across India</h2>
            
            <ul className="reach-list">
              <li>
                <div className="reach-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div className="reach-text">
                  <strong>9+ Branches</strong>
                  <span>Strategically located hubs</span>
                </div>
              </li>
              <li>
                <div className="reach-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="reach-text">
                  <strong>4 Cities</strong>
                  <span>Indore, Raipur, Jaipur, Ujjain</span>
                </div>
              </li>
              <li>
                <div className="reach-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <div className="reach-text">
                  <strong>Expanding rapidly</strong>
                  <span>Pan-India vision for the future</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="about-reach__map">
            <div className="map-container">
              <img src={indiaMap} alt="Map of India Branches" className="map-image" />
              {/* Corrected positions based on actual city locations on India map */}
              <div className="pulse-dot" style={{ top: '37%', left: '33%' }}>
                <span className="dot-label">Jaipur</span>
              </div>
              <div className="pulse-dot" style={{ top: '48%', left: '39%' }}>
                <span className="dot-label">Indore</span>
              </div>
              <div className="pulse-dot" style={{ top: '50%', left: '35%' }}>
                <span className="dot-label">Ujjain</span>
              </div>
              <div className="pulse-dot" style={{ top: '52%', left: '47%' }}>
                <span className="dot-label">Raipur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="about-awards">
        <div className="container">
          <h2 className="section-title">AWARDS & RECOGNITION</h2>
        </div>
        <div className="container">
          <div className="awards-grid">
            {AWARDS.map((award, i) => (
              <div key={i} className="award-item">
                <div className="award-item__circle">
                  <img src={award.img} alt={award.title} className="award-item__img" />
                </div>
                <div className="award-item__wreath">
                  <span className="award-item__wreath-line" />
                  <span className="award-item__wreath-dot" />
                  <span className="award-item__wreath-line" />
                </div>
                <div className="award-item__info">
                  <div className="award-item__org">{award.org}</div>
                  <h3 className="award-item__title">{award.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">LEADERSHIP TEAM</h2>
          <div className="about-team__grid">
            {LEADERSHIP.map((t, i) => (
              <div key={i} className="leadership-card">
                <div className="leadership-card__avatar">{t.initials}</div>
                <div className="leadership-card__info">
                  <h3 className="leadership-card__name">{t.name}</h3>
                  <p className="leadership-card__role">{t.role}</p>
                  <p className="leadership-card__desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
