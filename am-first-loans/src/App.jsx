import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UsedCarLoansPage from './pages/UsedCarLoansPage';
import EMICalcPage from './pages/EMICalcPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ApplyPage from './pages/ApplyPage';
import EligibilityPage from './pages/EligibilityPage';
import MediaPage from './pages/MediaPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookie from './pages/Cookie';
import Disclaimer from './pages/Disclaimer';

const PAGES = {
  home: HomePage,
  'used-car-loans': UsedCarLoansPage,
  'emi-calc': EMICalcPage,
  eligibility: EligibilityPage,
  media: MediaPage,
  about: AboutPage,
  contact: ContactPage,
  apply: ApplyPage,
  privacy: PrivacyPolicy,
  cookie: Cookie,
  disclaimer: Disclaimer,
};



export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Update page title
    const titles = {
      home: 'AM First Loans – Used Car & Home Loans Simplified',
      'used-car-loans': 'Used Car Loans – AM First Loans',
      'emi-calc': 'EMI Calculator – AM First Loans',
      eligibility: 'Eligibility & Documents – AM First Loans',
      media: 'Media & News Hub – AM First Loans',
      about: 'About Us – AM First Loans',
      contact: 'Contact – AM First Loans',
      apply: 'Apply Now – AM First Loans',
      privacy: 'Privacy Policy – AM First Loans',
      cookie: 'Cookie Policy – AM First Loans',
      disclaimer: 'Disclaimer – AM First Loans',
    };
    document.title = titles[currentPage] || titles.home;
  }, [currentPage]);

  const PageComponent = PAGES[currentPage] || HomePage;

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <PageComponent onNavigate={navigate} />
      <Footer onNavigate={navigate} />
    </>
  );
}
