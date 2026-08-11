import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onOpenJoinModal: () => void;
  onOpenDemoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoinModal, onOpenDemoModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        bgImageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 0.45, duration: 1.6 }
      )
        .fromTo(
          headlineRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=1.2'
        )
        .fromTo(
          subtextRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.7'
        )
        .fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#0e0e0e]"
    >
      {/* Background Image & Vignette */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/70 to-[#0e0e0e]/80" />
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      {/* Grid line accent */}
      <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 md:px-12 pointer-events-none border-x border-white/5 flex justify-between">
        <div className="w-[1px] h-full bg-white/5 hidden md:block" />
        <div className="w-[1px] h-full bg-white/5 hidden md:block" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Label Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/5 border border-white/15 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#c4c7c8] uppercase">
            MAKE IT BOOM RECORDS &middot; SELLO DISCOGRÁFICO
          </span>
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          aria-label="Make It Boom Records - Home of Global Talent | Sello Discográfico de Música Urbana"
          className="font-headline font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white uppercase leading-[0.9] max-w-5xl mb-8 drop-shadow-2xl"
        >
          <span className="sr-only">Make It Boom Records — Sello Discográfico &amp; Record Label de Música Urbana: </span>
          HOME OF <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
            GLOBAL TALENT
          </span>
        </h1>

        {/* Supporting Text */}
        <p
          ref={subtextRef}
          className="text-base sm:text-lg md:text-xl text-[#c4c7c8] max-w-2xl font-light leading-relaxed mb-10 tracking-wide"
        >
          El sello discográfico internacional donde los artistas independientes de música urbana y talento global impulsan su carrera con distribución mundial y pitching oficial.
        </p>

        {/* Action Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenJoinModal}
            className="w-full sm:w-auto font-headline font-extrabold text-sm tracking-widest uppercase bg-white text-black px-8 py-4 rounded-[4px] hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-white/20 group"
          >
            <span>JOIN MAKE IT BOOM</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href="#artists"
            className="w-full sm:w-auto font-headline font-bold text-sm tracking-widest uppercase bg-transparent text-white border border-white/20 hover:border-white/60 px-8 py-4 rounded-[4px] transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/5"
          >
            <span>EXPLORE ARTISTS</span>
            <ArrowRight className="w-4 h-4 text-white/60" />
          </a>
        </div>

        {/* Bottom Feature Badges */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div>
            <span className="block text-[10px] text-white/40 uppercase tracking-widest">DISTRIBUTION</span>
            <span className="text-xs font-semibold text-white tracking-wider">150+ PLATFORMS</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/40 uppercase tracking-widest">ARTISTS</span>
            <span className="text-xs font-semibold text-white tracking-wider">GLOBAL NETWORK</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/40 uppercase tracking-widest">PITCHING</span>
            <span className="text-xs font-semibold text-white tracking-wider">OFFICIAL CURATORS</span>
          </div>
          <div>
            <span className="block text-[10px] text-white/40 uppercase tracking-widest">ROYALTIES</span>
            <span className="text-xs font-semibold text-white tracking-wider">100% TRANSPARENT</span>
          </div>
        </div>
      </div>
    </section>
  );
};
