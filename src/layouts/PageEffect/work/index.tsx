'use client';

import { useGSAP } from '@gsap/react';
import useWindowResize from '@Hooks/useWindowResize';
import useAnimationSignal from '@Layouts/Animation/animationSignal';
import useLoadManageSignal, { loadedSate } from '@Layouts/Animation/loadManageSignal';
import usePageEffectSignal, {
  imageWorkEffectState,
  inCompleteState,
  toggleState,
  typeState,
} from '@Layouts/PageEffect/pageEffectSignal';
import { useSignalEffect } from '@preact/signals-react';
import { gRefresh } from '@Utils/uiHelper';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { useRef } from 'react';

import s from './styles.module.scss';

export default function WorkEffect(): React.ReactElement {
  const { setInComplete, reset } = usePageEffectSignal();
  const { reset: resetLoader } = useLoadManageSignal();
  const { play } = useAnimationSignal();
  const refContent = useRef<HTMLDivElement>(null);
  const refThumbnail = useRef<HTMLImageElement>(null);
  const refInner = useRef<HTMLDivElement>(null);
  const refBg = useRef<HTMLSpanElement>(null);

  const { width, height } = useWindowResize();
  const { contextSafe } = useGSAP(() => {
    resetAnimation();
  });

  const resetAnimation = (): void => {
    removeStyleInner();
    gsap.set(refInner.current, { y: window.innerHeight * 0.5, scale: 0 });
    gsap.set(refBg.current, { opacity: 0 });
  };

  const removeStyleInner = (): void => {
    if (!refInner.current) return;
    refInner.current.style.width = '';
    refInner.current.style.height = '';
    refInner.current.style.clipPath = '';
  };

  const animationIn = contextSafe(() => {
    resetLoader();

    gsap.set(refContent.current, { opacity: 1, pointerEvents: 'auto' });
    gsap.fromTo(
      refBg.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'power3.out',
        duration: 2,
      }
    );

    const tl = gsap.timeline();
    tl.fromTo(
      refInner.current,
      { y: window.innerHeight * 0.5, scale: 0 },
      { y: 0, ease: 'power3.inOut', scale: 1, duration: 0.8 }
    );

    tl.to(refInner.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      ease: 'power3.inOut',
      duration: 1.2,
      onComplete: setInComplete,
    });
  });

  const animationOut = contextSafe(() => {
    gsap.set(refBg.current, { opacity: 0 });

    gsap.to(refInner.current, {
      clipPath: `inset(50% 50% 50% 50%)`,
      ease: 'power3.inOut',
      duration: 1,
      onComplete: () => {
        gsap.set(refContent.current, { opacity: 0, pointerEvents: 'none' });
        play();
        reset();
        resetAnimation();
        gRefresh();
      },
    });
  });

  useSignalEffect(() => {
    if (toggleState.value && typeState.peek() === 'work') animationIn();
  });

  useSignalEffect(() => {
    if (inCompleteState.value && loadedSate.value && typeState.peek() === 'work') animationOut();
  });

  useSignalEffect(() => {
    if (imageWorkEffectState.value && refThumbnail.current) {
      refThumbnail.current.src = imageWorkEffectState.value;
    }
  });

  useSignalEffect(() => {
    const w = width.value;
    const h = height.value;

    toggleState.peek() &&
      typeState.peek() &&
      gsap.set(refInner.current, {
        width: w,
        height: h,
      });
  });
  return (
    <div className={cn(s.transition, s.transition__work)} ref={refContent}>
      <span className={s.bg} ref={refBg} />
      <div className={s.inner} ref={refInner}>
        <img
          className={s.image}
          ref={refThumbnail}
          alt={'work-thumbnail'}
          width={160}
          height={90}
        />
      </div>
    </div>
  );
}
