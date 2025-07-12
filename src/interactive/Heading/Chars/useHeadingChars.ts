import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useRef } from 'react';
import SplitType from 'split-type';

import s from './styles.module.scss';

interface IUseHeadingChars {
  refContent: MutableRefObject<HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  offset?: number;
  isObserver?: boolean;
  start?: string;
  horizontal?: boolean;
  duration?: number;
  onComplete?: () => void;
  isInPopup?: boolean;
}

export default function useHeadingChars({
  refContent, isInPopup,
  delayTrigger = 0,
  delayEnter = 0,
  offset = 0,
  isObserver,
  start,
  horizontal,
  onComplete,
  duration,
}: IUseHeadingChars): {
  initAnimation: () => void;
  playAnimation: () => void;
  outAnimation: () => void;
} {
  const { contextSafe } = useGSAP();
  const refText = useRef<SplitType | null>(null);

  const initAnimation = contextSafe(() => {
    refContent.current?.classList.add(s.headingChars);
    refText.current = new SplitType(refContent.current as HTMLElement, {
      types: 'lines,words,chars',
    });
    gsap.killTweensOf(refText.current?.chars);
    gsap.set(refText.current?.chars, { y: '105%' });
  });
  const getDelayCallBack = useCallback((): number => {
    return getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger, isInPopup });
  }, []);
  const playAnimation = contextSafe(() => {
    const delay = getDelayCallBack();
    refText.current?.chars &&
      gsap.to(refText.current.chars, {
        stagger: 0.015,
        y: '0%',
        duration: duration || 1.6,
        ease: 'expo',
        delay: offset ? -offset : delay,
        overwrite: 'auto',
        onComplete,
      });
  });

  const outAnimation = contextSafe(() => {
    const delay = getDelayCallBack();
    refText.current?.chars &&
      gsap.to(refText.current.chars, {
        stagger: 0.015,
        y: '-105%',
        duration: duration || 1.6,
        ease: 'expo',
        delay: offset ? -offset : delay,
        overwrite: 'auto',
        onComplete,
      });
  });

  return {
    initAnimation,
    playAnimation,
    outAnimation,
  };
}
