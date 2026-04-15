import EMICalculator from '../components/EMICalculator';
import './EMICalcPage.css';

export default function EMICalcPage({ onNavigate }) {
  return (
    <main className="emi-page">

      <EMICalculator onNavigate={onNavigate} fullPage={true} />

      {/* Tips section */}
      <section className="emi-tips">
        <div className="container">
          <h2 className="emi-tips__title">Tips to Lower Your EMI</h2>
          <div className="emi-tips__grid">
            {[
              { 
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, 
                tip: 'Choose a longer tenure', 
                detail: 'Spreading the loan over more months reduces each payment — though total interest increases.' 
              },
              { 
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, 
                tip: 'Improve your CIBIL score', 
                detail: 'A score above 750 qualifies you for lower interest rates, directly reducing your EMI.' 
              },
              { 
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13h8.5a4.5 4.5 0 0 0 0-9"/><path d="M11 13l5 8"/></svg>, 
                tip: 'Make a larger down payment', 
                detail: 'Paying more upfront reduces the principal amount, leading to a lower EMI.' 
              },
              { 
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>, 
                tip: 'Refinance at better rates', 
                detail: 'If rates have dropped since you took the loan, refinancing can cut your EMI significantly.' 
              },
            ].map((t, i) => (
              <div key={i} className="emi-tip-card" id={`emi-tip-${i}`}>
                <span className="emi-tip-card__icon" style={{ color: 'var(--navy-800)' }}>{t.icon}</span>
                <h3>{t.tip}</h3>
                <p>{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
