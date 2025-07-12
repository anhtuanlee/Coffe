'use client';

import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { getDelay } from '@Utils/uiHelper';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { CSSProperties, useCallback, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';

interface IProp extends IAnimationProps {
  color?: 'white' | 'dark-soft' | 'dark-strong' | 'dark-second';
  size?: number;
  classNames?: string;
  direction?: 'bottom' | 'left' | 'right' | 'top';
  isStatic?: boolean;
  isCenter?: boolean;
}

export default function Line({
  color = 'dark-soft',
  size = 1,
  delayTrigger,
  delayEnter,
  duration,
  classNames,
  direction = 'bottom',
  isCenter = false,
  isStatic = false,
  isInPopup,
}: IProp): React.ReactElement {
  const isHorizonal = direction === 'top' || direction === 'bottom';
  const lineRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();
  const initAnimation = contextSafe((): void => {
    if (!isStatic) {
      if (isHorizonal) {
        gsap.set(lineRef.current, {
          scaleX: 0,
          transformOrigin: isCenter ? 'center' : 'left',
        });
      } else {
        gsap.set(lineRef.current, {
          scaleY: 0,
          transformOrigin: isCenter ? 'center' : 'top',
        });
      }
    }
  });

  const getDelayCallBack = useCallback((): number => {
    return getDelay({ refContentCurrent: lineRef.current, delayEnter, delayTrigger, isInPopup });
  }, [lineRef]);

  const playAnimation = contextSafe((): void => {
    const delay = getDelayCallBack();
    if (!isStatic) {
      if (isHorizonal) {
        gsap.to(lineRef.current, {
          scaleX: 1,
          ease: 'power3.inOut',
          duration: duration || 1.2,
          delay,
        });
      } else {
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: 'power3.inOut',
          duration: duration || 1.2,
          delay,
        });
      }
    }
  });

  const outAnimation = contextSafe(() => {
    const delay = getDelayCallBack();
    if (!isStatic) {
      if (isHorizonal) {
        gsap.to(lineRef.current, {
          scaleX: 0,
          transformOrigin: isCenter ? 'center' : 'left',
          ease: 'power3.out',
          duration: duration || 1.2,
          delay,
        });
      } else {
        gsap.to(lineRef.current, {
          scaleY: 0,
          transformOrigin: isCenter ? 'center' : 'top',
          ease: 'power3.out',
          duration: duration || 1.2,
          delay,
        });
      }
    }
  });

  useAnimation({
    trigger: lineRef,
    initAnimation,
    playAnimation,
    outAnimation,
    isObserver: true,
    isInPopup,
  });
  return (
    <div
      ref={lineRef}
      className={cn(s.line, s[`line__${color}`], s[`line__${direction}`], classNames)}
      style={{ '--size': `${size}px` } as CSSProperties}
    ></div>
  );
}
