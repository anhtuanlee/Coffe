'use client';

import classNames from 'classnames';
import gsap from 'gsap';
import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';

import { ScrollTrigger } from 'gsap/all';
import s from './styles.module.scss';

interface IImageParallaxProps extends PropsWithChildren {
  speed?: number;
  scale?: number;
  className?: string;
}

export default function ImageParallax({
  children,
  speed = 1,
  className,
  scale: scaleInput = 1.2,
}: IImageParallaxProps): ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scale = Math.max(1, scaleInput);
    const offset = speed || 1;
    const yPercent = Math.round(((scale - 1) / 2) * 100) * offset;
    const tl = gsap.timeline();
    gsap.registerPlugin(ScrollTrigger);

    tl.fromTo(
      refEl.current,
      { scale, yPercent },
      {
        yPercent: -yPercent,
        ease: 'none',
      }
    );

    ScrollTrigger.create({
      trigger: refWrap.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: tl,
    });
  }, []);

  return (
    <div className={classNames(s.imageParallax, className)} ref={refWrap}>
      <div className={s.imageParallax_inner} ref={refEl}>
        {children}
      </div>
    </div>
  );
}
