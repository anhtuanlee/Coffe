'use client';

import useAnimation from '@Hooks/useAnimation';
import useBoxMaskLeft from '@Interactive/BoxMask/Left/useBoxMaskLeft';
import React, { PropsWithChildren, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';
import { cn } from '@/utils/uiHelper';

interface IBoxMaskLeft extends PropsWithChildren, IAnimationProps {
  className?: string;
}

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
  className,
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
    <div className={cn(s.boxMaskBottomWrapper, className)} ref={refTrigger}>
      <div ref={refMaskWrapper} className={cn(s.boxMaskBottom, className)}>
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
