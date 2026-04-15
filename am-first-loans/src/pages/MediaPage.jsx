import { useState, useMemo } from 'react';
import './MediaPage.css';

const NEWS_CATEGORIES = [
  'All News', 'RBI Updates', 'Used Car Market', 'Loan Rates', 'Tips & Guides', 'Company News', 'Press Releases'
];

// Reusing same data from before, but expanded with matching proper categories
const ALL_NEWS = [
  {
    id: 1,
    tag: 'Used Car Market',
    tagLabel: 'MARKET',
    tagColor: 'orange',
    title: 'Used Car Prices Rise 8% YoY; Refinancing Demand Up',
    source: 'Economic Times, March 2025',
    link: 'https://economictimes.indiatimes.com/industry/auto'
  },
  {
    id: 2,
    tag: 'Loan Rates',
    tagLabel: 'RATE',
    tagColor: 'blue',
    title: 'HDFC, SBI Cut Auto Loan Rates by 25bps Ahead of Festival Season',
    source: 'BankBazaar, March 2025',
    link: 'https://www.bankbazaar.com/car-loan.html'
  },
  {
    id: 3,
    tag: 'RBI Updates',
    tagLabel: 'RBI UPDATE',
    tagColor: 'red',
    title: 'New RBI Guidelines Ease Loan Transfer Processes for NBFCs',
    source: 'RBI Circular, Feb 2025',
    link: 'https://rbi.org.in/'
  },
  {
    id: 4,
    tag: 'Tips & Guides',
    tagLabel: 'GUIDE',
    tagColor: 'green',
    title: '5 Crucial Things to Check Before Applying for a Used Car Loan',
    source: 'LiveMint, April 2025',
    link: 'https://www.livemint.com/money/personal-finance'
  },
  {
    id: 5,
    tag: 'Press Releases',
    tagLabel: 'POLICY',
    tagColor: 'gold',
    title: 'IRDAI Mandates Comprehensive Insurance for Used Vehicle Refinancing',
    source: 'Financial Express, Jan 2025',
    link: 'https://www.financialexpress.com/'
  }
];

export default function MediaPage({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCat, setActiveCat] = useState('All News');

  const filteredNews = useMemo(() => {
    return ALL_NEWS.filter(item => {
      // Filter by category map
      if (activeCat !== 'All News' && item.tag !== activeCat) return false;
      
      // Filter by query 
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.source.toLowerCase().includes(query) ||
          item.tagLabel.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [searchTerm, activeCat]);

  // Handle article open - actual redirection
  const handleFeaturedClick = () => {
    window.open('https://rbi.org.in/', '_blank');
  };

  const handleArticleClick = (link) => {
    if (link) window.open(link, '_blank');
  };

  return (
    <main className="media-page">
      
      {/* Header */}
      <section className="media-header">
        <div className="container" style={{ maxWidth: '1100px' }}>
          <h1 className="media-title">MEDIA & NEWS HUB</h1>
          <p className="media-subtitle">Stay updated with latest RBI guidelines, loan rates, bank news and financial tips.</p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="media-toolbar">
        <div className="container" style={{ maxWidth: '1100px' }}>
          
          <div className="media-search-bar">
            <div style={{ position: 'relative', flex: '1' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input 
                type="text" 
                className="media-search-input" 
                placeholder="Search news, tips, RBI updates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', paddingLeft: '44px' }}
              />
            </div>
            <button className="media-search-btn">Search</button>
          </div>

          <div className="media-filters">
            {NEWS_CATEGORIES.map((cat, idx) => (
              <button 
                key={idx} 
                className={`media-filter ${activeCat === cat ? 'active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          
        </div>
      </section>

      {/* Content */}
      <section className="media-content">
        <div className="container" style={{ maxWidth: '1100px' }}>
          
          {/* Featured Post - Only show if 'All News' or 'RBI Updates' is active and no strict search terms hide it */}
          {(!searchTerm && (activeCat === 'All News' || activeCat === 'RBI Updates')) && (
            <div 
              className="media-featured" 
              onClick={handleFeaturedClick}
              style={{ cursor: 'pointer' }}
            >
              <div className="media-featured-tags">
                <span className="media-tag gold">FEATURED</span>
                <span className="media-tag red">RBI UPDATE</span>
              </div>
              <h2 className="media-featured-title">RBI Keeps Repo Rate Unchanged at 6.5%; Auto Loan Rates Expected to Stay Stable</h2>
              <p className="media-featured-excerpt">
                The Reserve Bank of India maintained its benchmark interest rate in its latest monetary policy committee meeting, providing relief to used car loan borrowers. Many private banks are expected to absorb upcoming risk weight impacts without shifting rates.
              </p>
              <div className="media-featured-meta">
                Source: RBI.org.in &nbsp; • &nbsp; April 2025 &nbsp; • &nbsp; 3 min read
              </div>
              <button className="media-btn-gold">Read Full Article &rarr;</button>
            </div>
          )}

          {/* Regular News Grid */}
          <div className="media-grid">
            {filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <div 
                  key={item.id} 
                  className="media-card"
                  onClick={() => handleArticleClick(item.link)}
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <span className={`media-tag ${item.tagColor}`}>{item.tagLabel}</span>
                  </div>
                  <h3 className="media-card-title">{item.title}</h3>
                  <p className="media-card-source">{item.source}</p>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                <p>No articles found matching "{searchTerm}"</p>
              </div>
            )}
          </div>

        </div>
      </section>

    </main>
  );
}
