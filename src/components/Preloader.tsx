import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Disc3, Radio } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden';

    // Timeline for simulated ultra-smooth loading progression
    const tl = gsap.timeline({
      onUpdate: () => {
        const p = Math.round(tl.progress() * 100);
        setProgress(p);
      },
      onComplete: () => {
        setIsLoaded(true);

        // Exit animation timeline
        const exitTl = gsap.timeline({
          delay: 0.2,
          onComplete: () => {
            document.body.style.overflow = '';
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
            onComplete?.();
          },
        });

        // 1. Logo & elements scale & fade out
        exitTl.to([logoRef.current, '.loader-content'], {
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: 'power3.in',
        });

        // 2. Curtain slide up reveal
        exitTl.to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
          },
          '-=0.3'
        );
      },
    });

    // Animate progress over 2.4 seconds
    tl.to({}, { duration: 2.2, ease: 'power2.inOut' });

    // Initial entrance animations
    gsap.fromTo(
      logoRef.current,
      { scale: 0.85, opacity: 0, filter: 'blur(10px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-between py-12 px-6 overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]" />

      {/* Top Header Tag */}
      <div className="loader-content flex items-center justify-between w-full max-w-5xl z-10 text-[10px] sm:text-xs font-mono text-[#8e9192] uppercase tracking-[0.3em]">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>BOOM AUDIO ENGINE v2.6</span>
        </div>
        <span className="hidden sm:inline-block">EST. 2026</span>
      </div>

      {/* Main Center Content: Logo & Pulse Ring */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
        {/* Pulsing Outer Aura */}
        <div className="absolute -inset-12 rounded-full bg-white/5 blur-3xl animate-pulse pointer-events-none" />

        {/* Logo Container */}
        <div ref={logoRef} className="relative mb-8 group">
          {/* Animated Spinner Ring around Logo */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-white/10 border-t-white/80 animate-spin" style={{ animationDuration: '4s' }} />

          <img
            src="/logo.png"
            alt="Make It Boom Records"
            className="w-32 sm:w-44 md:w-52 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] relative z-10"
          />
        </div>

        {/* Subtitle Brand Statement */}
        <div className="loader-content space-y-1.5">
          <h1 className="font-headline font-black text-2xl sm:text-4xl text-white tracking-[0.25em] uppercase">
            MAKE IT BOOM
          </h1>
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.4em] text-[#8e9192] uppercase block">
            RECORDS &middot; INTERNATIONAL LABEL
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div className="loader-content w-full max-w-md z-10 space-y-4 mb-4">
        {/* Sleek Line Progress Bar */}
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
          <div
            ref={progressLineRef}
            className="h-full bg-white transition-all duration-100 ease-out shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Percentage Counter & Label */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#8e9192] uppercase tracking-widest flex items-center gap-2">
            <Disc3 className="w-3.5 h-3.5 text-white animate-spin" />
            {isLoaded ? 'SYSTEM READY' : 'INITIALIZING EXPERIENCE'}
          </span>
          <span ref={counterRef} className="text-white font-bold text-sm tracking-wider">
            {String(progress).padStart(2, '0')}%
          </span>
        </div>
      </div>
    </div>
  );
};
