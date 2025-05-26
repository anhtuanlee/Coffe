'use client';

import useWindowResize from '@Hooks/useWindowResize';
import { useSignalEffect } from '@preact/signals-react';
import { useLenis } from '@studio-freight/react-lenis';
import { MathMap } from '@Utils/mathUtils';
import { MutableRefObject, useCallback, useRef } from 'react';

import s from './styles.module.scss';

interface IuseImageParallax {
  refWrap: MutableRefObject<HTMLDivElement | null>;
  refContent: MutableRefObject<HTMLDivElement | HTMLImageElement | HTMLVideoElement | null>;
  offset?: number;
  scale?: number;
}

export default function useImageParallax({
  refWrap,
  refContent,
  offset = 1,
  scale = 1.2,
}: IuseImageParallax): void {
  const refOptions = useRef({
    isFirstRender: false,
    isTop: false,
  });
  const { width } = useWindowResize();

  const runParallax = useCallback((): void => {
    const rectWrap = refWrap.current?.getBoundingClientRect();
    if (!rectWrap) return;
    const { innerHeight: height } = window;
    const disParallax = Math.abs((scale - 1) * rectWrap.height);
    const c = -disParallax * (refOptions.current.isTop ? 2 : 1);

    const rageTrigger = MathMap(height + rectWrap.height / 2, height, 0, c, disParallax);
    const current = MathMap(rectWrap.top + rectWrap.height / 2, height, 0, c, disParallax);

    if (Math.abs(current) >= Math.abs(rageTrigger)) {
      if (!refOptions.current.isFirstRender && refContent.current) {
        refContent.current.style.transform = `translate3d(0px, ${rageTrigger * offset}px, 0px)`;
        refOptions.current.isFirstRender = true;
      }
      return;
    }

    if (refContent.current) {
      refContent.current.style.transform = `translate3d(0, ${current * offset}px, 0)`;
      refContent.current.style.backfaceVisibility = `hidden`;
      refContent.current.style.willChange = `transform`;
      refContent.current.style.overflow = `hidden`;
      refContent.current.style.inset = `0px`;
    }
  }, [offset, refContent, refWrap, scale]);

  useSignalEffect(() => {
    if (refWrap.current) refWrap.current.style.height = 'auto';
    if (refContent.current) refContent.current.style.height = 'auto';

    const rectWrap = refWrap.current?.getBoundingClientRect();
    if (width.value && rectWrap && rectWrap?.top < window.innerHeight) {
      refOptions.current.isTop = true;
    }

    runParallax();
    if (!rectWrap || scale < 1) return;
    refWrap.current?.classList.add(s.imgParallax);
    refContent.current?.classList.add(s.imgParallax_el);

    if (refContent.current) {
      refContent.current.style.height = `${rectWrap.height * scale}px`;
      refContent.current.style.maxWidth = `none`;
    }

    if (refWrap.current) refWrap.current.style.height = `${rectWrap.height}px`;
  });

  useLenis(runParallax);
}
