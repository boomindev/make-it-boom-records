import React from 'react';
import { SOCIALS } from '../data/plans';
import { ArrowUpRight, Radio } from 'lucide-react';

interface SocialMediaProps {
  onHoverState?: (isHovered: boolean, text?: string) => void;
}

export const SocialMedia: React.FC<SocialMediaProps> = ({ onHoverState }) => {
  return (
    <section id="social" className="py-28 bg-[#0e0e0e] border-t border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#8e9192] uppercase block mb-3">
              CONNECT & FOLLOW
            </span>
            <h2 className="font-headline font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              OUR SOCIAL MEDIA
            </h2>
          </div>
          <p className="text-sm text-[#c4c7c8] max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Follow our official streaming channels, release announcements, behind-the-scenes content, and artist debuts.
          </p>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIALS.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => onHoverState && onHoverState(true, 'FOLLOW')}
              onMouseLeave={() => onHoverState && onHoverState(false)}
              className="group bg-[#131313] border border-white/10 rounded-[4px] p-6 flex items-center justify-between hover:border-white/40 hover:bg-[#181818] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-white group-hover:text-white tracking-tight">
                    {soc.name}
                  </h3>
                  <span className="text-xs text-[#8e9192] font-mono">{soc.handle}</span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#c4c7c8] group-hover:border-white group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
