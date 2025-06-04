import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

import s from './styles.module.scss';
import useMouse from '@/hooks/useMouse';

type IUseBoxSnap = {
  refTrigger: MutableRefObject<HTMLDivElement | null>;
  refSnap: MutableRefObject<HTMLDivElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  ease?: string;
  duration?: number;
  threshold?: number;
  start?: string;
  horizontal?: boolean;
  scale?: number;
};
export default function useBoxSnap({
  refTrigger,
  refSnap,
  ease,
  duration,
  threshold = 50,
  delayTrigger = 0,
  delayEnter = 0,
  start,
  horizontal,
  scale,
}: IUseBoxSnap): void {

  const { contextSafe } = useGSAP();

  const initAnimation = contextSafe(() => {

  });

  const playAnimation = contextSafe(() => {
    const delay = getDelay({
      refContentCurrent: refTrigger.current,
      delayTrigger,
      delayEnter,
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
