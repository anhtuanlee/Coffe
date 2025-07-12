import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback } from 'react';

import { IAnimationHook, IValueHookAnimation } from '@/types/animation';

import s from './styles.module.scss';

interface IUseBoxMaskLeft extends IAnimationHook {
  refTrigger: MutableRefObject<HTMLDivElement | null>;
  refMaskWrapper: MutableRefObject<HTMLDivElement | null>;
  refMaskElement: MutableRefObject<HTMLDivElement | null>;
  isInPopup?: boolean;
}

export default function useBoxMaskLeft({
  refTrigger,
  refMaskWrapper,
  refMaskElement,
  ease,
  duration,
  delayTrigger = 0,
  delayEnter = 0,
  isInPopup,
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
  const getDelayCallBack = useCallback((): number => {
    return getDelay({ refContentCurrent: refTrigger.current, delayEnter, delayTrigger, isInPopup });
  }, []);
  const playAnimation = contextSafe(() => {
    const delay = getDelayCallBack();
    gsap.to([refMaskElement.current], {
      delay,
      ...options,
    });
  });

  const outAnimation = contextSafe(() => {
    const delay = getDelayCallBack();
    gsap.to([refMaskElement.current], {
      ...options,
      delay: delay * 1.5,
      duration: 1.6,
      scaleX: 1.3, scaleY: 1.3
    });
  });
  return { initAnimation, playAnimation, outAnimation };
}
