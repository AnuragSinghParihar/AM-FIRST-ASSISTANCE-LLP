import { useState } from 'react';
import './Hero.css';

export default function Hero({ onNavigate }) {
  const [form, setForm] = useState({ name: '', loanType: 'Used Car Loan', mobile: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://am-first-assistance-llp.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000); // Reset after 5 seconds
        setForm({ name: '', loanType: 'Used Car Loan', mobile: '', message: '' }); // clear form
      } else {
        alert('Failed to submit: ' + data.error);
      }
    } catch (err) {
      alert('Server error. Ensure backend is running.');
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Background overlay pattern */}
      <div className="hero__bg-pattern"></div>
      <div className="hero__bg-gradient"></div>

      <div className="container hero__inner">
        {/* Left Content */}
        <div className="hero__content animate-fade-up">
          <h1 className="hero__title animate-fade-up animate-delay-2" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
            Get Easy Loans on your
            <span className="hero__title-highlight"> USED CAR</span>
          </h1>

          <div className="hero__desc animate-fade-up animate-delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '24px', fontWeight: '500', color: 'var(--white)' }}>
            <span>✓ 200% of Car Value</span>
            <span>✓ Quick Approval</span>
            <span>✓ Fast Disbursal</span>
          </div>

          <div className="hero__actions animate-fade-up animate-delay-4">
            <button
              id="hero-apply-now"
              className="btn-primary hero__btn-primary"
              onClick={() => onNavigate('apply')}
            >
              Apply Now
            </button>
            <button
              id="hero-check-eligibility"
              className="btn-outline"
              onClick={() => onNavigate('used-car-loans')}
            >
              Check Eligibility
            </button>
          </div>
        </div>

        {/* Quote Form */}
        <div className="hero__form-wrap animate-fade-up animate-delay-2">
          <div className="hero__form-card">
            <div className="hero__form-header">
              <h2 className="hero__form-title">Get In Touch</h2>
            </div>

            {submitted ? (
              <div className="hero__form-success">
                <div className="hero__form-success-icon">✓</div>
                <h3>Thank you!</h3>
                <p>Our loan expert will call you within 30 minutes.</p>
              </div>
            ) : (
              <form className="hero__form" onSubmit={handleSubmit} id="quote-form">
                <div className="hero__form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="hero__form-group">
                  <label htmlFor="loan-type">Loan Type</label>
                  <select
                    id="loan-type"
                    value={form.loanType}
                    onChange={e => setForm({ ...form, loanType: e.target.value })}
                  >
                    <option>Used Car Loan</option>
                    <option>Home Loan</option>
                    <option>Car Refinance</option>
                  </select>
                </div>

                <div className="hero__form-group">
                  <label htmlFor="mobile">Mobile No.</label>
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.mobile}
                    maxLength={13}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    required
                  />
                </div>

                <div className="hero__form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Your Message"
                    value={form.message}
                    rows="3"
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" id="get-free-quote-btn" className="btn-primary hero__form-submit">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
