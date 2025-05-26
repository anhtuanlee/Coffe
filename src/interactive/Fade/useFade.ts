import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback } from 'react';

import { IAnimationHook, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IUseFade extends IAnimationHook {
  refContent: MutableRefObject<IAnimationElement | null>;
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  from?: string;
}

export default function useFade({
  refContent,
  direction = 'none',
  delayTrigger,
  delayEnter,
  duration = 0.8,
  from = '100%',
}: IUseFade): IValueHookAnimation {
  const { contextSafe } = useGSAP();

  const initAnimation = contextSafe(() => {
    let options = { opacity: 0 };

    if (direction === 'left') options = { ...options, ...{ x: `-${from}` } };
    if (direction === 'right') options = { ...options, ...{ x: `${from}` } };
    if (direction === 'top') options = { ...options, ...{ y: `-${from}` } };
    if (direction === 'bottom') options = { ...options, ...{ y: `${from}` } };
    gsap.set(refContent.current, options);
  });

  const getDelayCallBack = useCallback((): number => {
    return getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
  }, []);

  const playAnimation = contextSafe(() => {
    const delay = getDelayCallBack();
    let options = {
      opacity: 1,
      delay,
      ease: 'power3.out',
      overwrite: 'auto',
      duration,
    };

    if (direction === 'left') options = { ...options, ...{ x: 0 } };
    if (direction === 'right') options = { ...options, ...{ x: 0 } };
    if (direction === 'top') options = { ...options, ...{ y: 0 } };
    if (direction === 'bottom') options = { ...options, ...{ y: 0 } };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    refContent.current && gsap.to(refContent.current, options);
  });

  return { initAnimation, playAnimation };
}
