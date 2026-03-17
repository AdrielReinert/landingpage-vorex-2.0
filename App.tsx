import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BackToTop, ScrollProgress } from './components/UiEnhancements';
import PlatformPreview from './components/PlatformPreview';
import NetworkingGroup from './components/NetworkingGroup';
import Concept from './components/Concept';
import Products from './components/Products';
import DashboardFeature from './components/DashboardFeature';
import Profit from './components/Profit';
import Process from './components/Process';
import MembersArea from './components/MembersArea';
import TargetAudience from './components/TargetAudience';
import AboutUs from './components/AboutUs';
import OnboardingForm from './components/OnboardingForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if URL has ?admin=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdmin(true);
    }

    // Track Local Clicks for the internal dashboard demo
    const handleClick = () => {
       const current = parseInt(localStorage.getItem('vexus_clicks') || '0');
       localStorage.setItem('vexus_clicks', (current + 1).toString());
    };

    const trackLeadOnWhatsAppClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a[href]') as HTMLAnchorElement | null;

      if (!link) {
        return;
      }

      const href = link.getAttribute('href') || '';
      const isWhatsAppLink = href.includes('wa.me/') || href.includes('api.whatsapp.com/');

      if (!isWhatsAppLink) {
        return;
      }

      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead');
      }
    };
    
    // Log visit
    if (!localStorage.getItem('vexus_visit_logged')) {
       const visits = parseInt(localStorage.getItem('vexus_visits') || '0');
       localStorage.setItem('vexus_visits', (visits + 1).toString());
       localStorage.setItem('vexus_visit_logged', 'true');
    }

    window.addEventListener('click', handleClick);
    document.addEventListener('click', trackLeadOnWhatsAppClick, true);

    return () => {
      window.removeEventListener('click', handleClick);
      document.removeEventListener('click', trackLeadOnWhatsAppClick, true);
    };
  }, []);

  if (isAdmin) {
    return <AnalyticsDashboard />;
  }

  return (
    <div className="relative min-h-screen bg-black font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden text-gray-100">
      {/* Subtle Noise Texture if desired, or just clean black */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      
      <ScrollProgress />
      <Navbar />
      
      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <Products />
        <Concept />
        <PlatformPreview />
        <DashboardFeature />
        <Profit />
        <MembersArea />
        <NetworkingGroup />
        <Process />
        <TargetAudience />
        <AboutUs />
        <OnboardingForm />
        <FAQ />
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
