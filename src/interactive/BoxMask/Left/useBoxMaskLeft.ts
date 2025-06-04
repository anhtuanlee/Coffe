import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

import { IAnimationHook, IValueHookAnimation } from '@/types/animation';

import s from './styles.module.scss';

interface IUseBoxMaskLeft extends IAnimationHook {
  refTrigger: MutableRefObject<HTMLDivElement | null>;
  refMaskWrapper: MutableRefObject<HTMLDivElement | null>;
  refMaskElement: MutableRefObject<HTMLDivElement | null>;
}

export default function useBoxMaskLeft({
  refTrigger,
  refMaskWrapper,
  refMaskElement,
  ease,
  duration,
  delayTrigger = 0,
  delayEnter = 0,
}: IUseBoxMaskLeft): IValueHookAnimation {
  const { contextSafe } = useGSAP();

  const onComplete = (): void => {
    refTrigger.current?.classList.add(s.isComplete);
  };

  const options = {
    scaleX: 1,
    scaleY: 1,
    ease: ease || 'power3.out',
    duration: duration || 1.2,
    onComplete,
  };

  const initAnimation = contextSafe(() => {
    gsap.set(refMaskElement.current, { scaleX: 1.2, scaleY: 1.2 });
  });

  const playAnimation = contextSafe(() => {
    const delay = getDelay({
      refContentCurrent: refTrigger.current,
      delayTrigger,
      delayEnter,
    });
    gsap.to([refMaskElement.current], {
      delay,
      ...options,
    });
  });

  return { initAnimation, playAnimation };
}
