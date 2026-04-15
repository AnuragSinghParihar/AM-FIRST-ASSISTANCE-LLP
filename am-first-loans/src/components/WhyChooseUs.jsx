import { useState, useEffect, useRef } from 'react';
import './WhyChooseUs.css';

const REASONS = [
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Quick Money', desc: 'Instant top-up loan for vehicle owners' },
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, title: 'High Loan Amount', desc: "Get up to 200% of your car's current value" },
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>, title: 'Flexible Repayment Tenure', desc: 'Repay your loan easily with flexible EMIs' },
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"></path></svg>, title: 'Competitive Interest Rates', desc: 'AM First Loan interest is much lower than personal or business loans' },
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, title: 'No hidden charges', desc: 'All our fees and charges are clearly mentioned in our terms and conditions.' },
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, title: 'Minimal documentation', desc: 'Only a few essential documents are required to apply for a loan against car' },
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Easy Approval', desc: 'Apply for loan online or connect with our representative via call at +91-8818884843' },
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, title: 'Pre-approved offers', desc: 'Follow our 5 easy steps to getting your pre-approved AM First Loan!' },
  { icon: <svg width="34" height="34" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>, title: 'Online application process', desc: 'Apply for a loan against car anytime from your home or even on-the-go' },
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % REASONS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="why-choose-us" id="why-choose-us">
      <div className="why-choose-us-container">
        <div className="why-choose-us__header">
          <h2 className="why-choose-us__title">
            Get Loans Faster with AM First Loans
          </h2>
        </div>

        <div className="why-choose-us__carousel">
          {REASONS.map((r, i) => {
            let offset = i - activeIndex;
            if (offset < -4) offset += REASONS.length;
            if (offset > 4) offset -= REASONS.length;

            const isVisible = Math.abs(offset) <= 1;
            const isCenter = offset === 0;
            
            return (
              <div 
                key={i} 
                className={`reason-card ${isCenter ? 'active' : ''}`} 
                style={{
                  transform: `translateX(${offset * 105}%) scale(${isCenter ? 1.05 : 0.85})`,
                  opacity: isVisible ? 1 : 0,
                  zIndex: isCenter ? 10 : 5,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
              >
                <div className="reason-card__icon-wrap">
                  <span className="reason-card__icon">{r.icon}</span>
                </div>
                <h3 className="reason-card__title">{r.title}</h3>
                <p className="reason-card__desc">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
