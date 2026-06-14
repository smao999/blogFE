import { useEffect, useRef } from 'react';

export default function LaserFlow({ color = '#d4a574', speed = 0.5, lineCount = 20 }: { color?: string; speed?: number; lineCount?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let time = 0;

    const resize = () => { canvas.width = canvas.parentElement?.clientWidth || window.innerWidth; canvas.height = canvas.parentElement?.clientHeight || window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    interface Line { x1: number; y1: number; x2: number; y2: number; speed: number; offset: number; width: number; }
    const lines: Line[] = [];
    const hexToRgb = (hex: string) => ({ r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) });
    const rgb = hexToRgb(color);

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        speed: (0.3 + Math.random() * 0.7) * speed,
        offset: Math.random() * Math.PI * 2,
        width: 0.5 + Math.random() * 1.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      lines.forEach(line => {
        const progress = (Math.sin(time * line.speed + line.offset) + 1) / 2;
        const x = line.x1 + (line.x2 - line.x1) * progress;
        const y = line.y1 + (line.y2 - line.y1) * progress;
        const len = 50 + Math.sin(time * line.speed * 2 + line.offset) * 30;

        const grad = ctx.createLinearGradient(x - len, y, x + len, y);
        grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        grad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.3 + progress * 0.4})`);
        grad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);

        ctx.beginPath();
        ctx.moveTo(x - len, y);
        ctx.lineTo(x + len, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = line.width;
        ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [color, speed, lineCount]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.6 }} />;
}
