import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  cursorText?: string;
  isHovered?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorText, isHovered }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  if (isTouchDevice || !visible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-16 h-16 bg-white/90 text-black shadow-lg shadow-white/10 scale-100'
            : 'w-4 h-4 bg-white/40 border border-white/60 backdrop-blur-sm'
        }`}
      >
        {isHovered && cursorText && (
          <span className="text-[10px] font-bold tracking-wider uppercase animate-fade-in font-headline">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
