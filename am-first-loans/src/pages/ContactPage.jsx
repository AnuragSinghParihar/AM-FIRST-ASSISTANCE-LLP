import { useState } from 'react';
import './ContactPage.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <span className="section-tag">Get In Touch</span>
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__sub">
            Have a question? Our team is ready to help — reach out via any channel below.
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="container contact-body__grid">
          {/* Info */}
          <div className="contact-info">
            <h2>Visit or Call Us</h2>
            <div className="contact-info__items">
              {[
                { icon: '📍', label: 'Address', val: '123, Main Street, Indore, Madhya Pradesh 452001' },
                { icon: '📞', label: 'Phone', val: '1800-XXX-XXXX (Toll Free)' },
                { icon: '✉️', label: 'Email', val: 'info@amfirstloans.com' },
                { icon: '🕐', label: 'Hours', val: 'Monday – Saturday: 9AM to 6PM' },
                { icon: '💬', label: 'WhatsApp', val: '+91-XXXXX XXXXX' },
              ].map((item, i) => (
                <div key={i} className="contact-info__item" id={`contact-info-${i}`}>
                  <span className="contact-info__icon">{item.icon}</span>
                  <div>
                    <p className="contact-info__label">{item.label}</p>
                    <p className="contact-info__val">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-branches">
              <h3>Our Branches</h3>
              <div className="contact-branches__grid">
                {['Indore', 'Raipur', 'Ujjain', 'Jaipur', 'Bhopal'].map(city => (
                  <span key={city} className="contact-branch-tag">{city}</span>
                ))}
                <span className="contact-branch-tag">+4 more</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h3>Message Received!</h3>
                <p>Our team will get back to you within 2 business hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <h2>Send a Message</h2>
                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="contact-form__group">
                    <label htmlFor="contact-phone">Mobile Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="contact-form__group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="contact-msg">Your Message</label>
                  <textarea
                    id="contact-msg"
                    rows={5}
                    placeholder="How can we help you?"
                    value={form.msg}
                    onChange={e => setForm({ ...form, msg: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" id="contact-submit" className="btn-primary contact-form__submit">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
