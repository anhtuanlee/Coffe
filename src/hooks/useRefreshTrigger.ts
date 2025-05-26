import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef } from 'react';

import useAppRouter from './useAppRouter';

export default function useRefreshTrigger(time: number = 3000): void {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { pathName } = useAppRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    timer.current = setTimeout(() => {
      ScrollTrigger.refresh();
    }, time);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [pathName]);
}
