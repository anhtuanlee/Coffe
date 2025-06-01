'use client';

import useAnimation from '@Hooks/useAnimation';
import useFade from '@Interactive/Fade/useFade';
import React, { PropsWithChildren, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IFade extends PropsWithChildren, IAnimationProps {
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  from?: string;
}

export default function Fade({
  direction = 'bottom',
  delayTrigger,
  delayEnter,
  children,
  duration,
  from,
  isObserver,
  start,
  horizontal,
  threshold,
}: IFade): React.ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useFade({
    refContent,
    delayTrigger,
    delayEnter,
    direction,
    duration,
    from,
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
    threshold,
    start,
    horizontal,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
