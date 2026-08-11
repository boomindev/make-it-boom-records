import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#0a0a0a] text-[#c4c7c8] border-t border-white/10 pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#hero" className="inline-flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Make It Boom Records"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-headline font-black text-xl text-white tracking-tight uppercase">
                MAKE IT BOOM<span className="text-white/40 ml-1.5 text-xs font-normal">RECORDS</span>
              </span>
            </a>

            <p className="text-xs text-[#8e9192] leading-relaxed max-w-sm font-light">
              An independent global record label committed to empowering innovative talent, distributing music worldwide, and setting new standards in the modern music industry.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-white">
              <Mail className="w-4 h-4 text-white/70" />
              <a href="mailto:info@makeitboomrecords.com" className="hover:underline">
                info@makeitboomrecords.com
              </a>
            </div>
          </div>

          {/* Col 3: MENU */}
          <div>
            <h4 className="font-headline font-bold text-xs tracking-[0.2em] text-white uppercase mb-6">
              MENU
            </h4>
            <ul className="space-y-3 text-xs tracking-wider font-medium">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">HOME</a>
              </li>
              <li>
                <a href="#artists" className="hover:text-white transition-colors">ARTISTS</a>
              </li>
              <li>
                <a href="#listeners" className="hover:text-white transition-colors">LISTENERS</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">PLANS</a>
              </li>
              <li>
                <a href="#social" className="hover:text-white transition-colors">SOCIAL</a>
              </li>
              <li>
                <a href="#footer" className="hover:text-white transition-colors">CONTACT</a>
              </li>
            </ul>
          </div>

          {/* Col 4: SOCIAL */}
          <div>
            <h4 className="font-headline font-bold text-xs tracking-[0.2em] text-white uppercase mb-6">
              SOCIAL
            </h4>
            <ul className="space-y-3 text-xs tracking-wider font-medium">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>TikTok</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Spotify</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: LEGAL */}
          <div>
            <h4 className="font-headline font-bold text-xs tracking-[0.2em] text-white uppercase mb-6">
              LEGAL
            </h4>
            <ul className="space-y-3 text-xs tracking-wider font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Licensing Terms</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#8e9192]">
          <div>© 2026 Make It Boom Records. All rights reserved.</div>
          <div className="flex items-center space-x-6">
            <span>DESIGN SYSTEM: STITCH NOIR</span>
            <span>HIGH FIDELITY AUDIO DISTRIBUTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
