import './HowItWorks.css';

const STEPS = [
  {
    num: '1',
    title: 'Fill Form',
    desc: 'Personal & vehicle details',
    icon: '📋',
  },
  {
    num: '2',
    title: 'Verify Docs',
    desc: 'Aadhaar, RC, income proof',
    icon: '🔍',
  },
  {
    num: '3',
    title: 'Get Approved',
    desc: 'Decision in 24 hours',
    icon: '✅',
  },
  {
    num: '4',
    title: 'Get Money',
    desc: 'Disbursed to your account',
    icon: '💰',
  },
];

export default function HowItWorks({ onNavigate }) {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="how-it-works__header">
          <h2 className="how-it-works__title">HOW IT WORKS — 4 SIMPLE STEPS</h2>
        </div>

        <div className="how-it-works__steps">
          {STEPS.map((step, i) => (
            <div key={i} className="step-card" id={`step-${i + 1}`}>
              <div className="step-card__circle">
                <span className="step-card__num">{step.num}</span>
              </div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__desc">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="step-arrow">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
