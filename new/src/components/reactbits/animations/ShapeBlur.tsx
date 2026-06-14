import { useRef, useEffect, useState } from 'react';

export default function ShapeBlur({ children, className = '', blurAmount = 10 }: { children: React.ReactNode; className?: string; blurAmount?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHovered || !ref.current) return;
    const handleMove = (e: MouseEvent) => {
      const rect = ref.current!.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isHovered]);

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 50, y: 50 }); }}
      style={{
        position: 'relative',
        filter: isHovered ? 'none' : `blur(${blurAmount}px)`,
        transition: 'filter 0.4s ease',
        cursor: 'pointer',
      }}
    >
      {isHovered && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: `radial-gradient(circle 80px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 80px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 80px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
        }} />
      )}
      <div style={{ filter: isHovered ? 'none' : `blur(${blurAmount}px)`, transition: 'filter 0.4s ease' }}>
        {children}
      </div>
    </div>
  );
}
