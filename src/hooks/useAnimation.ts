import { useGSAP } from '@gsap/react';
import {
  isOutState,
  isPlayForPopupState,
  isPlayState,
  proxyAnimationOuting,
} from '@Layouts/Animation/animationSignal';
import { loadedSate } from '@Layouts/Animation/loadManageSignal';
import { useSignalEffect } from '@preact/signals-react';
import { MathMap } from '@Utils/mathUtils';
import { useComputedDeps } from '@Utils/signalUtils';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MutableRefObject, useRef } from 'react';

import { IAnimationProps, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';
import gsap from 'gsap';

interface IProps extends IAnimationProps, IValueHookAnimation {
  trigger: MutableRefObject<IAnimationElement | null>;
}
gsap.registerPlugin(ScrollTrigger);

export default function useAnimation({
  trigger,
  initAnimation,
  playAnimation,
  outAnimation,
  isObserver,
  threshold,
  start,
  horizontal,
  markers,
  isInPopup,
}: IProps): void {
  const refObserver = useRef<IntersectionObserver | null>(null);
  const refTime = useRef<NodeJS.Timeout>();
  const isPlayTrigger = useComputedDeps(() => {
    return isPlayForPopupState.value || (isPlayState.value && !isInPopup);
  }, [isInPopup, isPlayForPopupState.value]);
  const { contextSafe } = useGSAP();

  useSignalEffect(() => {
    if (loadedSate.value) {
      if (refTime.current) clearTimeout(refTime.current);
      refTime.current = setTimeout(() => {
        initAnimation();
      }, 10);
    }
  });

  useSignalEffect(() => {
    if (!isPlayForPopupState.value && isInPopup && refTime.current) {
      outAnimation?.();
    } else if (isPlayForPopupState.value && isInPopup && refTime.current) {
      initAnimation();
      playAnimation();
    }
  });

  const onHandleAnimation = contextSafe((): (() => void) => {
    let calcTheshold = threshold || 0;
    let trl: ScrollTrigger | null = null;

    if (calcTheshold === 0 && trigger.current) {
      const { height, top } = trigger.current.getBoundingClientRect();
      if (top >= window.innerHeight) {
        calcTheshold = MathMap(height / window.innerHeight, 0, 100, 30, 0);
        calcTheshold = Math.max(Math.min(calcTheshold, 30), 0);
      }
    }

    if (!isObserver) {
      trl = ScrollTrigger.create({
        trigger: trigger.current,
        onEnter: () => playAnimation(),
        start: start || `top+=${calcTheshold}% 90%`,
        horizontal,
        once: true,
        markers,
      });
    } else {
      refObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            playAnimation();
            trigger.current && refObserver.current?.unobserve(trigger.current);
            refObserver.current?.disconnect();
          }
        },
        { threshold: calcTheshold / 100 }
      );
      trigger.current && refObserver.current?.observe(trigger.current);
    }

    return () => {
      if (trl) {
        trl.kill();
      } else if (refObserver.current) {
        trigger.current && refObserver.current?.unobserve(trigger.current);
        refObserver.current?.disconnect();
      }
    };
  });

  useSignalEffect(() => {
    const clearHandler = (isPlayTrigger.value && !isInPopup && onHandleAnimation()) || null;
    return () => {
      clearHandler && clearHandler();
    };
  });

  useSignalEffect(() => {
    if (isOutState.value && outAnimation) {
      proxyAnimationOuting.animates.push({
        top: trigger.current?.getBoundingClientRect().top || 0,
        out: outAnimation as () => void,
      });
    }
  });
}
