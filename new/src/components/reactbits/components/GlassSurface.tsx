import { useId, useRef, useState, useEffect } from 'react';
import './GlassSurface.css';

export default function GlassSurface({
  children, width = 200, height = 80, borderRadius = 20, borderWidth = 0.07,
  brightness = 50, opacity = 0.93, blur = 11, displace = 0, backgroundOpacity = 0,
  saturation = 1, distortionScale = -180, redOffset = 0, greenOffset = 10, blueOffset = 20,
  xChannel = 'R', yChannel = 'G', mixBlendMode = 'difference', className = '', style = {}
}: {
  children?: React.ReactNode; width?: number | string; height?: number | string;
  borderRadius?: number; borderWidth?: number; brightness?: number; opacity?: number;
  blur?: number; displace?: number; backgroundOpacity?: number; saturation?: number;
  distortionScale?: number; redOffset?: number; greenOffset?: number; blueOffset?: number;
  xChannel?: string; yChannel?: string; mixBlendMode?: string;
  className?: string; style?: React.CSSProperties;
}) {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;
  const [svgSupported, setSvgSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400; const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);
    const svgContent = `<svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"/><rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})"/><rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/><rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  useEffect(() => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
    try { const div = document.createElement('div'); div.style.backdropFilter = `url(#${filterId})`; setSvgSupported(div.style.backdropFilter !== ''); } catch { setSvgSupported(false); }
  }, []);

  useEffect(() => { setTimeout(() => feImageRef.current?.setAttribute('href', generateDisplacementMap()), 0); }, [width, height]);

  const containerStyle = { ...style, width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height, borderRadius: `${borderRadius}px`, '--glass-frost': backgroundOpacity, '--glass-saturation': saturation, '--filter-id': `url(#${filterId})` } as React.CSSProperties;

  return (
    <div ref={containerRef} className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`} style={containerStyle}>
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={String(distortionScale + redOffset)} xChannelSelector={xChannel} yChannelSelector={yChannel} result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={String(distortionScale + greenOffset)} xChannelSelector={xChannel} yChannelSelector={yChannel} result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={String(distortionScale + blueOffset)} xChannelSelector={xChannel} yChannelSelector={yChannel} result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation={String(displace || 0.7)} />
          </filter>
        </defs>
      </svg>
      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
