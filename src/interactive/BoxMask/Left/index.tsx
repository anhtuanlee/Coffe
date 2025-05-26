'use client';

import useAnimation from '@Hooks/useAnimation';
import useBoxMaskLeft from '@Interactive/BoxMask/Left/useBoxMaskLeft';
import React, { PropsWithChildren, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';

interface IBoxMaskLeft extends PropsWithChildren, IAnimationProps {}

export default function BoxMaskLeft({
  children,
  ease,
  duration,
  start,
  threshold,
  horizontal,
  delayEnter,
  delayTrigger,
  isObserver,
}: IBoxMaskLeft): React.ReactElement {
  const refTrigger = useRef<HTMLDivElement>(null);
  const refMaskWrapper = useRef<HTMLDivElement>(null);
  const refMaskElement = useRef<HTMLDivElement>(null);
  const { initAnimation, playAnimation } = useBoxMaskLeft({
    refTrigger,
    refMaskWrapper,
    refMaskElement,
    ease,
    duration,
    delayEnter,
    delayTrigger,
  });

  useAnimation({
    trigger: refTrigger,
    threshold,
    start,
    initAnimation,
    playAnimation,
    horizontal,
    isObserver,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }
  return (
    <div className={s.boxMaskBottomWrapper} ref={refTrigger}>
      <div ref={refMaskWrapper} className={s.boxMaskBottom}>
        {React.cloneElement(children, {
          ...{
            ref: refMaskElement,
            className: `${children.props.className || ''}`,
          },
        })}
      </div>
    </div>
  );
}
