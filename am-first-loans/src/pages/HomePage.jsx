import './HomePage.css';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import LoanProducts from '../components/LoanProducts';
import HowItWorks from '../components/HowItWorks';

import WhyChooseUs from '../components/WhyChooseUs';

export default function HomePage({ onNavigate }) {
  return (
    <main className="home-page">
      <Hero onNavigate={onNavigate} />
      <StatsBar />
      <LoanProducts onNavigate={onNavigate} />
      <HowItWorks onNavigate={onNavigate} />
      <WhyChooseUs />

    </main>
  );
}
