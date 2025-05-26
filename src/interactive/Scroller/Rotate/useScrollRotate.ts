'use client';

import { useLoopInView } from '@Hooks/useLoopInview';
import { useLenis } from '@studio-freight/react-lenis';
import { MutableRefObject, useCallback, useRef } from 'react';

interface IUseHero {
  refContent: MutableRefObject<HTMLDivElement | HTMLAnchorElement | null>;
}

export default function useScrollRotate({ refContent }: IUseHero): void {
  const refVec = useRef(0);
  const refRotation = useRef(0);

  const loop = useCallback((): void => {
    if (refContent.current) {
      refRotation.current += 1 + refVec.current;
      refContent.current.style.transform = `rotate(${refRotation.current}deg)`;
    }
  }, [refContent]);
  const { inView } = useLoopInView({ looper: loop, refInView: refContent });
  const onScroll = useCallback(
    ({ velocity }: { velocity: number }) => {
      if (inView) {
        refVec.current = Math.abs(velocity) * 0.1;
      }
    },
    [inView]
  );

  useLenis(onScroll, [inView]);
}
