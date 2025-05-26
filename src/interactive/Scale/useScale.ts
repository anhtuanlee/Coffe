import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

import { IAnimationHook, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IUseFade extends IAnimationHook {
  refContent: MutableRefObject<IAnimationElement | null>;
  scale?: number;
}

export default function useScale({
  refContent,
  duration = 0.6,
  delayTrigger,
  delayEnter,
  scale = 1.2,
}: IUseFade): IValueHookAnimation {
  const { contextSafe } = useGSAP();

  const initAnimation = contextSafe(() => {
    gsap.set(refContent.current, { scale });
  });

  const playAnimation = contextSafe(() => {
    const delay = getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
    gsap.to(refContent.current, {
      scale: 1,
      delay,
      ease: 'power3.out',
      overwrite: 'auto',
      duration,
    });
  });

  return { initAnimation, playAnimation };
}
