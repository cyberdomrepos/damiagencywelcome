"use client";

import { useEffect, useRef, useState } from 'react';

// ============================================================================
// SCROLL ANIMATION HOOKS
// Optimized hooks for scroll-triggered animations with IntersectionObserver
// ============================================================================

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  triggerOnce?: boolean; // Only trigger animation once
}

/**
 * Single element scroll animation hook
 * Triggers animation when element enters viewport
 * 
 * @example
 * const { elementRef, isVisible } = useScrollAnimation({ delay: 100, triggerOnce: true });
 * return <div ref={elementRef} className={isVisible ? 'fade-in visible' : 'fade-in'}>...</div>
 */
export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  delay = 0,
  triggerOnce = true
}: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered.current)) {
          setTimeout(() => {
            setIsVisible(true);
            hasTriggered.current = true;
          }, delay);
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay, triggerOnce]);

  return { elementRef, isVisible };
}

/**
 * Staggered scroll animation for multiple items
 * Animates children one after another with configurable delays
 * 
 * @example
 * const { elementRef, visibleItems } = useStaggeredScrollAnimation(5, 0, 150);
 * return <div ref={elementRef}>{items.map((item, i) => (
 *   <div key={i} className={visibleItems[i] ? 'fade-in visible' : 'fade-in'}>{item}</div>
 * ))}</div>
 */
export function useStaggeredScrollAnimation(
  count: number,
  baseDelay = 0,
  staggerDelay = 100,
  triggerOnce = true
) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));
  const elementRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered.current)) {
          // Trigger staggered animations
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newItems = [...prev];
                newItems[i] = true;
                return newItems;
              });
            }, baseDelay + (i * staggerDelay));
          }
          hasTriggered.current = true;
        } else if (!triggerOnce && !entry.isIntersecting) {
          setVisibleItems(new Array(count).fill(false));
          hasTriggered.current = false;
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [count, baseDelay, staggerDelay, triggerOnce]);

  return { elementRef, visibleItems };
}

/**
 * Detects user's reduced motion preference
 * Use this to disable animations for accessibility
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Parallax scroll effect hook
 * Returns scroll-based transform values
 * 
 * @example
 * const { ref, transform } = useParallax({ speed: 0.5 });
 * return <div ref={ref} style={{ transform }}>{content}</div>
 */
export function useParallax(speed: number = 0.5) {
  const [transform, setTransform] = useState('translateY(0px)');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrolled = window.pageYOffset;
      const offset = scrolled * speed;
      
      setTransform(`translateY(${offset}px)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, transform };
}