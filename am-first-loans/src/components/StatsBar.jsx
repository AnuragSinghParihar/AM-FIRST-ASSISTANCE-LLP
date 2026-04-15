import { useState, useEffect, useRef } from 'react';
import './StatsBar.css';

const STATS = [
  { target: 8000, format: (n) => `${n.toLocaleString()}+`, label: 'Happy Customers' },
  { target: 500, format: (n) => `${n}cr+`, label: 'Loans Disbursed' },
  { target: 24, format: (n) => `${n}hr`, label: 'Disbursal' },
  { target: 100, format: (n) => `${n}+`, label: 'Professionals' },
];

function AnimatedNumber({ target, format }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const duration = 2000;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, isVisible]);

  return <span ref={ref}>{format(count)}</span>;
}

export default function StatsBar() {
  return (
    <div className="stats-bar" id="stats-bar">
      <div className="stats-bar__inner">
        {STATS.map((stat, i) => (
          <div key={i} className="stats-bar__item" id={`stat-${i}`}>
            <span className="stats-bar__value">
              <AnimatedNumber target={stat.target} format={stat.format} />
            </span>
            <span className="stats-bar__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
