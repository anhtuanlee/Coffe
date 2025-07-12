'use client';

import useHeadingChars from '@Interactive/Heading/Chars/useHeadingChars';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import useAnimation from '@/hooks/useAnimation';

interface ParagraphLineMaskProps extends PropsWithChildren {
  delayEnter?: number;
  delayTrigger?: number;
  isObserver?: boolean;
  start?: string;
  horizontal?: boolean;
  onComplete?: () => void;
  duration?: number;
  isInPopup?: boolean;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement;

export default function HeadingChars({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  start,
  horizontal,
  onComplete,
  duration,
  isInPopup,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);

  const { initAnimation, playAnimation, outAnimation } = useHeadingChars({
    refContent,
    delayTrigger,
    delayEnter,
    isObserver,
    start,
    horizontal,
    onComplete,
    isInPopup,
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    outAnimation,
    isObserver,
    start,
    horizontal,
    isInPopup,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
