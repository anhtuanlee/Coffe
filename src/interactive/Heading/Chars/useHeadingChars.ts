import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useRef } from 'react';
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
}

export default function useHeadingChars({
  refContent,
  delayTrigger = 0,
  delayEnter = 0,
  offset = 0,
  isObserver,
  start,
  horizontal,
  onComplete,
  duration,
}: IUseHeadingChars): void {
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

  const playAnimation = contextSafe(() => {
    const delay = getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
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

  const _playAnimationOut = contextSafe(() => {});

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
    start,
    horizontal,
  });
}
