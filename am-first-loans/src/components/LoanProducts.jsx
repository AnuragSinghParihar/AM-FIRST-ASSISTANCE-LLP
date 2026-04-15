import './LoanProducts.css';

const PRODUCTS = [
  {
    id: 'car-loan',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 0 4 0a2 2 0 0 0-4 0zM5 16a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"/></svg>,
    title: 'Car Loan',
    features: [
      "Get loans up to double your car's value",
      "Get approved within 12 hours",
      "Money in your account within 24 hours"
    ],
    page: 'used-car-loans',
  },
  {
    id: 'home-loan',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: 'Home Loan',
    features: [
      "Get higher loan amounts for your dream home",
      "Approval within 24–48 hours",
      "Low interest rates & flexible tenure up to 30 years"
    ],
    page: 'home',
  },
];

export default function LoanProducts({ onNavigate }) {
  return (
    <section className="loan-products" id="loan-products">
      <div className="container">
        <div className="loan-products__header">
          <h2 className="loan-products__title">Instant Loans for Every Need</h2>
          <p className="loan-products__sub">
            Get instant loan approvals with AM First Loans --fast approval, minimal documentation, and best interest rates.
          </p>
        </div>

        <div className="loan-products__grid">
          {PRODUCTS.map(p => (
            <div key={p.id} className="product-card" id={`product-${p.id}`}>
              <div className="product-card__icon-wrap">
                <span className="product-card__icon">{p.icon}</span>
              </div>
              <h3 className="product-card__title">{p.title}</h3>
              <ul className="product-card__features">
                {p.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
              <button
                className="btn-primary product-card__cta"
                id={`product-${p.id}-apply`}
                onClick={() => onNavigate(p.page)}
              >
                Apply Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
