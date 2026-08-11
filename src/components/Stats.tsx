import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  id: string;
  label: string;
  targetValue: number;
  suffix: string;
  sublabel: string;
}

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    reach: 0,
    audience: 0,
    artists: 0,
    partners: 0,
  });

  const statsList: StatItem[] = [
    {
      id: 'reach',
      label: 'GLOBAL REACH',
      targetValue: 10,
      suffix: 'B+',
      sublabel: 'TOTAL STREAMS',
    },
    {
      id: 'audience',
      label: 'TOTAL AUDIENCE',
      targetValue: 300,
      suffix: 'M+',
      sublabel: 'ACTIVE LISTENERS',
    },
    {
      id: 'artists',
      label: 'SIGNED ARTISTS',
      targetValue: 52,
      suffix: '+',
      sublabel: 'WORLDWIDE ROSTER',
    },
    {
      id: 'partners',
      label: 'GLOBAL PARTNERS',
      targetValue: 120,
      suffix: '+',
      sublabel: 'TERRITORIES COVERED',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          statsList.forEach((stat) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.targetValue,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => ({
                  ...prev,
                  [stat.id]: Math.floor(obj.val),
                }));
              },
            });
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-20 bg-[#131313] border-y border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsList.map((stat, idx) => (
            <div
              key={stat.id}
              className="relative p-8 bg-[#181818] border border-white/10 rounded-[4px] hover:border-white/30 transition-all duration-300 group"
            >
              <div className="text-[10px] font-semibold tracking-[0.2em] text-[#8e9192] uppercase mb-4">
                0{idx + 1} / {stat.label}
              </div>

              <div className="font-headline font-black text-5xl md:text-6xl text-white tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
                {counts[stat.id]}
                <span className="text-white/70">{stat.suffix}</span>
              </div>

              <div className="text-xs font-medium tracking-widest text-[#c4c7c8] uppercase">
                {stat.sublabel}
              </div>

              {/* Accent corner line */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 group-hover:border-white transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
