import { DependencyList, useEffect, useRef } from 'react';

export const useLoop = (looper: () => void, desp: DependencyList): void => {
  const refLoop = useRef<number | null>(null);

  useEffect(() => {
    const fnLoop = (): void => {
      looper();
    };
    gsap.ticker.add(fnLoop);
    return () => {
      refLoop.current && gsap.ticker.remove(fnLoop);
    };
  }, [looper, desp]);
};
