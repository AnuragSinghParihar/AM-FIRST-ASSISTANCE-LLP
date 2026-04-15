import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import './ApplyPage.css';

const STEPS = ['Personal Info', 'Loan Details', 'Documents', 'Review'];

export default function ApplyPage({ onNavigate }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '',
    loanType: 'Used Car Loan', amount: '', tenure: '36',
    carValue: '', carYear: '', carModel: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep(s => Math.min(s + 1, 3));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://am-first-assistance-llp.onrender.com/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else alert('Submission failed: ' + data.error);
    } catch (err) {
      alert('Server error. Please try again.');
    }
  };

  if (submitted) {
    return (
      <main className="apply-page apply-page--success">
        <div className="apply-success">
          <div className="apply-success__icon">
            <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="success-checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="success-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h1>Application Submitted!</h1>
          <p>Reference ID: <strong>AMF-{Math.floor(Math.random() * 90000) + 10000}</strong></p>
          <p>Our loan expert will call you within 1 hour.</p>
          <div className="apply-success__steps">
            <p>What happens next?</p>
            <ol>
              <li>
                <svg className="step-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Document verification (2–4 hours)
              </li>
              <li>
                <svg className="step-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Loan sanction (same day)
              </li>
              <li>
                <svg className="step-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Disbursal within 24 hours
              </li>
            </ol>
          </div>
          <button className="btn-primary" onClick={() => onNavigate('home')} id="apply-success-home">
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="apply-page">
      <div className="apply-page__hero">
        <div className="container">
          <h1 className="apply-page__title">Apply for a Loan</h1>
          <p className="apply-page__sub">Quick 3-minute application. No branch visit required.</p>
        </div>
      </div>

      <HowItWorks />

      <div className="container apply-page__body">
        {/* Progress */}
        <div className="apply-progress">
          {STEPS.map((s, i) => (
            <div key={i} className={`apply-progress__step${i <= step ? ' apply-progress__step--done' : ''}`} id={`apply-step-indicator-${i}`}>
              <div className="apply-progress__circle">{i < step ? '✓' : i + 1}</div>
              <span>{s}</span>
              {i < STEPS.length - 1 && <div className="apply-progress__line"></div>}
            </div>
          ))}
        </div>

        <form className="apply-form" onSubmit={handleSubmit} id="apply-form">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="apply-form__section animate-fade-up">
              <h2>Personal Information</h2>
              <div className="apply-form__row">
                <div className="apply-form__group">
                  <label htmlFor="apply-name">Full Name *</label>
                  <input id="apply-name" type="text" placeholder="As on Aadhaar" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="apply-form__group">
                  <label htmlFor="apply-phone">Mobile Number *</label>
                  <input id="apply-phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                </div>
              </div>
              <div className="apply-form__row">
                <div className="apply-form__group">
                  <label htmlFor="apply-email">Email Address</label>
                  <input id="apply-email" type="email" placeholder="Optional" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="apply-form__group">
                  <label htmlFor="apply-city">City *</label>
                  <input id="apply-city" type="text" placeholder="e.g. Indore" value={form.city} onChange={e => setForm({...form, city: e.target.value})} required />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Loan Details */}
          {step === 1 && (
            <div className="apply-form__section animate-fade-up">
              <h2>Loan Details</h2>
              <div className="apply-form__row">
                <div className="apply-form__group">
                  <label htmlFor="apply-loan-type">Loan Type *</label>
                  <select id="apply-loan-type" value={form.loanType} onChange={e => setForm({...form, loanType: e.target.value})}>
                    <option>Used Car Loan</option>
                    <option>Car Refinance</option>
                    <option>Home Loan</option>
                  </select>
                </div>
                <div className="apply-form__group">
                  <label htmlFor="apply-amount">Loan Amount (₹) *</label>
                  <input id="apply-amount" type="number" placeholder="e.g. 500000" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
                </div>
              </div>
              <div className="apply-form__row">
                <div className="apply-form__group">
                  <label htmlFor="apply-tenure">Preferred Tenure *</label>
                  <select id="apply-tenure" value={form.tenure} onChange={e => setForm({...form, tenure: e.target.value})}>
                    {[12,24,36,48,60,72,84].map(t => <option key={t} value={t}>{t} months</option>)}
                  </select>
                </div>
                <div className="apply-form__group">
                  <label htmlFor="apply-car-value">Car Value (₹) *</label>
                  <input id="apply-car-value" type="number" placeholder="e.g. 600000" value={form.carValue} onChange={e => setForm({...form, carValue: e.target.value})} required />
                </div>
              </div>
              <div className="apply-form__row">
                <div className="apply-form__group">
                  <label htmlFor="apply-car-model">Car Model *</label>
                  <input id="apply-car-model" type="text" placeholder="e.g. Maruti Swift 2018" value={form.carModel} onChange={e => setForm({...form, carModel: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 2 && (
            <div className="apply-form__section animate-fade-up">
              <h2>Documents Required</h2>
              <p className="apply-docs__note">Please keep the following ready. Our agent will collect them at your doorstep.</p>
              <div className="apply-docs__list">
                {[
                  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect><circle cx="9" cy="11" r="3"></circle><line x1="15" y1="11" x2="19" y2="11"></line><line x1="15" y1="15" x2="19" y2="15"></line></svg>, doc: 'Aadhaar Card', note: 'Front & back copy' },
                  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>, doc: 'PAN Card', note: 'Self-attested' },
                  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>, doc: 'RC Book', note: 'Vehicle registration certificate' },
                  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><path d="M14 13.5c0-.8-.6-1.5-1.5-1.5h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h1c.8 0 1.5.7 1.5 1.5s-.6 1.5-1.5 1.5H10"></path></svg>, doc: 'Income Proof', note: '3 months salary slip or ITR' },
                  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M3 10V6l9-4 9 4v4"></path><line x1="6" y1="10" x2="6" y2="17"></line><line x1="10" y1="10" x2="10" y2="17"></line><line x1="14" y1="10" x2="14" y2="17"></line><line x1="18" y1="10" x2="18" y2="17"></line></svg>, doc: 'Bank Statement', note: 'Last 6 months' },
                  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>, doc: 'Passport Photo', note: '1 recent photograph' },
                ].map((d, i) => (
                  <div key={i} className="apply-doc-item">
                    <span className="apply-doc-item__icon">{d.icon}</span>
                    <div>
                      <strong>{d.doc}</strong>
                      <p>{d.note}</p>
                    </div>
                    <span className="apply-doc-item__check">✓</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="apply-form__section animate-fade-up">
              <h2>Review Your Application</h2>
              <div className="apply-review">
                <div className="apply-review__row"><span>Name</span><strong>{form.name || '—'}</strong></div>
                <div className="apply-review__row"><span>Mobile</span><strong>{form.phone || '—'}</strong></div>
                <div className="apply-review__row"><span>City</span><strong>{form.city || '—'}</strong></div>
                <div className="apply-review__row"><span>Loan Type</span><strong>{form.loanType}</strong></div>
                <div className="apply-review__row"><span>Loan Amount</span><strong>{form.amount ? `₹${Number(form.amount).toLocaleString('en-IN')}` : '—'}</strong></div>
                <div className="apply-review__row"><span>Tenure</span><strong>{form.tenure} months</strong></div>
                <div className="apply-review__row"><span>Car Value</span><strong>{form.carValue ? `₹${Number(form.carValue).toLocaleString('en-IN')}` : '—'}</strong></div>
                <div className="apply-review__row"><span>Car Model</span><strong>{form.carModel || '—'}</strong></div>
              </div>
              <p className="apply-consent">
                ✓ By submitting, you consent to AM First Loans contacting you. All information is encrypted and secure.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="apply-form__nav">
            {step > 0 && (
              <button type="button" className="btn-outline apply-form__back" id="apply-back-btn" onClick={prev}>
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button type="button" className="btn-primary apply-form__next" id="apply-next-btn" onClick={next}>
                Next Step →
              </button>
            ) : (
              <button type="submit" className="btn-primary apply-form__submit" id="apply-submit-btn">
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
