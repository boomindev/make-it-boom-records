import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const bottomWavesRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden';

    // Simulated smooth progress timeline
    const tl = gsap.timeline({
      onUpdate: () => {
        const p = Math.round(tl.progress() * 100);
        setProgress(p);
      },
      onComplete: () => {
        // Exit animation timeline
        const exitTl = gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            document.body.style.overflow = '';
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
            onComplete?.();
          },
        });

        // 1. Content elements fade out & shift slightly
        exitTl.to([topBarRef.current, centerContentRef.current, bottomWavesRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in',
          stagger: 0.05,
        });

        // 2. Curtain slides up smoothly
        exitTl.to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
          },
          '-=0.2'
        );
      },
    });

    // Loading duration (~2.4s)
    tl.to({}, { duration: 2.4, ease: 'power2.inOut' });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-black text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none"
    >
      {/* Top Header Bar */}
      <div ref={topBarRef} className="w-full z-10">
        <div className="flex justify-between items-start pb-6">
          {/* Left Text Statement */}
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-300 font-sans max-w-xs sm:max-w-md leading-relaxed tracking-wide">
            Make It Boom Records is an international hub where independent artists grow, new music is discovered, and global talent thrives.
          </p>

          {/* Right Giant Percentage Counter */}
          <div className="text-5xl sm:text-7xl md:text-8xl font-bold font-mono tracking-tighter text-white leading-none">
            {progress}%
          </div>
        </div>

        {/* Thin Horizontal Line Separator */}
        <div className="w-full h-[1px] bg-white/20" />
      </div>

      {/* Center: Crisp Logo Fill Effect without Clipped Glow */}
      <div ref={centerContentRef} className="relative z-10 flex items-center justify-center my-auto py-12">
        <div className="relative inline-block">
          {/* Soft ambient background glow (unclipped, smooth blur behind the logo) */}
          <div
            className="absolute -inset-10 rounded-full bg-white/10 blur-3xl pointer-events-none transition-opacity duration-300"
            style={{ opacity: progress > 5 ? progress / 100 : 0 }}
          />

          {/* Base Dimmed Silhouette Logo */}
          <img
            src="/logo.png"
            alt="Make It Boom Base Logo"
            className="w-64 sm:w-80 md:w-96 h-auto object-contain opacity-20 filter grayscale relative z-10"
          />

          {/* Filled Crisp White Logo Overlay (Revealed left to right via clipPath) */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
            }}
          >
            <img
              src="/logo.png"
              alt="Make It Boom Filled Logo"
              className="w-64 sm:w-80 md:w-96 h-auto object-contain brightness-115 contrast-125"
            />
          </div>
        </div>
      </div>

      {/* Bottom Wave Lines SVG Background */}
      <div
        ref={bottomWavesRef}
        className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 pointer-events-none opacity-40 z-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
            d="M0,160 C320,300 420,0 720,160 C1020,320 1120,20 1440,160"
          />
          <path
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            d="M0,200 C280,50 500,280 800,100 C1100,280 1300,50 1440,200"
          />
          <path
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            d="M0,100 C360,240 600,80 900,220 C1200,60 1350,260 1440,100"
          />
        </svg>
      </div>
    </div>
  );
};
