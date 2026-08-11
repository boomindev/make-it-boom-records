import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenJoinModal: (plan?: string) => void;
  onOpenDemoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal, onOpenDemoModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'ARTISTS', href: '#artists' },
    { name: 'LISTENERS', href: '#listeners' },
    { name: 'PLANS', href: '#plans' },
    { name: 'SOCIAL', href: '#social' },
    { name: 'CONTACT', href: '#footer' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#131313]/85 backdrop-blur-md border-white/10 py-3 shadow-2xl'
            : 'bg-transparent border-white/5 py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" title="Make It Boom Records | Sello Discográfico & Record Label" className="flex items-center gap-3 group">
            <img
              src="/assets/logo.png"
              alt="Make It Boom Records - Sello Discográfico & Record Label de Música Urbana"
              width="140"
              height="36"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // If image fails to load, replace with text fallback cleanly
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
            <span className="font-headline font-extrabold text-lg md:text-xl tracking-tight text-white uppercase group-hover:text-white/80 transition-colors">
              MAKE IT BOOM<span className="text-white/40 ml-1.5 text-xs tracking-widest font-normal">RECORDS</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                title={`Ir a ${link.name} - Make It Boom Records`}
                className="text-xs font-medium tracking-[0.15em] text-[#c4c7c8] hover:text-white transition-colors duration-200 uppercase relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenDemoModal}
              className="text-xs font-semibold tracking-widest uppercase px-4 py-2 text-[#c4c7c8] hover:text-white border border-white/10 hover:border-white/40 transition-all duration-300 rounded-[4px]"
            >
              DEMO
            </button>
            <button
              onClick={() => onOpenJoinModal()}
              className="group text-xs font-semibold tracking-widest uppercase bg-white text-black px-5 py-2.5 rounded-[4px] hover:bg-white/90 transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-white/5"
            >
              <span>JOIN</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-md transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#0e0e0e] flex flex-col justify-between px-8 py-24 transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-6 mt-8">
          <span className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase border-b border-white/10 pb-3">
            NAVIGATION
          </span>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline font-bold text-3xl text-white hover:text-white/70 transition-colors uppercase tracking-tight"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenJoinModal();
            }}
            className="w-full text-center font-headline font-bold text-sm tracking-widest uppercase bg-white text-black py-4 rounded-[4px] shadow-lg"
          >
            JOIN MAKE IT BOOM →
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDemoModal();
            }}
            className="w-full text-center font-headline font-bold text-sm tracking-widest uppercase border border-white/20 text-white py-4 rounded-[4px]"
          >
            SUBMIT DEMO
          </button>
        </div>
      </div>
    </>
  );
};
