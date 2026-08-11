import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onOpenDemoModal: () => void;
  onHoverState?: (isHovered: boolean, text?: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenDemoModal, onHoverState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-[#0e0e0e] border-t border-white/10 relative overflow-hidden text-center"
    >
      {/* Background Animated Soundwave / Line accents */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-white/30 animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/20" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/10" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/15 rounded-full text-[11px] font-semibold text-white tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE MOVEMENT</span>
        </div>

        <h2
          ref={headlineRef}
          className="font-headline font-black text-5xl sm:text-7xl lg:text-9xl text-white tracking-tighter uppercase leading-none mb-6"
        >
          READY TO MAKE IT <span className="text-white underline decoration-white/30 underline-offset-8">BOOM?</span>
        </h2>

        <p className="text-lg md:text-xl text-[#c4c7c8] font-light max-w-xl mb-10 tracking-wide">
          Send your demo and join the next generation of global music pioneers.
        </p>

        <button
          onClick={onOpenDemoModal}
          onMouseEnter={() => onHoverState && onHoverState(true, 'START')}
          onMouseLeave={() => onHoverState && onHoverState(false)}
          className="font-headline font-extrabold text-base tracking-widest uppercase bg-white text-black px-12 py-5 rounded-[4px] hover:bg-neutral-200 transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-white/20 group"
        >
          <span>SUBMIT YOUR DEMO</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
      </div>
    </section>
  );
};
