// @ts-nocheck
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const getContainingBlock = element => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = block => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hoverDuration = 0.2,
  parallaxOn = true
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const containingBlockRef = useRef(null);

  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), []);

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.current);
    gsap.to(cursorRef.current, {
      x: x - offsetX,
      y: y - offsetY,
      duration: 0.1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    containingBlockRef.current = getContainingBlock(cursor);
    const getOffset = () => getContainingBlockOffset(containingBlockRef.current);

    let activeTarget = null;
    let currentLeaveHandler = null;
    let resumeTimeout = null;

    const cleanupTarget = target => {
      if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    // Hide cursor initially
    gsap.set(cursor, { opacity: 0, xPercent: -50, yPercent: -50, x: 0, y: 0 });

    const createSpinTimeline = () => {
      if (spinTl.current) spinTl.current.kill();
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };
    createSpinTimeline();

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) return;
      const strength = activeStrengthRef.current;
      if (strength === 0) return;
      const cursorX = gsap.getProperty(cursorRef.current, 'x');
      const cursorY = gsap.getProperty(cursorRef.current, 'y');
      Array.from(cornersRef.current).forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x');
        const currentY = gsap.getProperty(corner, 'y');
        const targetX = targetCornerPositionsRef.current[i].x - cursorX;
        const targetY = targetCornerPositionsRef.current[i].y - cursorY;
        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;
        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;
        gsap.to(corner, { x: finalX, y: finalY, duration, ease: duration === 0 ? 'none' : 'power1.out', overwrite: 'auto' });
      });
    };
    tickerFnRef.current = tickerFn;

    const moveHandler = e => moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', moveHandler);

    const mouseDownHandler = () => { gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 }); };
    const mouseUpHandler = () => { gsap.to(dotRef.current, { scale: 1, duration: 0.3 }); };
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    // Detect hover over target elements
    const enterHandler = e => {
      let current = e.target;
      let target = null;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) { target = current; break; }
        current = current.parentElement;
      }

      if (target) {
        // Show custom cursor, hide default
        if (!activeTarget) {
          gsap.to(cursor, { opacity: 1, duration: 0.2 });
          document.body.style.cursor = 'none';
        }
        if (activeTarget === target) return;
        if (activeTarget) cleanupTarget(activeTarget);
        if (resumeTimeout) { clearTimeout(resumeTimeout); resumeTimeout = null; }

        activeTarget = target;
        const corners = Array.from(cornersRef.current);
        corners.forEach(corner => gsap.killTweensOf(corner));
        gsap.killTweensOf(cursor, 'rotation');
        spinTl.current?.pause();
        gsap.set(cursor, { rotation: 0 });

        const rect = target.getBoundingClientRect();
        const { borderWidth, cornerSize } = constants;
        const { x: offsetX, y: offsetY } = getOffset();
        const cursorX = gsap.getProperty(cursor, 'x');
        const cursorY = gsap.getProperty(cursor, 'y');

        targetCornerPositionsRef.current = [
          { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
          { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
          { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
          { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY }
        ];

        isActiveRef.current = true;
        gsap.ticker.add(tickerFnRef.current);
        gsap.to(activeStrengthRef, { current: 1, duration: hoverDuration, ease: 'power2.out' });

        corners.forEach((corner, i) => {
          gsap.to(corner, { x: targetCornerPositionsRef.current[i].x - cursorX, y: targetCornerPositionsRef.current[i].y - cursorY, duration: 0.2, ease: 'power2.out' });
        });

        const leaveHandler = () => {
          gsap.ticker.remove(tickerFnRef.current);
          isActiveRef.current = false;
          targetCornerPositionsRef.current = null;
          gsap.set(activeStrengthRef, { current: 0, overwrite: true });
          activeTarget = null;

          // Hide custom cursor, restore default
          gsap.to(cursor, { opacity: 0, duration: 0.2 });
          document.body.style.cursor = 'auto';

          if (cornersRef.current) {
            const { cornerSize } = constants;
            const positions = [{ x: -cornerSize * 1.5, y: -cornerSize * 1.5 }, { x: cornerSize * 0.5, y: -cornerSize * 1.5 }, { x: cornerSize * 0.5, y: cornerSize * 0.5 }, { x: -cornerSize * 1.5, y: cornerSize * 0.5 }];
            Array.from(cornersRef.current).forEach((c, i) => gsap.to(c, { x: positions[i].x, y: positions[i].y, duration: 0.3, ease: 'power3.out' }));
          }

          resumeTimeout = setTimeout(() => {
            if (!activeTarget && spinTl.current) {
              const currentRotation = gsap.getProperty(cursor, 'rotation');
              const normalizedRotation = currentRotation % 360;
              spinTl.current.kill();
              spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
              gsap.to(cursor, { rotation: normalizedRotation + 360, duration: spinDuration * (1 - normalizedRotation / 360), ease: 'none', onComplete: () => spinTl.current?.restart() });
            }
            resumeTimeout = null;
          }, 50);
          cleanupTarget(target);
        };
        currentLeaveHandler = leaveHandler;
        target.addEventListener('mouseleave', leaveHandler);
      }
    };
    window.addEventListener('mouseover', enterHandler, { passive: true });

    const resizeHandler = () => { containingBlockRef.current = getContainingBlock(cursor); };
    window.addEventListener('resize', resizeHandler);

    return () => {
      gsap.ticker.remove(tickerFnRef.current);
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      window.removeEventListener('resize', resizeHandler);
      if (activeTarget) cleanupTarget(activeTarget);
      spinTl.current?.kill();
      document.body.style.cursor = 'auto';
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hoverDuration, parallaxOn]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;
