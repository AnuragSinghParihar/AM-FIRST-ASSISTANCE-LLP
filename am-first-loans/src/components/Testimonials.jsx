import './Testimonials.css';

const REVIEWS = [
  {
    name: 'Rajesh Kumar',
    location: 'Indore, MP',
    rating: 5,
    text: 'Got my used car loan approved in just 18 hours! The team was professional and doorstep service was a lifesaver. Highly recommend AM First!',
    loan: 'Used Car Loan – ₹4.5L',
    initials: 'RK',
  },
  {
    name: 'Priya Sharma',
    location: 'Raipur, CG',
    rating: 5,
    text: 'Refinanced my car at a much better rate than my previous bank. AM First negotiated on my behalf and saved me ₹8,000 per month.',
    loan: 'Car Refinance – ₹7.2L',
    initials: 'PS',
  },
  {
    name: 'Anil Verma',
    location: 'Jaipur, RJ',
    rating: 5,
    text: 'Very transparent process. No hidden charges, no follow-up harassment. The EMI calculator helped me plan my budget perfectly.',
    loan: 'Used Car Loan – ₹6L',
    initials: 'AV',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <span className="section-tag">Customer Stories</span>
          <h2 className="testimonials__title">What Our Customers Say</h2>
          <p className="testimonials__sub">Real stories from real borrowers across India.</p>
        </div>

        <div className="testimonials__grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className="testimonial-card" id={`testimonial-${i}`}>
              <div className="testimonial-card__stars">
                {Array(r.rating).fill(0).map((_, j) => (
                  <span key={j}>⭐</span>
                ))}
              </div>
              <p className="testimonial-card__text">"{r.text}"</p>
              <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar">{r.initials}</div>
                <div>
                  <p className="testimonial-card__name">{r.name}</p>
                  <p className="testimonial-card__meta">{r.location} · {r.loan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials__rating">
          <span className="testimonials__rating-score">4.8</span>
          <div>
            <div className="testimonials__rating-stars">⭐⭐⭐⭐⭐</div>
            <p>Based on 2,400+ reviews on Google</p>
          </div>
        </div>
      </div>
    </section>
  );
}
