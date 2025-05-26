import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

import s from './styles.module.scss';

type IUseBoxMaskCenter = {
  refTrigger: MutableRefObject<HTMLDivElement | null>;
  refMaskWrapper: MutableRefObject<HTMLDivElement | null>;
  refMaskElement: MutableRefObject<HTMLDivElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  ease?: string;
  duration?: number;
  threshold?: number;
  start?: string;
  horizontal?: boolean;
  scale?: number;
};
export default function useBoxMaskBottom({
  refTrigger,
  refMaskWrapper,
  refMaskElement,
  ease,
  duration,
  threshold = 50,
  delayTrigger = 0,
  delayEnter = 0,
  start,
  horizontal,
  scale,
}: IUseBoxMaskCenter): void {
  const onComplete = (): void => {
    refTrigger.current?.classList.add(s.isComplete);
  };

  const { contextSafe } = useGSAP();
  const options = {
    yPercent: 0,
    ease: ease || 'power3.out',
    duration: duration || 1.2,
    onComplete,
    backfaceVisibility: 'hidden',
    willChange: 'transform',
    scale: 1,
  };

  const initAnimation = contextSafe(() => {
    gsap.set(refMaskWrapper.current, { yPercent: 100, scale: scale || 1 });
    gsap.set(refMaskElement.current, { yPercent: -100 });
  });

  const playAnimation = contextSafe(() => {
    const delay = getDelay({
      refContentCurrent: refTrigger.current,
      delayTrigger,
      delayEnter,
    });
    gsap.to([refMaskWrapper.current, refMaskElement.current], {
      delay,
      ...options,
    });
  });

  useAnimation({
    trigger: refTrigger,
    initAnimation,
    playAnimation,
    threshold,
    start,
    horizontal,
  });
}
