import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PLANS } from '../data/plans';
import { Check, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PlansProps {
  onSelectPlan: (planId: string) => void;
  onHoverState?: (isHovered: boolean, text?: string) => void;
}

export const Plans: React.FC<PlansProps> = ({ onSelectPlan, onHoverState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="plans" ref={containerRef} className="py-28 bg-[#0e0e0e] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#8e9192] uppercase block mb-3">
              ARTIST DISTRIBUTION & SERVICES
            </span>
            <h2 className="font-headline font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              OUR PLANS
            </h2>
          </div>
          <p className="text-sm text-[#c4c7c8] max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Transparent pricing designed for independent artists at every tier of their career trajectory.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              onMouseEnter={() => onHoverState && onHoverState(true, 'PLAN')}
              onMouseLeave={() => onHoverState && onHoverState(false)}
              className={`relative bg-[#131313] border rounded-[4px] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'border-white bg-[#181818] shadow-2xl shadow-white/10 ring-1 ring-white/20'
                  : 'border-white/10 hover:border-white/40'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3 h-3 fill-black text-black" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <h3 className="font-headline font-black text-2xl text-white tracking-tight uppercase mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#c4c7c8] min-h-[36px] font-light leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline font-black text-4xl sm:text-5xl text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs font-semibold text-[#8e9192] uppercase tracking-wider">
                      {plan.billingPeriod}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/40 block mt-1 uppercase tracking-widest">
                    CANCEL ANYTIME • NO HIDDEN FEES
                  </span>
                </div>

                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold text-[#8e9192] tracking-widest uppercase block mb-3">
                    WHAT'S INCLUDED:
                  </span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#e2e2e2]">
                      <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-4 rounded-[4px] font-headline font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-lg shadow-white/10'
                    : 'bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5'
                }`}
              >
                <span>SELECT PLAN</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
