'use client';

import { useGSAP } from '@gsap/react';
import useAnimationSignal from '@Layouts/Animation/animationSignal';
import useLoadManageSignal, { loadedSate } from '@Layouts/Animation/loadManageSignal';
import usePageEffectSignal, {
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
export default function PageSimpleEffect(): React.ReactElement {
  const { setInComplete, reset } = usePageEffectSignal();
  const { reset: resetLoader } = useLoadManageSignal();
  const { play } = useAnimationSignal();
  const refContent = useRef(null);

  const { contextSafe } = useGSAP();

  const animationIn = contextSafe(() => {
    resetLoader();
    gsap.to(refContent.current, {
      opacity: 1,
      pointerEvents: 'auto',
      ease: 'power3.out',
      duration: 0.6,
      onComplete: setInComplete,
    });
  });

  const animationOut = contextSafe(() => {
    gsap.to(refContent.current, {
      opacity: 0,
      ease: 'power3.inOut',
      pointerEvents: 'none',
      duration: 0.6,
      onComplete: () => {
        play();
        reset();
        gRefresh();
      },
    });
  });

  useSignalEffect(() => {
    if (toggleState.value && typeState.peek() === 'page') animationIn();
  });
  useSignalEffect(() => {
    if (inCompleteState.value && loadedSate.value && typeState.peek() === 'page') animationOut();
  });
  return <div className={cn(s.transition)} ref={refContent}></div>;
}
