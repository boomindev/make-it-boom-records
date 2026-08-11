import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REAL_ARTISTS } from '../data/artists';
import { ExternalLink, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ArtistsProps {
  onHoverState?: (isHovered: boolean, text?: string) => void;
}

export const Artists: React.FC<ArtistsProps> = ({ onHoverState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Touch & Drag state refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentDragXRef = useRef(0);

  // Calculate visible items count dynamically (3 Desktop, 2 Tablet, 1 Mobile)
  const updateVisibleCount = useCallback(() => {
    let count = 3;
    if (window.innerWidth < 640) {
      count = 1;
    } else if (window.innerWidth < 1024) {
      count = 2;
    } else {
      count = 3;
    }
    setVisibleCount(count);

    // Keep currentIndex strictly within bounds [0, maxIndex] on resize
    const maxIdx = Math.max(0, REAL_ARTISTS.length - count);
    setCurrentIndex((prev) => Math.min(prev, maxIdx));
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  const maxIndex = Math.max(0, REAL_ARTISTS.length - visibleCount);

  // Animate slide with GSAP & elastic bounce on boundaries
  const goToIndex = useCallback(
    (index: number, rebound: boolean = false) => {
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clampedIndex);

      if (carouselTrackRef.current) {
        const targetPercent = -(clampedIndex / REAL_ARTISTS.length) * 100;

        if (rebound) {
          // Bounce effect when attempting to overscroll
          gsap.to(carouselTrackRef.current, {
            xPercent: targetPercent,
            duration: 0.7,
            ease: 'back.out(1.6)',
          });
        } else {
          gsap.to(carouselTrackRef.current, {
            xPercent: targetPercent,
            duration: 0.6,
            ease: 'power3.out',
          });
        }
      }
    },
    [maxIndex]
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1);
    } else {
      // Rebound feedback if user clicks prev on first item
      goToIndex(0, true);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      goToIndex(currentIndex + 1);
    } else {
      // Rebound feedback if user clicks next on last item
      goToIndex(maxIndex, true);
    }
  };

  // Touch Swipe & Drag Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isDraggingRef.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    currentDragXRef.current = clientX;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    currentDragXRef.current = clientX;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diffX = startXRef.current - currentDragXRef.current;
    const threshold = 40; // Minimum px to trigger slide

    if (diffX > threshold) {
      // Swiped Left -> Next
      if (currentIndex < maxIndex) {
        goToIndex(currentIndex + 1);
      } else {
        goToIndex(maxIndex, true); // Rebound
      }
    } else if (diffX < -threshold) {
      // Swiped Right -> Prev
      if (currentIndex > 0) {
        goToIndex(currentIndex - 1);
      } else {
        goToIndex(0, true); // Rebound
      }
    } else {
      // Reset position without changing index
      goToIndex(currentIndex);
    }
  };

  // Entrance animations with GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (carouselTrackRef.current) {
        gsap.fromTo(
          carouselTrackRef.current.children,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="artists" ref={containerRef} className="py-24 sm:py-28 bg-[#0e0e0e] relative overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header with Navigation & Counter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#8e9192] uppercase">
                OFFICIAL ROSTER
              </span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              OUR ARTISTS
            </h2>
          </div>

          {/* Controls & Counter */}
          <div className="flex items-center justify-between md:justify-end gap-4 mt-6 md:mt-0">
            <span className="text-xs sm:text-sm font-mono text-white/70 tracking-widest bg-[#151515] px-3.5 py-2 rounded-[4px] border border-white/10">
              0{currentIndex + 1} / 0{REAL_ARTISTS.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous Artist"
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-[4px] border flex items-center justify-center transition-all duration-300 ${
                  currentIndex === 0
                    ? 'border-white/5 text-white/20 bg-white/5 cursor-not-allowed'
                    : 'border-white/20 text-white hover:border-white hover:bg-white/10 cursor-pointer active:scale-95'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next Artist"
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-[4px] border flex items-center justify-center transition-all duration-300 ${
                  currentIndex >= maxIndex
                    ? 'border-white/5 text-white/20 bg-white/5 cursor-not-allowed'
                    : 'border-white/20 text-white hover:border-white hover:bg-white/10 cursor-pointer active:scale-95'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Outer Container */}
        <div
          className="overflow-hidden relative w-full rounded-[4px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          {/* Carousel Track */}
          <div
            ref={carouselTrackRef}
            className="flex transition-transform ease-out"
            style={{ width: `${(REAL_ARTISTS.length / visibleCount) * 100}%` }}
          >
            {REAL_ARTISTS.map((artist) => (
              <div
                key={artist.id}
                style={{ width: `${100 / REAL_ARTISTS.length}%` }}
                className="px-2 sm:px-3 shrink-0"
              >
                <a
                  href={artist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Escuchar a ${artist.name} (${artist.category}) en Spotify - Make It Boom Records`}
                  aria-label={`Perfil oficial de ${artist.name} en Spotify`}
                  onMouseEnter={() => onHoverState && onHoverState(true, 'SPOTIFY')}
                  onMouseLeave={() => onHoverState && onHoverState(false)}
                  className="group relative bg-[#131313] border border-white/10 rounded-[4px] overflow-hidden hover:border-green-500/60 transition-all duration-500 cursor-pointer flex flex-col justify-between h-[460px] sm:h-[520px] shadow-2xl block"
                >
                  {/* Background Artist Image */}
                  <div className="absolute inset-0 overflow-hidden bg-[#181818]">
                    <img
                      src={artist.image}
                      alt={`${artist.name} - Artista del sello discográfico Make It Boom Records (${artist.category})`}
                      loading="lazy"
                      width="600"
                      height="800"
                      draggable={false}
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90 group-hover:scale-108 group-hover:filter-none transition-all duration-700 ease-out pointer-events-none"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                  </div>

                  {/* Top Badge & Spotify Icon */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-[10px] font-extrabold text-[#e2e2e2] tracking-[0.2em] uppercase border border-white/15 rounded-[2px] group-hover:border-green-500/40 transition-colors">
                      {artist.category}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#1DB954] group-hover:text-black group-hover:border-[#1DB954] transition-all duration-300 shadow-lg">
                      <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Bottom Info Section */}
                  <div className="relative z-10 p-6 sm:p-8 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-[#8e9192] uppercase block mb-1.5 group-hover:text-green-400 transition-colors">
                      MAKE IT BOOM RECORDS
                    </span>
                    <h3 className="font-headline font-black text-2xl sm:text-4xl text-white tracking-tight uppercase group-hover:text-white transition-colors">
                      {artist.name}
                    </h3>

                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#c4c7c8]">
                      <span className="tracking-wider uppercase font-semibold text-[10px] sm:text-[11px] text-white/70 group-hover:text-[#1DB954] transition-colors flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.218.359-.696.475-1.055.257-2.887-1.764-6.522-2.162-10.804-1.183-.406.092-.813-.161-.906-.568-.092-.406.162-.813.569-.906 4.686-1.071 8.687-.611 11.94 1.345.358.218.474.696.256 1.055zm1.474-3.277c-.274.446-.859.589-1.305.314-3.305-2.032-8.344-2.622-12.254-1.434-.503.153-1.033-.135-1.186-.638-.153-.503.136-1.033.638-1.186 4.469-1.356 10.027-.704 13.793 1.614.446.275.589.859.314 1.305zm.135-3.411c-3.962-2.353-10.504-2.57-14.305-1.416-.609.185-1.25-.164-1.435-.772-.185-.608.164-1.25.772-1.435 4.373-1.328 11.583-1.077 16.143 1.631.547.324.729 1.035.405 1.581-.325.547-1.035.729-1.58.411z"/>
                        </svg>
                        LISTEN ON SPOTIFY
                      </span>
                      <span className="text-white/50 group-hover:text-white font-mono text-[10px] sm:text-[11px] transition-colors">SPOTIFY</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
