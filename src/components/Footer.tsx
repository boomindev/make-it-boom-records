import React from 'react';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#0a0a0a] text-[#c4c7c8] border-t border-white/10 pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16 border-b border-white/10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#hero" title="MAKE IT BOOM DISTRIBUTION - Home" className="inline-flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="MAKE IT BOOM DISTRIBUTION - Music Distribution & Record Label"
                width="160"
                height="40"
                loading="lazy"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-headline font-black text-xl text-white tracking-tight uppercase">
                MAKE IT BOOM DISTRIBUTION
              </span>
            </a>

            <p className="text-xs text-[#8e9192] leading-relaxed max-w-sm font-light">
              Independent global music distribution platform and urban talent development hub. Delivering your music to over 150 platforms worldwide.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-white">
              <Mail className="w-4 h-4 text-white/70" />
              <a href="mailto:contacto@makeitboomrecords.com" className="hover:underline">
                contacto@makeitboomrecords.com
              </a>
            </div>
          </div>

          {/* Col 3: MENU */}
          <div>
            <h3 className="font-headline font-bold text-xs tracking-[0.2em] text-white uppercase mb-6">
              MENU
            </h3>
            <ul className="space-y-3 text-xs tracking-wider font-medium">
              <li>
                <a href="#hero" title="Go to Home" className="hover:text-white transition-colors">HOME</a>
              </li>
              <li>
                <a href="#artists" title="View MAKE IT BOOM DISTRIBUTION Artists" className="hover:text-white transition-colors">ARTISTS</a>
              </li>
              <li>
                <a href="#partners" title="View Partners & Sponsors" className="hover:text-white transition-colors">PARTNERS</a>
              </li>
              <li>
                <a href="#footer" title="Contact MAKE IT BOOM DISTRIBUTION" className="hover:text-white transition-colors">CONTACT</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8e9192]">
          <div>&copy; 2026 MAKE IT BOOM DISTRIBUTION. All rights reserved.</div>
          <div className="flex items-center space-x-6">
            <span>DESIGN SYSTEM: STITCH NOIR</span>
            <span>HIGH FIDELITY AUDIO DISTRIBUTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
