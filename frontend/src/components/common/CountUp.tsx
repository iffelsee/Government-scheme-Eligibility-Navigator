import { useEffect, useState, useRef, type FC } from 'react';

interface CountUpProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: FC<CountUpProps> = ({
  target,
  duration = 1000,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return target;
    }
    return 0;
  });
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
