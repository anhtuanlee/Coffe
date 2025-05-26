import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

type IUseBoxMaskCenter = {
  refTrigger: MutableRefObject<HTMLDivElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  ease?: string;
  duration?: number;
};
export default function useBoxMaskCenter({
  refTrigger,
  ease,
  duration,
  delayTrigger = 0,
  delayEnter = 0,
}: IUseBoxMaskCenter): void {
  const { contextSafe } = useGSAP();

  const initAnimation = contextSafe(() => {
    gsap.getTweensOf(refTrigger.current);
    gsap.set(refTrigger.current, { '--clip': 'inset(0% 50%)' });
  });

  const playAnimation = contextSafe(() => {
    const delay = getDelay({ refContentCurrent: refTrigger.current, delayTrigger, delayEnter });
    gsap.to(refTrigger.current, {
      '--clip': 'inset(0% 0%)',
      ease: ease || 'power3.out',
      duration: duration || 1.2,
      delay,
    });
  });

  useAnimation({
    trigger: refTrigger,
    threshold: 100,
    initAnimation,
    playAnimation,
  });
}
