import { useState } from 'react';
import './EligibilityPage.css';

const REQUIRED_DOCS = [
  {
    category: "Valid Identity Proof",
    items: ["PAN Card", "Aadhar Card", "Passport", "Voter ID"]
  },
  {
    category: "Address Proof",
    items: ["Aadhar Card", "Driving License", "Passport"]
  },
  {
    category: "Business Proof",
    items: ["GST Certificate", "Trade certificate"]
  },
  {
    category: "Income Proof",
    items: ["Three months' salary slip for salaried customers", "Latest six months bank statements"]
  },
  {
    category: "Vehicle Documents",
    items: ["RC Book and Insurance copy of the vehicle"]
  }
];

export default function EligibilityPage() {
  const [openDoc, setOpenDoc] = useState(0);
  return (
    <main className="eligibility-page">
      <div className="container" style={{ padding: '60px 24px 80px', maxWidth: '1080px' }}>
        
        {/* Criteria Section */}
        <div className="eligibility-section" style={{ marginBottom: '64px' }}>
          <h2 className="eligibility-title" style={{ textAlign: 'center', marginBottom: '36px' }}>ELIGIBILITY CRITERIA</h2>
          <div className="eligibility-grid">
            
            <div className="eligibility-item">
              <span className="eligibility-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </span>
              <div>
                <h4>Age:</h4>
                <p>21 – 65 years</p>
              </div>
            </div>

              <div className="eligibility-item">
                <span className="eligibility-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
                <div>
                  <h4>Employment:</h4>
                  <p>Salaried or Self-employed</p>
                </div>
              </div>



              <div className="eligibility-item">
                <span className="eligibility-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
                <div>
                  <h4>Car Age:</h4>
                  <p>Up to 10 years old</p>
                </div>
              </div>

              <div className="eligibility-item">
                <span className="eligibility-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
                <div>
                  <h4>Car Type:</h4>
                  <p>All makes & models</p>
                </div>
              </div>



            </div>
          </div>

      </div>

      <div className="docs-section-wrapper">
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div className="docs-section">
            <h2 className="eligibility-title" style={{ textAlign: 'center', marginBottom: '36px' }}>DOCUMENTS REQUIRED</h2>
            
            <div className="docs-accordion-container">
              {REQUIRED_DOCS.map((doc, i) => {
                const isOpen = openDoc === i;
                return (
                  <div key={i} className={`doc-accordion-card ${isOpen ? 'open' : ''}`}>
                    <button className="doc-accordion-header" onClick={() => setOpenDoc(isOpen ? null : i)}>
                      <span className="doc-accordion-title">{doc.category}</span>
                    </button>
                    {isOpen && (
                      <div className="doc-accordion-body">
                        <ul>
                          {doc.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
          </div>
        </div>
      </div>

    </main>
  );
}
