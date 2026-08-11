import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { Globe, Users, TrendingUp, BarChart3, MapPin } from 'lucide-react';
import {
  LISTENER_DATA,
  PULSE_THRESHOLD,
  formatListeners,
  getTopCountries,
} from '../data/listeners';

gsap.registerPlugin(ScrollTrigger);

/* ── Natural Earth 110m TopoJSON hosted on unpkg (≈90 kB gzipped) ── */
const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

/* ── Centroids for pulse markers (lon, lat) ── */
const CENTROIDS: Record<string, [number, number]> = {
  USA: [-98, 39],
  DOM: [-70, 19],
  MEX: [-102, 24],
  COL: [-74, 4],
  BRA: [-53, -10],
  ARG: [-64, -34],
  CAN: [-106, 56],
  ESP: [-3.7, 40],
  GBR: [-2, 54],
  DEU: [10, 51],
  FRA: [2, 47],
  ITA: [12, 42],
  NLD: [5, 52],
  PRT: [-8, 39],
  SWE: [15, 62],
  NOR: [8, 62],
  POL: [19, 52],
  JPN: [138, 36],
  KOR: [127, 36],
  AUS: [134, -25],
  IND: [78, 22],
  CHN: [104, 35],
  TUR: [35, 39],
  ZAF: [25, -29],
  NGA: [8, 10],
  ARE: [54, 24],
};

interface TooltipState {
  x: number;
  y: number;
  visible: boolean;
  countryName: string;
  listeners: number;
  percentage: number;
}

interface ListenersMapProps {
  onHoverState?: (isHovered: boolean, text?: string) => void;
}

export const ListenersMap: React.FC<ListenersMapProps> = ({ onHoverState }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const [tooltip, setTooltip] = useState<TooltipState>({
    x: 0, y: 0, visible: false, countryName: '', listeners: 0, percentage: 0,
  });

  const [selectedIso, setSelectedIso] = useState<string | null>(null);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapWrapRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!tooltip.visible) return;
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    },
    [tooltip.visible]
  );

  const selectCountryByIso = useCallback(
    (iso: string, clientX?: number, clientY?: number) => {
      const data = LISTENER_DATA[iso];
      if (!data) return;

      setSelectedIso(iso);
      setTooltip({
        x: clientX || window.innerWidth / 2 - 100,
        y: clientY || window.innerHeight / 2 - 80,
        visible: true,
        countryName: data.name,
        listeners: data.listeners,
        percentage: data.percentage,
      });

      onHoverState?.(true, 'VIEW');
    },
    [onHoverState]
  );

  const handleGeoEnter = useCallback(
    (geo: any, e: React.MouseEvent) => {
      const iso: string = geo.properties.ISO_A3 || geo.properties.ISO_A3_EH || '';
      selectCountryByIso(iso, e.clientX, e.clientY);
    },
    [selectCountryByIso]
  );

  const handleGeoLeave = useCallback(() => {
    setSelectedIso(null);
    setTooltip((prev) => ({ ...prev, visible: false }));
    onHoverState?.(false);
  }, [onHoverState]);

  const handleGeoClick = useCallback(
    (geo: any, e: React.MouseEvent | React.TouchEvent) => {
      const iso: string = geo.properties.ISO_A3 || geo.properties.ISO_A3_EH || '';
      const touch = 'touches' in e ? (e as React.TouchEvent).touches[0] : (e as React.MouseEvent);
      selectCountryByIso(iso, touch.clientX, touch.clientY);

      setTimeout(() => {
        setTooltip((prev) => ({ ...prev, visible: false }));
        setSelectedIso(null);
      }, 3500);
    },
    [selectCountryByIso]
  );

  // High contrast fills for clear continent definition on mobile & desktop
  const getFill = (geo: any): string => {
    const iso: string = geo.properties.ISO_A3 || geo.properties.ISO_A3_EH || '';
    const isSelected = iso === selectedIso;
    const hasData = !!LISTENER_DATA[iso];

    if (isSelected) return '#ffffff';
    if (hasData) return '#333333';
    return '#1c1c1c';
  };

  const getStroke = (geo: any): string => {
    const iso: string = geo.properties.ISO_A3 || geo.properties.ISO_A3_EH || '';
    return iso === selectedIso ? '#ffffff' : '#303030';
  };

  const topCountries = getTopCountries(8);

  return (
    <section
      id="listeners"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#0e0e0e] border-t border-white/10 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#8e9192] uppercase block mb-2">
              GLOBAL REACH &amp; DEMOGRAPHICS
            </span>
            <h2 className="font-headline font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              OUR LISTENERS
            </h2>
          </div>
          <div className="flex items-center gap-2.5 mt-4 md:mt-0 text-[11px] sm:text-xs text-[#c4c7c8] bg-[#141414] px-3.5 py-2 rounded-[4px] border border-white/10 self-start md:self-auto">
            <Globe className="w-4 h-4 text-white shrink-0" />
            <span>Interactive World Map &middot; 60+ Countries</span>
          </div>
        </div>

        {/* Quick Country Selector Pills for Mobile */}
        <div className="flex lg:hidden overflow-x-auto gap-2 mb-4 pb-2 scrollbar-none">
          {topCountries.slice(0, 6).map((c) => (
            <button
              key={`pill-${c.iso}`}
              onClick={() => selectCountryByIso(c.iso)}
              className={`px-3 py-1.5 rounded-[4px] text-[11px] font-bold uppercase tracking-wider shrink-0 transition-all ${
                selectedIso === c.iso
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'bg-[#181818] text-white/80 border border-white/10 hover:border-white/40'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
          {/* Map Container - Responsive height fitting mobile naturally */}
          <div
            ref={mapWrapRef}
            className="lg:col-span-3 relative bg-[#080808] border border-white/15 rounded-[4px] overflow-hidden flex flex-col justify-center min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] p-2 sm:p-4"
          >
            {/* Subtle grid background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            />

            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{
                scale: 155,
                center: [0, 10],
              }}
              width={820}
              height={410}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const iso: string =
                      geo.properties.ISO_A3 || geo.properties.ISO_A3_EH || '';
                    const hasData = !!LISTENER_DATA[iso];

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={(e) => handleGeoEnter(geo, e as any)}
                        onMouseLeave={handleGeoLeave}
                        onMouseMove={(e) => {
                          if (!LISTENER_DATA[iso]) return;
                          setTooltip((prev) => ({
                            ...prev,
                            x: (e as any).clientX,
                            y: (e as any).clientY,
                          }));
                        }}
                        onClick={(e) => handleGeoClick(geo, e as any)}
                        style={{
                          default: {
                            fill: getFill(geo),
                            stroke: getStroke(geo),
                            strokeWidth: 0.5,
                            outline: 'none',
                            transition: 'fill 0.2s ease, stroke 0.2s ease',
                            cursor: hasData ? 'pointer' : 'default',
                          },
                          hover: {
                            fill: hasData ? '#ffffff' : '#282828',
                            stroke: '#ffffff',
                            strokeWidth: 0.8,
                            outline: 'none',
                            cursor: hasData ? 'pointer' : 'default',
                            filter: hasData
                              ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
                              : 'none',
                          },
                          pressed: {
                            fill: '#ffffff',
                            stroke: '#ffffff',
                            strokeWidth: 1,
                            outline: 'none',
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* Pulse markers for high activity regions */}
              {Object.entries(CENTROIDS).map(([iso, coords]) => {
                const data = LISTENER_DATA[iso];
                if (!data || data.listeners < PULSE_THRESHOLD) return null;
                const isSelected = iso === selectedIso;
                const r = Math.min(9, Math.max(4, (data.listeners / 84200) * 8));

                return (
                  <Marker key={`pulse-${iso}`} coordinates={coords}>
                    <circle
                      r={r + 4}
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth={0.8}
                      className="animate-ping"
                      style={{ animationDuration: '2.5s' }}
                    />
                    <circle
                      r={r}
                      fill={isSelected ? '#ffffff' : 'rgba(255,255,255,0.85)'}
                      stroke="#ffffff"
                      strokeWidth={0.6}
                      className="pulse-dot cursor-pointer"
                      style={{
                        filter: isSelected
                          ? 'drop-shadow(0 0 10px rgba(255,255,255,0.9))'
                          : 'drop-shadow(0 0 4px rgba(255,255,255,0.4))',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </Marker>
                );
              })}
            </ComposableMap>

            {/* Map Legend */}
            <div className="flex items-center gap-4 text-[9px] sm:text-[10px] text-[#8e9192] tracking-wider uppercase mt-2 px-2">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span>HIGH ACTIVITY</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#333333] border border-white/30" />
                <span>ACTIVE REGION</span>
              </div>
            </div>
          </div>

          {/* Top Regions Sidebar */}
          <div className="lg:col-span-1 bg-[#121212] border border-white/10 rounded-[4px] p-5 sm:p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="text-xs font-semibold tracking-widest text-[#8e9192] uppercase">
                TOP REGIONS
              </span>
              <BarChart3 className="w-4 h-4 text-white/70" />
            </div>

            <div className="space-y-3.5">
              {topCountries.map((c, idx) => (
                <div
                  key={c.iso}
                  onClick={() => selectCountryByIso(c.iso)}
                  className={`group flex items-start gap-3 cursor-pointer p-1.5 rounded transition-colors ${
                    selectedIso === c.iso ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-[10px] font-bold text-white/40 tracking-wider mt-0.5 w-4 text-right shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-bold text-white tracking-wide truncate">
                        {c.name}
                      </span>
                      <span className="text-[10px] font-semibold text-white/70 tracking-wider shrink-0">
                        {c.percentage}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#8e9192]">
                      <Users className="w-3 h-3 text-white/50" />
                      <span>{formatListeners(c.listeners)} LISTENERS</span>
                    </div>

                    <div className="mt-1.5 h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, (c.listeners / 84200) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3.5 border-t border-white/10 text-[10px] text-[#8e9192] leading-relaxed">
              Live audience metrics aggregated across Spotify, Apple Music &amp; YouTube Music.
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: Math.min(window.innerWidth - 220, Math.max(10, tooltip.x + 12)),
            top: Math.max(80, tooltip.y - 15),
            transform: 'translateY(-100%)',
          }}
        >
          <div className="bg-[#121212]/95 backdrop-blur-xl border border-white/30 rounded-[4px] shadow-2xl shadow-black px-4 py-3.5 min-w-[190px]">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span className="text-[11px] font-extrabold tracking-[0.15em] text-white uppercase">
                {tooltip.countryName}
              </span>
            </div>

            <div className="mb-1.5">
              <span className="text-[9px] font-semibold tracking-widest text-[#8e9192] uppercase block mb-0.5">
                MONTHLY LISTENERS
              </span>
              <span className="font-headline font-black text-xl text-white tracking-tight">
                {formatListeners(tooltip.listeners)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-[#c4c7c8]">
              <TrendingUp className="w-3 h-3 text-white" />
              <span className="font-semibold tracking-wider">
                {tooltip.percentage}% OF GLOBAL LISTENERS
              </span>
            </div>
          </div>
          <div className="w-2.5 h-2.5 bg-[#121212]/95 border-b border-r border-white/30 rotate-45 -mt-[5px] ml-5" />
        </div>
      )}
    </section>
  );
};
