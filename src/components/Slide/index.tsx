'use client';
import { useGSAP } from '@gsap/react';
import { useLenis } from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import React, { useCallback, useMemo, useRef } from 'react';
import { useLoopInView } from '@/hooks/useLoopInview';

import s from './styles.module.scss';

interface ITextCrawlProps {
  direction?: -1 | 1;
  velocity?: number;
  length?: number;
  children: React.ReactNode;
}
export const SlideV2 = ({
  direction = 1,
  velocity = 1,
  length = 10,
  children,
}: ITextCrawlProps): React.ReactElement => {
  const wraper = useRef<HTMLDivElement | null>(null);
  const rowRef1 = useRef<HTMLDivElement | null>(null);
  const rowRef2 = useRef<HTMLDivElement | null>(null);

  const refObjects = useRef<{
    scrollWidth: number;
    initialOffset: number;
    velocityScroller: number;
    refSetter1: null | ((e: number) => void);
    refSetter2: null | ((e: number) => void);
    refSetter3: null | ((e: number) => void);
  }>({
    refSetter1: null,
    refSetter2: null,
    refSetter3: null,
    scrollWidth: 0,
    initialOffset: 0,
    velocityScroller: 0,
  });
  const isPageEnter = true;

  const dataMapping = useMemo(() => {
    const tmp = [];
    for (let i = 0; i < length * 2; i++) {
      tmp.push({ id: i });
    }
    return tmp;
  }, [length]);

  useGSAP(() => {
    if (!rowRef1.current || !rowRef2.current || !isPageEnter) return;
    const rowWidth = rowRef1.current.getBoundingClientRect().width;
    const isLeft = direction === 1;

    gsap.set(rowRef1.current, { left: isLeft ? -rowWidth : 'unset' });
    gsap.set(rowRef2.current, { left: isLeft ? -rowWidth : 'unset' });

    refObjects.current.refSetter1 = gsap.quickSetter(rowRef1.current, 'x', '%') as (
      e: number
    ) => void;
    refObjects.current.refSetter2 = gsap.quickSetter(rowRef2.current, 'x', '%') as (
      e: number
    ) => void;

    refObjects.current.initialOffset = 100;
    refObjects.current.scrollWidth = direction === 1 ? 0 : -refObjects.current.initialOffset;
  });

  const onLoop = useCallback((): void => {
    refObjects.current.scrollWidth +=
      direction * velocity * 0.0075 + refObjects.current.velocityScroller;
    refObjects.current.refSetter1 &&
      refObjects.current.refSetter1(
        refObjects.current.scrollWidth % refObjects.current.initialOffset
      );
    refObjects.current.refSetter2 &&
      refObjects.current.refSetter2(
        refObjects.current.scrollWidth % refObjects.current.initialOffset
      );
  }, [direction, velocity]);
  const onScroll = ({ velocity }: { velocity: number }): void => {
    refObjects.current.velocityScroller = Math.abs(velocity / window.innerWidth) * 50 * direction;
  };
  useLoopInView({ looper: onLoop, refInView: wraper });

  useLenis(onScroll);
  return (
    <div className={s.textCrawl} ref={wraper}>
      <div className={s.textCrawl_row}>
        <div className={s.wrapperSlideContainer}>
          <div className={`${s.wrapperSlide} ${s.wrapperSlide__1} js-item-brand`} ref={rowRef1}>
            {dataMapping.map((item) => {
              return (
                <div key={item.id} className={s.wrapperSlide_itemSlide}>
                  <div className={`${s.splideItem} slider`}>
                    <div className={`${s.splideItem}`}>{children}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`${s.wrapperSlide} ${s.wrapperSlide__2} js-item-brand`} ref={rowRef2}>
            {dataMapping.map((item) => {
              return (
                <div key={item.id} className={s.wrapperSlide_itemSlide}>
                  <div className={`${s.splideItem} slider`}>
                    <div className={`${s.splideItem}`}>{children}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
