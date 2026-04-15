import './UsedCarLoansPage.css';

const FEATURES = [
  {
    num: '1', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Refinance Specialist',
    desc: "Upgrade your loan, not your stress — faster approvals, better rates.",
  },
  {
    num: '2', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: 'Wide Lender Network',
    desc: 'We bring multiple lenders together to get you the most competitive deal.',
  },
  {
    num: '3', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Car Age Upto 10 Yrs',
    desc: 'Cars up to 10 years old are eligible. We handle RC verification, hypothecation, and all paperwork end-to-end.',
  },
  {
    num: '4', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Doorstep Service',
    desc: 'Our executives come to your location for document collection and car inspection. Serving Indore, Raipur, Ujjain & Jaipur.',
  },
  {
    num: '5', icon: <span style={{ fontWeight: 800, fontSize: "16px" }}>%</span>,
    title: 'No Prepayment Penalty',
    desc: 'Flexible repayment. Close your loan early without any extra charges. Transparent and customer-friendly terms.',
  },
  {
    num: '6', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>,
    title: 'Balance Transfer',
    desc: "Transfer your existing high-interest car loan to a lower rate. Save thousands in interest with AM First's balance transfer.",
  },
];

const DOCS = [
  'Aadhaar Card (front & back)',
  'PAN Card',
  'RC Book (Registration Certificate)',
  'Last 3 months salary slips / ITR',
  'Bank statement (6 months)',
  'Passport-size photograph',
];

export default function UsedCarLoansPage({ onNavigate }) {
  return (
    <main className="ucl-page">
      {/* Hero */}
      <section className="ucl-hero">
        <div className="container ucl-hero__inner">
          <div className="ucl-hero__content">
            <h1 className="ucl-hero__title">Used Car Loans</h1>
            <p className="ucl-hero__sub">
              Refinance your existing car at the best rates in India.
            </p>
            <p className="ucl-hero__features">
              Fast processing &nbsp;•&nbsp; Minimal docs &nbsp;•&nbsp; Doorstep service
            </p>
            <div className="ucl-hero__actions">
              <button className="btn-primary" id="ucl-apply-btn" onClick={() => onNavigate('apply')}>
                Apply Now
              </button>
              <button className="btn-outline" id="ucl-emi-btn" onClick={() => onNavigate('emi-calc')}>
                Calculate EMI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="ucl-features">
        <div className="container">
          <h2 className="ucl-features__title">Used Car Loan Features</h2>
          <div className="ucl-features__grid">
            {FEATURES.map(f => (
              <div key={f.num} className="ucl-feature-card" id={`ucl-feature-${f.num}`}>
                <div className="ucl-feature-card__num">
                  <span>{f.num}</span>
                </div>
                <div className="ucl-feature-card__body">
                  <h3>
                    <span className="ucl-feature-card__icon">{f.icon}</span>
                    {f.title}
                  </h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="ucl-cta">
        <div className="container ucl-cta__inner">
          <h2>Ready to Get Your Loan?</h2>
          <p>Join 8,000+ customers who trusted AM First for their car financing.</p>
          <button className="btn-primary ucl-cta__btn" id="ucl-final-apply" onClick={() => onNavigate('apply')}>
            Apply Now
          </button>
        </div>
      </section>
    </main>
  );
}
