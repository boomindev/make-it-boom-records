import React from 'react';
import { ExternalLink, Disc, Sparkles } from 'lucide-react';

interface PartnersProps {
  onHoverState?: (isHovered: boolean, text?: string) => void;
}

interface PartnerItem {
  name: string;
  category: string;
  tagline: string;
  featured?: boolean;
}

export const Partners: React.FC<PartnersProps> = ({ onHoverState }) => {
  const partners: PartnerItem[] = [
    { name: 'DISETTI', category: 'OFFICIAL PARTNER', tagline: 'Strategic Music & Brand Partner', featured: true },
    { name: 'SPOTIFY', category: 'DSP / STREAMING', tagline: 'Official Pitching & Editorial Playlists' },
    { name: 'APPLE MUSIC', category: 'DSP / STREAMING', tagline: 'Spatial Audio & Worldwide Delivery' },
    { name: 'YOUTUBE MUSIC', category: 'VIDEO & AUDIO', tagline: 'Content ID & Official Artist Channels' },
    { name: 'AMAZON MUSIC', category: 'DSP / STREAMING', tagline: 'Global Discovery & Alexa Integration' },
    { name: 'TIDAL', category: 'HI-FI AUDIO', tagline: 'Master Quality & Direct Fan Payouts' },
    { name: 'DEEZER', category: 'DSP / STREAMING', tagline: 'Worldwide Reach & Flow Recommendation' },
    { name: 'TIKTOK MUSIC', category: 'VIRAL PLATFORMS', tagline: 'Sound Library & Synchronization' },
    { name: 'META & INSTAGRAM', category: 'SOCIAL AUDIO', tagline: 'Reels, Stories & Audio Licensing' },
    { name: 'AUDIOMACK', category: 'TRENDING MUSIC', tagline: 'Urban & Hip-Hop Community Reach' },
    { name: 'SOUNDCLOUD', category: 'COMMUNITY & DJ', tagline: 'Independent Creator Monetization' },
    { name: '+150 STORES', category: 'GLOBAL ECOSYSTEM', tagline: 'Worldwide Digital Distribution Network', featured: true },
  ];

  return (
    <section id="partners" className="py-24 bg-[#0a0a0a] border-t border-b border-white/10 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#8e9192] uppercase">
                SPONSORS &amp; DISTRIBUTION PARTNERS
              </span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              OUR PARTNERS
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-[#8e9192] max-w-md font-light leading-relaxed">
            Distribuimos y colaboramos directamente con los líderes de la industria del streaming y marketing digital para maximizar el alcance de cada lanzamiento.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              onMouseEnter={() => onHoverState && onHoverState(true, partner.name)}
              onMouseLeave={() => onHoverState && onHoverState(false)}
              className={`group p-6 rounded-[4px] border transition-all duration-300 flex flex-col justify-between h-44 ${
                partner.featured
                  ? 'bg-gradient-to-b from-white/10 to-white/5 border-white/30 hover:border-white shadow-xl'
                  : 'bg-[#121212] border-white/10 hover:border-white/30 hover:bg-[#161616]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">
                  {partner.category}
                </span>
                <Disc className="w-4 h-4 text-white/30 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
              </div>

              <div>
                <h3 className="font-headline font-black text-xl sm:text-2xl text-white tracking-tight uppercase group-hover:text-white transition-colors">
                  {partner.name}
                </h3>
                <p className="text-[11px] text-[#8e9192] group-hover:text-[#c4c7c8] transition-colors mt-1 font-light leading-snug">
                  {partner.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 group-hover:text-white/70 transition-colors">
                <span className="font-mono">VERIFIED INTEGRATION</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
