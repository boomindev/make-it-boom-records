import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Artists } from './components/Artists';
import { ListenersMap } from './components/ListenersMap';
import { Plans } from './components/Plans';
import { DemoCTA } from './components/DemoCTA';
import { SocialMedia } from './components/SocialMedia';
import { FinalCTA } from './components/FinalCTA';
import { ApplicationModal } from './components/ApplicationModal';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'artist_join' | 'demo_submission'>('artist_join');
  const [selectedPlan, setSelectedPlan] = useState('');

  // Custom Cursor Hover state
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleOpenJoinModal = (plan?: string) => {
    setModalType('artist_join');
    if (plan) setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleOpenDemoModal = () => {
    setModalType('demo_submission');
    setModalOpen(true);
  };

  const handleCursorHover = (isHovered: boolean, text: string = '') => {
    setCursorHovered(isHovered);
    setCursorText(text);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e2e2e2] relative font-sans">
      {/* High-Impact Brand Preloader */}
      <Preloader />

      {/* Custom Cursor */}
      <CustomCursor isHovered={cursorHovered} cursorText={cursorText} />

      {/* Sticky Header Navbar */}
      <Navbar
        onOpenJoinModal={handleOpenJoinModal}
        onOpenDemoModal={handleOpenDemoModal}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenJoinModal={() => handleOpenJoinModal()}
          onOpenDemoModal={handleOpenDemoModal}
        />

        {/* Animated Statistics */}
        <Stats />

        {/* Artists Roster */}
        <Artists onHoverState={handleCursorHover} />

        {/* Global Listeners & Heatmap */}
        <ListenersMap onHoverState={handleCursorHover} />

        {/* Service Plans & Pricing */}
        <Plans
          onSelectPlan={(planName) => handleOpenJoinModal(planName)}
          onHoverState={handleCursorHover}
        />

        {/* Unreleased Demo CTA */}
        <DemoCTA
          onOpenDemoModal={handleOpenDemoModal}
          onHoverState={handleCursorHover}
        />

        {/* Official Social Media Channels */}
        <SocialMedia onHoverState={handleCursorHover} />

        {/* Final High-Impact CTA */}
        <FinalCTA
          onOpenDemoModal={handleOpenDemoModal}
          onHoverState={handleCursorHover}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Application & Demo Modal */}
      <ApplicationModal
        isOpen={modalOpen}
        initialType={modalType}
        initialPlan={selectedPlan}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default App;
