import { useState, useMemo } from 'react';
import './EMICalculator.css';

function calcEMI(principal, rate, months) {
  const r = rate / 12 / 100;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function formatINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

export default function EMICalculator({ onNavigate, fullPage = false }) {
  const [loan, setLoan] = useState(500000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(36);
  const [loanType, setLoanType] = useState('used');

  const emi = useMemo(() => calcEMI(loan, rate, tenure), [loan, rate, tenure]);
  const total = useMemo(() => emi * tenure, [emi, tenure]);
  const interest = useMemo(() => total - loan, [total, loan]);

  const pPct = total > 0 ? ((loan / total) * 100).toFixed(1) : 0;
  const iPct = total > 0 ? ((interest / total) * 100).toFixed(1) : 0;

  const amortization = useMemo(() => {
    const sched = [];
    let balance = loan;
    const monthlyRate = rate / 12 / 100;
    const d = new Date();
    // Start from next month
    let currentMonth = d.getMonth() + 1;
    let currentYear = d.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < 5 && i < tenure; i++) {
      if (balance <= 0) break;
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = emi - interestForMonth;
      let closingBalance = balance - principalForMonth;
      if (closingBalance < 0) closingBalance = 0;
      
      let m = (currentMonth + i) % 12;
      let y = currentYear + Math.floor((currentMonth + i) / 12);
      
      sched.push({
        month: `${monthNames[m]} ${y}`,
        opening: balance,
        emi: emi,
        principal: principalForMonth,
        interest: interestForMonth,
        closing: closingBalance
      });
      balance = closingBalance;
    }
    return sched;
  }, [loan, rate, emi, tenure]);

  return (
    <section className={`emi-calc${fullPage ? ' emi-calc--full' : ''}`} id="emi-calculator">
      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 24px' }}>
        <h2 className="emi-calc__main-title" style={{ textAlign: 'center', marginBottom: '40px', fontFamily: 'var(--font-serif, var(--font-heading))', fontSize: '32px', color: 'var(--navy-900)', textTransform: 'uppercase' }}>EMI CALCULATOR</h2>

        <div className="emi-calc__grid">
          {/* Left Block - Inputs */}
          <div className="emi-calc__panel emi-calc__panel--light">
            <h3 className="emi-calc__panel-title" style={{ fontFamily: 'var(--font-serif, var(--font-heading))', color: 'var(--navy-900)', fontSize: '18px', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '800' }}>LOAN DETAILS</h3>
            
            {/* Loan Amount */}
            <div className="emi-calc__field">
              <div className="emi-calc__field-header">
                <label htmlFor="slider-amount">Loan Amount</label>
                <span className="emi-calc__field-value" style={{ color: 'var(--gold-600)', fontWeight: '700' }}>Rs. {loan.toLocaleString('en-IN')}</span>
              </div>
              <input
                id="slider-amount"
                type="range"
                min={50000}
                max={3000000}
                step={10000}
                value={loan}
                onChange={e => setLoan(Number(e.target.value))}
                className="emi-calc__slider"
                style={{ backgroundSize: `${((loan - 50000) * 100) / (3000000 - 50000)}% 100%` }}
              />
              <div className="emi-calc__range-labels">
                <span>Rs.50,000</span>
                <span>Rs.30,00,000</span>
              </div>
            </div>

            {/* Rate */}
            <div className="emi-calc__field">
              <div className="emi-calc__field-header">
                <label htmlFor="slider-rate">Interest Rate (p.a.)</label>
                <span className="emi-calc__field-value" style={{ color: 'var(--gold-600)', fontWeight: '700' }}>{rate} %</span>
              </div>
              <input
                id="slider-rate"
                type="range"
                min={8}
                max={24}
                step={0.1}
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="emi-calc__slider"
                style={{ backgroundSize: `${((rate - 8) * 100) / (24 - 8)}% 100%` }}
              />
              <div className="emi-calc__range-labels">
                <span>8%</span>
                <span>24%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="emi-calc__field">
              <div className="emi-calc__field-header">
                <label htmlFor="slider-tenure">Loan Tenure</label>
                <span className="emi-calc__field-value" style={{ color: 'var(--gold-600)', fontWeight: '700' }}>{tenure} Months</span>
              </div>
              <input
                id="slider-tenure"
                type="range"
                min={6}
                max={84}
                step={1}
                value={tenure}
                onChange={e => setTenure(Number(e.target.value))}
                className="emi-calc__slider"
                style={{ backgroundSize: `${((tenure - 6) * 100) / (84 - 6)}% 100%` }}
              />
              <div className="emi-calc__range-labels">
                <span>6 Months</span>
                <span>84 Months</span>
              </div>
            </div>

            {/* Loan Type */}
            <div className="emi-calc__type-wrap" style={{ marginTop: '24px', marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--navy-900)', marginBottom: '12px' }}>Loan Type:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setLoanType('used')}
                  style={{ padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontWeight: '700', border: 'none', cursor: 'pointer', background: loanType === 'used' ? 'var(--gold-500)' : '#EAECEF', color: 'var(--navy-900)', transition: '0.2s' }}
                >
                  Used Car
                </button>
                <button 
                  onClick={() => setLoanType('home')}
                  style={{ padding: '10px 20px', borderRadius: '4px', fontSize: '14px', fontWeight: '700', border: 'none', cursor: 'pointer', background: loanType === 'home' ? 'var(--gold-500)' : '#EAECEF', color: 'var(--navy-900)', transition: '0.2s' }}
                >
                  Home
                </button>
              </div>
            </div>

            <button
              className="emi-calc__btn-apply"
              id="emi-apply-btn"
              onClick={() => onNavigate('apply')}
              style={{ width: '100%', padding: '16px', background: 'var(--gold-500)', border: 'none', borderRadius: '4px', fontWeight: '800', color: 'var(--navy-900)', letterSpacing: '0.5px', cursor: 'pointer', textTransform: 'uppercase', transition: '0.2s' }}
            >
              APPLY FOR THIS LOAN
            </button>
          </div>

          {/* Right Block - Summary */}
          <div className="emi-calc__panel emi-calc__panel--dark" style={{ background: 'var(--navy-800)', borderRadius: '8px', padding: '36px', color: 'white', display: 'flex', flexDirection: 'column' }}>
            <h3 className="emi-calc__panel-title" style={{ fontFamily: 'var(--font-serif, var(--font-heading))', color: 'white', fontSize: '18px', marginBottom: '24px', letterSpacing: '0.5px' }}>EMI SUMMARY</h3>
            
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Monthly EMI</p>
              <p style={{ fontSize: '48px', fontWeight: '800', color: 'var(--gold-500)', margin: '0' }}>{formatINR(emi)}</p>
            </div>

            <div className="emi-calc__summary-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Principal Amount</span>
                <strong style={{ fontWeight: '600' }}>{formatINR(loan)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Total Interest</span>
                <strong style={{ fontWeight: '600' }}>{formatINR(interest)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Total Payable</span>
                <strong style={{ fontWeight: '600' }}>{formatINR(total)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '4px' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Tenure</span>
                <strong style={{ fontWeight: '600' }}>{tenure} Months</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>Rate</span>
                <strong style={{ fontWeight: '600' }}>{rate}% p.a.</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '24px', marginTop: '36px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>Principal vs Interest</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: 'white' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '6px', height: '6px', background: 'var(--gold-500)', display: 'inline-block' }}></span>{pPct}% Principal</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '6px', height: '6px', background: '#e15241', display: 'inline-block' }}></span>{iPct}% Interest</span>
              </div>
            </div>

          </div>
        </div>

        {/* Amortization Table */}
        <div className="emi-calc__amortization" style={{ marginTop: '48px', background: 'var(--navy-800)', color: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif, var(--font-heading))', color: 'white', fontSize: '20px', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '800' }}>
            AMORTIZATION SCHEDULE — PREVIEW
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--navy-900)', color: 'var(--gold-400)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Month</th>
                  <th style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Opening Balance</th>
                  <th style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>EMI</th>
                  <th style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Principal</th>
                  <th style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Interest</th>
                  <th style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortization.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '16px', textAlign: 'left', fontSize: '14px', color: 'white' }}>{row.month}</td>
                    <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: 'white' }}>{Math.round(row.opening).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: 'white' }}>{Math.round(row.emi).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: 'white' }}>{Math.round(row.principal).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: 'white' }}>{Math.round(row.interest).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: 'white' }}>{Math.round(row.closing).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
            Showing first {Math.min(5, tenure)} months.
          </p>
        </div>

      </div>
    </section>
  );
}
