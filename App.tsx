import React, { useEffect, useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BackToTop, ScrollProgress } from './components/UiEnhancements';
import { LazySection } from './components/LazySection';

const PlatformPreview = lazy(() => import('./components/PlatformPreview'));
const Concept = lazy(() => import('./components/Concept'));
const Products = lazy(() => import('./components/Products'));
const DashboardFeature = lazy(() => import('./components/DashboardFeature'));
const Profit = lazy(() => import('./components/Profit'));
const Process = lazy(() => import('./components/Process'));
const TargetAudience = lazy(() => import('./components/TargetAudience'));
const OnboardingForm = lazy(() => import('./components/OnboardingForm'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));

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
    
    // Log visit
    if (!localStorage.getItem('vexus_visit_logged')) {
       const visits = parseInt(localStorage.getItem('vexus_visits') || '0');
       localStorage.setItem('vexus_visits', (visits + 1).toString());
       localStorage.setItem('vexus_visit_logged', 'true');
    }

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Carregando Dashboard...</div>}>
        <AnalyticsDashboard />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen bg-black font-sans selection:bg-yellow-500 selection:text-black overflow-hidden text-gray-100">
      {/* Subtle Noise Texture if desired, or just clean black */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      
      <ScrollProgress />
      <Navbar />
      
      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <Suspense fallback={<div className="h-32 flex items-center justify-center text-gray-500">Carregando...</div>}>
          <LazySection><Concept /></LazySection>
          <LazySection><Products /></LazySection>
          <LazySection><PlatformPreview /></LazySection>
          <LazySection><DashboardFeature /></LazySection>
          <LazySection><Profit /></LazySection>
          <LazySection><Process /></LazySection>
          <LazySection><TargetAudience /></LazySection>
          <LazySection><OnboardingForm /></LazySection>
          <LazySection><FAQ /></LazySection>
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <LazySection><Footer /></LazySection>
      </Suspense>
      <BackToTop />
    </div>
  );
};

export default App;