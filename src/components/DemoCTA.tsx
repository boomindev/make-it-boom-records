import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Disc3, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DemoCTAProps {
  onOpenDemoModal: () => void;
  onHoverState?: (isHovered: boolean, text?: string) => void;
}

export const DemoCTA: React.FC<DemoCTAProps> = ({ onOpenDemoModal, onHoverState }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-[#131313] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div
          ref={containerRef}
          onMouseEnter={() => onHoverState && onHoverState(true, 'DEMO')}
          onMouseLeave={() => onHoverState && onHoverState(false)}
          className="relative bg-gradient-to-r from-[#181818] via-[#1f1f1f] to-[#181818] border border-white/15 rounded-[4px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden group shadow-2xl"
        >
          {/* Animated subtle lines background */}
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700 pointer-events-none" />

          {/* Left Text */}
          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase rounded-[2px] mb-4">
              <Disc3 className="w-3.5 h-3.5 animate-spin-slow" />
              <span>A&R DIRECT SUBMISSION</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-3">
              SEND US YOUR DEMO
            </h2>
            <p className="text-base text-[#c4c7c8] font-light tracking-wide max-w-lg">
              Ready to make some noise? Our A&R team listens to every unreleased master submitted directly through our secure platform.
            </p>
          </div>

          {/* Right Button */}
          <div className="relative z-10 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto font-headline font-extrabold text-sm tracking-widest uppercase bg-white text-black px-10 py-5 rounded-[4px] hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-white/20 group"
            >
              <span>SUBMIT YOUR DEMO</span>
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
